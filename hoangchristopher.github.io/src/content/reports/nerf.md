---
title: "Neural Radiance Fields"
published: 2024-05-15
description: "In this project, we will be exploring neural radiance fields to generate novel camera views."
image: "../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_4000.jpg"
tags: [Computer Vision, Deep Learning, NeRF, PyTorch, UC Berkeley]
category: Projects
draft: false
permalink: /reports/nerf/
---

# Neural Radiance Fields

```mermaid
flowchart TD
    A[Camera Calibration and 3D Scanning] --> B[Fit a Neural Field to a 2D Image]
    B --> C[Create Rays from Cameras]
    C --> D[Sampling]
    D --> E[Neural Radiance Field]
    E --> F[Volume Rendering]
    F --> G[Training with Your Own Data]
```

In this project, we will be exploring neural radiance fields to generate novel camera views.

---

## Part 0: Camera Calibration and 3D Scanning

To calibrate our cameras, we will gather several images of our ArUco tags taken from various angles. 
From there, we will take additional images of a single tag with our desired object from various angles, essentially forming a dome of views around our object. 
Here is the dome of views around my computer mouse as the subject.

| Camera Frustum Visualization from Above | Camera Frustum Visualization from Below |
| :---: | :---: |
| ![](public/assets/cs180/cs180-nerf/projectimages/00/above.png) | ![](../../assets/cs180/cs180-nerf/projectimages/00/under.png) |

---

## Part 1: Fit a Neural Field to a 2D Image

```mermaid
flowchart LR
    A[2-dim pixel coordinates] --> B[Sinusoidal Positional Encoding]
    B --> C[MLP]
    C --> D[3-dim pixel colors]
```

Before jumping into using a Neural Radiance Field (NeRF) to represent a 3D space, 
we can use the 3D equivalent, a Neural Field, so represent a grid of pixel coordinates. 
Using a Multilayer Perception (MLP) network with Sinusoidal Positional Encoding (PE) that takes in 2-dim pixel coordinates 
to predict 3-dim pixel colors.

Regarding network architecture, our MLP is structured as a stack of non 
linear activations and fully connected layers as follows:
Input (2-dim coordinate with PE ran on it) -> Linear Layer of 256 width -> ReLu Activation -> 
Linear Layer of 256 width -> ReLu Activation -> Linear Layer of 256 width -> ReLu Activation -> 
Linear Layer of 3 width (to get to our return value) -> Sigmoid Activation -> Output (3-dim RGB value). 
For Sinusoidal Positional Encoding, I chose L = 0 to map our 2-dim inputs to a 42-dim vector. As 
for the optimizer, I chose Adam with a learning rate of 1e-2 and had a training loop of 3000 iterations with 
batch size of 10,000. For the evaluation metric, I decided to use PSNR, which is computed from MSE (mean squared error) loss,
 as 10 * log(1 / MSE).

Here is the training progression on the provided test image of a fox.

| Fox Prediction after 1 Iteration | Fox Prediction after 50 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/1_fox.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/50_fox.jpg) |

| Fox Prediction after 100 Iterations | Fox Prediction after 150 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/100_fox.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/150_fox.jpg) |

| Fox Prediction after 250 Iterations | Fox Prediction after 500 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/250_fox.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/500_fox.jpg) |

| Fox Prediction after 1000 Iterations | Fox Prediction after 3000 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/1000_fox.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/foxes/3000_fox.jpg) |

Here is the training progression on the provided test image of a Pokemon statue.

| Pokemon Prediction after 1 Iteration | Pokemon Prediction after 50 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/1_dragonite.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/50_dragonite.jpg) |

| Pokemon Prediction after 100 Iterations | Pokemon Prediction after 150 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/100_dragonite.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/150_dragonite.jpg) |

| Pokemon Prediction after 250 Iterations | Pokemon Prediction after 500 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/250_dragonite.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/500_dragonite.jpg) |

| Pokemon Prediction after 1000 Iterations | Pokemon Prediction after 3000 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/1000_dragonite.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/1/dragonite/3000_dragonite.jpg) |

Here is the PSNR curve for training on the Pokemon statue image.

| PSNR Progression for Pokemon Statue |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/1/psnr_progression_dragonite.jpg) |

---

## Part 2: Fit a Neural Radiance Field from Multi-view Images

### 2.1: Create Rays from Cameras

```mermaid
flowchart LR
    A[Pixel coordinate] --> B[Camera space]
    B --> C[World space]
    C --> D[Ray origin and normalized direction]
```

In this part, we needed to implement a function that transforms a point from camera 
space to the world space given a point and its respective camera-to-world (c2w) matrix. 
To ensure that this function also worked for batches of coordinates, I implemented it as such: 
for each point in the passed in points, convert it into a homogeneous coordinate, apply the transformation 
of the c2w matrix, normalize it, and then accumulate it into a return value.

Next, we needed to implement a function that transforms a point from the 
pixel coordinate system to camera space given the camera's intrinsic (K) matrix, the point, 
and s (the depth of the point along the optical axis). Like the previous part, for 
points that are fed into the function, we convert it into its homogeneous coordinate equivalent, but this 
time, we will tranform it by the inverse of the c2p matrix, along with the depth that was given to us. From 
there, we can return the accumulated result.

After that, we needed to implement a function that converts a pixel coordinate to a ray 
with origin and normalized direction given K (our camera intrinsic matrix), c2w matrices, and our points. 
From the structure of the c2w transformation matrix, we are able to extract the ray origin, being that it's all of the 
right-most column of the c2w transformation matrix except for the final 1 at the bottom. To retrieve 
the ray direction, we can calculate it as the normalized vector of (X_w - the ray origin), where X_w is the (x_w, y_w, z_w) 
coordinate vector of our point in world space. We can accumulate the ray origins and results and return them.

### 2.2: Sampling

```mermaid
flowchart TD
    A[Images, c2w matrices, K, number of samples] --> B[Sample rays from images]
    B --> C[Sample points along said rays]
```

In this part, we needed to implement two functions: one that samples rays from images, and one that 
samples points along said rays.

To implement the function to sample rays from images, we will pass in our images, our c2w matrices, K, and the number of samples we want. 
From there, for every sample, we want to pick a random image, sample a random pixel (and offset its coordinate by 0.5 due to our coordinate convention), 
convert the pixel to camera coordinates, convert those camera coordinate coordinates to the world space, extract the ray origin and direction, 
retrieve its color, and then accumulate and return the results.

To implement the function to sample points along the rays, we essentially treat our ray as a line in 3d space and constrain our sampling area along the line with 
near and far values, with a t value interpolating along that segment of our ray. From there, we generate our desired number of samples along those rays and then accumulate 
those sample points.

### Part 2.3: Putting the Dataloading All Together

In this part, we create a RaysData class that, when built with our images, K matrix, and c2w matrix, 
creates a dataset of all of our rays. It builds our pixel coordinates with their colors, 
computes ray origins, ray directions, and does the relevant space conversions.

### Part 2.4: Neural Radiance Field

```mermaid
flowchart TD
    A[3D coordinate] --> B[Trunk]
    B --> C[Density]
    B --> D[Point color]
```

In this part, we create a deeper MLP for a Neural Radiance Field that takes in a 3-dim coordinate (that is PE encoded) and 
returns a density and point color. This involves a slightly different stack architecture that starts with a trunk of: 
Linear Layer of Width 256 -> ReLU activation -> Linear Layer of Width 256 -> ReLU activation -> Linear Layer of Width 256 -> ReLU activation -> Linear Layer of Width 256 -> ReLU activation -> Concatenated inputs Linear Layer of Width 256 -> ReLU activation -> Linear Layer of Width 256 -> ReLU activation -> Linear Layer of Width 256 -> ReLU activation -> Linear Layer of Width 256. 
From there, we branch out to either densiter: Linear Layer of Width 1 -> ReLU activation. Or point color: Linear Layer of Width 256 -> Concatenation of PE encoded ray direction -> Linear Layer of Width 128 -> ReLU activation -> Linear Layer of Width 3 -> Sigmoid Activation.

### Part 2.5: Volume Rendering

```mermaid
flowchart LR
    A[Sample location] --> B[c]
    A --> C[T]
    A --> D[Weight term]
    B --> E[Volume rendering]
    C --> E
    D --> E
```

To implement a volume rendering function, I simply implemented the discrete approximation of the core volume rendering equation, which is as follows:

| Discrete Approximation of the Core Volume Rendering Equation |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/equation.png) |

Where c_i is the color obtained from the network at sample location i, T_i is the probability of 
a ray not terminating before sample location i, and 1 - e^(-sig_i * del_i) is the probability of terminating at sample location i.

From there, I applied the training loop from previous parts, but adapted it for generating images for our 
3D.

Here is a visualization of rays and samples with cameras for the lego dataset (100 rays).

| Camera/Ray/Sample Visualization |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/visualization.jpg) |

Here is the training progression on the lego dataset.

| Lego Prediction after 1 Iteration | Lego Prediction after 50 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_1.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_50.jpg) |

| Lego Prediction after 100 Iterations | Lego Prediction after 300 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_100.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_300.jpg) |

| Lego Prediction after 500 Iterations | Lego Prediction after 800 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_500.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_800.jpg) |

| Lego Prediction after 1000 Iterations | Lego Prediction after 4000 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_1000.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_4000.jpg) |

Here is the Validation PSNR curve for training on the lego dataset.

| Validation PSNR Progression for Pokemon Statue |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/psnr_progression_legos_validation.jpg) |

Here is a spherical rendering video of the Lego dataset using provided test cameras.

| Lego Spherical Rendering GIF |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/2/lego_spherical_loop.gif) |

---

## Part 2.6: Training with Your Own Data

```mermaid
flowchart TD
    A[custom dataset] --> B[rescaling during training]
    B --> C[training images and K matrix before training]
    C --> D[computer mouse dataset]
```

Here is a spherical rendering video of my computer mouse using test generated test cameras.

| Computer Mouse Spherical Rendering GIF |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/26/aaaaa_spherical_mine_17_loop.gif) |

For training on my custom dataset, it largely followed the same structure of the part with the lego dataset. However, 
I had to do some rescaling during training due to my calibration images being captured at a much higher resolution than 
my M4 mac can handle. During the process of trying to find a workaround, I had to pay for Google Colab Pro and migrate my entire project from local compilation to the Google ecosystem. 
One thing that set me back a lot was trying to 
resize my source calibration and computer mouse images using a third party image resizer. I didn't know it, but the resizer had absolutely destroyed the 
position of the camera views (relative to each other). So at one point, I couldn't run the proper rendering pipeline because of hardware capabilities, then when 
I tried to remedy those, all of the variables were messed up without me having any idea. In the end, I was able to realize this, and found that 
resizing mytraining images and and K matrix before training was the easiest way to make everything work.

As for hyperparameters, I found my optimal near and far values for sampling by analyzing camera coordinates, which I found 15cm and 1m to work. 
My optimizer was Adam with a learning rate of 5e-4, my batch size was 5000, and I ran 4000 iterations.

Here is the training progression with predicted images across iterations.

| MSE Progression for Computer Mouse |
| :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/26/mse.jpg) |

Here is the training progression on the computer mouse dataset.

| Computer Mouse Prediction after 1 Iteration | Computer Mouse Prediction after 50 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_1.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_50.jpg) |

| Computer Mouse Prediction after 100 Iterations | Computer Mouse Prediction after 300 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_100.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_300.jpg) |

| Computer Mouse Prediction after 500 Iterations | Computer Mouse Prediction after 800 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_500.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_800.jpg) |

| Computer Mouse Prediction after 1000 Iterations | Computer Mouse Prediction after 4000 Iterations |
| :---: | :---: |
| ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_1000.jpg) | ![](../../assets/cs180/cs180-nerf/projectimages/26/progression/render_step_drive_4000.jpg) |