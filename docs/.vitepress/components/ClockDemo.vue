<template>
  <div ref="container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useData } from "vitepress";

const { isDark } = useData();
const container = ref<HTMLElement | null>(null);
let root: import("react-dom/client").Root | null = null;

let InnerComponent: import("react").ComponentType<{ colorScheme?: "light" | "dark" }> | null = null;

onMounted(async () => {
  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const mod = await import("./ClockDemoInner");
  InnerComponent = mod.ClockDemoInner as import("react").ComponentType<{ colorScheme?: "light" | "dark" }>;
  root = createRoot(container.value!);
  root.render(React.createElement(InnerComponent!, { colorScheme: isDark.value ? "dark" : "light" }));
});

watch(isDark, async (dark) => {
  if (!root || !InnerComponent) return;
  const React = await import("react");
  root.render(React.createElement(InnerComponent, { colorScheme: dark ? "dark" : "light" }));
});

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>
