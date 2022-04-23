import Component, { html, css } from '../class/Component.js';
import AppButton from '../components/app-button.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    height: calc(100vh - 40px);
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
  }
  #root {
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
  #submitBtn {
    margin-top: 20px;
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
      <h1>Название лота:</h1>
      <input type="text" size="40">
      <h1>Загрузите изображения товара:</h1>
      <div id="upload-container">
        <img id="upload-image" src="icons/upload.svg">
        <div>
          <input id="fileInput" type="file" multiple>
          <label for="fileInput">Выберите файл</label>
          <span>или перетащите его сюда</span>
        </div>
      </div>
      <div id="previewImages"></div>
      <h1>Введите стартовую цену торговли:</h1>
      <input type="text">
      <app-button primary wide id="submitBtn">Создать</app-button>
      <slot></slot>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageMain} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    node.getElementById('fileInput').addEventListener('change', (e) => {
      const files = e.currentTarget.files;
      this.updateImagesPreview(files, node);
    });

    this.setupDragNDrop(node);
    
    return this;
  }

  updateImagesPreview(files, root) {
    const reader = [];
    const images = root.getElementById('previewImages');
    images.innerHTML = '';
    let i = 0;
    for (const file of files) {
      const fileName = `file${i++}`;
      
      reader[i] = new FileReader();
      reader[i].readAsDataURL(file);
      
      images.innerHTML += `<img id=${fileName} height="100" src="" style="padding: 20px;"/>`;
      
      reader[i].onload = (e) => {
        root.getElementById(fileName).src = e.target.result;
      };
    }
  }

  setupDragNDrop(node) {

    // const sendFiles = (files) => {
    //   let maxFileSize = 5242880;
    //   let Data = new FormData();
    //   for(const file of files) {
    //     if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
    //       Data.append('images[]', file);
    //     };
    //   }
    //   $.ajax({
    //     url: dropZone.attr('action'),
    //     type: dropZone.attr('method'),
    //     data: Data,
    //     contentType: false,
    //     processData: false,
    //     success: function(data) {
    //       alert ('Файлы были успешно загружены!');
    //     }
    //   });
    // }
    const dropZone = node.getElementById('upload-container');
    const dragEvents = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave'];

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      this.updateImagesPreview(files, node);
    });

    dropZone.addEventListener('dragstart', e => {
      e.preventDefault();
      return false;
    });
  
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
  
    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
    });
  }
}

Component.init(CreateAuc, 'create-auc', { attributes, properties });
