import {Card} from './Card.js';
export class CardList {
    constructor(placesList1, api) {
        this.placesList1 = placesList1;
        this.api = api;
    }
    addCard(card) {
        this.placesList1.appendChild(card.create());
        
    }
    addNewCard(card){
        this.addCard(card);
        this.api.uploadCard(card).
        then ((result)=> {
            console.log(result);
        });
    }
    render() {
        this.api.getInitialCards()
            .then((result) => {
                for (const elem of result){
                    let card = new Card(elem.name, elem.link);
                    this.addCard(card);
                }
            });       
    }

} 
