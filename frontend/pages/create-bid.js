import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import UIPanel from '../components/panel.js';
import UICaption from "../components/caption.js";
import UIInput from '../components/input.js';
import UIText from '../components/text.js';
import UITextarea from '../components/textarea.js';
import UIButton from '../components/button.js';
import UIInputCount from '../components/input-count.js';
import api from "../script/api.js";

const attributes = {};
const properties = {};

const data = {
  name: "Башкрский мёд",
  description: "Замечательный мёд, гордость Башкортостана, с домашней пасеки!",
  // img: "../../extension/logo.png",
  src: "./storage/e04da91d-c4dd-4e8f-83db-98c381f7853f.jpeg",
  firstBet: 1000,
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
  ui-panel {
    margin: 20px;
    padding: 40px 30px;
  }

  #img {
    margin: 20px 50px;
    max-width: 300px;
  }

  ui-input-count, ui-button {
    display: block;
  }

  #betBtn {
    margin-top: 40px;
  }

  #timer {
    margin: 20px 50px;
    font-size: 20px;

  }`;

/** Раскладка {CreateBid} @class @ui @component <create-bid />
 * description
 */
export default class CreateBid extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <ui-panel>
        <ui-caption id="name" large>Название лота</ui-caption>
        <img id="img" src="../../extension/logo.png" />
        <ui-text id="description">Описание</ui-text>

        <div id="betBlock" class="do-lot">
          <ui-caption id="first-price" small>Начальная ставка</ui-caption>
          <ui-input-count id="bet" value="1000">Ваша ставка</ui-input-count>

          <ui-button id="betBtn">Сделать ставку</ui-button>
        </div>
        <div id="timer"></div>
      </ui-panel>
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
        ad: '21adf549-9a47-40d3-9ec2-c38877851d50',
        author: Math.random() % 2 ? 1 : 2,
        amount: node.getElementById("bet").value
      });

      const container = $('ui-panel', node);
      const newdiv = document.createElement("div");
      newdiv.style.fontSize = "40px";
      newdiv.innerText = "Ставка сделана!";

      container.appendChild(newdiv);
      $('#betBlock', node).style.display = "none";
      setTimeout(() => {
        container.removeChild(newdiv);
        $('#betBlock', node).style.display = "block";
      }, 10000);
    });

    return this;
  }
}

Component.init(CreateBid, 'create-bid', { attributes, properties });

