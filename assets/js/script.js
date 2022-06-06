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
              <img src="assets/images/${this.image}" class="card-image" alt="Formula 1 drivers image">
            </div>
            <div class="card-front">
              <img src="assets/images/back_face.png" class="card-image" alt="Formula 1 logo">
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
      let randomIndex = Math.floor(Math.random() * newArray.length);
      newArray.splice(randomIndex, 1);
    }
    return newArray;
  };

  const makeCardArray = (data, level) => {
    let array = [];

    // get the correct sized array for level
    let trimmedData = trimArray(data, level);

    // add two of each card to the array
    trimmedData.forEach(function (card) {
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
    cardArray.forEach(function (card) {

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

    } else if (!click2.name && click1.id !== card.id) {
      click2 = card;
      $(card.id).addClass("flipped");

      // updating the moves made by player during the game
      moves++;
      $("#moves").text(moves);

      checkStars();
    } else return;
    if (click1.name === click2.name) {
      foundMatch();

    } else {
      hideCards();
    }
  };

  const foundMatch = () => {
    matches++;
    if (matches === pairs) {
      gameOver();
    }
    // Unbind click functions and reset click objects
    $(click1.id).unbind("click");
    $(click2.id).unbind("click");

    // reset click objects
    click1 = {};
    click2 = {};
  };

  const hideCards = () => {
    // hide cards
    setTimeout(function() {
      $(click1.id).removeClass("flipped");
      $(click2.id).removeClass("flipped");
      // reset click object
      click1 = {};
      click2 = {};
    }, 600);
  };

  const gameOver = () => {
    clearInterval(timer);

    //pause before showing chequred flag modal
    setTimeout(function() {
      $("#winModal").show();
    }, 500);
  };

  const checkStars = () => {
    let currentStars;
    if (moves >= oneStar) {
      currentStars = 1;
    } else if (moves >= twoStar) {
      currentStars = 2;
    } else currentStars = 3;
    if (numStars !== currentStars) {
      displayStars(currentStars);
    }
  };

  const gameTimer = () => {
    let startTime = new Date().getTime();

    // update timer every second
    timer = setInterval(function() {
      var now = new Date().getTime();

      // Find the time elapsed between now and start
      var elapsed = now - startTime;

      // Calculate min and sec
      let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let currentTime = minutes + ":" + seconds;

      $(".clock").text(currentTime);
    }, 750);
  };

  // add stars to game screen and modal
  const displayStars = num => {
    const starImage = '<img src="assets/images/rating-star.png">';
    $(".stars").empty();
    for (let i = 0; i < num; i++) {
      $(".stars").append(starImage);
    }
  };

  // open start modal on load
  $(window).on("load", function() {
    $("#startModal").show();
  });

  // open chequerd flag modal when game is won
  $("#openModal").click(function() {
    $("#winModal").show();
  });

  // close modals when player click outside modal
  $("#winModal #close-win, #overlay").click(function() {
    $("#winModal").hide();
  });

  $("#startModal #close-start, #overlay").click(function() {
    $("#startModal").hide();
  });

  $(".modal").click(function() {
    $(".modal").hide();
  });

  $(".modal-content").click(function(event) {
    event.stopPropagation();
  });

  // modal levels
  $("#easy-level").click(function() {
    startGame(cardData, "easy");
  });

  $("#medium-level").click(function() {
    startGame(cardData, "medium");
  });

  $("#hard-level").click(function() {
    startGame(cardData, "hard");
  });

  // game restart
  $("#restart").click(function() {
    $("#winModal").hide();
    $("#startModal").show();
  });

  const startGame = (cards, level) => {
    // reset game variables
    gameStarted = false;
    moves = 0;
    matches = 0;
    setLevel(level);

    // reset HTML
    $("#game-board").empty();
    
    $(".clock").text("0:00");
    $("#moves").text("0");
    $("#winModal").hide();

    // get cards and start the game
    let cardArray = makeCardArray(cardData, level);

    shuffle(cardArray);
    displayCards(cardArray);
    displayStars(3);
  };
})();