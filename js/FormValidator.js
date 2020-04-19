class FormValidator {
  constructor(form) {
    this.form = form;

  }
  setSubmitButtonState1() {
    const submitButton = this.form.querySelector('.button');
    let flag = false;
    flag = Array.from(this.form.elements).some(function (item) {
      return (!item.validity.valid);
    });

    if (flag) {
      if (submitButton.classList.contains('popup__button_enable')) {
        submitButton.classList.remove('popup__button_enable');
      }
      submitButton.setAttribute("disabled", "true");
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add('popup__button_enable');
    }
  }
  checkInputValidity1 = (elemField, elemError) => {
    if (elemField.validity.valueMissing) {
      elemError.classList.remove('error-message_hidden');
      elemError.textContent = 'Это обязательное поле';
    } else if (elemField.validity.tooShort || elemField.validity.tooLong) {
      elemError.classList.remove('error-message_hidden');
      elemError.textContent = `Должно быть от ${elemField.minLength} до ${elemField.maxLength} символов`;
    } else {
      elemError.classList.add('error-message_hidden');
    }
  }
  checkInputValidityForm() {

    for (let i = 0; i < this.form.elements.length; i++) {
      /* 
       можно лучше : используйте for of для перебора массива с объектами
       https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of 
       как пример:
       
       const array1 = ['a', 'b', 'c'];
       for (const element of array1) {
        console.log(element);
       }
       
      */
      const elemErr = document.querySelector(`.error-${this.form.elements[i].name}`);
      if (this.form.elements[i].type === "text") {
        //проверим значение в поле
        this.checkInputValidity1(this.form.elements[i], elemErr);
      }
    }


  }

  setEventListeners() {

  }
} 