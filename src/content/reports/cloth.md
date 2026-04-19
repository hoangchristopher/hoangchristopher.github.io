---
title: "Cloth Simulator"
published: 2024-05-15
description: "A mass-spring cloth simulation with collision handling, self-collision via spatial hashing, and real-time shading effects."
image: "../../assets/cs184/cs184-cloth/projectimages/part5_bp.png"
tags: [Computer Graphics, C++, Simulation, OpenGL, UC Berkeley]
category: Projects
draft: false
permalink: /reports/cloth/
---

# Cloth Simulator

```mermaid
flowchart TD
    A[Masses and springs] --> B[Numerical integration]
    B --> C[Collisions with objects]
    C --> D[Self-collisions]
    D --> E[Shaders]
```

## Overview

In this assignment, we created a cloth simulation that mimics how a real cloth would behave in real life.
First, we represented and built our cloth out of point masses held together by springs that dictate the
properties of the cloth. Then, we implemented the cloth's collisions with other objects as well as itself.
From there, we implemented many different shaders to play around with in our simulation, including
Blinn-Phong shading, displacement mapping, and texture mapping, to name a few. Overall, we really enjoyed
this assignment, as it was fun to see something we created move in a way that mimics real life.
Implementing the collision detection by hand also gave us a nice look into how collision detection works
in some of the games that we play every day. To us, everything seemed pretty straightforward in this
assignment, as the implementations involved fell in line with what we learned in the lectures.
Something that we thought was interesting was the realization that a cloth really CAN be simulated by a
bunch of point masses and springs. It’s something that we really never thought about, but that is very
intuitive. This was a fun assignment!

---

## Part 1: Masses and springs

```mermaid
flowchart LR
    A[Point masses] --> B[Structural constraints]
    A --> C[Shearing constraints]
    A --> D[Bending constraints]
    B --> E[Cloth behavior]
    C --> E
    D --> E
```

| Wireframe zoomed out. | Wireframed zoomed in. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part1_zoomedout.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part1_zoomedin.png) |

Here is the wireframe with various constraints.

| Wireframe without any shearing constraints. | Wireframes with only shearing constraints. | Wireframes with all constraints. |
| :---: | :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part1_withoutshearing.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part1_onlyshearing.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part1_allconstraints.png) |

---

## Part 2: Simulation via numerical integration

```mermaid
flowchart TD
    A[Forces on point masses] --> B[Spring constant]
    A --> C[Density]
    A --> D[Damping]
    B --> E[Cloth motion]
    C --> E
    D --> E
```

Here is some experimentation we did with the Cloth Simulator:

Let's start with experimenting with various spring constant (ks) values.

| Cloth Simulation with a 50 N/m ks value. | Cloth Simulation with a 100000 N/m ks value. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part2_50nmks.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part2_100000nmks.png) |

From start to rest with a very low ks (we used 50 N/m), we observed that the cloth behaves in a very typical
clothlike manner. When the cloth starts its descent, it quickly starts to fold and cave in between the two
pinned points. By the end, the cloth is hanging freely and has settled in a manner that sees the cloth sagging
in between the two pinned points. This is because the low ks allowed the springs in between each mass to stretch
more freely, allowing the cloth to deform more throughout the simulation.

As for a high ks (we used 100000 N/m), we observed that the cloth was much less rigid throughout the simulation,
like a piece of paper. When the cloth starts its descent, there is a lot less folding and deformation. Then,
by the end, the cloth is once again hanging by the two pinned points, but the sagging between the two points is
much less noticeable. Due to the higher ks, the springs in between each point mass don't stretch out as easily,
resulting in less deformation throughout the simulation.

Next, let's experiment with various density values.

| Cloth Simulation with a density of 1 g/cm^2. | Cloth Simulation with a density of 50 g/cm^2. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part2_1gcm2.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part2_50gcm2.png) |

From start to rest with a low density (1 g/cm^2), we observed that the cloth deformed a lot less compared to the
default density of 15 g/cm^2. When the cloth starts falling, it looks as if it is descending like a paper, and
there isn't too much deformation throughout its descent. By the end, the cloth hangs from its two pinned
points with one small, sagging fold at the top. Since the point masses' density is lower, the force acting upon
each point mass is lower, as force is equal to the point's mass times a given acceleration where mass and
density are proportional. Since the total magnitude of the forces acting on each point mass is decreased,
there is less deformation seen in the cloth throughout the simulation.

From start to rest with a high density (50 g/cm^2), we observed that the cloth deformed a lot more compared to
the default density of 15 g/cm^2. When the cloth starts falling, it does so in a manner with more stretching
involved, and there is a lot of deformation throughout its descent. By the end, the cloth hangs from its two
pinned points with a large sagging fold at the top, accompanied by a few more under it. Since the point masses'
density is higher, the force acting upon each point mass is higher, as force is equal to the point's mass times
a given acceleration where mass and density are proportional. Since the total magnitude of the forces acting on
each point mass is higher, there is more deformation seen in the cloth throughout the simulation. Essentially,
the stronger forces are able to “stretch” each spring harder.

Next, let's experiment with damping values.

| Cloth Simulation with a damping value of 0.045977%. | Cloth Simulation with a damping value of 0.758621%. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part2_damp004.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part2_damp075.png) |

From start to rest with a low damping value (0.045977%), we observed that the cloth deformed a lot more compared
to the default damping value of 0.2%. When the cloth starts falling, it starts out “normally,” but throughout
the fall, there is a lot more bouncing around done by the cloth. By the end, the cloth hangs from its two
pinned points in a manner similar to how it does with the default parameters. The bouncing around can be
explained by the lower damping value, making it so that there is less loss of energy in each point mass
throughout the simulation. If there is less energy being lost as time goes on, then the longer it will take
for the cloth to reach a steady state.

From start to rest with a high damping value (0.758621%), we observed that the cloth deformed a lot less
compared to the default damping value of 0.2%. When the cloth starts falling, it actually floats down into its
steady hanging state. By the end, the cloth hangs from its two pinned points in a manner similar to how it
does with the default parameters. The floating can be explained by the higher damping value, which makes it so
that there is more of a loss of energy in each point mass throughout the simulation. If more energy is lost as
time goes on, then each point mass will be affected by the forces acting upon it to a lesser extent. Thus,
forces like gravity will not be able to displace each point mass “continuously.”

We can see that both simualtions have the same final steady resting state, regardless of damping value.

Now, here is a screenshot of our shaded cloth from scene/pinned4.json in its final resting state with the default
parameters.

| pinned4.json in its final resting state with the default parameters. |
| :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part2_pinned4.png) |

---

## Part 3: Handling collisions with other objects

```mermaid
flowchart TD
    A[Point mass] --> B[Sphere collision]
    A --> C[Plane collision]
    B --> D[Correct position]
    C --> D
    D --> E[Update simulation]
```

To implement the handling of collisions with spheres, we want to detect when a point mass is inside the sphere
and then correct it by calculating a correction vector that alters the point mass's position to be outside of
the sphere again, and then update the position of the point mass with the corrected position.
...

To implement the handling of collisions with planes, we want to detect when a point mass crosses from one side
of the place to the other, essentially falling “inside” the plane.
...

Then, we can update the simulation function in cloth.cpp to iterate through every point and check if there are
collisions between each point and all the collision objects.

Now, let's look at the shaded cloth in its final resting state on the sphere using various spring constant values.

| Shaded cloth in its final resting state on the sphere with ks = 500. | Shaded cloth in its final resting state on the sphere with ks = 5000. | Shaded cloth in its final resting state on the sphere with ks = 50000. |
| :---: | :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part3_ks500.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part3_ks5000.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part3_ks50000.png) |

Looking at the screenshots with the various spring constants, we can see that as the spring constant increases,
the cloth has stronger structural integrity and is less susceptible to deformation.

Also, here's a screenshot of our shaded cloth lying peacefully at rest on the plane.

| Here is a screenshot of our shaded cloth lying peacefully at rest on the plane. | Here is a screenshot of a slightly less peaceful cloth lying at rest on the plane. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part3_plane2.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part3_plane.png) |

---

## Part 4: Handling self-collisions

```mermaid
flowchart TD
    A[Build spatial map] --> B[Hash point masses]
    B --> C[Find nearby candidates]
    C --> D[Apply correction]
    D --> E[Update point position]
```

To handle self-collisions, we implemented spatial hashing, where at each time step, we build a hash table,
stored as the variable “map,” to map float values to a vector list of point masses where the float values
represent a 3D box volume in the scene and the vector lists of point masses contain the point masses that are
in the respective 3D box volume. Using the built map, we finally loop through the point masses and use the
hash table to see if there are any other point masses that share the same 3D volume. If so, then we can apply
a repulsive collision force.

For specific implementation details, we first implemented a hash_position function that takes in a Vector3d
position and then returns a float value based on the position coordinates, other various calculations, and
our choice of prime numbers. Next, we implemented the build_spatial_map function to populate the “map”
variable by iterating through the point masses and creating a new vector<PointMass*> if there wasn't
one already associated with the hash key. Then, we implemented the self_collide function that checks for self
collision. First, given a point mass pm, we use pm's position to generate a hash key using the hash_position
function and see if there is a list of potential “candidates” for PointMass collision. If the list value
given the hash key is equal to false, or empty, then we know that pm isn't colliding with anything, so we can
return early. So, if we haven't returned, then we know that we there is a collision, and we need to account
for it. To do so, we can loop through each point mass in the candidates PointMass list (making sure that if
the current candidate PointMass == pm, then we skip) and accumulate a correction vector based on whether or
not pm and the current candidate PointMass we are checking are close enough to each other to be colliding.
This is determined by seeing if the distance between the two points is less than 2 * thickness, where
distance is equal to the norm of a vector pointing from the current candidate's position to pm's position
and thickness is the cloth's thickness. If so, then we set a variable overlap = 2 * thickness - distance,
and then accumulate a correction vector (initially set to a zero 3D vector) by overlap * (the normalized
vector of the direction vector pointing from the current candidate's position to pm's position) while also
incrementing a count variable. Finally, if count > 0 after iterating through all of the candidates, then
we divide the correction vector by count and then simulation_steps (which is already passed into the
self_collide function), and then add the correction vector to pm's position.

| Here is a screenshot of an early, initial self collision. | Here is a screenshot further along the process of the cloth falling and folding onto itself. | Here is a screenshot of the cloth at a more restful state at the end of its descent. |
| :---: | :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part4_initial.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part4_further.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part4_rest.png) |

Now, let's vary the density and ks and see how they affect the behavior of the cloth as it falls on itself!

| Resting State of the Cloth with Low Density (1gcm^2). | Resting State of the Cloth with High Density (1gcm^2). |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part4_lowdensity_1gcm2.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part4_highdensity_50gcm2.png) |

| Resting State of the Cloth with Low ks (500 N/m). | Resting State of the Cloth with High ks (50000 N/m). |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part4_lowks500.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part4_highks50000.png) |

Here, we can see that with lower density, the cloth almost “floats” down and thus does not forcefully press
many point masses together, resulting in the cloth folding cleanly onto itself, compared to the
high-density simulation where the extra weight of the cloth forces more collisions as the point masses press
onto each other and in a jumbled “stack” of multiple small folds.

As for the various ks values, we can see that a low ks value allows for easier deformation of the cloth,
leading to the weight of the cloth being enough to force collisions between the point masses. This results
in a lot of folds, and the end result looks like the cloth was scrunched and crumbled together. However,
looking at the simulation with a high ks value, we can see that since the weight of the cloth is not enough
to cause major deformation in the cloth's structure, the cloth's final resting state only exhibits a few
folds and looks much neater.

---

## Part 5: Shaders

```mermaid
flowchart TD
    A[Vertex shader] --> B[Fragment shader]
    B --> C[Blinn-Phong]
    B --> D[Texture mapping]
    B --> E[Bump mapping]
    B --> F[Displacement mapping]
    B --> G[Mirror shader]
```

A shader program helps us render real-time and interactive light simulations by running shaders in parallel
on the GPU, executing sections of the graphics pipeline efficiently. In this part, we worked with two basic
OpenGL shader types, vertex and fragment shaders. Vertex and fragment shaders work together to create light
and material effects by first having vertex shaders apply various geometric transformations to different
vertices and then feeding those updated vertex positions to use in the fragment shaders. In the end,
fragment shaders use various geometric attributes, including fragment attributes calculated by the vertex
shader, to decide which color should be written for use.

The Blinn-Phong shading model is a non-physics-based shading model that simulates light by accumulating 3
different lighting values: ambient, diffuse, and specular lighting. Ambient lighting is a constant baseline
lighting level that is always included in every lighting calculation. Next, the majority of the lighting
falls under diffuse lighting, which is the lighting whose value is dependent on Lambert's Cosine law along
with other factors such as the diffuse coefficient and illumination from the source. Finally, specular
lighting produces the bright lighting highlights and is dependent on viewing direction along with various
other values like the specular coefficient and illumination from the source.

Let's look at how each component in the Blinn-Phong shading model contributes to a render!

| Blinn-Phong shader outputting only the ambient component. | Blinn-Phong shader outputting only the diffuse component. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_ambient.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_diffuse.png) |

| Blinn-Phong shader outputting only the specular component. | Blinn-Phong shader outputting the entirety of the model's components. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_specular.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_bp.png) |

Now, here is a screenshot of our texture mapping shader using our own custom texture, which is our class logo!

| Sphere and cloth before collision. | Sphere and cloth after collision. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_texture1.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_texture2.png) |

Now, lets look at bump mapping and displacement mapping.

Here are screenshots of bump mapping on the cloth and on the sphere using texture_3.png (generated with Normal =
100 and Height = 0.02).

| Sphere with bump mapping. | Cloth with bump mapping. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_bumpsphere.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_bumpcloth.png) |

Here is a screenshot of displacement mapping on the sphere.

| Sphere with displacement mapping. |
| :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_displacementsphere.png) |

Bump and displacement mapping are both ways to simulate irregularities in a mesh's surface. Bump mapping
alters the normal vectors of an object so that light will reflect in a way that mimics deformation while the
overall geometry of the object stays the same. On the other hand, displacement mapping will physically alter
the geometry of an object on top of altering its normal vectors. When examining renders using bump mapping,
we can see that the sphere is still smooth and the cloth is still flat, while the rendered shading changes.
However, when we switch to displacement mapping, the grooves on both of the objects are clearly visible, with
the lighting's rendering corresponding to the disparities in the object's surface. Regarding accuracy,
displacement mapping would be more true to how light would interact with a textured surface in real life.

Now, let's change the sphere mesh's coarseness by using -o 16 -a 16 and then -o 128 -a 128 (generated with Normal
= 100 and Height = 0.02).

| Sphere using bump mapping with -o 16 -a 16. | Sphere using displacement mapping with -o 16 -a 16. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_16bump.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_16displacement.png) |

| Sphere using bump mapping with -o 128 -a 128. | Sphere using displacement mapping with -o 128 -a 128. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_128bump.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_128displacement.png) |

Here, we can see that altering the mesh's coarseness can be seen most evidently when using displacement
mapping, as not much changes in the renders using bump mapping. Comparing the two examples of displacement
mapping and their different simulated coarseness levels, we see that the render generated with -o 128 -a 128
produces a sphere with more grooves and texture, which the shader accounts for in its lighting calculation.

Here are some screenshots of our mirror shader on the cloth and on the sphere.

| Sphere with mirror shader. | Cloth with mirror shader. |
| :---: | :---: |
| ![](../../assets/cs184/cs184-cloth/projectimages/part5_mirrorsphere.png) | ![](../../assets/cs184/cs184-cloth/projectimages/part5_mirrorcloth.png) |