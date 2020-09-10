const _createModal = options => {
  const modal = document.createElement("div");
  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal__overlay">
      <div class="modal__window">
        <div class="modal__header">
          <div class="modal__title">Modal header</div>
          <div class="modal__close">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/1200px-OOjs_UI_icon_close.svg.png"
              alt=" "
            />
          </div>
        </div>
        <div class="modal__body">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ducimus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ducimus.</p>
        </div>
        <div class="modal__footer">
              <button>ok</button>
              <button>cancel</button>
        </div>
      </div>`
  );
  modal.classList.add('modal')
  return modal
};

$.modal = function (options) {
  const $modal = _createModal(options)
  return {
    open() {},
    close() {},
    destroy() {},
  };
};
