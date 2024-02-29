const { forms, body } = document;
/** @type {{"generator-form": HTMLFormElement}} */
const { "generator-form": form } = forms;
/** @type {{
 *    "start-value": HTMLInputElement;
 *    "end-value": HTMLInputElement;
 *    "start-breakpoint": HTMLInputElement;
 *    "end-breakpoint": HTMLInputElement;
 *    behavior: HTMLSelectElement;
 *    unit: HTMLSelectElement;
 * }}
 */
const {
  "start-value": startValue,
  "end-value": endValue,
  "start-breakpoint": startBreakpoint,
  "end-breakpoint": endBreakpoint,
  behavior,
  unit,
  elements
} = form;
/** @returns {string} */
const generate = () => {
  const startValueWithUnit = startValue.value + unit.value;
  const endValueWithUnit = endValue.value + unit.value;
  const endBreakpointWithUnit = endBreakpoint.value + unit.value;
  const valueDifference = startValue.value - endValue.value;
  const breakpointDifference = startBreakpoint.value - endBreakpoint.value;
  const calc = `${endValueWithUnit} + ${valueDifference} * ((100vw - ${endBreakpointWithUnit}) / ${breakpointDifference})`;

  let value;

  switch (behavior.value) {
    case "not-fixed":
      value = `calc(${calc})`;
      break;
    case "fixed-both":
      if (+startValue.value > +endValue.value) {
        value = `clamp(${endValueWithUnit}, ${calc}, ${startValueWithUnit})`;
      } else if (+startValue.value < +endValue.value) {
        value = `min(${endValueWithUnit}, max(${calc}, ${startValueWithUnit}))`;
      }
      break;
    case "fixed-start-value":
      if (+startValue.value > +endValue.value) {
        value = `min(${startValueWithUnit}, ${calc})`;
      } else if (+startValue.value < +endValue.value) {
        value = `max(${startValueWithUnit}, ${calc})`;
      }
      break;
    case "fixed-end-value":
      if (+startValue.value > +endValue.value) {
        value = `max(${endValueWithUnit}, ${calc})`;
      } else if (+startValue.value < +endValue.value) {
        value = `min(${endValueWithUnit}, ${calc})`;
      }
      break;
  }

  return value;
};
/** @type {HTMLElement} */
const outputCode = document.querySelector(".output__code span");
/** @type {HTMLDivElement} */
const infoWidth = document.querySelector("[data-info=\"width\"]");
/** @type {HTMLDivElement} */
const infoFontSize = document.querySelector("[data-info=\"font-size\"]");
/** @type {HTMLParagraphElement} */
const demoText = document.querySelector(".demo__text");
const setInfo = () => {
  infoWidth.innerText = innerWidth + "px";
  infoFontSize.innerText = getComputedStyle(demoText).fontSize;
};

const bodyResizeObserver = new ResizeObserver(entries => {
  entries.forEach(() => {
    setInfo();
  });
});

bodyResizeObserver.observe(body);

[...elements].forEach(
  /** @param {HTMLInputElement | HTMLSelectElement} element */
  element => {
    element.addEventListener("change", () => {
      const value = generate();

      outputCode.innerText = value;
      demoText.style.setProperty("--demo-font-size", value);
      setInfo();
    });
  });
