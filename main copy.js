
let gridarray = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];

let domGrid = null;
let imgFallWay = null;
let angle = 0;
let initX, initY, firstX, firstY;
let xxx = 0;

var x = 0;
var y = 0;

window.addEventListener("load", (event) => {
    init();
    initEvents();
});

let init = function() {

    domGrid = document.querySelector(".container");
    imgFallWay = interact("#fall-way");

    for (let i = 0; i < 4; i++) {
        
        for (let j = 0; j < 4; j++) {

            domGrid.appendChild(new gridItem(i, j).getElement());
        }
    }
}

let getTranslateXY = function (element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}

let onMouseMove = function(e) {
    
    let element = e.currentTarget;

    console.log("----");
    console.log(element.getAttribute('data-translate-x'));
    console.log(getTranslateXY(element).translateX);
    console.log("----");

    let currentTranslateX = parseInt(element.getAttribute('data-translate-x') || 0);
    let currentTranslateY = parseInt(element.getAttribute('data-translate-y') || 0);

    // currentTranslateX -= element.cl= ientWidth / 2; 

    // console.log("getComputedStyle = "+ window.getComputedStyle(element).getPropertyValue('transform'));

    let translateX = currentTranslateX + (e.pageX - x);
    let translateY = currentTranslateY + (e.pageY - y);
    
    // console.debug('x = ' + x);
    // console.debug('e.pageX = ' + e.pageX);
    console.log(translateX);

    // element.style.transform = 'translate(' + translateX + 'px)';
    // element.setAttribute('data-translate-x', translateX);
    element.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
}

let initEvents = function() {    

    window.addEventListener('mousedown', function(e) {

        e.preventDefault();

        let element = e.target.parentElement;

        if(element === null || element.className !== 'draggable') {
            return;
        }

        console.log(element);

        x = e.pageX;
        y = e.pageY;
        
        console.log('mousedown');

        element.style.zIndex = "1000";

        element.addEventListener('mousemove', onMouseMove, false);

        window.addEventListener('mouseup', function() {
        
            console.log('mouseup');

            element.style.zIndex = "auto";
            element.removeEventListener('mousemove', onMouseMove, false);
            element.setAttribute('data-translate-x', getTranslateXY(element).translateX);
            element.setAttribute('data-translate-y', getTranslateXY(element).translateY);
            // let translateX = x + (e.pageX - x) - e.target.clientWidth / 2;
            // let translateY = y + (e.pageY - y) - e.target.clientHeight / 2;
            // e.target.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
        }, false);

    }, false);

    // Ok good !!
    // document.querySelector('.draggable').addEventListener('mousedown', function(e) {

    //     e.preventDefault();

    //     let element = e.currentTarget;

    //     console.log(element);

    //     x = e.pageX;
    //     y = e.pageY;
        
    //     console.log('mousedown');

    //     element.addEventListener('mousemove', onMouseMove, false);

    //     window.addEventListener('mouseup', function() {
        
    //         console.log('mouseup');
    //         element.removeEventListener('mousemove', onMouseMove, false);
    //         // let translateX = x + (e.pageX - x) - e.target.clientWidth / 2;
    //         // let translateY = y + (e.pageY - y) - e.target.clientHeight / 2;
    //         // e.target.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    //     }, false);
        
    // }, false);            

    // document.querySelector(".draggable").addEventListener('mousedown', function(e) {

    //     e.preventDefault();

    //     x = e.pageX;
    //     y = e.pageY;
       
    //     e.target.addEventListener('mousemove', onMouseMove, false);        
        
    //     window.addEventListener('mouseup', (ev) => {
            
    //         console.log('mouseup');
    //         document.querySelector(".draggable").removeEventListener('mousemove', onMouseMove, false);
    //     }, false);
    
    // }, false);
    
    // document.querySelector(".draggable").addEventListener('mousedown', function(e) {

    //     e.preventDefault();

    //     // console.log(this.offsetLeft);
    //     // console.log(this.offsetTop);

    //     // initX = this.offsetLeft;
    //     // initY = this.offsetTop;
        
    //     firstX = e.pageX;
    //     // firstY = e.pageY;
    
    //     let x = parseFloat(this.getAttribute('data-x') || 0) + e.pageX;
    //     console.log('mousedown = ' + e.pageX);
    //     // console.log('mousedown = ' + x);
    //     // let y = parseFloat(this.getAttribute('data-y') || 0) + e.pageY;

    //     this.setAttribute('data-x', x);

    //     this.addEventListener('mousemove', dragIt, false);
        

        
    //     window.addEventListener('mouseup', function(ev) {
    //         console.log('mouseup = ' + ev.pageX);            
    //         document.querySelector(".draggable").removeEventListener('mousemove', dragIt, false);
    //     }, false);
    
    // }, false);

    function dragIt(e) {                    
        //this.style.transform = 'translate(' + (e.pageX - e.target.width / 2) + 'px';
        this.style.transform = 'translateY(' + (e.pageY) - 255 + 'px';
    }

    // interact(".draggable").draggable({     
    //     inertia: true,  
    //     listeners: {            
    //         move: function(event) {
    //             let element = event.target

    //             // keep the dragged position in the data-x/data-y attributes
    //             let x = (parseFloat(element.getAttribute('data-x')) || 0) + event.dx
    //             let y = (parseFloat(element.getAttribute('data-y')) || 0) + event.dy
    //             let a = (parseFloat(element.getAttribute('data-a')) || 0) + ( event.da || 0)                

    //             // translate the element
    //             element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'
    
    //             // update the posiion attributes
    //             element.setAttribute('data-x', x)
    //             element.setAttribute('data-y', y)
    //             element.setAttribute('data-a', a)
    //         }
    //     }
    // });

}

function getDragAngle(event) {
    var element = event.target;
    var startAngle = parseFloat(element.dataset.angle) || 0;
    var center = {
        x: parseFloat(element.dataset.centerX) || 0,
        y: parseFloat(element.dataset.centerY) || 0,
    };
    var angle = Math.atan2(center.y - event.clientY,
                            center.x - event.clientX);

    return angle - startAngle;
}

function findClosest(numbers, target) {

    let closest = numbers[0]; 
    // Assume the first number is the closest
    let closestDiff = Math.abs(target - closest); 
    
    // Calculate the difference between the target and closest
    for (let i = 1; i < numbers.length; i++) {
       let current = numbers[i];
       let currentDiff = Math.abs(target - current); 
       
       // Calculate the difference between the target and current number
       if (currentDiff < closestDiff) {
          closest = current; 
          
          // Update the closest number
          closestDiff = currentDiff; 
          
          // Update the closest difference
       }
    }
    return closest;
 }

 function getDragAngle(event) {
    var element = event.target;
    var startAngle = parseFloat(element.dataset.angle) || 0;
    var center = {
      x: parseFloat(element.dataset.centerX) || 0,
      y: parseFloat(element.dataset.centerY) || 0,
    };
    var angle = Math.atan2(center.y - event.clientY,
                           center.x - event.clientX);
  
    return angle - startAngle;
  }

class gridItem {

    constructor(rowIndex, colIndex) {
        this.element = document.createElement("div");
        this.element.className = "gridItem item" + `${rowIndex}${colIndex}`;
        this.element.dataset.rowIndex = rowIndex;
        this.element.dataset.colIndex = colIndex;
        // this.element.innerHTML = rowIndex + " - " + colIndex;
    }

    getElement() {
        return this.element;
    }
}


class route {

    constructor(top, left, width, bottom) {
        this.element = document.createElement("div");

        this.element.className = "route";
        this.element.innerHTML = "route";   
        
        // this.setTop(top);
        // this.setLeft(left); 
        // this.setWidth(width);
        // this.setRight(right);
        // this.setBottom(bottom);
    }

    getElement() {        
        return this.element;
    }

    setLeft(value) {
        this.element.style.left = value + 'px';
    }

    setTop(value) {
        this.element.style.top = value + 'px';
    }

    setWidth(value) {
        this.element.style.right = value + 'px';
    }

    setBottom(value) {
        this.element.style.bottom = value + 'px';
    }    
}

// class grid {

// }

// class grid {
    
// }
