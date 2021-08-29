import { html, css, LitElement } from 'lit';

// Commented rarely used units
const lengthUnits = [
  // absolute
  // "cm",
  // "mm",
  // "Q",
  // "in",
  // "pc",
  'pt',
  'px',
  // relative
  'em',
  // "ex",
  // "ch",
  'rem',
  // "lh",
  'vw',
  'vh',
  // "vmin",
  // "vmax",
  '%',
];

/**
 * @element cssvar-numeric
 *
 * @attr {String} propertyName Name of the property to update. e.g. '--sidebar-width'
 */
export class CSSVarNumeric extends LitElement {
  static get styles() {
    return css`
      :host {
        --theme-color: rgb(49, 130, 206);
        --border-color: #e2e8f0;
        --border-radius: 6px;
        --input-padding: 6px;

        display: block;
      }
      label {
        color: var(--theme-color);
      }
      input,
      select {
        padding: var(--input-padding);
        border-width: 1px;
        border-radius: var(--border-radius);
        border-style: solid;
        border-color: var(--border-color);
        outline: transparent solid 2px;
        appearance: none;
        background-color: transparent;
        transition-property: border-color;
        transition-duration: 200ms;
      }
      input:focus,
      select:focus {
        border-color: var(--theme-color);
        box-shadow: var(--theme-color) 0px 0px 0px 1px;
      }
    `;
  }

  static get properties() {
    return {
      propertyName: { type: String },
      unitValue: { attrribute: false },
      unitMeasurement: { attrribute: false },
    };
  }

  constructor() {
    super();
    this.unitType = 'unit';
    this.unitMeasurement = 'px';
  }

  willUpdate() {
    super.willUpdate();
    if (this.unitValue && this.unitMeasurement) this._setVar();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.propertyName) throw new Error('propertyName should be defined');
    if (this.propertyName.slice(0, 2) !== '--')
      throw new Error('css variable should start with "--"');
  }

  render() {
    return html`
      <label for="css-var__${this.propertyName}">${this.propertyName}</label>
      <div class="input-group">
        <input
          id="css-var__${this.propertyName}"
          type="number"
          @change=${this._unitchanged}
        />
        <select @blur=${this._unitMeasurementChanged}>
          ${lengthUnits.map(
            u => html`
              <option value=${u} ?selected=${u === this.unitMeasurement}>
                ${u}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }

  _unitchanged(e) {
    this.unitValue = e.target.value;
  }

  _unitMeasurementChanged(e) {
    this.unitMeasurement = e.target.value;
  }

  _setVar() {
    const root = document.documentElement;
    root.style.setProperty(
      this.propertyName,
      `${this.unitValue}${this.unitMeasurement}`
    );
  }
}

window.customElements.define('cssvar-numeric', CSSVarNumeric);
