import Component, { html, css } from '../class/Component.js';
// import AppButton from '../components/app-button.js';
// import $ from '../class/DOM.js';
// import locator from '../script/locator.js';
import api from "../script/api.js";

const attributes = {};
const properties = {};

const style = css`
  :host {
    height: calc(100vh);
    display: block;
    position: relative;
  }
  #root {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  slot {
    display: block;
    position: relative;

    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }`;

/** Раскладка {BuiltIn} @class @ui @component <built-in-page/>
 * description
 */
export default class BuiltIn extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <div id="root">
        <div width="33%" height="100%" id="img-0">0</div>
        <div width="33%" height="100%" id="img-1">1</div>
        <div width="33%" height="100%" id="img-2">2</div>
      </div>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
   * @param {ShadowRoot} node корневой узел элемента
   * @return {PageMain} #this текущий компонент
   */
  async mount(node) {
    super.mount(node, attributes, properties);

      console.log("resStarted");
      const res = await api("auction.get");
    console.log("res", res);

    for (let i = 0; i < 3; i++) {
      console.log(node.getElementById(`img-${i}`));
      node.getElementById(`img-${i}`).addEventListener("click", () => {
        console.log(window, document, res[i].id);
        // openAuc(HOST + PATH['create-bid'] + `?id=${lots[i].id}`);
    });    
    }
    
    return this;
  }
}

Component.init(BuiltIn, 'built-in-page', {
  attributes,
  properties
});

