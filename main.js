let round = 3;
let count = 0;

//$('video').playbackRate=x
function rand(max) {
  return Math.floor(Math.random() * max);
}

function greenScreen(across) {
  //display at start and between rounds
  count = 0;
  //document.querySelector(".tiles").classList.add('green-tile');
  document.querySelector(".text").style.color = "#42b420";
  let el = document.querySelectorAll(".tile");
  for (let i = 0; i < across * across; ++i) {
    el[i].style.backgroundColor = "green";
    el[i].style.setProperty("border", "1px solid #2d990c");
  }
  if (document.querySelector(".text").value == 1) {
    document.querySelector(".text").innerHTML =
      "GREAT JOB, YOU MAXED OUT THE AMOUNT OF ROUNDS ";
    document.querySelector(".text").value = 0;
  } else if (round == 4) {
    document.querySelector(".text").innerHTML =
      "CLICK ANY GREEN TILE TO CONTINUE";
  } else if (round == 3) {
    //display "click to advance to next round"
    document.querySelector(".text").innerHTML = "CLICK ANY GREEN TILE TO START";
  }
}

function buildTile(num, across) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("number", num);
  element.setAttribute("bool", false);

  element.addEventListener("click", function () {
    //click and nothing happens cases:
    if (
      element.style.backgroundColor == "red" ||
      element.style.backgroundColor == "aqua"
    ) {
      //click on tile that's already red or blue
      if (document.getElementById("wrongGrid").getAttribute("count") >= 10) {
        //wrong count is more than 10
        //reset wrong tile grid
        let tiles = document.getElementsByClassName("wrong-tile");
        for (let i = 0; i < 10; ++i) {
          tiles[i].style.backgroundColor = "#111111";
        }
        document.getElementById("wrongGrid").setAttribute("count", `0`);
        round = 3;
        document.getElementById("roundnum").innerHTML = "Round: " + round;
        greenScreen(across);
      } else {
        return;
      }
    } else if (element.style.backgroundColor == "green") {
      //it is green , start round
      document.querySelector(".tiles").classList.remove("green-tile");
      setarr = setTiles(across);
      document.querySelector(".text").innerHTML = "       ";
      //get rid of green
      let el = document.querySelectorAll(".tile");
      for (let i = 0; i < across * across; ++i) {
        el[i].style.backgroundColor = "#111111";
        el[i].style.borderColor = "#444444";
        el[i].style.setProperty("border", "1px solid #444444");
      }
      setTimeout(() => {
        let ti = document.querySelectorAll(".tile");
        for (let i = 0; i < across * across; ++i) {
          ti[i].style.backgroundColor = "#111111";
          ti[i].style.setProperty("border", "1px solid #444444");
        }
        for (let i = 0; i < setarr.length; ++i) {
          //set bool value of tile at that index to true
          var str = setarr[i].toString();
          let a = document.querySelector(`[number="${str}"]`);
          a.setAttribute("bool", "true");
        }
      }, 1000);

      //localStorage.setItem('');
      for (let i = 0; i < setarr.length; ++i) {
        //set bool value of tile at that index to true
        var str = setarr[i].toString();
        let a = document.querySelector(`[number="${str}"]`);
        a.style.backgroundColor = "aqua";
      }
    } else if (element.getAttribute("bool") == "true") {
      //if user finds right square
      //update localstorage record
      count++;
      element.style.backgroundColor = "aqua";
      element.setAttribute("bool", "false");
      if (count == round) {
        //all are clicked
        //if it's a high score
        if (round > Number(localStorage.getItem(across.toString()))) {
          localStorage.setItem(across.toString(), round.toString());
          document.getElementById("highScore").innerHTML =
            "Record: " + localStorage.getItem(across.toString());
          //reset wrong grid
        }
        
        round = round + 1;
        document.getElementById("roundnum").innerHTML = "Round: " + round;
        count = 0;
        greenScreen(across);
        //if it's the max round for the level
        if (round == Math.floor((across * across) / 2)) {
          document.getElementById("rad6").checked = true;
          if (across != 9) {
            document.querySelector(".text").value = 1;
            buildFromScratch(across + 1);
          } else {
            document.querySelector(".text").innerHTML =
          "YOU WIN";
          }
        }
      }
    } else if (element.style.backgroundColor != "aqua") {
      //if user clicks wrongs square
      let f = document.getElementById("wrongGrid").getAttribute("count");
      let st = (parseInt(f) + 1).toString();
      document.getElementById("wrongGrid").setAttribute("count", `${st}`);
      document.getElementsByClassName("wrong-tile")[f].style.backgroundColor =
        "red";

      element.style.backgroundColor = "red";
      if (st == 10) {
        document.querySelector(".text").innerHTML =
          "GAME OVER- CLICK ANY TILE TO RESTART";
        document.querySelector(".text").style.color = "red";
        let el = document.querySelectorAll(".tile");
        for (let i = 0; i < across * across; ++i) {
          el[i].style.backgroundColor = "red";
          el[i].style.setProperty("border", "1px solid red");
        }
      }
    }
  });

  return element;
}

function setTiles(across) {
  //set specified number of random tiles to true
  let setarr = [];
  setarr.length = 0;
  let arr = [];
  let x = 1;
  for (let i = 0; i < across * across; ++i) {
    arr[i] = i;
  }
  for (let i = 0; i < round; ++i) {
    let num = 0;
    num = rand(across * across - x);
    setarr.push(arr[num]);
    arr.splice(num, 1);
    x = x + 1;
  }
  return setarr;
}

function resetGrid(across) {
  //call when the user reaches end or gets 10 wrong, staying in same across number
  let tiles = document.querySelectorAll("div.tile");
  for (let i = 0; i < across * across; ++i) {
    tiles[i].setAttribute("bool", "false");
  }
  greenScreen(across);
}

function buildGrid(across) {
  //MAIN GRID
  let tilesContainer = document.querySelector(".tiles");
  while (tilesContainer.firstElementChild) {
    tilesContainer.firstElementChild.remove();
  }
  let dimension = 530 / across;
  tilesContainer.style.setProperty(
    "grid-template-columns",
    "repeat(" + across + ", " + dimension + "px)"
  );
  setarr = setTiles(across); //set which tiles are correct
  for (let i = 0; i < across * across; ++i) {
    let tile = buildTile(i, across); //
    tilesContainer.appendChild(tile);
    //change
    let dimension = 530 / across;
    tile.style.setProperty("height", " " + dimension + "px");
  }
}

function buildWrongGrid() {
  //WRONG TILES GRID
  let wrongTilesContainer = document.querySelector(".wrong-tiles");
  for (let i = 0; i < 10; ++i) {
    const element = document.createElement("div");
    element.classList.add("wrong-tile");
    element.setAttribute("num", i);
    let tile = element;
    wrongTilesContainer.appendChild(tile);
  }
  document.getElementById("wrongGrid").setAttribute("count", `0`);
}

function resetWrongGrid() {
  let tiles = document.querySelectorAll("div.wrong-tile");
  for (let i = 0; i < 10; ++i) {
    tiles[i].style.backgroundColor = "black";
  }
  document.getElementById("wrongGrid").setAttribute("count", `0`);
}

function buildFromScratch(across) {
  //reset
  document.getElementById("r").value = across;
  document.getElementById("highScore").innerHTML =
    "Record: " + localStorage.getItem(across);
  round = 3;
  document.getElementById("roundnum").innerHTML = "Round: " + round;

  buildGrid(across);
  resetWrongGrid();
  greenScreen(across);
}

function build() {
  //localstorage elements
  if (!localStorage.getItem("5")) {
    localStorage.setItem("5", "3");
    localStorage.setItem("6", "3");
    localStorage.setItem("7", "3");
    localStorage.setItem("8", "3");
    localStorage.setItem("9", "3");
  }
  document.getElementById("highScore").innerHTML =
    "Record: " + localStorage.getItem("5");

  document.getElementById("r").value = 5;
  buildWrongGrid();
  let across = 5;
  buildGrid(across);
  document.getElementById("roundnum").innerHTML = "Round: " + round;
  let els = document.getElementsByTagName("input");
  for (let i = 0; i < 5; ++i) {
    els[i].addEventListener("click", function (evt) {
      across = Number(evt.target.value);
      buildFromScratch(across);
    });
  }

  document.querySelector("img.but").addEventListener("click", function (evt) {
    across = Number(evt.target.value);
    resetGrid(across);
    resetWrongGrid();
    round = 3;
    document.getElementById("roundnum").innerHTML = "Round: " + round;
  });
  greenScreen(across);
}

build();