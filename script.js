var colorValues = {
    red: '00',
    green: '00',
    blue: '00'
};
var currentColor = "#000000";
var currentColorValue = "🎨#000000";
var mouseIsClicked = false;
convertToHexadecimal('red');
convertToHexadecimal('green');
convertToHexadecimal('blue');
function renderNewColor() {
    currentColor = '#' + colorValues.red + colorValues.green + colorValues.blue;
    // document.getElementById('currentColorSample').style.backgroundColor = currentColor;
    var currentColorSampleElement = document.getElementById('currentColorSample');
    if (currentColorSampleElement) {
        currentColorSampleElement.style.backgroundColor = currentColor;
    }
    // document.getElementById('currentColorValue').innerHTML = '🎨' + currentColor;
    var currentColorValueElement = document.getElementById('currentColorValue');
    if (currentColorValueElement) {
        currentColorValueElement.innerHTML = '🎨' + currentColor;
    }
}
function convertToHexadecimal(colorName) {
    var decimalValue = parseInt(document.getElementById(colorName).value, 10);
    var hexadecimalValue = decimalValue.toString(16).padStart(2, '0');
    colorValues[colorName] = hexadecimalValue;
    renderNewColor();
}
['red', 'green', 'blue'].forEach(function (color) {
    document.getElementById(color).addEventListener('input', function () { return convertToHexadecimal(color); });
});
function createSketchArea() {
    var table = document.createElement("table");
    table.setAttribute("id", "sketchArea");
    //table.style.margin = "0 auto"
    //table.style.border = "1px solid black"
    //table.style.margin = "30px"
    table.setAttribute("cellspacing", 0);
    for (var i = 0; i < 16; i++) {
        var row = table.insertRow(i);
        var _loop_1 = function (j) {
            var cell = row.insertCell(j);
            cell.innerHTML = "&nbsp";
            cell.className = "not-selectable";
            cell.style.width = "50px";
            cell.style.height = "50px";
            cell.style.border = "0px";
            cell.style.padding = "0px";
            cell.style.margin = "0px";
            cell.addEventListener("pointerdown", function (e) {
                e.preventDefault();
                mouseIsClicked = true;
                cell.style.backgroundColor = currentColor;
            });
            cell.addEventListener("pointerup", function (e) {
                e.preventDefault();
                mouseIsClicked = false;
            });
            cell.addEventListener("pointerover", function (e) {
                if (mouseIsClicked) {
                    e.preventDefault();
                    cell.style.backgroundColor = currentColor;
                }
            });
            cell.addEventListener("touchmove", function (e) {
                e.preventDefault();
                var target = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
                if (target.tagName === "TD") {
                    target.style.backgroundColor = currentColor;
                }
            });
            document.body.appendChild(table);
        };
        for (var j = 0; j < 16; j++) {
            _loop_1(j);
        }
    }
}
