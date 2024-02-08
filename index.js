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

// Fonction pour initialiser la grille
function initializeGrid() {
    Grid.domGrid = document.querySelector(".container");

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            Grid.domGrid.appendChild(GridItem.create(i, j));
        }
    }
}

// Module de glisser-déposer
const Dragging = {
    startX: 0,
    startY: 0
};

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

    window.addEventListener('mouseup', function () {
        element.style.zIndex = "auto";
        element.removeEventListener('mousemove', handleMouseMove, false);
        element.setAttribute('data-translate-x', getTranslateXY(element).translateX);
        element.setAttribute('data-translate-y', getTranslateXY(element).translateY);
    }, false);
}

// Gestionnaire pour le mouvement de la souris pendant le glisser-déposer
function handleMouseMove(e) {
    let element = e.currentTarget;
    let currentTranslateX = parseInt(element.getAttribute('data-translate-x') || 0);
    let currentTranslateY = parseInt(element.getAttribute('data-translate-y') || 0);

    let translateX = currentTranslateX + (e.pageX - Dragging.startX);
    let translateY = currentTranslateY + (e.pageY - Dragging.startY);

    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

// Module d'élément de grille
const GridItem = {
    create: function (rowIndex, colIndex) {
        const element = document.createElement("div");
        element.className = `gridItem item${rowIndex}${colIndex}`;
        element.dataset.rowIndex = rowIndex;
        element.dataset.colIndex = colIndex;
        return element;
    }
};

// Module d'initialisation
function init() {
    initializeGrid();
    initEvents();
}

// Fonction pour initialiser les événements
function initEvents() {
    window.addEventListener('mousedown', handleDragStart, false);
}

// Module de route
const Route = {
    create: function (top, left, width, bottom) {
        const element = document.createElement("div");
        element.className = "route";
        element.innerHTML = "route";
        return element;
    },
    setLeft: function (element, value) {
        element.style.left = value + 'px';
    },
    setTop: function (element, value) {
        element.style.top = value + 'px';
    },
    setWidth: function (element, value) {
        element.style.right = value + 'px';
    },
    setBottom: function (element, value) {
        element.style.bottom = value + 'px';
    }
};

// Initialisation
window.addEventListener("load", init);
