import { html, LitElement } from 'lit-element';
import { EVENTS_NAME } from '../game/consts';
import style from './styles.scss';

const namespace = 'ui-overlay';

export class UiOverlay extends LitElement {
  private hpValue = 100;
  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.observe();
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="ui-overlay">
        <div class="hp-bar">
          <ui-progress-bar variant=${'red'} value=${this.hpValue}></ui-progress-bar>
        </div>
      </div>
    `;
  }

  private observe() {
    document.addEventListener(EVENTS_NAME.updateHp, (event) => {
      this.hpValue = (event as CustomEvent).detail;
      this.requestUpdate();
    });
  }
}

customElements.define(namespace, UiOverlay);
