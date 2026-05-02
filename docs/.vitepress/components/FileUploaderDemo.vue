<template>
  <div ref="container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const container = ref<HTMLElement | null>(null);
let root: import("react-dom/client").Root | null = null;

onMounted(async () => {
  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const { FileUploaderDemoInner } = await import("./FileUploaderDemoInner");

  root = createRoot(container.value!);
  root.render(React.createElement(FileUploaderDemoInner));
});

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>
