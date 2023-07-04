

//5, 6, 7, 8, 9
//after user gets all squares turn the grid entirelly green so that user can 
//choose when to move on

function build() {
    let count = 0;
    let across = 5;
    let arr = [];
    let round = 7;
    let setarr = [];
    let x = 1;
    let num = 0;
    let tilesContainer = document.querySelector(".tiles");
    tilesContainer.style.setProperty('grid-template-columns', 'repeat(' + across + ', 102px')

    function rand(max) {
        return Math.floor(Math.random() * max);
    }
    function setBool() {
        for (let i = 0; i < round; ++i) {
            document.querySelector('[num=""');
        }
    }
    function setNums() {//get array of chosen nums
        
        for (let i = 0; i < across*across; ++i) {
            arr[i] = i;
            console.log(arr[i]);
        }
        for (let i = 0; i < round; ++i) {
            num = rand(across*across-x);
            console.log(num);
            console.log(arr[num]);
            setarr.push(arr[num]);
            arr.splice(num);
            console.log(arr);
            console.log(arr[num]);
            console.log(arr[num+1]);
            for (let i = num; i < across*across-x-1; ++i) {
                arr[i] = arr[i+1];
                console.log(arr[i]);
                console.log(arr[i+1]);
                console.log(arr[i+2]);
            }
            x=x-1;
        }
        
        for (let i = 0; i < round; ++i) {
            console.log(setarr[i]);
        }
        
        for (let i = 0; i < across*across; ++i) {

        }
    }
    function buildTile(num) {
        const element = document.createElement("div");
        element.classList.add("tile");
        element.setAttribute("number", num);
        element.setAttribute("bool", false);

        element.addEventListener("click", () => {
            if(element.getAttribute("bool") == "false") {//if its right
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
    setNums();
    for (let i = 0; i <across*across; ++i) {
        const tile = buildTile(i);
        tilesContainer.appendChild(tile);
        
    
    } 
    //round back to 1
    

}
//main
build();
//document.getElementById("roundnum").innerHTML = round;