(() => {
    "use strict";
  
    let click1 = {},
      click2 = {},
      level = "medium",
      numStars = 3,
      pairs = 8,
      gameStarted,
      matches,
      moves,
      timer,
      twoStar,
      oneStar;
  
    //creating and initializing an object instance for the Card class.  
    class Card {
      constructor(card, num) {
        let cardID = card.id + "-" + num;
        this.id = "#" + card.id + "-" + num;
        this.image = card.image;
        this.name = card.name;
        this.html = `<div class="card" id="${cardID}">
              <div class="card-back">
                <img src="assets/images/${this.image}" class="card-image" >
              </div>
              <div class="card-front">
                <img src="assets/images/back_face.png" class="card-image" >
              </div>
            </div>`;
      }
    }
    // Constant levels
    const setLevel = level => {
      $("#startModal").hide();
      pairs = gameLevels[level].pairs;
      twoStar = gameLevels[level].twoStar;
      oneStar = gameLevels[level].oneStar;
      $("#game-board").removeClass("easy medium hard");
      $("#game-board").addClass(gameLevels[level].class);
    };
  
    // set card array size based on level
    const trimArray = array => {
      let newArray = array.slice();
      // trim array as needed
      while (newArray.length > pairs) {
        let randomIndex = Math.floor(Math.random() *
          newArray.length);
        newArray.splice(randomIndex, 1);
      }
      return newArray;
    };
  
    const makeCardArray = (data, level) => {
      let array = [];
  
      // get the correct sized array for level
      let trimmedData = trimArray(data, level);
  
      // add two of each card to the array
      trimmedData.forEach(function(card) {
        array.push(new Card(card, 1));
        array.push(new Card(card, 2));
  
      });
  
      return array;
    };
  
    const shuffle = array => {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;
  
      while (0 !== currentIndex) {
        // choose an element at random
        randomIndex = Math.floor(Math.random() *
          currentIndex);
        currentIndex -= 1;
  
        // switch current and random element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };
  
    const displayCards = cardArray => {
      cardArray.forEach(function(card) {
  
        // add cards to game board
        $("#game-board").append(card.html);
  
        // add click listeners
        $(card.id).click(function() {
  
          // start timer on first click
          if (!gameStarted) {
  
            // start timer
            gameTimer();
            gameStarted = true;
          }
  
          // check for match when clicked
          checkMatch(card);
        });
      });
    };
  const checkMatch = card => {
   if (!click1.name) {
     click1 = card;
     $(card.id).addClass("flipped");
     return;
   
    } else if (!click2.name && click1.id !==card.id) {
      click2 = card;
      $(card.id).addClass("flipped");
  
  
    }
  }
  
  })();