window.onload = function() {

    let done;
    let count = 50;
    let elementCounter = 0;

    let divs = Array.from(document.getElementsByClassName("window"));

    if(!done) {
        
        divs.forEach(element => {
            
                element.style.top = count + "px";
                if(elementCounter == 0) {
                    count = count + 230;
                } else {
                    count = count + 120;
                }
                elementCounter++;
        });

        done = true;
    }

    divs.forEach(element => {
        dragElement(element);
    });

    // Element Drag referenced from: https://www.w3schools.com/howto/howto_js_draggable.asp
    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;

            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }
}