// I am adding a comment just to make a change in boxit branch to make a pull request
// Write a drawLine function that takes a number as an argument that returns that number of horizontal bars (i.e. ━) as a string.
const drawLine=(n)=>{
    return "_".repeat(n);
};
// Write three functions: drawTopBorder, drawMiddleBorder and drawBottomBorder. 
// Each function should take a number, return a line of length including corner pieces. 
// You can make use of drawLine to implement these functions.

const drawTopBorder=(n)=>{
    return "┌" + "▔".repeat(n) + "┐";
};

const drawMiddleBorder=(n)=>{
    return "├" + "-".repeat(n) + "┤";
};
 
const drawBottomBorder=(n)=>{
    return "|" + "_".repeat(n) + "|";
};

// Write a drawBarsAround function that takes a string, surrounds it with vertical lines then returns it.
const drawBarsAround=(str)=>{
    return "|" + str + " ".repeat(n-str.length) + "|";
};

// Write a boxIt function that takes an array of strings and returns a string where each is in a single column table. 
// To add "new lines" to a string, use the \n special character. In a string, \n characters will display as new lines when logged with console.log(...).

// Try using the functions you've built previously (e.g. drawBottomBorder, drawBottomBorder, etc) to help you implement this function.
const boxIt=(arr)=>{
    let len = 0;
    for (let name of arr){
        if(name.length >= len) len = name.length;
    };
    let first = "┌" + "-".repeat(len) + "┐" + "\n" ;
    let last = "|" + "_".repeat(len) + "|";
    let result = "";
    for (let i in arr){
      if(i < arr.length -1){
        result += "|" + arr[i] +" ".repeat(len-arr[i].length)+ "|" + "\n" + "├" + "-".repeat(len) + "┤" + "\n"
      }
      else result+= "|" + arr[i] +" ".repeat(len-arr[i].length)+ "|" + "\n";
    }
   
  return first + result+ last;
    
};

// add space each codes then it would look better
boxIt(['Jon Snow', 'Cersei Lannister']);
console.log(boxIt(['Jon Snow', 'Cersei Lannister']))


