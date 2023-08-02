<figure>
<img src="/images/pubs/Siga2020/representative.jpg" alt="image">
<figcaption align = "center">Fig. 1. Our method renders a decorative sound texture of a city street during a rainstorm. The images (top row) show the virtual scene from the listener’s perspective over an eight second time period. The plots (bottom row) show the corresponding color-coded waveform of the rendered decorative sound texture
in the left and right ears. Raindrops hitting the road (blue) is the background texture, raindrops hitting the umbrella (dark green) is the first foreground sound,
and birds chirping (light green) is the second foreground sound. All the foreground sounds and background textures were extracted from recordings at Font
et al. [2013]. The intensity of the background texture increases throughout the eight seconds, as intended by the scene designer. Additionally, the event
frequency of the foreground sounds increases over time, which is also controlled by our methods. This scene is built in CARLA [Dosovitskiy et al. 2017].</figcaption>
</figure


### Abstract

Audio recordings contain rich information about sound sources and their properties such as the location, loudness, and frequency of events. One prevalent component in sound recordings is the sound texture, which contains a massive number of events. In such a texture, there can be some distinct and repeated sounds that we term as a foreground sound. Birds chirping in the wind is one such decorative sound texture with the chirping as a foreground sound and the wind as a background texture. To render these decorative sound textures in real-time and with high quality, we create twolayer Markov Models to enable smooth transitions from sound grain to sound grain and propose a hierarchical scheme to generate Head-Related Transfer Function filters for localization cues of sounds represented as area/volume sources. Moreover, during the synthesis stage, we provide control over the frequency and intensity of sounds for customization. Lastly, foreground sounds are often blended into background textures such as the sound of rain splats on car surfaces becoming submerged in the background rain. We develop an extraction component that outperforms existing learning-based methods to facilitate our synthesis with perceptible foreground sounds and well-defined textures.

### Video

<p>
<iframe src="https://drive.google.com/file/d/17wSgIm_VsoeGhfyZwMpOnCYy2Mj3ydGv/preview" width="960" height="540" allow="autoplay"></iframe>
</p>
