let round = 3;
let count = 0;
let wrong = 0;
let setarr = [];
let highScore5 = 3;
let highScore6 = 3;
let highScore7 = 3;
let highScore8 = 3;
let highScore9 = 3;
let highScoreArr = [highScore5, highScore6, highScore7, highScore8, highScore9];

//$('video').playbackRate=x
function rand(max) {
    return Math.floor(Math.random() * max);
}

function greenScreen(across) {//display at start and between rounds
  console.log("green screen")
  let el = document.querySelectorAll(".tile");
  for (let i = 0; i < across*across; ++i) {
      el[i].style.backgroundColor = "green"
      el[i].style.setProperty('border', '1px solid #2d990c')}
  if (round == 3) {//display "click to advance to next round"

  }
}

function buildTile(num, across) {
  console.log('buildTile')
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("number", num);
    element.setAttribute("bool", false);
    element.addEventListener("click", () => {
      console.log("clicked")
      //click and nothing happens cases:
      if (element.style.backgroundColor == "red" || element.style.backgroundColor == "aqua") {//click on tile that's already red or blue
        if (wrong >= 10) {//wrong count is more than 10
          if (round > highScoreArr[across-5]) {
            console.log("BEAT HS");
            document.getElementById("highScore").innerHTML = 'High Score: '+ round;
            highScoreArr[across-5] = round;
          }
                    wrong = 0;
          document.getElementById("wrong").innerHTML = wrong;
          round = 3;
          document.getElementById("roundnum").innerHTML = 'Round: '+ round;
          let string = 'highScore'.concat(across.toString());
          buildContainer(across);
          greenScreen(across);
        }
        else {
          return;
        }
      }
      else if (element.style.backgroundColor == "green") {//it is green , start round
        console.log("clicked wehn green")
        //get rid of green
        let el = document.querySelectorAll(".tile");
        for (let i = 0; i < across*across; ++i) {
            el[i].style.backgroundColor = "#111111"
            el[i].style.borderColor = "#444444"
            el[i].style.setProperty('border', '1px solid #444444')
        }
        setTimeout(() => {
          let ti = document.querySelectorAll(".tile");
          for (let i = 0; i < across*across; ++i) {
            ti[i].style.backgroundColor = "#111111"
            ti[i].style.setProperty('border', '1px solid #444444')

          }
          for (let i = 0; i < setarr.length; ++i) {//set bool value of tile at that index to true
            var str = setarr[i].toString();
            let a = document.querySelector(`[number="${str}"]`);
            a.setAttribute("bool", "true");
            console.log(a)
          }
        }, 1000);
        
        //localStorage.setItem('');
        for (let i = 0; i < setarr.length; ++i) {//set bool value of tile at that index to true
          console.log("make blue")
          var str = setarr[i].toString();
          let a = document.querySelector(`[number="${str}"]`);
          a.style.backgroundColor = "aqua"
          console.log(a)
        }
      }
      else if(element.getAttribute("bool") == "true") {//if user finds right square
          count++;
          console.log(count);
          console.log("clicked");
          element.style.backgroundColor = "aqua";
          element.setAttribute("bool", "false")
          if (count == round) {//all are clicked
            console.log("count equals round")
            round = round+1;
            console.log("round:" + round);
            document.getElementById("roundnum").innerHTML = 'Round: '+ round;
            count = 0;
            setTiles(across);
            greenScreen(across);
          }
      }
      else if (element.style.backgroundColor != "aqua"){//if user clicks wrongs square
        element.style.backgroundColor = "red";
        wrong++;
        document.getElementById("wrong").innerHTML = wrong;
        if (wrong == 10) {
          console.log("green screen")
          let el = document.querySelectorAll(".tile");
          for (let i = 0; i < across*across; ++i) {
              el[i].style.backgroundColor = "red"
              el[i].style.setProperty('border', '1px solid red')
          }
        }
      }
    });
    return element;
}

function setTiles(across) {//set specified number of random tiles to true
  console.log('setTiles')
  setarr.length = 0;
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
}

function buildContainer(across) {
  console.log('buildContainer')
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
  console.log('build')
  let across = 5;
  buildContainer(across);
  document.getElementById("roundnum").innerHTML = 'Round: '+ round;
  document.querySelector("div.btn-dimension").addEventListener("click", function(evt){
    if (evt.target.type === "radio") {
      wrong = 0;
      round = 3;
      document.getElementById("roundnum").innerHTML = 'Round: ' + round;
      document.getElementById("wrong").innerHTML = wrong;
      console.log(evt.target.value)
      across = evt.target.value;
      buildContainer(across);
      greenScreen(across);
    }
  });
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