// Module de la grille
const Grid = {
    array: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ],
    domGrid: null
};

// Module de glisser-déposer
const Dragging = {
    startX: 0,
    startY: 0
};

// Module d'initialisation
function init() {
    initializeGrid();
    initEvents();
}

// Fonction pour initialiser la grille
function initializeGrid() {
    Grid.domGrid = document.querySelector(".container");

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            Grid.domGrid.appendChild(GridItem.create(i, j));
        }
    }
}

// Fonction pour initialiser les événements
function initEvents() {
    window.addEventListener('click', handleRotateClick, false);
    window.addEventListener('mousedown', handleDragStart, false);
}

// Initialisation
window.addEventListener("load", init);

// Gestionnaire pour le début du glisser-déposer
function handleDragStart(e) {
    e.preventDefault();

    let element = e.target.parentElement;

    if (element === null || element.className !== 'draggable') {
        return;
    }

    Dragging.startX = e.pageX;
    Dragging.startY = e.pageY;

    element.style.zIndex = "1000";

    element.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('mouseup', handleMouseUp, false);
}

function handleMouseUp(e) {
    e.preventDefault();

    let element = e.target.parentElement;
        
    if (element === null || element.className !== 'draggable') {
        return;
    }

    element.style.zIndex = "auto";
    element.removeEventListener('mousemove', handleMouseMove, false);
    
    element.setAttribute('data-translate-x', getTranslateXY(element).translateX);
    element.setAttribute('data-translate-y', getTranslateXY(element).translateY);    
    let currentRotate = parseInt(element.getAttribute('data-rotate') || 0)

    // console.log(e.target);    

    for (const child of Grid.domGrid.children) {

        if(elementsOverlap(element, child)) {

            //console.debug(child.dataset.rowIndex + ' / ' + child.dataset.colIndex);

            const rect1 = child.getBoundingClientRect();
            const rect2 = element.getBoundingClientRect();
            
            let dockX = getTranslateXY(element).translateX - (rect2.left - rect1.left) - 7;
            let dockY = getTranslateXY(element).translateY - (rect2.top- rect1.top) - 7;
            
            element.style.transform = `translate(${dockX}px, ${dockY}px) rotate(${currentRotate}deg)`;
            
            break;
        }
    }
}

// Gestionnaire pour le mouvement de la souris pendant le glisser-déposer
function handleMouseMove(e) {
    
    e.preventDefault();

    let element = e.currentTarget;

    let currentTranslateX = parseInt(element.getAttribute('data-translate-x') || 0);
    let currentTranslateY = parseInt(element.getAttribute('data-translate-y') || 0);
    let currentRotate = parseInt(element.getAttribute('data-rotate') || 0)

    let translateX = currentTranslateX + (e.pageX - Dragging.startX);
    let translateY = currentTranslateY + (e.pageY - Dragging.startY);

    element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${currentRotate}deg)`;
}

// Gestionnaire pour le mouvement de la souris pendant le glisser-déposer
function handleRotateClick(e) {

    e.preventDefault();

    let element = e.target;

    if (element === null || !element.classList.contains('btn-rotate')) {
        return;
    }

    let parentElement = element.parentElement;
    let currentTranslateX = parseInt(parentElement.getAttribute('data-translate-x') || 0);
    let currentTranslateY = parseInt(parentElement.getAttribute('data-translate-y') || 0);
    let currentRotate = parseInt(parentElement.getAttribute('data-rotate') || 0) + 90;

    parentElement.setAttribute('data-rotate', currentRotate);
    parentElement.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) rotate(${currentRotate}deg)`;
}

function elementsOverlap(el1, el2) {

    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    // console.log(domRect2);

    return !(
        domRect1.top > domRect2.bottom - 115 / 2 ||
        domRect1.right < domRect2.left - 115 / 2 ||
        domRect1.bottom < domRect2.top - 115 / 2 ||
        domRect1.left > domRect2.right - 115 / 2
    );
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}

// Module d'élément de grille
const GridItem = {
    create: function (rowIndex, colIndex) {
        const element = document.createElement("div");
        element.className = `gridItem item${rowIndex}${colIndex}`;
        element.dataset.rowIndex = rowIndex;
        element.dataset.colIndex = colIndex;
        element.innerText = `${rowIndex} / ${colIndex}`;        
        return element;
    }
};
