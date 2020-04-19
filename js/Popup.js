
class Popup { 
    constructor(type) {
        this.type = type;
    }
    open() {
        
        this.type.classList.add('popup_is-opened');
    }
    close() {
        this.type.classList.remove('popup_is-opened'); 
    }
    closePopup(ev) {
        if (ev.target.classList.contains('popup__close')) {
            this.close(ev);
          }
    }
    clickListener(){
        this.type.addEventListener('click', () => this.closePopup(event));
    }
} 