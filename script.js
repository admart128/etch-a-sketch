let colorValues = {
    red: '00',
    green: '00',
    blue: '00'
};

let currentColor = "#000000"
let currentColorValue = "🎨#000000"
let mouseIsClicked = false

convertToHexadecimal('red');
convertToHexadecimal('green');
convertToHexadecimal('blue');

function renderNewColor() {
    currentColor = '#' + colorValues.red + colorValues.green + colorValues.blue;
    document.getElementById('currentColorSample').style.backgroundColor = currentColor;
    document.getElementById('currentColorValue').innerHTML = '🎨' + currentColor;
}

function convertToHexadecimal(colorName) {
    let decimalValue = parseInt(document.getElementById(colorName).value, 10);
    let hexadecimalValue = decimalValue.toString(16).padStart(2, '0');
    colorValues[colorName] = hexadecimalValue;
    renderNewColor();
}

['red', 'green', 'blue'].forEach(color => {
    document.getElementById(color).addEventListener('input', () => convertToHexadecimal(color));
});

function createSketchArea() {
    let table = document.createElement("table")
    table.setAttribute("id", "sketchArea")
    //table.style.margin = "0 auto"
    //table.style.border = "1px solid black"
    //table.style.margin = "30px"
    table.setAttribute("cellspacing", 0)
    for (let i = 0; i < 16; i++) {
        let row = table.insertRow(i)
        for (let j = 0; j < 16; j++) {
            let cell = row.insertCell(j)
            cell.innerHTML = "&nbsp"
            cell.className = "not-selectable"
            //cell.style.width = "50px"
            //cell.style.height = "50px"
            //cell.style.border = "0px"
            //cell.style.padding = "0px"
            //cell.style.margin = "0px"
            cell.addEventListener("pointerdown",
                function(e) {
                    e.preventDefault()
                    mouseIsClicked = true
                    cell.style.backgroundColor = currentColor
                }
            )
            cell.addEventListener("pointerup",
                function(e) {
                    e.preventDefault()
                    mouseIsClicked = false
                }
            )
            cell.addEventListener("pointerover", 
                function(e) {
                    if (mouseIsClicked) {
                        e.preventDefault()
                        cell.style.backgroundColor = currentColor
                    }
                }
            )
            cell.addEventListener("touchmove",
                function(e) {
                    e.preventDefault()
                    let target = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
                    if(target.tagName === "TD"){
                        target.style.backgroundColor = currentColor;
                    }
                }
            )
            document.body.appendChild(table)
        }
    }
}