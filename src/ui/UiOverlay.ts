import { html, LitElement } from 'lit-element';
import { EVENTS_NAME } from '../game/consts';
import style from './styles.scss';

const namespace = 'ui-overlay';

export class UiOverlay extends LitElement {
  private hpValue = 100;
  private staminaValue = 100;
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
        <div class="status-bars">
          <ui-progress-bar variant=${'red'} value=${this.hpValue}></ui-progress-bar>
          <ui-progress-bar variant=${'green'} value=${this.staminaValue}></ui-progress-bar>
        </div>
        <div class="equipment">
          <ui-container variant="framed">hello</ui-container>
        </div>
      </div>
    `;
  }

  private observe() {
    document.addEventListener(EVENTS_NAME.updateHp, (event) => {
      this.hpValue = (event as CustomEvent).detail;
      this.requestUpdate();
    });
    document.addEventListener(EVENTS_NAME.updateStamina, (event) => {
      this.staminaValue = (event as CustomEvent).detail;
      this.requestUpdate();
    });
  }
}

customElements.define(namespace, UiOverlay);
