---
title: "Real-time rendering of decorative sound textures for soundscapes"
venue: "SIGGRAPH Asia (ACM Transactions on Graphics)"
award: ""
authors: "Jinta Zheng, Shih-Hsuan Hung, Kyle Hiebel, Yue Zhang"
permalink: "/publication/xx"
preprint_url: ""
official_url: "https://dl.acm.org/doi/pdf/10.1145/3414685.3417875"
arxiv_url: ""
preview: "pubs/Siga2020/representative.jpg"
teaser: "pubs/Siga2020/representative.jpg"
teaser_caption: "."
bibtex: "@article{zheng2020real,
  title={Real-time rendering of decorative sound textures for soundscapes},
  author={Zheng, Jinta and Hung, Shih-Hsuan and Hiebel, Kyle and Zhang, Yue},
  journal={ACM Transactions on Graphics (TOG)},
  volume={39},
  number={6},
  pages={1--12},
  year={2020},
  publisher={ACM New York, NY, USA}
}"
date: 2020-11-27
collection: "publications"
---
<!-- 
<figure>
<img src="/images/pubs/Siga2020/representative.jpg" alt="image">
<figcaption align = "center">Fig. 1. Our method renders a decorative sound texture of a city street during a rainstorm. The images (top row) show the virtual scene from the listener’s perspective over an eight second time period. The plots (bottom row) show the corresponding color-coded waveform of the rendered decorative sound texture
in the left and right ears. Raindrops hitting the road (blue) is the background texture, raindrops hitting the umbrella (dark green) is the first foreground sound,
and birds chirping (light green) is the second foreground sound. All the foreground sounds and background textures were extracted from recordings at Font
et al. [2013]. The intensity of the background texture increases throughout the eight seconds, as intended by the scene designer. Additionally, the event
frequency of the foreground sounds increases over time, which is also controlled by our methods. This scene is built in CARLA [Dosovitskiy et al. 2017].</figcaption>
</figure> -->


### Abstract

Audio recordings contain rich information about sound sources and their properties such as the location, loudness, and frequency of events. One prevalent component in sound recordings is the sound texture, which contains a massive number of events. In such a texture, there can be some distinct and repeated sounds that we term as a foreground sound. Birds chirping in the wind is one such decorative sound texture with the chirping as a foreground sound and the wind as a background texture. To render these decorative sound textures in real-time and with high quality, we create twolayer Markov Models to enable smooth transitions from sound grain to sound grain and propose a hierarchical scheme to generate Head-Related Transfer Function filters for localization cues of sounds represented as area/volume sources. Moreover, during the synthesis stage, we provide control over the frequency and intensity of sounds for customization. Lastly, foreground sounds are often blended into background textures such as the sound of rain splats on car surfaces becoming submerged in the background rain. We develop an extraction component that outperforms existing learning-based methods to facilitate our synthesis with perceptible foreground sounds and well-defined textures.
