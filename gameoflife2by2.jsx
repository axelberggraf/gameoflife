#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";


var grid;
var i = 0;
var cells = [];
var cellBuffer = [];
var n = 0;
var prevCell = [];
var numPages = 100;

var size;

function setup(){

  b.canvasMode(b.MARGIN);
  b.noStroke();
  b.ellipseMode(b.CORNER);

  size = b.width - 1;
  grid = size/20;



  for (var y = 0; y < size; y += grid) {
    for (var x = 0; x <  size; x += grid) {
      if(b.random(10) < 3){
        cellBuffer[i] = 1;
        cells[i] = 1;
      }else{
        cellBuffer[i] = 0;
        cells[i] = 0;
      }
      prevCell[i] = 0;
      i+=1;
    }
  }

}

function draw() {


  // for-loop

  for(var p = 0; p < numPages; p++){
    i = 0;
    for (var y = 0; y < size; y += grid) {
      for (var x = 0; x < size; x += grid) {

        if (cellBuffer[i] == 1) {
          b.fill(0);
          if(prevCell[i] == 0){
            b.ellipse(x,y,grid,grid);
          }else{
            b.rect(x, y, grid, grid);
          }
        }else{

        }
        prevCell[i] = cellBuffer[i];
        cells[i] = cellBuffer[i];
        i += 1;
      }
    }

    i = 0;
    for (var y = 0; y < size; y += grid) {
      for (var x = 0; x < size; x += grid) {
        n = 0;

        if (x>0) {
          n += cells[i-1];
        }
        if (x < (size - grid)) {
          n += cells[i+1];
        }

        if (y > 0) {
          n += cells[((y/grid)-1)*(size/grid) + x/grid];
          if (x>0) {
            n += cells[(y/grid-1)*(size/grid) + x/grid-1];
          }
          if (x < (size - grid)) {
            n += cells[(y/grid-1)*(size/grid) + x/grid+1];
          }
        }

        if (y < (size-grid))
        {
          n += cells[(y/grid+1)*(size/grid) + x/grid];
          if (x>0) {
            n += cells[(y/grid+1)*(size/grid) + x/grid-1];
          }
          if (x < (size - grid)) {
            n += cells[(y/grid+1)*(size/grid) + x/grid+1];
          }
        }
        //alive
        if (cells[i] == 1) {
          if (n == 1 || n==2 || n==5) {
            cellBuffer[i] = 1;
          }else{
            cellBuffer[i] = 0;
          }
        }
        //dead
        else {
          if ( n == 3 || n == 6) {
          cellBuffer[i] = 1;
        } else {
          cellBuffer[i] = 0;
        }
        }

        i += 1;
      }
    }


    b.addPage();
  }

}



b.go();
