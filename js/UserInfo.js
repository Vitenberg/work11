class UserInfo { 
    constructor(api) {
        this.name = '';
        this.about = '';
        this.api = api;
        this._id = 1;
    }
    setUserInfo (name1, about1, avatar1, _id1){
        this.name = name1;
        this.about = about1;
        this.avatar = avatar1;
        this._id = _id1;
    }
    updateUserInfo (){
        document.querySelector('.user-info__name').textContent = this.name;
        document.querySelector('.user-info__job').textContent = this.about;
        const userPhotoElem = document.querySelector('.user-info__photo');
        userPhotoElem.setAttribute('style', 'background-image: url(' + this.avatar + ')');
    }
    sendUserInfoToServer(){
        this.api.sendUserInfo(this.name, this.about);
    }
    getUserInfoFromServer (){
        this.api.getUserInfo()
        .then((result) => {
            this.setUserInfo(result.name, result.about, result.avatar, result._id);
            this.updateUserInfo();   
        })
       ;
    }
    setUserIdForCard (cardList123) {
        this.api.getUserInfo()
        .then((userdata) => {
            const id = userdata._id;
            this.setUserInfo(userdata.name, userdata.about, userdata.avatar, userdata._id);
            this.updateUserInfo();  
            return id;
        })
        .then((id) => {
            const smthElse = id;
            return smthElse;
        })
        .then((smthElse) => {
            console.log(smthElse);
        })
        ;
    }

} 