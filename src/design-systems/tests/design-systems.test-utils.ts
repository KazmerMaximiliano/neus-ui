export const resolveColor = (element: HTMLElement, token: string) => {
  const probe = document.createElement("span");
  probe.style.color = `var(${token})`;
  element.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
};

const channels = (color: string) => {
  const [r, g, b, a = 1] = color.match(/[\d.]+/g)!.map(Number);
  const scale = color.startsWith("color(") ? 255 : 1;
  return { r: r * scale, g: g * scale, b: b * scale, a };
};

const luminance = (color: string) => {
  const { r, g, b } = channels(color);
  const [lr, lg, lb] = [r, g, b].map((value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

export const flatten = (color: string, backdrop: string) => {
  const top = channels(color);
  const bottom = channels(backdrop);
  const mix = (a: number, b: number) => Math.round(a * top.a + b * (1 - top.a));
  return `rgb(${mix(top.r, bottom.r)}, ${mix(top.g, bottom.g)}, ${mix(top.b, bottom.b)})`;
};

export const contrastRatio = (foreground: string, background: string) => {
  const [high, low] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (high + 0.05) / (low + 0.05);
};
