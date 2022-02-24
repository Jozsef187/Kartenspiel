let wrapper = document.querySelector(".wrapper");

function makeCards(size){
    let numbers = [];
    for (let i = 1; i <= size*size/2; i++){
        numbers.push(i);
        numbers.push(i);
    }
    
    for (let i = 0; i < size; i++){
        let box = document.createElement("div");
        box.className = "box";
        for(let j = 0; j < size; j++){
            let mem = document.createElement("div");
            mem.className = "mem";
            let m = Math.floor(Math.random() * numbers.length);
            mem.innerHTML = numbers[m];
            numbers.splice(m, 1);
            box.appendChild(mem);
            mem.addEventListener("click", turnCard);
        }
        wrapper.appendChild(box);
    }
}

let cards, openedCards, cardsAsArray;

document.addEventListener("DOMContentLoaded", () => {
    wrapper.innerHTML = "";
    makeCards(4);
    openedCards = [];
    cards = document.getElementsByClassName("mem");
    cardsAsArray = Array.from(cards);
});

function turnCard() {
    if (openedCards.length == 1 && openedCards[0] == this) {
        openedCards = [];
        this.style.background = "blue";
        return;
    }

    if (openedCards.length < 2) {
        openedCards.push(this);
        this.style.background = "#7777FF";
        
        if (openedCards.length == 2) {
            if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
                setTimeout(() => {
                    cardsAsArray.forEach(element => {
                        if (element.innerHTML === this.innerHTML) {
                            element.style.background = "green";
                            element.removeEventListener("click", turnCard);
                        }
                    });
                }, 500);

                setTimeout(() => {
                    for (let i = 0; i < cardsAsArray.length; i++) {
                        if (cardsAsArray[i].innerHTML == this.innerHTML) {
                            cardsAsArray.splice(i, 1);
                            i--;
                        }
                    }
                }, 500);

                setTimeout(() => {
                    if (cardsAsArray.length == 0) {
                        window.alert("You win!");
                        document.location.reload();
                    }
                }, 1000);
                
                openedCards = [];
            }
            else {
                setTimeout(() => {
                    for (let i = 0; i < cardsAsArray.length; i++) {
                        if (cardsAsArray[i] == openedCards[0]) {
                            cardsAsArray[i].style.background = "blue";
                        }
                    }
                    this.style.background = "blue";
                }, 500);

                setTimeout(() => {
                    openedCards = []
                }, 501);
            }   
        }
    }
}
