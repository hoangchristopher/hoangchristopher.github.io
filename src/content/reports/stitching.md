---
title: "(Auto)Stitching Photo Mosaics"
published: 2024-05-15
description: "In this project, we will be exploring how to create picture mosaics autonomously."
image: "../../assets/cs180/cs180-stitching/projectimages/a4/blended_plaza.jpg"
tags: [Computer Vision, Image Processing, Homography, UC Berkeley]
category: Projects
draft: false
permalink: /reports/stitching/
---

# (Auto)Stitching Photo Mosaics

```mermaid
flowchart TD
    A[Input images] --> B[Feature detection]
    B --> C[Feature matching]
    C --> D[Homography]
    D --> E[Warping]
    E --> F[Blending]
```

In this project, we will be exploring how to create picture mosaics autonomously.

---

## Image Warping and Mosaicing

### A.1: Shoot the Pictures

Here are 2 sets of images with projective transformations between them (fixed center of projection, rotated camera).

| Plaza Left | Plaza Right |
| :---: | :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a1/fulldef/plazaLeft.jpg) | ![](../../assets/cs180/cs180-stitching/projectimages/a1/fulldef/plazaRight.jpg) |

| Creek Left | Creek Right |
| :---: | :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a1/creekLeft.jpg) | ![](../../assets/cs180/cs180-stitching/projectimages/a1/creekRight.jpg) |

---

### A.2: Recover Homographies

Here are the correspondances for each image set visualized.

| Plaza Left | Plaza Right |
| :---: | :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a2/plazaLeft_dots.jpg) | ![](../../assets/cs180/cs180-stitching/projectimages/a2/plazaRight_dots.jpg) |

| Creek Left | Creek Right |
| :---: | :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a2/creekLeft_dots.jpg) | ![](../../assets/cs180/cs180-stitching/projectimages/a2/creekRight_dots.jpg) |

| System of Equations |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a2/soe.png) |

| Homography Matrix |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a2/plazaMatrix.png) |

---

### A.3: Warp the Images

```mermaid
flowchart LR
    A[Original image] --> B[Apply homography]
    B --> C[Rectified image]
```

| Original | Nearest Neighbor | Bilinear |
| :---: | :---: | :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a3/phong_rectified.jpg) | ![](../../assets/cs180/cs180-stitching/projectimages/a3/rectified_phong_nn_rectified.jpg) | ![](../../assets/cs180/cs180-stitching/projectimages/a3/rectified_phong_bi_rectified.jpg) |

---

### A.4: Blend the Images into a Mosaic

```mermaid
flowchart LR
    A[Warped image] --> B[Mask]
    B --> C[Laplacian blending]
    C --> D[Mosaic]
```

| Plaza Mosaic |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a4/blended_plaza.jpg) |

| Rock Mosaic |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a4/blended_rock.jpg) |

| Creek Mosaic |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/a4/blended_creek.jpg) |

---

### B.1: Harris Corner Detection

| Harris Corners |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/b1/im1_dots_noANMS.jpg) |

| Strong Corners |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/b1/500.jpg) |

| ANMS |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/b1/plaza_dots_anms.jpg) |

---

### B.2: Feature Descriptor Extraction

| Feature Descriptors |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/b2/7_extracted_feature_descriptors.png) |

---

### B.3: Feature Matching

| Matches |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/b3/matches.jpg) |

---

### B.4: RANSAC for Robust Homography

```mermaid
flowchart TD
    A[Random samples] --> B[Estimate homography]
    B --> C[Count inliers]
    C --> D[Best model]
```

| Auto-Stitched Plaza |
| :---: |
| ![](../../assets/cs180/cs180-stitching/projectimages/b4/plaza_mosaic_1000.jpg) |