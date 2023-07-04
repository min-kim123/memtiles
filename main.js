//5, 6, 7, 8, 9
//after user gets all squares turn the grid entirelly green so that user can 
//choose when to move on

function rand(max) {
    return Math.floor(Math.random() * max);
}

function buildTile(num, count, round) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("number", num);
    element.setAttribute("bool", false);
    element.addEventListener("click", () => {
        if(element.getAttribute("bool") == "true") {//if its right
            count++;
            console.log("clicked");
            element.style.backgroundColor = "aqua";
        }
        if (count == round) {
            round = round+1;
            document.getElementById("roundnum").innerHTML = round;
        }
    });
    return element;
}
let round = 12;
let setarr = [];

function build() {
    let count = 0;
    let across = 5;
    let arr = [];
    let tilesContainer = document.querySelector(".tiles");
    tilesContainer.style.setProperty('grid-template-columns', 'repeat(' + across + ', 102px')
    
    for (let i = 0; i <across*across; ++i) {
        const tile = buildTile(i, count, round);
        tilesContainer.appendChild(tile);
    } 
    let x = 1;
    for (let i = 0; i < across*across; ++i) {
        arr[i] = i;
        console.log(arr[i]);
    }
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
build();
setTimeout(() => {

    let a = document.querySelectorAll(`[bool="true"]`);
    for (let i = 0; i < round; ++i) {
        a[i].style.backgroundColor = "aqua"
    }
    console.log(a)


}, 1000);
//document.getElementById("roundnum").innerHTML = round;