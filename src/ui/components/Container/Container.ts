import { html, LitElement, property } from 'lit-element';
import style from './styles.scss';

const namespace = 'ui-container';
export class Container extends LitElement {
  @property({ type: String })
  variant: 'framed' | 'framed-golden' | 'framed-golden-2' | 'framed-grey' = 'framed';

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="${namespace}">
        <div class="ui-container ${this.variant}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define(namespace, Container);
