---
title: "Real-time Rendering of Decorative Sound Textures for Soundscapes"
venue: "ACM Transactions on Graphics (SIGGRAPH Asia)"
authors: "Jinta Zheng, Shih-Hsuan Hung, Kyle Hiebel, Yue Zhang"
abstract: "Audio recordings contain rich information about sound sources and their properties such as the location, loudness, and frequency of events. One prevalent component in sound recordings is the sound texture, which contains a massive number of events. In such a texture, there can be some distinct and repeated sounds that we term as a foreground sound. Birds chirping in the wind is one such decorative sound texture with the chirping as a foreground sound and the wind as a background texture. To render these decorative sound textures in real-time and with high quality, we create twolayer Markov Models to enable smooth transitions from sound grain to sound grain and propose a hierarchical scheme to generate Head-Related Transfer Function filters for localization cues of sounds represented as area/volume sources. Moreover, during the synthesis stage, we provide control over the."
preprint_url: "https://dl.acm.org/doi/pdf/10.1145/3414685.3417875"
official_url: "https://dl.acm.org/doi/abs/10.1145/3414685.3417875"
preview: "pubs/siga2020.png"
teaser: "pubs/siga2020.png"
teaser_caption: "Fig. 1. Our method renders a decorative sound texture of a city street during a rainstorm. The images (top row) show the virtual scene from the listener’s perspective over an eight second time period. The plots (bottom row) show the corresponding color-coded waveform of the rendered decorative sound texture in the left and right ears. Raindrops hitting the road (blue) is the background texture, raindrops hitting the umbrella (dark green) is the first foreground sound, and birds chirping (light green) is the second foreground sound. All the foreground sounds and background textures were extracted from recordings at Font et al. [2013]. The intensity of the background texture increases throughout the eight seconds, as intended by the scene designer. Additionally, the event frequency of the foreground sounds increases over time, which is also controlled by our methods. This scene is built in CARLA (Dosovitskiy et al. 2017)."
bibtex: "@article{zheng2020real,\n    title={Real-time rendering of decorative sound textures for soundscapes},\n    author={Zheng, Jinta and Hung, Shih-Hsuan and Hiebel, Kyle and Zhang, Yue},\n    journal={ACM Transactions on Graphics (TOG)},\n    volume={39},\n    number={6},\n    pages={1--12},\n    year={2020},\n    publisher={ACM New York, NY, USA}\n}"
permalink: "/publication/Siga2020-decoractive_sound"
code: "https://github.com/jintazheng/SoundSources.git"
date: 2020-11-27
collection: "publications"
---

### Fast-forward video

<iframe width="560" height="315" src="https://www.youtube.com/embed/9FOURP3NocQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Short video

<iframe width="560" height="315" src="https://www.youtube.com/embed/2SwOGqGEPSQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
