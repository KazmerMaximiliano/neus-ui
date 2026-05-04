<template>
  <div ref="container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useData } from "vitepress";

const props = defineProps<{
  component: string;
}>();

const { isDark } = useData();
const container = ref<HTMLElement | null>(null);
let root: import("react-dom/client").Root | null = null;
let currentModule: Record<string, unknown> | null = null;

async function mount(dark: boolean) {
  if (!container.value) return;

  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const mod = await import(/* @vite-ignore */ `./${props.component}DemoInner`);
  currentModule = mod;

  const InnerComponent = mod[`${props.component}DemoInner`] as React.ComponentType<{ colorScheme?: "light" | "dark" }>;

  if (!root) {
    root = createRoot(container.value);
  }

  root.render(
    React.createElement(InnerComponent, { colorScheme: dark ? "dark" : "light" })
  );
}

onMounted(() => mount(isDark.value));

watch(isDark, (dark) => {
  if (!root || !currentModule) return;
  const React_sync = (currentModule as Record<string, unknown>);
  const InnerComponent = React_sync[`${props.component}DemoInner`] as import("react").ComponentType<{ colorScheme?: "light" | "dark" }>;

  import("react").then((React) => {
    root?.render(
      React.createElement(InnerComponent, { colorScheme: dark ? "dark" : "light" })
    );
  });
});

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>
