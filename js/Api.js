class Api {
    constructor (conf){
        this.authorization = conf.authorization;
        this.url = conf.url;
    }
    getInitialCards (){
       return fetch(`${this.url}/cards`, {
            headers: {
            authorization: this.authorization
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } 
           })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        })
        ;
    }
    getUserInfo(){
        return fetch(`${this.url}/users/me`, {
            headers: {
            authorization: this.authorization
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } 
           })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        })
        ;
    }
    sendUserInfo(name, about){
        fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: 'cb03b51b-34c3-4c07-9e82-e2aaceb3e2e3',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
            name: name,
            about: about
            })
        });
    }
    uploadCard(card) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
            name: card.name,
            link: card.link
            })
        });

    }
}