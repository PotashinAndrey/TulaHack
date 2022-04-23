import Component, { html, css } from '../class/Component.js';
import AppButton from '../components/app-button.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

const attributes = {};
const properties = {};

const data = {
  name: "Грязный носок",
  description: "Мой старый грязный носок, побывал на всех континентах мира на моей ноге, отдам раритет в добрые ноги! Цена сдельная, запах отменный.",
  // img: "../../extension/logo.png",
  img: "../imgs/sock.jpeg",
  firstBet: 100
};

const style = css`
  :host {
    height: calc(100vh - 40px);
    display: block;
    position: relative;
  }
  #root {
    height: 100vh;
    font-family: var(--font);
  }

  #name {
    margin: 50px;
  }

  #description {
    margin: 50px;
  }

  #img {
    margin: 20px 50px;
  }

  #first-price {
    margin: 20px 50px;
    font-size: 24px;
  }

  #betBtn {
    background: #c722b6;
    border: none;
    padding: 10px;
    font-size: 20px;
    color: white;
    margin-left: 15px;
    cursor: pointer;
  }

  #bet {
    outline: none;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
  }

  .do-lot {
    margin: 20px 50px;
  }

  }
  slot {
    display: block;
    position: relative;

    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }`;

/** Раскладка {Lot} @class @ui @component <lot-auc />
  * description
  */
export default class Lot extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <div id="root">
        <h1 id="name">Название</h1>
        <img id="img" src="../../extension/logo.png" />
        <p id="description">Описание</p>
        <div id="first-price"></div>
        <div class="do-lot">
          <input id="bet" placeholder="Ваша ставка..." />
          <button id="betBtn">Сделать Ставку</button>
        </div>
      </div>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageMain} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    node.getElementById("name").innerText = data.name;
    node.getElementById("description").innerText = data.description;
    const img = node.getElementById("img");
    img.src = data.src;
    img.alt = data.name;
    node.getElementById("first-price").innerText = `Начальная ставка: ${data.firstBet} руб.`;
    
    return this;
  }
}

Component.init(Lot, 'lot-auc', { attributes, properties });
