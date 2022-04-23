const URL = "http://lovalhost:7443";

const header = document.getElementsByClassName("index-inner-iPEdy")[0];
const newDiv = document.createElement('div');

newDiv.classList = "index-add-button-wrapper-s0SLe";

const newA = document.createElement("a");
newA.classList = "index-add-button-RRqyw button-button-CmK9a button-size-s-r9SeD button-primary-x_x8w";
newA.innerText = "Создать аукцион";

newA.addEventListener("click", () => {
    const modal = document.createElement("div");
    const wrapper = document.createElement("div");

    wrapper.id = "modal-auction"

    wrapper.style.position = "fixed";
    wrapper.style.width= "100%";
    wrapper.style.height = "100%";
    wrapper.style.zIndex = "100";
    wrapper.style.background = "rgba(0, 0, 0, 0.5)"

    modal.style.width = "500px";
    modal.style.height = "500px";
    modal.style.background = "white";
    modal.style.borderRadius = "10px";
    modal.style.marginLeft = "50%";
    modal.style.marginTop = "50%";
    modal.style.transform = "translate(-50%, -50%)";

    modal.addEventListener("click", () => {
        document.getElementById("modal-auction").remove();
    });

    wrapper.appendChild(modal);
    document.body.appendChild(wrapper);
});

newDiv.appendChild(newA);
header.appendChild(newDiv);