let round = 3;
let count = 0;

//$('video').playbackRate=x
function rand(max) {
    return Math.floor(Math.random() * max);
}

function greenScreen(across) {//display at start and between rounds
  count = 0;

  document.querySelector(".text").style.color = "#42b420";
  console.log("green screen")
  let el = document.querySelectorAll(".tile");
  for (let i = 0; i < across*across; ++i) {
    //el[i].classList.add('green-tile');
      el[i].style.backgroundColor = "green"
      el[i].style.setProperty('border', '1px solid #2d990c')}
  if (document.querySelector(".text").value == 1) {
    document.querySelector(".text").innerHTML = "CONGRATS! YOU MAXED OUT THE AMOUNT OF ROUNDS ";
    document.querySelector(".text").value = 0;
  }
  else if (round == 4) {
    document.querySelector(".text").innerHTML = "CLICK ANY GREEN TILE TO CONTINUE";
  }
  else if (round == 3) {//display "click to advance to next round"
    document.querySelector(".text").innerHTML = "CLICK ANY GREEN TILE TO START";
  }
}

function buildTile(num, across) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("number", num);
    element.setAttribute("bool", false);
    
    element.addEventListener("click", function () {
      console.log("clicked")
      //click and nothing happens cases:
      if (element.style.backgroundColor == "red" || element.style.backgroundColor == "aqua") {//click on tile that's already red or blue
        console.log(localStorage.getItem(across.toString()))
        if (document.getElementById("wrongGrid").getAttribute("count") >= 10) {//wrong count is more than 10
          //reset wrong tile grid
          let tiles = document.getElementsByClassName("wrong-tile");
            for (let i = 0; i < 10; ++i) {
              tiles[i].style.backgroundColor = '#111111';
          }
          document.getElementById("wrongGrid").setAttribute("count", `0`)
          round = 3;
          document.getElementById("roundnum").innerHTML = 'Round: '+ round;
          greenScreen(across);
        }
        else {
          return;
        }
      }
      else if (element.style.backgroundColor == "green") {//it is green , start round
        setarr=setTiles(across);
        console.log("clicked wehn green")
        document.querySelector(".text").innerHTML = "       ";
        //get rid of green
        let el = document.querySelectorAll(".tile");
        for (let i = 0; i < across*across; ++i) {
            el[i].style.backgroundColor = "#111111"
            el[i].style.borderColor = "#444444"
            el[i].style.setProperty('border', '1px solid #444444')
        }
        console.log("SETArr", setarr)
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
        //update localstorage record

        count++;
        console.log(count);
        console.log("clicked");
        element.style.backgroundColor = "aqua";
        element.setAttribute("bool", "false")
        console.log(count)
        console.log(round)
        if (count == round) {//all are clicked
          //if it's a high score
          console.log(localStorage.getItem(across.toString()))
          if (round > Number(localStorage.getItem(across.toString()))) {
            console.log("BEAT HS");
            localStorage.setItem(across.toString(), round.toString());
            document.getElementById("highScore").innerHTML = 'Record: '+ localStorage.getItem(across.toString());
            //reset wrong grid
          }
          //if it's the max round for the level
          
          console.log("count equals round")
          round = round+1;
          console.log(round)
          console.log("round:" + round);
          document.getElementById("roundnum").innerHTML = 'Round: '+ round;
          count = 0;
          
          greenScreen(across);
          if (round == Math.floor(across*across/2)) {
            console.log(round)
            document.getElementById('rad6').checked = true;
            if (across != 9) {
              document.querySelector(".text").value = 1;
              res(across+1);
            }
            else {
              //you win!
            }
          }
        }
      }
      else if (element.style.backgroundColor != "aqua"){//if user clicks wrongs square
        let f = document.getElementById("wrongGrid").getAttribute("count")
        let st = (parseInt(f)+1).toString();
        document.getElementById("wrongGrid").setAttribute("count", `${st}`)
        document.getElementsByClassName("wrong-tile")[f].style.backgroundColor = "red"

        element.style.backgroundColor = "red";
        if (st == 10) {
          document.querySelector(".text").innerHTML = "GAME OVER- CLICK ANY TILE TO RESTART";
          document.querySelector(".text").style.color = "red";
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
  let setarr=[]
  console.log('setTiles')
  setarr.length = 0;
  let arr = [];
  let x = 1;
  for (let i = 0; i < across*across; ++i) {
      arr[i] = i;
  }
  console.log('ROUND:' ,round);
  for (let i = 0; i < round; ++i) {
      let num = 0;
      num = rand(across*across-x);
      setarr.push(arr[num]);
      arr.splice(num, 1);
      x=x+1;
  }
  console.log(setarr);
  return setarr;
}

function buildGrid(across) {
  //MAIN GRID
  console.log('buildGrid')
  let tilesContainer = document.querySelector(".tiles");
  while(tilesContainer.firstElementChild) {
    tilesContainer.firstElementChild.remove();
  }
  console.log(across)
  let dimension = 530/across;
  tilesContainer.style.setProperty('grid-template-columns', 'repeat(' + across + ', '+dimension+ 'px)');
  setarr = setTiles(across);//set which tiles are correct
  for (let i = 0; i <across*across; ++i) {
    let tile = buildTile(i, across);//
    tilesContainer.appendChild(tile);
    //change
    let dimension = 530/across;
    tile.style.setProperty('height', ' '+ dimension+ 'px');
  } 
  
}

function buildWrongGrid() {
  //WRONG TILES GRID
  let wrongTilesContainer = document.querySelector(".wrong-tiles");
  while(wrongTilesContainer.firstElementChild) {
    wrongTilesContainer.firstElementChild.remove();
  }
  const element = document.createElement("div");
  
  for (let i = 0; i <10; ++i) {
    const element = document.createElement("div");
    element.classList.add("wrong-tile");
    element.setAttribute("num", i);
    let tile = element;
    wrongTilesContainer.appendChild(tile);
  } 

  document.getElementById("wrongGrid").setAttribute("count", `0`)
}

function res(across) {
  console.log(document.getElementById("r"))
  document.getElementById("r").value = across
  console.log("CLICK")
  document.getElementById("highScore").innerHTML = 'Record: '+ localStorage.getItem(across);
  round = 3;
  document.getElementById("roundnum").innerHTML = 'Round: ' + round;
  buildGrid(across);
  buildWrongGrid();
  //buildGrid2(across);

  greenScreen(across);
}

function build() {
  //localstorage elements
  if (!localStorage.getItem('5')) {
    localStorage.setItem('5', '3')
    localStorage.setItem('6', '3')
    localStorage.setItem('7', '3')
    localStorage.setItem('8', '3')
    localStorage.setItem('9', '3')
  }document.getElementById("highScore").innerHTML = 'Record: '+ localStorage.getItem('5');
  
  document.getElementById("r").value = 5
  buildWrongGrid();
  console.log('build')
  let across = 5;
  buildGrid(across);
  document.getElementById("roundnum").innerHTML = 'Round: '+ round;
  console.log(document.querySelector("div.radio"))
  let els = document.getElementsByTagName("input")
  console.log(els)
  for (let i = 0; i < 5; ++i) {
    els[i].addEventListener("click", function(evt){
      console.log('button')
      across = Number(evt.target.value);
      console.log(across)
      res(across)
  
    });
  }

  
  document.querySelector("img.but").addEventListener("click", function(evt){
    console.log('but')
    across = Number(evt.target.value);
    res(across)
  });
  
  greenScreen(across);
}

build();//start
console.log ("finish")