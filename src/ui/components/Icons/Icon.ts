import { html, LitElement, property } from 'lit-element';
import style from './styles.scss';

const namespace = 'ui-icon';

export class Icon extends LitElement {
  @property({ type: String })
  icon!:
    | 'sword'
    | 'shield'
    | 'exclamation'
    | 'gold'
    | 'hammer'
    | 'potion-red'
    | 'potion-green'
    | 'potion-blue'
    | 'weapon-slot'
    | 'shield-slot'
    | 'armor-slot'
    | 'helmet-slot'
    | 'potion-slot'
    | 'magic-slot'
    | 'ring-slot'
    | 'shoes-slot'
    | 'empty-slot';

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="${namespace} ${this.icon}"></div>
    `;
  }
}

customElements.define(namespace, Icon);
