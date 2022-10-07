import { html, LitElement } from 'lit-element';
import { PoitionConfig } from 'src/game/poition/Poition';
import { EVENTS_NAME } from '../game/consts';
import style from './styles.scss';

const namespace = 'ui-overlay';

export class UiOverlay extends LitElement {
  private hpValue = 100;
  private staminaValue = 100;
  private goldAmount = 0;
  private poitions: { hpPoitions: PoitionConfig[]; staminaPoitions: PoitionConfig[] } = {
    hpPoitions: [],
    staminaPoitions: [],
  };
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
            ${this.renderPoitions()}
          </ui-container>
        </div>
        <div class="toolbar">
          <ui-container variant="framed-golden">
            <ui-icon-with-counter icon="gold" value="${this.goldAmount}"></ui-icon-with-counter>
            <ui-icon icon="hammer"></ui-icon>
          </ui-container>
        </div>
      </div>
    `;
  }

  private renderPoitions() {
    const hpPoitions = this.poitions.hpPoitions;
    const staminaPoitions = this.poitions.staminaPoitions;
    return html`
      <ui-icon-with-counter
        icon="${hpPoitions.length ? 'potion-red' : 'potion-slot'}"
        value="${hpPoitions.length}"
      ></ui-icon-with-counter>
      <ui-icon-with-counter
        icon="${staminaPoitions.length ? 'potion-green' : 'potion-slot'}"
        value="${staminaPoitions.length}"
      ></ui-icon-with-counter>
    `;
  }

  private observe() {
    document.addEventListener(EVENTS_NAME.updateHp, (event) => {
      this.hpValue = (event as CustomEvent<number>).detail;
      this.requestUpdate();
    });
    document.addEventListener(EVENTS_NAME.updateStamina, (event) => {
      this.staminaValue = (event as CustomEvent<number>).detail;
      this.requestUpdate();
    });
    document.addEventListener(EVENTS_NAME.chestLoot, (event) => {
      this.goldAmount = (event as CustomEvent<number>).detail;
      this.requestUpdate();
    });
    document.addEventListener(EVENTS_NAME.getPoition, (event) => {
      this.poitions = (event as CustomEvent).detail;
      this.requestUpdate();
    });
  }
}

customElements.define(namespace, UiOverlay);
