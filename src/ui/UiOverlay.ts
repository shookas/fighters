import { html, LitElement } from 'lit-element';
import { loosePoition } from '../store/actions';
import { PoitionConfig } from '../game/poition/Poition';
import { createStore } from '../store';
import { Store } from '../store/createStore';
import { State } from '../store/reducer';
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
  private store: Store;
  constructor() {
    super();
    this.store = createStore();
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
        class="${hpPoitions.length ? 'interactive' : 'not-clickable'}"
        @click=${() => this.handleDrinkPoition(hpPoitions[0])}
        icon="${hpPoitions.length ? 'potion-red' : 'potion-slot'}"
        value="${hpPoitions.length}"
      ></ui-icon-with-counter>
      <ui-icon-with-counter
        class="${staminaPoitions.length ? 'interactive' : 'not-clickable'}"
        @click=${() => this.handleDrinkPoition(staminaPoitions[0])}
        icon="${staminaPoitions.length ? 'potion-green' : 'potion-slot'}"
        value="${staminaPoitions.length}"
      ></ui-icon-with-counter>
    `;
  }

  private handleDrinkPoition(poition: PoitionConfig) {
    this.store.dispatch(loosePoition(poition));
  }

  private observe() {
    this.store.subscribe((state: State) => {
      console.log('state changed', state);
      this.poitions.hpPoitions = state.hpPoitions;
      this.poitions.staminaPoitions = state.staminaPoitions;
      this.goldAmount = state.gold;
      this.hpValue = state.hp;
      this.staminaValue = state.stamina;
      this.requestUpdate();
    });
  }
}

customElements.define(namespace, UiOverlay);
