---
title: "Fun With Diffusion Models"
published: 2024-05-15
description: "In this project, we will be exploring the use and training of diffusion models."
image: "../../assets/cs180/cs180-diffusion/projectimages/00/almafi_cost_100.png"
tags: [Computer Vision, Deep Learning, Diffusion Models, PyTorch, UC Berkeley]
category: Projects
draft: false

permalink: /reports/diffusion/
---

# Fun With Diffusion Models

```mermaid
flowchart TD
    A[Text Prompt] --> B[Sampling Loops]
    B --> C[Image-to-image Translation]
    C --> D[Visual Anagrams / Hybrid Images]
    D --> E[Training a Single-Step Denoising UNet]
    E --> F[Training a Flow Matching Model]
```

In this project, we will be exploring the use and training of diffusion models.

---

## Part 0: Step

My text prompts are: ['an oil painting of a snowy mountain village',
'a photo of the amalfi cost',
'a photo of a man',
'a photo of a hipster barista',
'a photo of a dog',
'an oil painting of people around a campfire',
'an oil painting of an old man',
'a lithograph of waterfalls',
'a lithograph of a skull',
'a man wearing a hat',
'a high quality photo',
'',
'a rocket ship',
'a pencil'].
My seed is 100.

| 20 inference steps | 100 inference steps |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/00/almafi_cost_20.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/00/almafi_cost_100.png) |

| 20 inference steps | 100 inference steps |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/00/campfire_oil_20.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/00/campfire_oil_100.png) |

| 20 inference steps | 100 inference steps |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/00/lithograph_waterfall_20.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/00/lithograph_waterfall_100.png) |

Inspecting all of these results, we can see that each image is a pretty solid representation of their associated prompt. One thing we can notice is that as the number of inference steps increase, the detail also starts to increase in the resulting image. This is especially noticable with the prompt 'a photo of the amalfi cost', and how it's buildings are much more intricate.

---

## Part 1: Sampling Loops

### Part 1.1: Implementing the Forward Process

```mermaid
flowchart LR
    A[Original Image] --> B[Add Noise]
    B --> C[Noise Level 250]
    B --> D[Noise Level 500]
    B --> E[Noise Level 750]
```

| Noise Level 250 | Noise Level 500 | Noise Level 750 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/11/250.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/11/500.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/11/750.png) |

---

### Part 1.2: Classical Denoising

```mermaid
flowchart LR
    A[Noisy Image] --> B[Classical Denoising]
    B --> C[Denoised Image]
```

| Noise Level 250 | Denoised Level 250 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/12/250.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/12/250_ks5_s1.5.png) |

| Noise Level 500 | Denoised Level 500 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/12/500.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/12/500_ks7_s2.5.png) |

| Noise Level 750 | Denoised Level 750 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/12/750.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/12/750_ks11_s3.png) |

---

### Part 1.3: One-Step Denoising

```mermaid
flowchart LR
    A[Original Campinile] --> B[Campinile with Noise]
    B --> C[Predicted Noise]
    C --> D[Denoised Campinile]
```

| Original Campinile | Campinile with Noise Level 250 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/250_orig.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/13/250_noisy.png) |

| Predicted Noise for Level 250 | Denoised Campinile with Noise Level 250 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/250_noise.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/13/250_denoised.png) |

| Original Campinile | Campinile with Noise Level 500 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/500_orig.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/13/500_noisy.png) |

| Predicted Noise for Level 500 | Denoised Campinile with Noise Level 500 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/500_noise.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/13/500_denoised.png) |

| Original Campinile | Campinile with Noise Level 750 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/750_orig.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/13/750_noisy.png) |

| Predicted Noise for Level 750 | Denoised Campinile with Noise Level 750 |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/750_noise.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/13/750_denoised.png) |

---

### Part 1.4: Iterative Denoising

```mermaid
flowchart TD
    A[Noisy Campanile] --> B[onestep denoising]
    B --> C[iterative denoising]
    C --> D[Predicted clean image]
```

| Predicted clean image using gaussian blurring. | Predicted clean image using onestep denoising. | Predicted clean image using iterative denoising |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/14/gaussian.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/14/onestep.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/14/iterative.png) |

Here is the noisy Campanile every 5th loop of denoising.

| 690 | 540 | 390 | 240 | 90 |
| :---: | :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/14/690.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/14/540.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/14/390.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/14/240.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/14/90.png) |

---

### Part 1.5: Diffusion Model Sampling

```mermaid
flowchart TD
    A[Sampled noise] --> B[Sampling loop]
    B --> C[Sampled images]
```

Here are 5 sampled images.

| Image 1 | Image 2 | Image 3 | Image 4 | Image 5 |
| :---: | :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/15/1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/15/2.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/15/3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/15/4.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/15/5.png) |

---

### Part 1.6: Classifier-Free Guidance (CFG)

```mermaid
flowchart LR
    A[Conditional] --> C[CFG]
    B[Unconditional] --> C
    C --> D["a high quality photo"]
```

Here are 5 images of "a high quality photo" with a CFG scale of gamma = 7.

| Image 1 | Image 2 | Image 3 | Image 4 | Image 5 |
| :---: | :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/16/1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/16/2.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/16/3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/16/4.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/16/5.png) |

---

### Part 1.7: Image-to-image Translation

```mermaid
flowchart TD
    A[Input Image] --> B[Noise Level]
    B --> C[Given Prompt]
    C --> D[Edited Image]
```

Here are edits of the Campanile image using the given prompt at various noise levels.

| Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/20.png) |

| Original Campanile Image |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/13/250_orig.png) |

Here are edits of an image of porridge using the given prompt at various noise levels.

| Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/1_chao.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/3_chao.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/5_chao.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/7_chao.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/10_chao.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/20_chao.png) |

| Original Porridge Image |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/chao.webp) |

Here are edits of an image of a sitting cat using the given prompt at various noise levels.

| Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/1_cat.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/3_cat.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/5_cat.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/7_cat.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/10_cat.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/17/20_cat.png) |

| Original Cat Image |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/17/cat.jpeg) |

---

### Part 1.7.1: Editing Hand-Drawn and Web Images

Here is a hand-drawn image edited using the given prompt at various noise levels.

| Original Hand-Drawn Image 1 | Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_0.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand1_20.png) |

Here is a hand-drawn image edited using the given prompt at various noise levels.

| Original Hand-Drawn Image 2 | Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_0.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/hand2_20.png) |

Here is an image from the web edited using the given prompt at various noise levels.

| Original Web Image | Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_0.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/171/web_20.png) |

---

### Part 1.7.2: Inpainting

```mermaid
flowchart LR
    A[Image] --> B[Mask]
    B --> C[Inpainting]
    C --> D[Inpainted Image]
```

| Campanile Inpainted | Hand-Drawn Image 1 Inpainted | Hand-Drawn Image 2 Inpainted |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/172/campanile_inpainted.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/172/hand1_inpainted.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/172/hand2_inpainted.png) |

---

### Part 1.7.3: Text-Conditional Image-to-image Translation

```mermaid
flowchart TD
    A[Image] --> B[Text Condition]
    B --> C[Noise Level]
    C --> D[Edited Image]
```

Here are edits of the Campanile edited using the given prompt at various noise levels.

| Original Campanile | Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_0.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/campanile_20.png) |

Here are edits of a hand-drawn image edited using the given prompt at various noise levels.

| Original Hand-Drawn Image 1 | Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_0.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand1_20.png) |

Here are edits of a hand-drawn image edited using the given prompt at various noise levels.

| Original Hand-Drawn Image 2 | Noise Level 1 | Noise Level 3 | Noise Level 5 |
| :---: | :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_0.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_3.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_5.png) |

| Noise Level 7 | Noise Level 10 | Noise Level 20 |
| :---: | :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_7.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_10.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/173/hand2_20.png) |

---

### Part 1.8: Visual Anagrams

| 'an oil painting of people around a campfire' and 'an oil painting of an old man' | 'a lithograph of waterfalls' and an oil painting of a snowy mountain village' |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/18/oil_campfire_oldman.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/18/waterfalls_snowy.png) |

---

### Part 1.9: Hybrid Images

| 'a photo of a dog' and 'a photo of the amalfi cost' | 'a rocket ship' and 'a man wearing a hat' |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/19/dog_amalfi.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/19/rocket_manhat.png) |

---

## Part B

## Part 1: Training a Single-Step Denoising UNet

### 1.1 Implementing the UNet

```mermaid
flowchart TD
    A[Input] --> B[UNet]
    B --> C[Required operations]
    C --> D[Output]
```

Using PyTorch, I implemented this UNet, along with it's required operations.

| UNet |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/unconditional_arch.png) |

---

### 1.2 Using the UNet to Train a Denoiser

Here is a visualization of the noising process using various sigma values.

| The noising process. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b12/00.png) |

#### 1.2.1 Training

```mermaid
flowchart LR
    A[Noisy input] --> B[UNet]
    B --> C[Training loss]
```

| Training loss curve plot with a sigma value of 0.5. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b121/loss_curve_temp.png) |

| Sample results on the test set with noise level 0.5 after 1 epoch. | Sample results on the test set with noise level 0.5 after 5 epochs. |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b121/1.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/b121/5.png) |

#### 1.2.2 Out-of-Distribution Testing

| Sample results on out-of-distribution noise levels with various sigma values. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b122/ood_results.png) |

#### 1.2.3 Denoising Pure Noise

| Training loss curve plot with a sigma value of 0.5. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b123/loss_curve.png) |

| Results on pure noise after 1 epoch. | Results on pure noise after 5 epochs. |
| :---: | :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b123/1_epoch.png) | ![](@/assets/cs180/cs180-diffusion/projectimages/b123/5_epochs.png) |

Overall, as we continue to train, we see that the model is learning that images should generally look less like noise. However, we can see a patch of pixels that aren't "smooth" after 5 epochs. This could potentially be due to spatial bias in the dataset, with subjects in our training images roughly being centered, but slightly offset. So, the model could be learning that certain regions constistently exhibit higher-frequency content. This could then manifest iteself the patch of high frequency pixels when evaluated on OOD noise, as it has learned that subjects are usually placed in that region.

---

## Part 2: Training a Flow Matching Model

### 2.1 Adding Time Conditioning to UNet

```mermaid
flowchart LR
    A[Time conditioning] --> B[FCBlock]
    B --> C[UNet]
```

To add time conditioning to a UNET, we need to implement a new operater called an FCBlock (fully-connected block) that is used to inject the conditioning signal into the UNet.

| FCBlock for conditioning |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/fc_long.png) |

---

### 2.2 Training the UNet

| Training loss curve plot for the time-conditioned UNet over the whole training process. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b22/loss_curve.png) |

---

### 2.3 Sampling from the UNet

```mermaid
flowchart TD
    A[Time-conditioned UNet] --> B[Sampling]
    B --> C[Results]
```

| Sampling results from the time-conditioned UNet for 1 epoch. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b23/1.png) |

| Sampling results from the time-conditioned UNet for 5 epochs. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b23/5.png) |

| Sampling results from the time-conditioned UNet for 10 epochs. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b23/10.png) |

---

### 2.4 Adding Class-Conditioning to UNet

```mermaid
flowchart LR
    A[One-hot class-conditioning vector] --> B[Class-conditioned UNet]
```

We can add class-conditioning to the UNet using a one-hot class-conditioning vector.

---

### 2.5 Training the Class-Conditioned UNet

| Training loss curve plot for the class-conditioned UNet over the whole training process. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b25/loss_curve_class.png) |

---

### 2.6 Sampling from the Class-Conditioned UNet

```mermaid
flowchart TD
    A[Noise + Class] --> B[Class-conditioned UNet]
    B --> C[Sampling results]
```

| Sampling results from the class-conditioned UNet for 1 epoch. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b26/1.png) |

| Sampling results from the class-conditioned UNet for 5 epochs. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b26/5.png) |

| Sampling results from the class-conditioned UNet for 10 epochs. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b26/10.png) |

Since class-conditioning allows us to converge facter, we can also remove the learning rate scheduler. In order to compensate for the loss of the scheduler can lower our constant learning rate by a factor of 10 (from 1e-2->1e-3).

| Sampling results from the class-conditioned UNet for 1 epoch w/ no scheduler. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b26/1_after.png) |

| Sampling results from the class-conditioned UNet for 5 epochs w/ no scheduler. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b26/5_after.png) |

| Sampling results from the class-conditioned UNet for 10 epochs w/ no scheduler. |
| :---: |
| ![](@/assets/cs180/cs180-diffusion/projectimages/b26/10_after.png) |