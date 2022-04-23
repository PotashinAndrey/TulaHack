import Component, { html, css } from '../class/Component.js';
import AppButton from '../components/app-button.js';
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
  #upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    outline: 2px dashed #5d5d5d;
    outline-offset: -12px;
    background-color: #e0f2f7;
    font-family: 'Segoe UI';
    color: #1f3c44;
  }
  
  #upload-container img {
    width: 40%;
    margin-bottom: 20px;
    user-select: none;
  }
  
  #upload-container label {
    font-weight: bold;
  }
  
  #upload-container label:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  
  #upload-container div {
    position: relative;
    z-index: 10;
  }
  
  #upload-container input[type=file] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -10;
  }
  
  #upload-container label.focus {
    outline: 1px solid #0078d7;
    outline: -webkit-focus-ring-color auto 5px;
  }
  
  #upload-container.dragover {
    background-color: #fafafa;
    outline-offset: -17px;
  }
  slot {
    display: block;
    position: relative;

    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }`;

/** Раскладка {CreateAuc} @class @ui @component <create-auc />
  * description
  */
export default class CreateAuc extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <div id="root">
        <h1>Название лота:</h1>
        <input type="text" size="40">
        <h1>Загрузите изображения товара:</h1>
        <img id="upload-image" src="icons/upload.svg">
        <div>
          <input id="file-input" type="file" name="file" multiple>
          <label for="file-input">Выберите файл</label>
          <span>или перетащите его сюда</span>
        </div>
        <h1>Введите стартовую цену торговли:</h1>
        <input type="text">
        <app-button primary wide id="submitBtn">Создать</app-button>
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
