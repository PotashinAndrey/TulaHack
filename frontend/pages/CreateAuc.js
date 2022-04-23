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
  }
  #root {
    height: 100vh;
    font-family: var(--font);
  }
  #upload-container {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    outline: 2px dashed #5d5d5d;
    outline-offset: -12px;
    background-color: rgba(199,34,182, 0.05);
    font-family: 'Segoe UI';
    color: #1f3c44;
    border-radius: 10px;
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

  .name {
    margin: 30px 50px;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .nameInput {
    outline: none;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
  }

  .header {
    text-align: center;
    margin-top: 50px;
  }
  
  .upload-block {
    margin: 20px 50px;
  }

  .createBtn {
    background: #c722b6;
    border: none;
    width: 350px;
    padding: 10px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    margin-left: 50%;
    margin-bottom: 40px;
    transform: translate(-50%, 0);
  }

  .desc {
    margin: 0px 50px;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .price {
    margin: 0px 50px;
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 30px;
  }

  #description {
    outline: none;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
    width: 400px;
    
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
      <h1 class="header">Создание лота</h1>
      <div class="name">
        <h2>Название лота:</h2>
        <input placeholder="Ведите название..." class="nameInput" type="text" size="40" />
      </div>
      <div id="upload-block-id" class="upload-block">
        <div id="upload-container">
          <img id="upload-image" src="icons/upload.svg">
          <div>
            <input id="fileInput" type="file" multiple>
            <label for="fileInput">Выберите файл</label>
            <span>или перетащите его сюда</span>
          </div>
        </div>
      </div>
      <div id="previewImages"></div>

      <div class="desc">
        <h2>Описание лота:</h2>
        <input  id="description" placeholder="Описание вашего лота..." />
      </div>

      <div class="price">
        <h2>Стартовая цена:</h2>
        <input class="nameInput" placeholder="Стартовая цена лота..." size="40" />
      </div>
      <button class="createBtn">Создать</button>
      <slot></slot>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageMain} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    node.getElementById("upload-block-id").addEventListener("click", (e) => {
      node.getElementById('fileInput').click();
    });;

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
