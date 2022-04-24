import Component, { html, css } from '../class/Component.js';
import AppButton from '../components/app-button.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';
import api from "../script/api.js";

const attributes = {};
const properties = {};

const data = {
  name: "Грязный носок",
  description: "Мой старый грязный носок, побывал на всех континентах мира на моей ноге, отдам раритет в добрые ноги! Цена сдельная, запах отменный.",
  // img: "../../extension/logo.png",
  src: "./imgs/sock.jpeg",
  firstBet: 100,
  end: new Date(Date.now() + 100 * 1000)
};

function getRemainedTime(time) {
  const remain = time - Date.now();

  if (remain < 1000) {
    return "00:00:00";
  }

  const formatedRemainedTime = Math.ceil(remain / 1000);

  const hours = Math.floor(formatedRemainedTime / 3600);
  const minutes = Math.floor((formatedRemainedTime % 3600) / 60);
  const seconds = formatedRemainedTime % 60;

  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function timerFunc(node, data) {
  const time = data.end;

  if (!node || !node.getElementById("timer")) return;

  node.getElementById("timer").innerText = `Времени до конца: ${getRemainedTime(time)}`;

  if (time - Date.now() > 0) {
    setTimeout(() => {
      timerFunc(node, data);
    }, 1000);
  } else {
    setTimeout(() => {
      const timer  = node.getElementById("timer");
      timer.innerText = "Аукцион закончен";
      timer.style.fontSize = "40px";

      const betBlock = node.getElementById("betBlock");
      betBlock.style.display = "none";

      node.getElementById("first-price").innerText = `Финальная ставка: ${data.firstBet} руб.`;
    }, 10000);
  }
}

const style = css`
  :host {
    height: calc(100vh - 40px);
    display: block;
    position: relative;
  }
  #root {
    height: 100vh;
    font-family: var(--font);
    position: relative;
  }

  #name {
    margin: 50px;
  }

  #description {
    margin: 50px;
  }

  #img {
    margin: 20px 50px;
    max-width: 300px;
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

  #timer {
    margin: 20px 50px;
    font-size: 20px;

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
        <div id="timer"></div>
        <div id="first-price"></div>
        <div id="betBlock" class="do-lot">
          <input id="bet" placeholder="Ваша ставка..." />
          <button id="betBtn">Сделать Ставку</button>
        </div>
      </div>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
   * @param {ShadowRoot} node корневой узел элемента
   * @return {PageMain} #this текущий компонент
   */
  async mount(node) {
    super.mount(node, attributes, properties);

    node.getElementById("name").innerText = data.name;
    node.getElementById("description").innerText = data.description;
    const img = node.getElementById("img");
    img.src = data.src;
    img.alt = data.name;
    node.getElementById("first-price").innerText = `Начальная ставка: ${data.firstBet} руб.`;

    node.getElementById("timer").innerText = `Времени до конца: ${getRemainedTime(data.end)}`;

    setTimeout(() => {
      timerFunc(node, data);
    }, 1000);

    node.getElementById("betBtn").addEventListener("click", async () => {
      //send data
      const r = await api("lots.create", {
        ad: 1,
        author: 1,
        amount: node.getElementById("bet").value
      });

      const container = node.getElementById('root');
      const newdiv = document.createElement("div");
      newdiv.style.backgroundColor = 'white';
      newdiv.style.position = 'absolute';
      newdiv.style.width = '100%';
      newdiv.style.textAlign = "center";
      newdiv.style.fontSize = "40px";
      newdiv.innerText = "Ставка сделана!";

      container.appendChild(newdiv);
      setTimeout(() => {
        container.removeChild(newdiv);
      }, 1000);
    });

    return this;
  }
}

Component.init(Lot, 'lot-auc', {
  attributes,
  properties
});

