import { html, LitElement } from 'lit-element';

const namespace = 'ui-overlay';

export class UiOverlay extends LitElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.observe();
  }

  render() {
    return html`
      <style></style>
      <div class="ui-overlay">
        <ui-progress-bar variant=${'red'} value=${0.4}></ui-progress-bar>
      </div>
    `;
  }

  private observe() {
    document.addEventListener('', (event) => {
        
    })
  }
}

customElements.define(namespace, UiOverlay);
