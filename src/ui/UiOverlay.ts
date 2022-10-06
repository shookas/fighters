import { html, LitElement } from 'lit-element';
import { EVENTS_NAME } from '../game/consts';
import style from './styles.scss';

const namespace = 'ui-overlay';

export class UiOverlay extends LitElement {
  private hpValue = 100;
  private staminaValue = 100;
  private goldAmount = 0;
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
          <ui-container variant="framed">
            <ui-icon icon="sword"></ui-icon>
            <ui-icon icon="shield-slot"></ui-icon>
            <ui-icon icon="potion-slot"></ui-icon>
            <ui-icon icon="potion-slot"></ui-icon>
          </ui-container>
        </div>
        <div class="toolbar">
          <ui-container variant="framed-golden">
            <ui-icon icon="gold"></ui-icon>
            ${this.goldAmount}
            <ui-icon icon="hammer"></ui-icon>
          </ui-container>
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
    document.addEventListener(EVENTS_NAME.chestLoot, (event) => {
      this.goldAmount = (event as CustomEvent).detail;
      this.requestUpdate();
    });
  }
}

customElements.define(namespace, UiOverlay);
