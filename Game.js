window.onload = function initpage() {
    "use strict";
    var table = document.getElementById("puzzle");
    var cells = table.getElementsByTagName("td");
    for (var i=0; i<cells.length; i++) {
        cells[i].onclick = tileClick;
    }
}


function swapTiles (selectedCell,destinationCell) {
    selectedImage = selectedCell.firstChild;
    while (selectedImage.nodeName=="#text")
        selectedImage = selectedImage.nextSibling;
    destinationImage = destinationCell.firstChild;
    while (destinationImage.nodeName=="#text")
        destinationImage = destinationImage.nextSibling;
    selectedCell.appendChild(destinationImage);
    destinationCell.appendChild(selectedImage);
    
    if (puzzleIsComplete()) {
        alert("You win!");
    }
}

function cellIsEmpty (cell) {
    var image = cell.firstChild;
    while (image.nodeName=="#text") {
        image = image.nextSibling;
    }
    if (image.alt=="empty")
        return true;
    else
        return false;
}

var tileOrder;

function puzzleIsComplete () {
    var tiles = document.getElementsByTagName("img");
    tileOrder = "";
    for (var i=0;i<tiles.length; i++) {
        var num = tiles[i].src.substr(-6,2);
        if (num!="ty")
            tileOrder+=num;
    }
    if (tileOrder=="010203")
        return true;
    return false;
}

function tileClick () {
    if(cellIsEmpty(this)) {
        alert("Click on a non-empty cell.");
        return;
    }
    
    var currentRow = this.id.charAt(4);
    var currentCol = this.id.charAt(5);
    
    if (currentRow>0) {
        var testRow = Number(currentRow) - 1;
        var testCellId = "cell" + testRow + currentCol; 
        var testCell = document.getElementById(testCellId);
        
        if (cellIsEmpty(testCell)) {
            swapTiles(this,testCell);
            return;
        }
    }
    
    if (currentRow<1) {
        var testRow = Number(currentRow) + 1;
        var testCellId = "cell" + testRow + currentCol; 
        var testCell = document.getElementById(testCellId);
        
        if (cellIsEmpty(testCell)) {
            swapTiles(this,testCell);
            return;
        }
    }
    
    if (currentCol>0) {
        var testCol = Number(currentCol) - 1;
        var testCellId = "cell" + currentRow + testCol; 
        var testCell = document.getElementById(testCellId);
        
        if (cellIsEmpty(testCell)) {
            swapTiles(this,testCell);
            return;
        }
    }
    
    if (currentCol<1) {
        var testCol = Number(currentCol) + 1;
        var testCellId = "cell" + currentRow + testCol; 
        var testCell = document.getElementById(testCellId);
        
        if (cellIsEmpty(testCell)) {
            swapTiles(this,testCell);
            return;
        }
    }

}




