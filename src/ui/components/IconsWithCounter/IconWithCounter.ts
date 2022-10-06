import { html, LitElement, property } from 'lit-element';
import { IconType } from '../Icons/Icon';
import style from './styles.scss';

const namespace = 'ui-icon-with-counter';

export class IconWithCounter extends LitElement {
  @property({ type: String })
  icon!: IconType;
  @property({ type: String })
  value!: string;

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class=${namespace}>
        <div class="counter">${this.value}</div>
        <ui-icon icon=${this.icon}></ui-icon>
      </div>
    `;
  }
}

customElements.define(namespace, IconWithCounter);
