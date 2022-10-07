import { html, LitElement, property } from 'lit-element';
import style from './styles.scss';

const namespace = 'ui-icon';
export type IconType =
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
export class Icon extends LitElement {
  @property({ type: String })
  icon!: IconType;

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