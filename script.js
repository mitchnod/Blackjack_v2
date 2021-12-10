var userValue = 0;
var dealerValue = 0;

async function deal(){
    await fetch("https://deckofcardsapi.com/api/deck/ecp2mm0zj727/shuffle/?deck_count=1");
    var response = await fetch("https://deckofcardsapi.com/api/deck/ecp2mm0zj727/draw/?count=3");
    var cardData = await response.json();
    dealerHand.innerHTML = `
    <img src="${cardData.cards[0].image}">
    `
    userHand.innerHTML = `
    <img src="${cardData.cards[1].image}">
    <img src="${cardData.cards[2].image}">
    `

    for(var i=0; i<cardData.cards.length; i++){
        if(cardData.cards[i].value == "JACK" || cardData.cards[i].value == "QUEEN" || cardData.cards[i].value == "KING"){
            cardData.cards[i].value = "10";
        }
        else if(cardData.cards[i].value == "ACE"){
            cardData.cards[i].value = "11";
        }
    }

    document.getElementById('dealerHandValue').innerText = "Dealer Hand Value: " + parseInt(cardData.cards[0].value);
    
    document.getElementById('userHandValue').innerText = "User Hand Value: " + (parseInt(cardData.cards[1].value) + parseInt(cardData.cards[2].value));
    
    console.log(cardData);
}

async function hit(){
    var response = await fetch("https://deckofcardsapi.com/api/deck/ecp2mm0zj727/draw/?count=1");
    var cardData = await response.json();
    
    userHand.innerHTML += `
    <img src="${cardData.cards[0].image}">
    `

    for(var i=0; i<cardData.cards.length; i++){
        if(cardData.cards[i].value == "JACK" || cardData.cards[i].value == "QUEEN" || cardData.cards[i].value == "KING"){
            cardData.cards[i].value = "10";
        }
        else if(cardData.cards[i].value == "ACE"){
            cardData.cards[i].value = "11";
        }
    }



    document.getElementById('userHandValue').innerText = "User Hand Value: " + userValue + parseInt(cardData.cards[0].value);

    console.log(cardData);

    if(userValue > 21){
        setTimeout(function(){alert("Bust.");},500);
        setTimeout(function(){location.reload();},1000);
    }

    if(userValue == 21){
        setTimeout(function(){alert("Blackjack!");},500);
        setTimeout(function(){location.reload();},1000);
    }
}

async function stay(){
    var response = await fetch("https://deckofcardsapi.com/api/deck/ecp2mm0zj727/draw/?count=1");
    var cardData = await response.json();
    
    dealerHand.innerHTML += `
    <img src="${cardData.cards[0].image}">
    `

    for(var i=0; i<cardData.cards.length; i++){
        if(cardData.cards[i].value == "JACK" || cardData.cards[i].value == "QUEEN" || cardData.cards[i].value == "KING"){
            cardData.cards[i].value = "10";
        }
        else if(cardData.cards[i].value == "ACE"){
            cardData.cards[i].value = "11";
        }
    }

    dealerValue = dealerValue + parseInt(cardData.cards[0].value);
    document.getElementById('dealerHandValue').innerText = "Dealer Hand Value: " + dealerValue;
}