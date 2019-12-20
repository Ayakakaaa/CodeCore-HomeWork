const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// const json = require(`./myTodos.json`)
const json = `myTodos.json`;
const fs = require('fs');

const argv = process.argv[2];
// console.log("json ", typeof json);

let checkBox = `[ ]`;
let lists = [];


if(argv && argv.includes(`.json`)){
    fs.readFile(json,(err, data) => {
        const arr = JSON.parse(data);
        console.log(arr);
        if(err){
            throw err;
        } 
        else{
            for(let obj of arr){
                if(obj["completed"] === true) checkBox = `[✓]`;
                else checkBox = `[ ]`;
                lists.push(`${checkBox} ${obj[`title`]}`);
            }
            return menu();
            }
    });
}
else menu();

console.log('  Welcome to Todo CLI! \n ------------------------ ');  

function menu (){
    const option = `(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n `
    rl.question(option, answer => {
        if(answer === 'v') return view();
        else if(answer === 'n') return add();
        else if(answer.includes('c')) return complete(answer);
        else if(answer[0] === 'd') return del(answer);
        else if(answer === 'q') return quit();
        else if(answer === `s`) return save();
        else return console.log(`no option for that :(`)
    });
};

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
        let list = `${checkBox} ${answer}`
        lists.push(list);
        return menu();
    });
}
    
function complete (answer) {
    //string to number
    let num = parseInt(answer.substr(1));
    //check the box
    lists[num] = lists[num].replace("[ ]","[✓]")
    console.log(`Completed "${lists[num].substr(4)}"`)
    return menu();
}
   
//delete function
function del (answer) {
    let num = parseInt(answer.substr(1));
            console.log(`Deleted ${lists[num].substr(4)}\n`);
            lists.splice(num, 1);
    return menu();
};

function save(){
    rl.question(`where?\n`, answer => {
        if(answer !== " " && answer.includes(`.json`)){
            let result = [];
            let obj = {};
            for (let list of lists){
                if(list.includes("✓")){
                    obj["completed"] = true;
                    obj["title"] = list.substr(4);
                }
                else {
                    obj["completed"] = false;
                    obj["title"] = list.substr(4);
                }
                result.push(obj);
            }
            const json = JSON.stringify(result);

            fs.writeFile(answer, json, err => {
                if (err) {
                    console.error(err);
                    return;
                }
                else if(result.length < 0){
                    console.log(`I don't have any list`);
                    return menu();
                }
                else{
                    console.log(`List saved to "${answer}" `);
                }
            });
        }
    });
}

function quit () {
    console.log(`See you soon!`);
    rl.close();
};
