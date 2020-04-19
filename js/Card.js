
class Card {
  constructor(name, link, _id1) {
    this.name = name;
    this.link = link;
    this._id = _id1;
  }
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove(event) {
    event.target.closest('.place-card').remove();
  }
  openImage(event, popup) {
    document.querySelector('.popup__image').setAttribute('style', event.target.getAttribute('style'));

    if (event.target.classList.contains('place-card__image')) {
      popup.open();
    }
  }
  cardAction(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      this.like(event);
    } else if (event.target.classList.contains('place-card__delete-icon')) {
      this.remove(event);
    }
  }
  create() {
    const placeElem1 = document.querySelector('[data-componet="card"]').content.cloneNode(true).querySelector('.place-card');
    const cardImage = placeElem1.querySelector('.place-card__image');
    if (cardImage.hasAttribute('style')) {
      cardImage.setAttribute('style', 'background-image: url(' + this.link + ')');
    }
    placeElem1.querySelector('.place-card__name').textContent = this.name;
    return placeElem1;
  }
}


