// Module de la grille
const Grid = {
    array: Array.from({ length: 4 }, () => Array(4).fill(1)),    
};

const $ = {
    gridItemContainer : null
}

// Module de glisser-déposer
const Dragging = {
    startX: 0,
    startY: 0
};

// Constante pour l'angle de rotation
const ROTATION_ANGLE = 90;

// Constante pour la largeur d'un GridItem
const GRID_ITEM_WIDTH = 115;

// Constante pour la marge d'un élément glissable
const DRAGGABLE_MARGIN = 7;

// Module d'initialisation
function init() {
    initModel()    
    initView()
    initEvents();
}

function initModel() {
    $.gridItemContainer = document.querySelector(".grid-item-container");
}

function initView() {
    drawGrid()
}

// Fonction pour initialiser la grille
function drawGrid() {    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $.gridItemContainer.appendChild(GridItem.create(i, j));
        }
    }
}

// Fonction pour initialiser les événements
function initEvents() {
    window.addEventListener('click', handleRotateClick, false);
    window.addEventListener('mousedown', handleDragStart, false);    
}

// Gestionnaire pour le début du glisser-déposer
function handleDragStart(e) {
    e.preventDefault();

    const element = e.target.parentElement;

    if (!isValidDraggable(element)) {
        return;
    }

    Dragging.startX = e.pageX;
    Dragging.startY = e.pageY;

    element.style.zIndex = "1000";

    element.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('mouseup', handleMouseUp, false);
}

function isValidDraggable(element) {
    return element !== null && element.classList.contains('draggable');
}

function handleMouseUp(e) {
    e.preventDefault();

    const element = e.target.parentElement;

    if (!isValidDraggable(element)) {
        return;
    }

    resetDragging(element);

    updateElementPosition(element);

    snapToGrid(element);
}

function resetDragging(element) {
    element.style.zIndex = "auto";
    element.removeEventListener('mousemove', handleMouseMove, false);
}

function updateElementPosition(element) {
    element.setAttribute('data-translate-x', getTranslateXY(element).translateX);
    element.setAttribute('data-translate-y', getTranslateXY(element).translateY);
}

function snapToGrid(element) {
    const currentRotate = parseInt(element.getAttribute('data-rotate') || 0);

    for (const child of $.gridItemContainer.children) {
        if (elementsOverlap(element, child)) {
            const { translateX, translateY } = calculateDockPosition(element, child);
            element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${currentRotate}deg)`;
            break;
        }
    }
}

function calculateDockPosition(element, child) {
    const rect1 = child.getBoundingClientRect();
    const rect2 = element.getBoundingClientRect();
    const dockX = getTranslateXY(element).translateX - (rect2.left - rect1.left) - DRAGGABLE_MARGIN;
    const dockY = getTranslateXY(element).translateY - (rect2.top - rect1.top) - DRAGGABLE_MARGIN;

    return { translateX: dockX, translateY: dockY };
}

// Gestionnaire pour le mouvement de la souris pendant le glisser-déposer
function handleMouseMove(e) {
    e.preventDefault();

    const element = e.currentTarget;

    const { currentTranslateX, currentTranslateY, currentRotate } = getCurrentTransformValues(element);

    const translateX = currentTranslateX + (e.pageX - Dragging.startX);
    const translateY = currentTranslateY + (e.pageY - Dragging.startY);

    element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${currentRotate}deg)`;
}

function getCurrentTransformValues(element) {
    const currentTranslateX = parseInt(element.getAttribute('data-translate-x') || 0);
    const currentTranslateY = parseInt(element.getAttribute('data-translate-y') || 0);
    const currentRotate = parseInt(element.getAttribute('data-rotate') || 0);

    return { currentTranslateX, currentTranslateY, currentRotate };
}

// Gestionnaire pour la rotation lors du clic
function handleRotateClick(e) {
    e.preventDefault();

    const element = e.target;

    if (element === null || !element.classList.contains('btn-rotate')) {
        return;
    }

    const parentElement = element.parentElement;

    rotateElement(parentElement);
}

function rotateElement(parentElement) {
    const currentTranslateX = parseInt(parentElement.getAttribute('data-translate-x') || 0);
    const currentTranslateY = parseInt(parentElement.getAttribute('data-translate-y') || 0);
    const currentRotate = parseInt(parentElement.getAttribute('data-rotate') || 0) + ROTATION_ANGLE;

    parentElement.setAttribute('data-rotate', currentRotate);
    parentElement.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) rotate(${currentRotate}deg)`;
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom - GRID_ITEM_WIDTH / 2 ||
        domRect1.right < domRect2.left - GRID_ITEM_WIDTH / 2 ||
        domRect1.bottom < domRect2.top - GRID_ITEM_WIDTH / 2 ||
        domRect1.left > domRect2.right - GRID_ITEM_WIDTH / 2
    );
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    };
}

// Module d'élément de grille
const GridItem = {
    create: function (rowIndex, colIndex) {
        const element = document.createElement("div");
        element.className = `gridItem item${rowIndex}${colIndex}`;
        element.dataset.rowIndex = rowIndex;
        element.dataset.colIndex = colIndex;
        // element.innerText = `${rowIndex} / ${colIndex}`;
        return element;
    }
};

window.addEventListener('load', init);