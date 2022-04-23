const iframeSrc = "https://localhost:7443";

const openAuc = () => {
    const modal = document.createElement("div");
    const wrapper = document.createElement("div");
    const closeBtn = document.createElement("div");

    wrapper.id = "modal-auction"

    wrapper.style.position = "fixed";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.zIndex = "32000";
    wrapper.style.background = "rgba(0, 0, 0, 0.5)"

    modal.style.width = "800px";
    modal.style.height = "700px";
    modal.style.background = "white";
    modal.style.borderRadius = "10px";
    modal.style.marginLeft = "50%";
    modal.style.marginTop = "35%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.position = "relative";

    closeBtn.style.position = "absolute";
    closeBtn.style.top = "0";
    closeBtn.style.right = "-40px";
    closeBtn.style.width = "30px";
    closeBtn.style.height = "30px";
    closeBtn.style.background = "white";
    closeBtn.style.borderRadius = "100%";
    closeBtn.style.paddingTop = "6px";
    closeBtn.style.textAlign = "center";
    closeBtn.style.boxSizing = "border-box";
    closeBtn.style.cursor = "pointer";
    closeBtn.innerHTML = "×";


    closeBtn.addEventListener("click", () => {
        document.getElementById("modal-auction").remove();
        document.body.style.overflow = "auto";
    });

    const iframe = document.createElement("iframe");
    iframe.src = iframeSrc;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.zIndex = "32000"

    modal.appendChild(iframe);
    modal.appendChild(closeBtn);

    wrapper.appendChild(modal);

    document.body.style.overflow = "hidden";
    document.body.appendChild(wrapper);
};

const header = document.getElementsByClassName("index-inner-iPEdy")[0];
const newDiv = document.createElement('div');

newDiv.classList = "index-add-button-wrapper-s0SLe";

const newA = document.createElement("a");
newA.classList = "index-add-button-RRqyw button-button-CmK9a button-size-s-r9SeD button-primary-x_x8w";
newA.innerText = "Создать аукцион";

newA.addEventListener("click", openAuc);

newDiv?.appendChild(newA);
header?.appendChild(newDiv);


setTimeout(() => {
    const actions = document.getElementsByClassName("js-item-actions")[0];
    // console.log(document.getElementsByClassName("js-item-actions"),actions)

    if (actions) {
        // console.log(actions);
        const itemLine = document.createElement("div");
        itemLine.classList = "item-actions-line";

        const span = document.createElement("span");
        span.classList = "js-messenger-button";

        const button = document.createElement("button");
        button.classList = "button-button-2Fo5k button-size-l-3LVJf width-width-12-2VZLz"
        button.innerText = "Участвовать в аукционе"
        button.style.border = "none";
        button.style.background = "#c722b6";
        button.style.color = "white";
        button.style.height = "66px";

        button.onclick = openAuc;
        
        span.appendChild(button);
        itemLine.appendChild(span);
        actions.appendChild(itemLine);


    }
}, 1000);