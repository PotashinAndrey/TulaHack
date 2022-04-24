const iframeSrc = "https://localhost:7443";

const openAuc = () => {
    const modal = document.createElement("div");
    const wrapper = document.createElement("div");
    const closeBtn = document.createElement("div");

    wrapper.id = "modal-auction";

    Object.assign(wrapper.style, {
        position: "fixed",
        display: "flex",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 32767,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    });

    Object.assign(modal.style, {
        width: "800px",
        height: "700px",
        backgroundColor: "white",
        borderRadius: "10px",
        margin: "auto",
        position: "relative",
    });

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
