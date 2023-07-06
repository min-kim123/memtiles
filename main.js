//5, 6, 7, 8, 9
//after user gets all squares turn the grid entirelly green so that user can 
//choose when to move on
let round = 3;
let across = 5;
let count = 0;

let highScore5 = 0;
let highScore6 = 0;
let highScore7 = 0;
let highScore8 = 0;
let highScore9 = 0;

function rand(max) {
    return Math.floor(Math.random() * max);
}

function buildTile(num) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("number", num);
    element.setAttribute("bool", false);
    element.addEventListener("click", () => {
      if (element.style.backgroundColor == "green") {//it is green and greenScreenClicks is 0, display blue tiles
        //get rid of green
        let el = document.querySelectorAll(".tile");
        for (let i = 0; i < across*across; ++i) {
            el[i].style.backgroundColor = "#111111"
            el[i].style.borderColor = "#444444"
            el[i].style.setProperty('border', '1px solid #444444')
        }
        let a = document.querySelectorAll(`[bool="true"]`);
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
          if (count == round) {//all are clicked
            console.log("count equals round")
            round = round+1;
            console.log("round:" + round);
            document.getElementById("roundnum").innerHTML = round;
            count = 0;
            //reset all true to false
            let b = document.querySelectorAll(`[bool="true"]`);
            console.log(b)
            for (let i = 0; i < round-1; ++i) {
              b[i].setAttribute("bool", "false");
            }
            setTiles();
            greenScreen(round);
          }
      }
      
    });
    return element;
}

function call() {
    console.log("adfgh")
}

function greenScreen(round) {//display at start and between rounds
  console.log("green screen")
  let el = document.querySelectorAll(".tile");
  for (let i = 0; i < across*across; ++i) {
      el[i].style.backgroundColor = "green"
      el[i].style.setProperty('border', '1px')
  }

}

function setTiles() {//set specified number of random tiles to true
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

function build() {
    
    let greenScreenClicks = 0; 
    
    let tilesContainer = document.querySelector(".tiles");
    tilesContainer.style.setProperty('grid-template-columns', 'repeat(' + across + ', 102px');

    for (let i = 0; i <across*across; ++i) {
        const tile = buildTile(i, round, greenScreenClicks);
        tilesContainer.appendChild(tile);
    } 
    setTiles();
    greenScreen(greenScreenClicks);
}



document.querySelectorAll('.button')
  .forEach((button) => {
    //if ()
  });


// let tilesContainer = document.querySelector(".tiles");
// tilesContainer.style.setProperty('grid-template-columns', 'repeat(' + across + ', 102px')
// let a = document.querySelectorAll(`[bool="true"]`);
build();

//localStorage.setItem('');
/*
for (let i = 0; i < round; ++i) {
    a[i].style.backgroundColor = "aqua"
}
console.log(a)

setTimeout(() => {
    let a = document.querySelectorAll(`[bool="true"]`);
    for (let i = 0; i < round; ++i) {
    a[i].style.backgroundColor = "444444"
}


}, 1000);

//document.getElementById("roundnum").innerHTML = round;*/
