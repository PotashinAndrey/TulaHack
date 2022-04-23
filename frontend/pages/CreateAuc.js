import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    height: calc(100vh - 40px);
    display: block;
    position: relative;
  }
  #root {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr 96px;
    height: 100vh;
    font-family: var(--font);
  }
  slot {
    display: block;
    position: relative;

    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }
  app-bar {
    text-align: center;
  }`;

/** Раскладка {CreateAuc} @class @ui @component <create-auc />
  * description
  */
export default class CreateAuc extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <div id="root">
        Привет
        <slot></slot>
      </div>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageMain} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    return this;
  }
}

Component.init(CreateAuc, 'create-auc', { attributes, properties });
