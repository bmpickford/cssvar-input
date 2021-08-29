# \<cssvar-input-X>

Web Components to change your CSS variables on the fly

[### Demo](https://bmpickford.github.io/cssvar-input/)

### Use Cases
 * Generators (e.g. Background generator)
 * User themeing

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i cssvar-input
```

## Usage

#### Numeric Input
Input with numeric value, followed by unit of measurement. e.g. 4px
```html
<script type="module">import 'cssvar-input/cssvar-input-measurement.js';</script>
<cssvar-input-measurement propertyName="CSS_VAR_NAME"></cssvar-input-measurement>
```

#### Color Input
Color based input. Accepts valid CSS colors
```html
<script type="module">import 'cssvar-input/cssvar-input-color.js';</script>
<cssvar-input-color propertyName="CSS_VAR_NAME"></cssvar-input-color>
```

### Theming
Possible theme values
```css
{
  /* Color of label and focus highlight on input fields */
  --theme-color: rgb(49, 130, 206);

  /* Themeing of the input elements */
  --border-color: #E2E8F0;
  --border-radius: 6px;
  --input-padding: 6px;
}
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
