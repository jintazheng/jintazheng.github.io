---
title: "FoVolNet: Fast Volume Rendering using Foveated Deep Neural Networks"
venue: "IEEE Visualization Conference (VIS)"
award: "Best Paper Honorable Mentions"
authors: "David Bauer, Qi Wu, and Kwan-Liu Ma"
permalink: "/publication/vis2022-fovonet"
preprint_url: "https://drive.google.com/file/d/1-H7rtC_VH88oNp10kKSCacFE3IU2VCjj/view?usp=sharing"
official_url: "https://doi.org/10.1109/TVCG.2022.3209498"
arxiv_url: "https://arxiv.org/abs/2209.09965"
preview: "pubs/vis2022-fovolnet.png"
teaser: "pubs/vis2022-fovolnet-teaser.png"
teaser_caption: "Figure 1: We propose a novel rendering pipeline for fast volume rendering using optimized foveated sparse rendering and deep neural reconstruction networks. FoVolNet can faithfully reconstruct visual information from sparse inputs. With FoVolNet, developers are able to significantly improve rendering time without sacrificing visual quality."
bibtex: "@article{bauer2022fovolnet,\n    author = {D. Bauer and Q. Wu and K. Ma},\n    journal = {IEEE Transactions on Visualization &amp; Computer Graphics},\n    title = {FoVolNet: Fast Volume Rendering using Foveated Deep Neural Networks},\n    year = {2023},\n    volume = {29},\n    number = {01},\n    issn = {1941-0506},\n    pages = {515-525},\n    doi = {10.1109/TVCG.2022.3209498},\n    publisher = {IEEE Computer Society},\n    address = {Los Alamitos, CA, USA},\n    month = {jan}\n}"
date: 2022-09-26
collection: "publications"
---
<!-- 
<figure>
<img src="/images/pubs/vis2022-fovolnet-teaser.png" alt="image">
<figcaption align = "center">Figure 1: We propose a novel rendering pipeline for fast volume rendering using optimized foveated sparse rendering and deep neural reconstruction networks. FoVolNet can faithfully reconstruct visual information from sparse inputs. With FoVolNet, developers are able to significantly improve rendering time without sacrificing visual quality.</figcaption>
</figure> -->


### Abstract

Volume data is found in many important scientific and engineering applications. Rendering this data for visualization at high quality and interactive rates for demanding applications such as virtual reality is still not easily achievable even using professional-grade hardware. We introduce FoVolNet—a method to significantly increase the performance of volume data visualization. We develop a cost-effective foveated rendering pipeline that sparsely samples a volume around a focal point and reconstructs the full-frame using a deep neural network. Foveated rendering is a technique that prioritizes rendering computations around the user’s focal point. This approach leverages properties of the human visual system, thereby saving computational resources when rendering data in the periphery of the user’s field of vision. Our reconstruction network combines direct and kernel prediction methods to produce fast, stable, and perceptually convincing output. With a slim design and the use of quantization, our method outperforms state-of-the-art neural reconstruction techniques in both end-to-end frame times and visual quality. We conduct extensive evaluations of the system’s rendering performance, inference speed, and perceptual properties, and we provide comparisons to competing neural image reconstruction techniques. Our test results show that FoVolNet consistently achieves significant time saving over conventional rendering while preserving perceptual quality.

