
class Turtle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        // 0 is east, 1 is south, 2 is west, 3 is north
        this.direction = 0;
        // add this step to our history
        this.steps = [[this.x,this.y]];
    }

    forward(n){
        // take n steps forward
        for(let i=0; i<n; i++) {
            // east
            if (this.direction === 0) {
                this.x++;
            }
            // north
            else if (this.direction === 1) {
                this.y++;
            }
            // west
            else if (this.direction === 2) {
                this.x--;
            }
            // south
            else {
                this.y--;
            }
            // add this step to our history
            this.steps.push([this.x,this.y]);
        }
        return this;
    }
 
    right(){
        // if we go over 3(north), we should set the value to 0(east)
        if (this.direction >= 3) {
            this.direction = 0;
        }
        else this.direction++;
        return this;
    }

    left(){
        this.right();
        this.right();
        this.right();
        return this;
    }

    allPoints(){
        return this.steps;
    }

    print(){
        // get min/max values so we know how big of a map to print
        let maxX = 0;
        let maxY = 0;
        let minX = 0;
        let minY = 0;
        for(let step of this.steps) {
            if(step[0] > maxX) {
                maxX = step[0];
            }
            if(step[1] > maxY) {
                maxY = step[1];
            }
            if(step[0] < minX) {
                minX = step[0];
            }
            if(step[1] < minY) {
                minY = step[1];
            }
        }

        // we will use this function many times to see if
        // a set of coordinates are in the array
        const coordExists = (x, y) => {
            for(let step of this.steps) {
                if (step[0] === x && step[1] === y) return true;
            }
            return false;
        }

        // start going through every coordinate
        for(let y=minY; y<=maxY; y++) {
            // print each line
            let line = "";
            for(let x=minX; x<=maxX; x++) {
                if(coordExists(x, y)) {
                    line += "🐢";
                }
                else {
                    line += "∶";
                }
            }
            console.log(line);
        }
        return this;
    }
}
//print!!
// const flash = new Turtle(0, 0).forward(8).left().forward(3);
// console.log(flash.allPoints());
// flash.print();


// <first Stretch>
// $ node turtle.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f

const argv = process.argv[2];
if(typeof argv === "string"){
    takeFromNode(argv)
}
else{
    console.log(`
                             ___-------___
                         _-~~             ~~-_
                      _-~                    /~-_
   /^\\__/^\\         /~  \\                   /    \\
 /|  O|| O|        /      \\_______________/        \\
| |___||__|      /       /                \\          \\
|          \    /      /                    \\          \\
|   (_______) /______/                       \\_________ \\
|         / /         \\                     /            \\
 \\         \\^\\         \\                  /               \\     /
  \\         ||           \\______________/      _-_       //\\__//
   \\       ||------_-~~-_ ------------- \\ --/~   ~\\    || __/
    ~-----||====/~     |==================|       |/~~~~~
      (_(__/  ./     /                    \\_\\      \.
              (_(___/                         \\_____)_)

              TYPE YOUR ORDER!!!!
tX,Y for new Turtle where X & Y are numbers representing the starting x & y coordinates. If this command is not given, begin the turtle at (0, 0).
fN for forward where N is a number representing how many units the turtle moves forward.
r for right
l for left

Ex. $ node turtle.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f
`);


}

function takeFromNode (str){
    const order = argv.split("-");
    let myTurtle;
    if (order[0][0] === "t") {
        const constructor = order.shift().substr(1);
        const coordinates = constructor.split(",");
        const x = parseInt(coordinates[0]);
        const y = parseInt(coordinates[1]);
        myTurtle = new Turtle(x,y);
    }
    else {
        myTurtle = new Turtle(0,0);
    }

    for(let str of order){
        if(str === "r") myTurtle.right();
        else if(str === "l") myTurtle.left();
        else if(str[0] === "f") {
            const num = parseInt(str.substr(1));
            myTurtle.forward(num);
        }
    }
    myTurtle.print();
}
