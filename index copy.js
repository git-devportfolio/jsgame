
let gridarray = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];

let domGrid = null;
let x = 0;
let y = 0;

window.addEventListener("load", (event) => {
    init();
    initEvents();
});

let init = function() {

    domGrid = document.querySelector(".container");    

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

        }, false);

    }, false);
}    

class gridItem {

    constructor(rowIndex, colIndex) {
        this.element = document.createElement("div");
        this.element.className = "gridItem item" + `${rowIndex}${colIndex}`;
        this.element.dataset.rowIndex = rowIndex;
        this.element.dataset.colIndex = colIndex;        
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