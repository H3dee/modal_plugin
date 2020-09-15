const generateRandomId = (min = 1, max = 100) => Math.round(Math.random() * (max - min) + min)

const _createCards = (selector, data) => {
  const container = document.querySelector(selector);
  const cards = data.reduce((acc, item) => {
    return (
      acc +
      `<div class="fruits__card" data-id=${item.id}>
    <div class="card__image">
      <img src=${
        item.imgUrl ||
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAABlBMVEUKCgoKCwYm8ZtEAAAAY0lEQVR4nO3csREAIAgEQb7/pm1BTBRntwLmoo+oAgAAAIBBktsXDBK19mkFAAAfMvQbxGrQCgAAAAAAAAAAAAAAAAAAAAAAOOeTEQAAAAAAAAAAAAAAAAAAAAAAAAAAAPC6BSuuAA7szvsXAAAAAElFTkSuQmCC"
      } alt=" ">
    </div> 
    <div class="card__info">
      <div class="card__subtitle">
        ${item.subtitle || "Default"}
      </div>
      <div class="card__btns" data-id=${item.id}>
        <button id='priceBtn' data-card__btn=' '>
          Посмотреть цену
        </button>
        <!-- <button id='removeBtn' data-card__btn=' '>
          Удалить
        </button> --> 
      </div>
    </div>
</div>`
    );
  }, ``);
  container.innerHTML = ` <h1>Header</h1>
  <div class="container">
    <div class="content__row">
      <div class="content__body">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        expedita vitae ut dolor? Veritatis consectetur fugiat facilis cupiditate
        placeat magni dicta ipsum, maiores odio autem aut! Dolore, aut.
        Pariatur, dolores?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        expedita vitae ut dolor? Veritatis consectetur fugiat facilis cupiditate
        placeat magni dicta ipsum, maiores odio autem aut! Dolore, aut.
        Pariatur, dolores?
      </div>
      <div class="content__fruits">
        <div class="fruits__title">
          Fruits
        </div>
        <div class="container">
          <div class="fruits__row">
          ${cards}
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

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
  _createCards(`[data-container='content'`, options.cards);
  document.body.appendChild(modal);
  return modal;
};

$.modal = function (options) {
  let $modal = _createModal(options);
  const $cardContainer = document.querySelector(".fruits__row");
  const modalContent = document.querySelector('.modal__content');
  const ANIMATION_SPEED = 350;
  let closing = false;
  let isDestroyed = false;

  //Set listener to cards' container
  $cardContainer.addEventListener("click", handleBtnClick);

  //card's button handler
  function handleBtnClick(event) {
    const et = event.target;
    const id = et.closest(".card__btns").dataset.id;

    //Check price of clicked card
    if(et.dataset.card__btn && (et.getAttribute('id') === 'priceBtn')) {
      console.log('check')
      modal.setContent(`
        <p>
          <span>
            Price:
          </span>
          ${options.cards[+(id) - 1].price}
        </p>
        <p><span>Вид фрукта:</span> ${options.cards[+id - 1].subtitle} </p>
      `)
      open();
    }
  
    //Remove card
    // else if(et.dataset.card__btn && (et.getAttribute('id') === 'removeBtn')){
    //   options.cards = options.cards
    //                          .filter((item, index) =>  index !== (+id - 1))
    //   options.cards.forEach(item => {
    //     item.id = newId
    //     newId++
    //   });
              
    //   _createCards(`[data-container='content']`, options.cards)
    // }
  }

  //open modal
  function open() {
    if (isDestroyed) console.log("Modal is destroyed");
    else {
      !closing && $modal.classList.add("open");
      onOpen();

      $modal.addEventListener("click", handleOverlayClick);
    }
  }

  //called after modal was opend
  function onOpen() {
    console.log("Modal opened!");
  }

  //called after modal was closed
  function onClose() {
    alert("Modal Closed");
  }

  //modal can be closed when method returns true
  function shouldModalClose() {
    // if (modalContent.textContent.length >= 100) return true;
    // else return false;
    return true;
  }

  //handle check button of modal
  function alertContent() {
    alert('saved');
  }

  //handle click out of modal
  function handleOverlayClick(event) {
    if (shouldModalClose()) {
      const et = event.target;
      if (et.dataset.closable) close();
      else if (et.getAttribute("id") === "saveBtn") alertContent();
    }
  }

  //change content of modal
  function setContent(html) {
    modalContent.innerHTML = html;
  }

  //close modal
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

  //total removing of modal
  function destroy() {
    isDestroyed = true;
    $modal.removeEventListener("click", handleOverlayClick);
    $modal.parentNode.removeChild($modal);
  }

  return {
    open,
    close,
    destroy,
    setContent,
  };
};
