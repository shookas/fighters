import { html, LitElement, property } from 'lit-element';
import style from './styles.scss';

const namespace = 'ui-progress-bar';

export class ProgressBar extends LitElement {
  @property({ type: Number })
  value!: number;

  @property({ type: String })
  variant: 'red' | 'green' | 'blue' = 'red';

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="${namespace}">
        <div data-value="0.4" class="ui-progress red">
          <div class="ui-progress__track">
            <div class="ui-progress__fill ${this.variant}" style="left: 0px; width: ${this.value}%;"></div>
          </div>
          <div class="ui-progress__left-edge"></div>
          <div class="ui-progress__right-edge"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(namespace, ProgressBar);
