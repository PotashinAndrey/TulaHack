
const HOST = "https://localhost:7443/";
const PATH = {
    "create-lot": "create-lot.html",
    "create-bid": "create-bid.html"
};

const openAuc = (link) => {
    const wrapper = document.createElement("div");
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

    const modal = document.createElement("div");
    Object.assign(modal.style, {
        width: "800px",
        height: "700px",
        backgroundColor: "white",
        borderRadius: "10px",
        margin: "auto",
        position: "relative",
    });

    const closeBtn = document.createElement("div");
    Object.assign(closeBtn.style, {
        position: "absolute",
        top: 0,
        right: "-40px",
        width: "30px",
        height: "30px",
        background: "white",
        color: "black",
        borderRadius: "100%",
        paddingTop: "6px",
        textAlign: "center",
        boxSizing: "border-box",
        cursor: "pointer"
    });
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", () => {
        document.getElementById("modal-auction").remove();
        document.body.style.overflow = "auto";
    });

    const iframe = document.createElement("iframe");
    iframe.src = link;
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

newDiv.className = "index-add-button-wrapper-s0SLe";

const newA = document.createElement("a");
newA.className = "index-add-button-RRqyw button-button-CmK9a button-size-s-r9SeD button-primary-x_x8w";
newA.innerText = "Создать аукцион";

newA.addEventListener("click", () => openAuc(HOST + PATH['create-lot']));

newDiv?.appendChild(newA);
header?.appendChild(newDiv);


setTimeout(() => {
    const actions = document.getElementsByClassName("js-item-actions")[0];
    // console.log(document.getElementsByClassName("js-item-actions"),actions)

    if (actions) {
        // console.log(actions);
        const itemLine = document.createElement("div");
        itemLine.className = "item-actions-line";

        const span = document.createElement("span");
        span.className = "js-messenger-button";

        const button = document.createElement("button");
        button.className = "button-button-2Fo5k button-size-l-3LVJf width-width-12-2VZLz"
        button.innerText = "Участвовать в аукционе"
        button.style.border = "none";
        button.style.background = "#c722b6";
        button.style.color = "white";
        button.style.height = "66px";

        // button.onclick = openAuc;
        button.addEventListener("click", () => openAuc(HOST + PATH['create-bid']));

        span.appendChild(button);
        itemLine.appendChild(span);
        actions.appendChild(itemLine);
    }
}, 1000);
