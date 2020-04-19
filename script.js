//Переменные
const placesList = document.querySelector('.places-list');
const addCardButton = document.querySelector('.user-info__button');
const editProfileDataButton = document.querySelector('.user-info__edit');

const formNew = document.forms.new;
const formEdit = document.forms.edit;
const saveProfileDataButton = document.querySelector('.popup__button-save');
const addCardFromPopupButton = document.querySelector('.popup__button-add');


const popupAdd1 = new Popup(document.querySelector('.popup-add'));

const popupEdit1 = new Popup(document.querySelector('.popup-edit'));
const popupImage1 = new Popup(document.querySelector('.popup-image'));

const formValidatorEdit = new FormValidator(formEdit);
const formValidatorNew = new FormValidator(formNew);
const config = {authorization: 'cb03b51b-34c3-4c07-9e82-e2aaceb3e2e3', url: "https://praktikum.tk/cohort9",}; // настройки
const api = new Api(config);
const userInfo = new UserInfo(api);
const cardList = new CardList(placesList, api);

//ФУНКЦИИ

cardList.render();
userInfo.getUserInfoFromServer();
//userInfo.setUserIdForCard(cardList);


function clearForm(form){
  form.reset();
}

function fillFormValues(form) {

  form.elements.name.value = userInfo.name;
  form.elements.about.value = userInfo.about;
}


const addCardToList = function () {
  event.preventDefault();
  const card = new Card(document.forms.new.elements.name.value, document.forms.new.elements.link.value);
  cardList.addNewCard(card);
  clearForm(document.forms.new);
  popupAdd1.close();
}

const saveDataFromForm = function () {
  event.preventDefault();
  userInfo.setUserInfo(document.forms.edit.elements.name.value, document.forms.edit.elements.about.value, userInfo.avatar);
  userInfo.updateUserInfo();
  userInfo.sendUserInfoToServer();
  clearForm(document.forms.edit);
  popupEdit1.close();
}

//ОБРАБОТЧИКИ
// валидация формы редактирования профиля
formEdit.addEventListener('input', () => {
  formValidatorEdit.checkInputValidityForm();
  formValidatorEdit.setSubmitButtonState1();
});
// валидация формы добавления карты
formNew.addEventListener('input', function () {
  formValidatorNew.setSubmitButtonState1();
});

//вызов popup добавления карты
addCardButton.addEventListener('click', function () {
  popupAdd1.open();
  formValidatorNew.setSubmitButtonState1();
});

//вызов popup редактирования данных профиля
editProfileDataButton.addEventListener('click', function () {
  fillFormValues(formEdit);
  popupEdit1.open();
  formValidatorEdit.checkInputValidityForm();
  formValidatorEdit.setSubmitButtonState1();
});

//Закрытие форм по нажатию [x]
popupAdd1.clickListener();
popupEdit1.clickListener();
popupImage1.clickListener();


// Добавить карточку в общий перечень
formNew.addEventListener('submit', addCardToList);

//отредактировать профиль
saveProfileDataButton.addEventListener('click', saveDataFromForm);


//действия с картами: лайки/удаление/открытие картинки в полном размере
placesList.addEventListener('click', () => { new Card().cardAction(event); });
placesList.addEventListener('click', () => { new Card().openImage(event, popupImage1); });

	/**
  * Здравствуйте.
  * Надо исправить: Название файлов должна быть идентично названию класса Например если класс назвается FormValidator, то файл должен называться FormValidator
  *
  * //Я: Исправила названия на заглавную букву - не нв=ашла если честно больше никаких отличий
  * 
   *  Надо исправить: Для начала вам необходимо создать класс API в котором каждый метод
   * //Я: Вывела обращение к серверу в отдельный класс
   * 
   * Все запросы должны быть методами этого класс. Если мы получаем список карточек, то в классе должен быть метод getInitialCards
   * Если профиль пользователя то getUserInfo и так далее
   *  *
   * Самый правильный способ, как пример указан в брифе
   // url лучше передавать при инициализации класса в конструктор
   fetch(`url/cards`,
        {
     headers: {
            // ключ который надо передавать в параметрах
    authorization: param.authorization
          }
        })
    .then(res => {
      if (res.ok) {
     return res.json();
        }
        // если ошибка, переходим в catch
     return Promise.reject(`Ошибка: ${res.status
        }`);
      })
  .then((result) => {
        // обрабатываем результат
        // а точнее возвращает результат работы прямо в тот класс откуда вызывали
      })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
        });
  

        После того как создадите класс Api в текущем файле у вас должно получиться что-то примерно такое
        const container = document.querySelector('.places-list'); // место куда записывать карточки
        const cards = []; // массив с карточками
        const words = {ru: { validationLenght: 'Должно быть от 2 до 30 символов'}};
        const config = {authorization: "ключ",ip: "http://95.216.175.5/cohort7",}; // настройки
        const api = new Api(config);
        const card = new Card(api);
        const validation = new FormValidator({words:words});
        const cardList = new CardList({card:card, api:api});
        cardList.render(container, cards);
        const popupCard = new PopupCard({ validation:validation,api:api});
        const popupProfile = new PopupProfile({ validation:validation,api:api});
        const popupImage = new PopupImage();
         *


 Хочу заметить что данные авторизации лучше передать при создании класса API в ввиде объекта	
  
   * Вызывать же методы класса Api лучше из других классов
   *
   * 	
     * Класс Api это отдельный класс, который ничего не знает о других классах и методах
     * Вы можете только получать данные из этого класса и использовать эти данные.
     * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
     * предварительно скажу, что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
     * Который только возвращает/записывает данные, а вы можете получить только обращаясь к этим методам.
     * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратиться к методам сервера или базы.
     * Получается отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
     * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.
     *
  *
   * работа принимается только при исправлении всех "Надо исправить"
   *
  */