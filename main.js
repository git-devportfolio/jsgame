
let gridarray = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];

let domGrid = null;
let imgFallWay = null;
let angle = 0;

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

let initEvents = function() {    

    domGrid.addEventListener('click', function(e) {

        // console.log(e);    
        // console.log(e.target.getBoundingClientRect());
        

        // let elTarget = e.target;
        // let elTargetBound = elTarget.getBoundingClientRect();

        // let hRoute = new route(0, 0, 100, 50);
        // let vRoute = new route(0, 0, 100, 50);

        // let h = hRoute.getElement();
        // let v = vRoute.getElement();

        // let css = window.getComputedStyle(elTarget);

        // h.style.width = (elTarget.offsetWidth * 2) + (parseFloat(css['margin-left']) * 2) + 'px';
        // h.style.height = elTarget.offsetHeight + 'px';                

        // v.style.width = elTarget.offsetWidth + 'px';
        // v.style.height = (elTarget.offsetHeight * 2) + (parseFloat(css['margin-top']) * 2) + 'px';        

        // elTarget.appendChild(h);
        // elTarget.appendChild(v);

        // let elTo = document.querySelector(".item12");
        // let elToBound = elTo.getBoundingClientRect();

        // let hRoute = new route(elTargetBound.top, elTargetBound.left, elTargetBound.x, 0);

        // let el = e.target.getBoundingClientRect();

        // let rowIndex = Number(e.target.dataset.rowIndex);
        // let colIndex = Number(e.target.dataset.colIndex);

        // console.log(rowIndex);
        // console.log(colIndex);
        
        // console.log(rowIndex + 1);
        // console.log(colIndex + 1);

        // let elHSelector = '' + rowIndex + (colIndex + 1);
        
        // console.log(elHSelector);
        
        // let elH = document.querySelector('.item' + elHSelector);
        // let rectH = elH.getBoundingClientRect();


        
        // let vRoute = new route().getElement();
        
        // domGrid.appendChild(hRoute.getElement());
    });
    
    // interact(".rotate-btn").draggable({
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

    document.querySelector(".rotate-btn").addEventListener("click", function(event)  {

        let element = event.target.parentElement;

        // keep the dragged position in the data-x/data-y attributes
        let x = (parseFloat(element.getAttribute('data-x')) || 0);
        let y = (parseFloat(element.getAttribute('data-y')) || 0);
        let a = (parseFloat(element.getAttribute('data-a')) || 0) + 90;

        
        // translate the element
        element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'

        // update the posiion attributes
        element.setAttribute('data-x', x)
        element.setAttribute('data-y', y)
        element.setAttribute('data-a', a)
    });

    interact(".draggable").draggable({     
        inertia: true,  
        listeners: {            
            move: function(event) {
                let element = event.target

                // keep the dragged position in the data-x/data-y attributes
                let x = (parseFloat(element.getAttribute('data-x')) || 0) + event.dx
                let y = (parseFloat(element.getAttribute('data-y')) || 0) + event.dy
                let a = (parseFloat(element.getAttribute('data-a')) || 0) + ( event.da || 0)

                
                // translate the element
                element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'
    
                // update the posiion attributes
                element.setAttribute('data-x', x)
                element.setAttribute('data-y', y)
                element.setAttribute('data-a', a)
            }
        }
    }).gesturable({
        listeners: {
            move (event) {
                // let element = event.target
    
                // // keep the dragged position in the data-x/data-y attributes
                // let x = (parseFloat(element.getAttribute('data-x')) || 0) + event.dx
                // let y = (parseFloat(element.getAttribute('data-y')) || 0) + event.dy
                // let a = (parseFloat(element.getAttribute('data-a')) || 0) + ( event.da || 0)
                // a = a % 360;

                // // translate the element
                // element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'
    
                // // update the posiion attributes
                // element.setAttribute('data-x', x)
                // element.setAttribute('data-y', y)
                // element.setAttribute('data-a', a)
    
                // document.getElementById('angle-info').textContent = a.toFixed(2) + '\u00b0'
            },
            end (event)  {

                // let element = event.target
    
                // // keep the dragged position in the data-x/data-y attributes
                // let x = (parseFloat(element.getAttribute('data-x')) || 0) + event.dx
                // let y = (parseFloat(element.getAttribute('data-y')) || 0) + event.dy
                // let a = (parseFloat(element.getAttribute('data-a')) || 0) + ( event.da || 0)                
                // a = findClosest([0, 90, 180, 270, 360], a)

                // // translate the element
                // element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'
    
                // // update the posiion attributes
                // element.setAttribute('data-x', x)
                // element.setAttribute('data-y', y)
                // element.setAttribute('data-a', a)

                // let element = event.target;
                // let a = parseFloat(element.getAttribute('data-a')) || 0;
                // //a = Math.abs(a) % 360;
                
                // // let a = event.angle.toFixed(2);
                // document.getElementById('angle-info').textContent =  a.toString() + '\u00b0'
            }
        }
      });
      
    // imgFallWay.addEventListener('touchmove', function(e) {
    //     // grab the location of touch
    //     var touchLocation = e.targetTouches[0];
        
    //     console.log(touchLocation);
    //     // assign box new coordinates based on the touch.
    //     imgFallWay.style.left = touchLocation.pageX + 'px';
    //     imgFallWay.style.top = touchLocation.pageY + 'px';
    //   })
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
