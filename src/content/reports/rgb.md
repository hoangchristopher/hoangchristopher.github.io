---
title: "Images of the Russian Empire"
published: 2024-05-15
description: "Colorizing the Prokudin-Gorskii Photo Collection using alignment algorithms."
image: "../../assets/cs180/cs180-rgb/projectimages/euctobolskAligned[3, 3][3, 6].png"
tags: [Computer Vision, Image Processing, Alignment, UC Berkeley]
category: Projects
draft: false
permalink: /reports/rgb/
---

# Images of the Russian Empire

```mermaid
flowchart TD
    A[Split channels] --> B[Alignment search]
    B --> C[Metric evaluation]
    C --> D[Overlay channels]
```

The Prokudin-Gorskii Photo Collection is a set of digitized glass plate images that are split into three different color channels: red, green, and blue.

---

## Part 1: Single-scale Alignment

| Monastery | Tobolsk |
| :---: | :---: |
| ![](../../assets/cs180/cs180-rgb/projectimages/eucmonasteryAligned%5B2,%20-3%5D%5B2,%203%5D.png) | ![](../../assets/cs180/cs180-rgb/projectimages/euctobolskAligned%5B3,%203%5D%5B3,%206%5D.png) |

---

## Cathedral - A special case

| Incorrect | Correct |
| :---: | :---: |
| ![](../../assets/cs180/cs180-rgb/projectimages/euccathedralAligned%5B2,%205%5D%5B2,%200%5D.png) | ![](../../assets/cs180/cs180-rgb/projectimages/cathedralAligned%5B-2,%20-5%5D%5B1,%207%5D.png) |

---

## Part 2: Multi-scale Pyramid Alignment

```mermaid
flowchart TD
    A[Image pyramid] --> B[Coarse alignment]
    B --> C[Refinement]
    C --> D[Final alignment]
```

| Church | Harvesters |
| :---: | :---: |
| ![](../../assets/cs180/cs180-rgb/projectimages/churchAligned%5B0,%2025%5D%5B-4,%2058%5D.png) | ![](../../assets/cs180/cs180-rgb/projectimages/harvestersAligned%5B16,%2060%5D%5B13,%20124%5D.png) |

| Self Portrait |
| :---: |
| ![](../../assets/cs180/cs180-rgb/projectimages/self_portraitAligned%5B28,%2078%5D%5B36,%20176%5D.png) |

---

## Emir - A special case

| Incorrect | Correct |
| :---: | :---: |
| ![](../../assets/cs180/cs180-rgb/projectimages/emirAligned%5B24,%2049%5D%5B-1159,%200%5D.png) | ![](../../assets/cs180/cs180-rgb/projectimages/emirAligned%5B-24,%20-49%5D%5B17,%2057%5D.png) |