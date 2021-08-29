import { html, css, LitElement } from 'lit';

const isValidColor = color => {
  const ele = document.createElement('div');
  ele.style.color = color;
  const c = ele.style.color.replace(/\s+/, '').toLowerCase();
  ele.remove();

  return c !== '';
};

/**
 * @element cssvar-color
 *
 * @attr {String} propertyName Name of the property to update. e.g. '--theme-dark-1'
 */
export class CSSVarColor extends LitElement {
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
      input {
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
      input:focus {
        border-color: var(--theme-color);
        box-shadow: var(--theme-color) 0px 0px 0px 1px;
      }
    `;
  }

  static get properties() {
    return {
      propertyName: { type: String },
      color: { attrribute: false },
    };
  }

  willUpdate() {
    super.willUpdate();
    if (!this.color) return;
    if (!isValidColor(this.color))
      throw new Error(`Color ${this.color.toLowerCase()} is not valid`);

    this._setVar();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.propertyName) throw new Error('propertyName should be defined');
    if (this.propertyName.slice(0, 2) !== '--')
      throw new Error('css variable should start with "--"');
  }

  render() {
    return html`
      <label for="css-var-color__${this.propertyName}"
        >${this.propertyName}</label
      >
      <div>
        <input
          id="css-var-color__${this.propertyName}"
          @blur=${this._colorchanged}
        />
      </div>
    `;
  }

  _colorchanged(e) {
    this.color = e.target.value;
  }

  _setVar() {
    const root = document.documentElement;
    root.style.setProperty(this.propertyName, `${this.color}`);
  }
}

window.customElements.define('cssvar-color', CSSVarColor);
