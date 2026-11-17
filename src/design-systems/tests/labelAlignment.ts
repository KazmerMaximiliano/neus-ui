/** Pixels from a control's center to the middle of its label's x-height (positive: the text sits lower). */
export const xHeightOffset = (label: HTMLElement, control: HTMLElement) => {
  const marker = document.createElement("span");
  marker.style.cssText = "display: inline-block; width: 0; height: 0; vertical-align: baseline";
  label.prepend(marker);
  const baseline = marker.getBoundingClientRect().bottom;
  marker.remove();
  const { fontStyle, fontWeight, fontSize, fontFamily } = getComputedStyle(label);
  const context = document.createElement("canvas").getContext("2d")!;
  context.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } = context.measureText("x");
  const box = control.getBoundingClientRect();
  return baseline - (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 - (box.top + box.height / 2);
};
