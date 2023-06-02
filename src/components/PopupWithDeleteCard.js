import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__button-save");
  }

  open() {super.open();};

  handleSubmitAction(action) {this._handleConfirm = action;};

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleConfirm ();
    });
  };
};
