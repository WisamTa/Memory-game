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
        
      
    }
  
  
  })();