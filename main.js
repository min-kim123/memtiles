let round = 3;
let count = 0;

let highScore5 = 0;
let highScore6 = 0;
let highScore7 = 0;
let highScore8 = 0;
let highScore9 = 0;

function rand(max) {
    return Math.floor(Math.random() * max);
}

function buildTile(num, across) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("number", num);
    element.setAttribute("bool", false);
    element.addEventListener("click", () => {
      if (element.style.backgroundColor == "green") {//it is green , display blue tiles
        //get rid of green
        let el = document.querySelectorAll(".tile");
        for (let i = 0; i < across*across; ++i) {
            el[i].style.backgroundColor = "#111111"
            el[i].style.borderColor = "#444444"
            el[i].style.setProperty('border', '1px solid #444444')
        }
        let a = document.querySelectorAll(`[bool="true"]`);
        console.log(a)
        //localStorage.setItem('');
        for (let i = 0; i < round; ++i) {
            a[i].style.backgroundColor = "aqua"
        }
        console.log(a)
      }
      else if(element.getAttribute("bool") == "true") {//if it's not green and it's right
          count++;
          console.log(count);
          console.log("clicked");
          element.style.backgroundColor = "aqua";
          element.setAttribute("bool", "false")
          if (count == round) {//all are clicked
            console.log("count equals round")
            round = round+1;
            console.log("round:" + round);
            document.getElementById("roundnum").innerHTML = round;
            count = 0;

            setTiles(across);
            greenScreen(across);
          }
      }
      else if (element.getAttribute("bool") == "false" && element.style.backgroundColor != "aqua"){//not green, not right
        element.style.backgroundColor = "red";
      }
      
    });
    return element;
}

function call() {
    console.log("adfgh")
}

function greenScreen(across) {//display at start and between rounds
  console.log("green screen")
  let el = document.querySelectorAll(".tile");
  for (let i = 0; i < across*across; ++i) {
      el[i].style.backgroundColor = "green"
      el[i].style.setProperty('border', '1px solid #2d990c')
  }

}

function setTiles(across) {//set specified number of random tiles to true
  console.log('setTiles')
  let setarr = [];
  let arr = [];
  let x = 1;
  for (let i = 0; i < across*across; ++i) {
      arr[i] = i;
  }
  console.log(round);
  for (let i = 0; i < round; ++i) {
      let num = 0;
      num = rand(across*across-x);
      setarr.push(arr[num]);
      arr.splice(num, 1);
      x=x+1;
  }
  console.log(setarr);

  for (let i = 0; i < setarr.length; ++i) {//set bool value of tile at that index to true
      var str = setarr[i].toString();
      let a = document.querySelector(`[number="${str}"]`);
      a.setAttribute("bool", "true");
      console.log(a)
  }
}

function buildContainer(across) {
  let tilesContainer = document.querySelector(".tiles");
  while(tilesContainer.firstElementChild) {
    tilesContainer.firstElementChild.remove();
  }
  console.log(across)
  tilesContainer.style.setProperty('grid-template-columns', 'repeat(' + across + ', 102px');
  for (let i = 0; i <across*across; ++i) {
      const tile = buildTile(i, across);
      tilesContainer.appendChild(tile);
  } 
  setTiles(across);
}

function build() {
  let across = 5;
  buildContainer(across);
  document.querySelector("div.btn-dimension").addEventListener("click", function(evt){
    if (evt.target.type === "radio") {
      round = 3;
      console.log(evt.target.value)
      across = evt.target.value;
      buildContainer(across);
      greenScreen(across);
    }
  });
  setTiles(across);
  greenScreen(across);
}
document.querySelectorAll('.button')
  .forEach((button) => {
    //if ()
  });



build();

//localStorage.setItem('');

// setTimeout(() => {
//     let a = document.querySelectorAll(`[bool="true"]`);
//     for (let i = 0; i < round; ++i) {
//     a[i].style.backgroundColor = "444444"
// }


// }, 1000);