<template>
  <div class="neus-logo-wrapper">
    <div class="neus-logo-glow" aria-hidden="true" />
    <img :src="withBase('/neuslogowhite.png')" alt="Neus UI" class="neus-logo-img" />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<style scoped>
/* Mirror VitePress .image-src positioning so the slot doesn't add height to the flow */
.neus-logo-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 192px;
}

@media (min-width: 640px) {
  .neus-logo-wrapper {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .neus-logo-wrapper {
    width: 320px;
    height: 320px;
  }
}

.neus-logo-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at 35% 40%,
    rgba(57, 117, 194, 0.55) 0%,
    rgba(200, 59, 155, 0.45) 50%,
    transparent 75%
  );
  filter: blur(28px);
  animation: neus-pulse 4s ease-in-out infinite;
  z-index: 0;
}

.neus-logo-img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  filter: drop-shadow(0 0 12px rgba(57, 117, 194, 0.4))
    drop-shadow(0 0 24px rgba(200, 59, 155, 0.25));
}

@keyframes neus-pulse {
  0%,
  100% {
    opacity: 0.85;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}
</style>
