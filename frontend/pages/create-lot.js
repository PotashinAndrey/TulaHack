import Component, { html, css } from '../class/Component.js';
// import AppButton from '../components/app-button.js';
import UIPanel from '../components/panel.js';
import UICaption from "../components/caption.js";
import UIInput from '../components/input.js';
import UIText from '../components/text.js';
import UITextarea from '../components/textarea.js';
import UIButton from '../components/button.js';
import UIInputCount from '../components/input-count.js';
import $ from '../class/DOM.js';
// import locator from '../script/locator.js';
import api, { upload } from "../script/api.js";

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
  ui-panel {
    margin: 20px;
    padding: 40px 30px;
  }
  #upload-container {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 200px;
    outline: 2px dashed #5d5d5d;
    outline-offset: -12px;
    background-color: #e0f7fa; /* rgba(199,34,182, 0.05); */
    font-family: 'Segoe UI';
    color: #1f3c44;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  #upload-container:hover {
    background-color: #e1f5fe;
  }

  #upload-container img {
    width: 100px;
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

  .input {
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
    font-family: var(--font);
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

  slot {
    display: block;
    position: relative;

    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }`;

/** Раскладка {CreateLot} @class @ui @component <create-lot />
  * description
  */
export default class CreateLot extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <ui-panel>
        <ui-caption large>Создание Аукциона-"наоборот"</ui-caption>
        <ui-text>Участники будут делать ставки "в закрытую".</ui-text>
        <ui-text>Победит тот, кто сделает минимальную уникальную ставку.</ui-text>

        <ui-input placeholder="Название товара" id="nameId">Что вы продаёте?</ui-input>

        <div id="upload-block-id" class="upload-block">
          <div id="upload-container">
            <img id="upload-image" src="icons/upload.svg">
            <div>
              <input id="fileInput" type="file" accept="image/png, image/jpeg, image/jpg">
              <ui-text>
                <label>Выберите файл</label>
                <span>или перетащите его сюда</span>
              </ui-text>
            </div>
          </div>
        </div>
        <div id="previewImages"></div>

        <ui-textarea id="description" placeholder="Описание товара">Расскажите о внешнем виде и особенности товара</ui-textarea>

        <ui-input-count id="price" value="1000">Стартовая цена в рублях</ui-input-count>
        <ui-text>Шаг цены - 10 рублей</ui-text>
        <ui-button mode="primary" id="create">Создать аукцион</ui-button>
      </ui-panel>

      <!-- // <div class="price">
      //   <h2>Стартовая цена:</h2>
      //   <input id="price" class="input" placeholder="Стартовая цена лота..." size="40" />
      // </div>

      // <button id="create" class="createBtn">Создать</button>
      // <slot></slot> -->
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
    let imgId;

    $("#fileInput", node).addEventListener('change', async (e) => {
      /** @type {HTMLInputElement} */
      const inp = e.target;
      // debugger;
      let photo = inp.files[0];
      const r = await upload({ photo });

      imgId = r.id;
    });

    node.getElementById("create").addEventListener("click", async () => {
      //send data
      const r = await api("auction.create", {
        name: node.getElementById("nameId").value,
        description: node.getElementById("description").value,
        price: node.getElementById("price").value,
        file: node.getElementById("fileInput").files["0"]?.name,
        author: 1,
        image: imgId
      });

      const newdiv = document.createElement("div");
      newdiv.style.marginTop = "40%";
      newdiv.style.textAlign = "center";
      newdiv.style.fontSize = "40px";
      newdiv.innerText = "Аукцион открыт!";

      node.innerHTML = "";
      node.appendChild(newdiv);
    });


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

Component.init(CreateLot, 'create-lot', { attributes, properties });
