# SCSS `responsive-value` Function

The SCSS function `responsive-value` is created to facilitate working with responsive CSS property values without using media queries.

## Usage

```scss
.element {
  font-size: responsive-value(2, 1, 48, 23.4375, "fixed-both", "rem");
  margin-bottom: responsive-value(20, 10, 48, 23.4375, "fixed-end-value", "px");
  margin-bottom: responsive-value(30, 15, 90, 17.5);
}
```

## Parameters

- `$start-value` (number): The initial value of the property. Only accepts numeric values without units. Must not be equal to `$end-value`.
- `$end-value` (number): The final value of the property. Only accepts numeric values without units. Must not be equal to `$start-value`.
- `$start-breakpoint` (number): The initial breakpoint. At this breakpoint, the property value will be equal to `$start-value`. Only accepts positive numeric values without units. Must not be less than or equal to `$end-breakpoint`.
- `$end-breakpoint` (number): The final breakpoint. At this breakpoint, the property value will be equal to `$end-value`. Only accepts positive numeric values or `0` (zero) without units. Must not be greater than or equal to `$start-breakpoint`.
- `$behavior` (string, optional): Accepts 4 values:
  - `"not-fixed"`: The `$start-value` and `$end-value` properties are not fixed before and after breakpoints.
  - `"fixed-both"`: The `$start-value` and `$end-value` properties are strictly fixed before and after breakpoints.
  - `"fixed-start-value"`: At this value, `$start-value` is strictly fixed before `$start-breakpoint`. Default value.
  - `"fixed-end-value"`: At this value, `$end-value` is strictly fixed after `$end-breakpoint`.
- `$unit` (string, optional): CSS unit for numeric values. Default is `"px"`. When changing the unit, `$start-value`, `$end-value`, `$start-breakpoint`, and `$end-breakpoint` should be written in the format of the specified unit.

## Return

- One of the CSS mathematical functions: `min()`, `max()`, `clamp()`.

## Throws

- If `$start-value`, `$end-value`, `$start-breakpoint`, or `$end-breakpoint` are not numeric or have units.
- If `$start-value` and `$end-value` are equal.
- If `$start-breakpoint` is less than or equal to zero.
- If `$end-breakpoint` is a negative number.
- If `$start-breakpoint` is less than `$end-breakpoint`.
- If `$start-breakpoint` is equal to `$end-breakpoint`.
- If the value of `$behavior` is incorrect.
