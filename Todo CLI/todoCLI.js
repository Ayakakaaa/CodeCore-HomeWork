const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('  Welcome to Todo CLI! \n ------------------------ ');  

function menu (){
    const option = `(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n `
    rl.question(option, answer => {
        if(answer === 'v') return view();
        else if(answer === 'n') return add();
        else if(answer.includes('c')) return complete(answer);
        else if(answer[0] === 'd') return del(answer);
        else if(answer === 'q') return quit();
        else {
            console.log(`no option for that :(`);
            return menu();
        }
    });
};

let checkBox = `[ ]`;
let lists = [];

function view () {
    if(lists.length <= 0) console.log('list is empty....');
    else{
        lists.forEach((list, index) => {
            console.log(`${index} ${list}\n`);
        });
    }
    return menu();
}

function add () {
    rl.question(`what?\n`, answer => {
        let list = `${checkBox}${answer}`
        lists.push(list);
        return menu();
    });
}
    
function complete (answer) {
    //string to number
    let num = parseInt(answer.substr(1));
    //check the box
    if(num < lists.length){
        lists[num] = lists[num].replace("[ ]","[✓]")
        console.log(`Completed "${lists[num].substr(4)}"`)
    }
    else {
        console.error("incorrect number");
    }
    return menu();
}
   
//delete function
function del (answer) {
    let num = parseInt(answer.substr(1));
    if(num < lists.length){
            console.log(`Deleted ${lists[num].substr(4)}\n`);
            lists.splice(num, 1);
    }
    else {
        console.error("incorrect number");
    }
    return menu();
};

function quit () {
    console.log(`See you soon!`);
    rl.close();
}

menu();
