const Grid = {
    array: Array.from({ length: 4 }, () => Array(4).fill(1)),
};

const $ = {
    gridItemContainer: null,
};

const Dragging = {
    startX: 0,
    startY: 0,
};

const ROTATION_ANGLE = 90;
const GRID_ITEM_WIDTH = 115;
const DRAGGABLE_MARGIN = 4;

function init() {
    initModel();
    initView();
    initEvents();
}

function initModel() {
    $.gridItemContainer = document.querySelector(".grid-item-container");
}

function initView() {
    drawGrid();
}

function drawGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $.gridItemContainer.appendChild(GridItem.create(i, j));
        }
    }
}

function initEvents() {
    // window.addEventListener('click', handleRotate, false);    
    // window.addEventListener('touchend', handleRotate, false);
    window.addEventListener('mousedown', handleDragStart, false);
    window.addEventListener('touchstart', handleDragStart, false);
}

function handleDragStart(e) {
    e.preventDefault();    

    const element = getElementFromEvent(e);            

    if (!isValidDraggable(element)) {
        return;
    }    

    if(isValidRotateButton(e.target)) {
        rotateElement(element);
        return;
    }

    Dragging.startX = getEventX(e);
    Dragging.startY = getEventY(e);

    element.style.zIndex = "1000";

    const moveEvent = e.type === 'mousedown' ? 'mousemove' : 'touchmove';
    const endEvent = e.type === 'mousedown' ? 'mouseup' : 'touchend';

    element.addEventListener(moveEvent, handleMove, false);
    window.addEventListener(endEvent, handleEnd, false);
}

function handleMove(e) {
    e.preventDefault();

    const element = getElementFromEvent(e);

    const { currentTranslateX, currentTranslateY, currentRotate } = getCurrentTransformValues(element);

    const translateX = currentTranslateX + (getEventX(e) - Dragging.startX);
    const translateY = currentTranslateY + (getEventY(e) - Dragging.startY);

    element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${currentRotate}deg)`;
}

function handleEnd(e) {
    e.preventDefault();

    const element = getElementFromEvent(e);

    if (!isValidDraggable(element)) {
        return;
    }

    resetDragging(element);

    updateElementPosition(element);

    snapToGrid(element);
}

// function handleRotate(e) {
//     e.preventDefault();

//     const element = e.target;

//     if (element === null || !element.classList.contains('btn-rotate')) {
//         return;
//     }

//     rotateElement(element.parentElement);
// }

function getCurrentTransformValues(element) {
    const currentTranslateX = parseInt(element.getAttribute('data-translate-x') || 0);
    const currentTranslateY = parseInt(element.getAttribute('data-translate-y') || 0);
    const currentRotate = parseInt(element.getAttribute('data-rotate') || 0);

    return { currentTranslateX, currentTranslateY, currentRotate };
}

function getElementFromEvent(e) {    
    return /mouse|click/.test(e.type) ? e.target.parentElement : e/*.targetTouches[0]*/.target.parentElement;
}

function getEventX(e) {
    return /mouse|click/.test(e.type) ? e.pageX : e.targetTouches[0].pageX;
}

function getEventY(e) {
    return /mouse|click/.test(e.type) ? e.pageY : e.targetTouches[0].pageY;
}

function isValidDraggable(element) {
    return element !== null && element.classList.contains('draggable');
}

function isValidRotateButton(element) {
    return element !== null && element.classList.contains('btn-rotate');
}

function resetDragging(element) {
    element.style.zIndex = "auto";
    element.removeEventListener('mousemove', handleMove, false);
    element.removeEventListener('touchmove', handleMove, false);
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

const GridItem = {
    create: function (rowIndex, colIndex) {
        const element = document.createElement("div");
        element.className = `gridItem item${rowIndex}${colIndex}`;
        element.dataset.rowIndex = rowIndex;
        element.dataset.colIndex = colIndex;
        return element;
    }
};

window.addEventListener('load', init);
