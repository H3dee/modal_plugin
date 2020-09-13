
const _createCards = data => {
  
}

const _createModal = (options) => {
  const defaultValues = {
    TITLE: "default title",
    CONTENT: "default content",
    WIDTH: "500px",
  };
  //creating modal-container
  const modal = document.createElement("div");
  //filling modal-container
  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal__overlay" data-closable=' '>
      <div 
      class="modal__window"
      style='width: ${options.width || defaultValues.WIDTH}'
      >
        <div class="modal__header">
          <div class="modal__title">${
            options.title || defaultValues.TITLE
          }</div>
          ${
            options.closable
              ? `<div class="modal__close">
          <img
            data-closable='close__icon'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/1200px-OOjs_UI_icon_close.svg.png"
            alt=" "
          />
        </div>`
              : `<div></div>`
          }
        </div>
        <div class="modal__body">
            <div class='modal__content'>
              ${options.content || defaultValues.CONTENT}
            </div>
        </div>
        <div class="modal__footer">
              <div class='modal__buttons'>
                <button data-closable='closeBtn'>Close</button>
                <button id='saveBtn'>Save Changes</button>
              </div>
        </div>
      </div>`
  );
  modal.classList.add("modal");
  document.body.appendChild(modal);
  return modal;
};

/**
 *params:
 *title: string, //done
 *closable: boolean, //done
 *content: string, //done
 *width: string, //done
 *destroy(): remove listeners & content, //done
 *closeWindow() //done
 *-----------------
 *setContent(html:string): void | Public, //done
 *lifecycle's methods: onOpen(), onClose(), beforeClose(): boolean //done
 */

$.modal = function (options) {
  const $modal = _createModal(options);
  const ANIMATION_SPEED = 350;
  const modalContent = $modal.textContent;
  let closing = false;
  let isDestroyed = false;

  function open() {
    if (isDestroyed) console.log("Modal is destroyed");
    else {
      !closing && $modal.classList.add("open");
      onOpen();

      $modal.addEventListener("click", handleOverlayClick);
    }
  }

  function onOpen() {
    console.log("Modal opened!");
  }

  function onClose() {
    alert("Modal Closed");
  }

  function shouldModalClose() {
    if (modalContent.length >= 450) return true;
    else return false;
  }

  function alertContent() {
    alert(modalContent);
  }

  function handleOverlayClick(event) {
    if (shouldModalClose()) {
      const et = event.target;
      if(et.dataset.closable) close()
      else if(et.getAttribute('id') === 'saveBtn') alertContent()
    }
  }

  function setContent(newContent) {
    modalContent.textContent = String(newContent);
  }

  function close() {
    closing = true;
    $modal.classList.remove("open");
    $modal.classList.add("close");
    setTimeout(() => {
      $modal.classList.remove("close");
      closing = false;
      onClose();
    }, ANIMATION_SPEED);
  }

  function destroy() {
    isDestroyed = true;
    $modal.removeEventListener("click", handleOverlayClick);
    $modal.remove();
  }

  return {
    open,
    close,
    destroy,
    setContent,
  };
};
