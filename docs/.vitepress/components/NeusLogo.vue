<template>
  <div class="neus-logo-wrapper">
    <div class="neus-logo-glow" aria-hidden="true" />
    <img src="/neuslogo.png" alt="Neus UI" class="neus-logo-img" />
  </div>
</template>

<style scoped>
.neus-logo-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
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
  width: 250px;
  height: 250px;
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
