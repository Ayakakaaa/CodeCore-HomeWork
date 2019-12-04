#!/usr/bin/env node

const csvSolution = () => {
  // include the libary
  const fs = require('fs') 
  // read the file
  fs.readFile(args[0], (err, data) => { 
      if (err) throw err; 
      // save the file contents
      const ag = data.toString();
      // run our normal function with the contents
      console.log(boxIt2(ag));
  });
}

const boxIt2 = (str) =>{
//   create 2 dimentional array
let a = str.split("\n");
let arrS = [];
for (i=0; i<a.length; i++){
  let arr = a[i].split(",");
  arrS.push(arr)
};

// check the column and row lengths
const columns = arrS[0].length;
const rows = arrS.length;

// create an array with every column length.
// this should be the max characters in the column.
const columnLengths = [];
for (let i=0; i<columns; i++) {
    let max = 0;
    for (let j=0; j<rows; j++) {
        if (arrS[j][i].length > max) {
            max = arrS[j][i].length;
        }
    }
    columnLengths.push(max);
}

// we will use this pattern 3 times so save it as a function
// the code is getting long so this will help clean it up and keep it legible 
const createLine = (beginning, middle, end) => {
  let str = beginning; 
  for (let i=0; i<columnLengths.length; i++) {
    str += "-".repeat(columnLengths[i]);
    if (i<columnLengths.length-1) {
        str += middle;
    }
    else {
        str += end;
    }
  }
  str += "\n";
  return str
}

let first = createLine("┌", "┬", "┐"); 
let last = createLine("└", "┴", "┘"); 

let result = "";
// for each row, print the line with the correct amount of spacing
// by doing this with each row, it means we can have any number of columns/rows
// in our csv file.
for (index in arrS){
    result+="|";
    // add the line with each column
    for (let j=0;j<arrS[index].length; j++) {
      result += arrS[index][j] + " ".repeat(columnLengths[j]-arrS[index][j].length) + "|";
    } 
    result += "\n";
    // add the dividing line
    if(index < arrS.length-1){
      result += createLine("├", "┼", "┤");
  }
}
return first + result + last ;
};

// First check to see if we should process for a csv or not
const args = process.argv.slice(2);
// If there's no argument return an error
if (args.length < 1) return console.log("please add a csv file");
// if the first argument has .csv in it, then run it like a csv file
if (args.length < 2 && args[0].includes(".csv")) {
  csvSolution();
}
// otherwise run it like the normal one
else {
  // turn the arguments into a single string (csv format)
  let str = args.join("\n");
  console.log(boxIt2(str));
}




