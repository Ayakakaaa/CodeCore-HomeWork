
let args = process.argv.slice(2);

const drawLine=(n)=>{
    return "_".repeat(n);
};

const drawTopBorder=(n)=>{
    return "┌" + "▔".repeat(n) + "┐";
};

const drawMiddleBorder=(n)=>{
    return "├" + "-".repeat(n) + "┤";
};
 
const drawBottomBorder=(n)=>{
    return "|" + "_".repeat(n) + "|";
};

const drawBarsAround=(str)=>{
    return "|" + str + " ".repeat(n-str.length) + "|";
};

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
   
  return first + result + last 
    
};

boxIt(['Jon Snow', 'Cersei Lannister']);
console.log(boxIt(args));


