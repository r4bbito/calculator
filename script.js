const add = (a,b) => parseFloat(a)+parseFloat(b);
const substract = (a,b) => a-b;
const divide = (a,b) => a/b;
const multiply = (a,b) => a*b;
const turnToPercent = (a) => a/100;
const changeSign = (a) => "" + (-a); 
const backspace = (a) => a.substr(0, a.length-1);
const deleted = (a) => "";
const dot = (a) => a+'.';

function operate(operator, a, b){
    if (operator==="addition")
        return add(a,b);
    if (operator==="minus")
        return substract(a,b);
    if (operator==="multiplication")
        return multiply(a,b);
    if (operator==="division" && b==="0")
        return "You can't do that";
    if (operator==="division")
        return divide(a,b);
}

function change(change, a){
    if (change==="percent")
        return turnToPercent(a);
    if (change==="negative")
        return changeSign(a);
    if (change==="backspace" && a.length===1)
        return deleted(a);
    if (change==="backspace" && a.length===2 && a[0]==="-")
        return deleted(a);
    if (change==="backspace")
        return backspace(a);
    if (change==="clear")
        return deleted(a);
    if (change==="decimal")
        return dot(a);
}

let a = ""; //displayed text on screen
let b = ""; //number put aside in case of operation
let c = ""; //operator to be used for result
let answerStatus = false; //if the current displayed text is an answer from before(Cannot be edited, only operated on)

const content = Array.from(document.querySelectorAll(".button"));
content.forEach(key => key.addEventListener('click', math));

function math(e){
    const screen = document.querySelector("#screen");
    if(e.target.className != "button number" && a==="")
        return;
    if (e.target.className === "button number" && answerStatus===true){
        a === e.path[0].innerText
    }
    if (e.target.className === "button number")
        a = (a!="" && answerStatus===false) ? a+e.path[0].innerText : e.path[0].innerText;
    if (e.target.className === "button change")
        a = change(e.path[0].id, a);
    if (e.target.className === "button operator" && b!=""){
        c = e.path[0].id;
        a = operate(c, b, a);
        answerStatus = true;
        return;
        }
    if (e.target.className === "button operator"){
        b = parseFloat(a);
        a = "";
        c = e.path[0].id;
    }
    if (e.target.className === "button result"){
        console.log(c);
        console.log(b);
        console.log(a);
        a = operate(c, b, a);
        answerStatus = true;
    }

    screen.innerText = a;
    // console.log(a)
    // console.log(e.path[0].innerText)
    // console.log(e.path[0].id)
    // console.log(e.target.className)
}