let size = 10;   //ヴァン面の大きさ
let firSec = 0; //0: プレイヤーの先行 1: CPUの先行
let turnFlag = 1;   //1:白 2:黒
let img = new Array("0.bmp","1.bmp","2.bmp","3.bmp");
let array;


function init() {
    let tmp = 0;
    //盤面の大きさ入力
    do{
        tmp = parseInt(window.prompt("4以上50以下の偶数で盤面の大きさを指定してください", "8"));
    }while(isNaN(tmp) || tmp > 50 || tmp < 4 || tmp % 2 == 1);
    size = tmp;
    
    size += 2;
    array = new Array(size);
    for(let y = 0; y < size; y++) {
        array[y] = new Array(size);
        for(let x = 0; x < size; x++) {
            array[y][x] = 0;
        }
    }
    array[size/2-1][size/2-1] = 1;
    array[size/2][size/2] = 1;
    array[size/2-1][size/2] = 2;
    array[size/2][size/2-1] = 2;
    for (let i = 0; i < size; i++) {
        array[i][0] = -1;
        array[0][i] = -1;
        array[i][size-1] = -1;
        array[size-1][i] = -1;
    }
    
    for (let y = 1; y < size-1; y++) {
        for (let x = 1; x < size-1; x++) {
            let s = '<img id="' + x +"," + y + '" src="';
            s += array[x][y];
            s += '.bmp"'+ ' left="' + x * 20 + '" top="' + y * 20 + '" id="pic"/>'
            document.write(s);
        }
        document.write("<br>");
    }

    //先攻後攻決定
    firSec = Math.floor(Math.random() * 2);
    if(firSec == 0){
        alert("あなたは先攻です");
    }else{
        alert("あなたは後攻です");
    }
}

function describe() {
    for (let y = 1; y < size-1; y++) {
        for (let x = 1; x < size-1; x++) {
            document.getElementById(x+","+y).src = img[array[x][y]];
        }
    }
}

function count(){
    let w = 0;
    let b = 0;
    for (let y = 1; y < size-1; y++) {
        for (let x = 1; x < size-1; x++) {
            if(array[x][y] == 1){ w++; }
            else if(array[x][y] == 2){ b++};
        }
    }
    let greet = document.getElementById('p')
    greet.innerHTML = '<h3>白:' + w + ' 黒:' + b + '</h3>'
}

function erase(){
    for (let y = 1; y < size-1; y++) {
        for (let x = 1; x < size-1; x++) {
            if(array[x][y] == 3){
                array[x][y] = 0;
            }
        }
    }
}

function find(x, y) {
    let retFlag = false;
    if(array[x][y] != 0){return false;}
    for(let i = 1,inFlag = false;;i++){
        if(array[x][y+i] < 1 || array[x][y+i] == 3){ break;}
        if(array[x][y+i] != turnFlag){inFlag = true;}
        if((array[x][y+i] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x][y+i] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x][y-i] < 1 || array[x][y-i] == 3){ break;}
        if(array[x][y-i] != turnFlag){inFlag = true;}
        if((array[x][y-i] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x][y-i] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x+i][y] < 1 || array[x+i][y] == 3){ break;}
        if(array[x+i][y] != turnFlag){inFlag = true;}
        if((array[x+i][y] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x+i][y] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x-i][y] < 1 || array[x-i][y] == 3){ break;}
        if(array[x-i][y] != turnFlag){inFlag = true;}
        if((array[x-i][y] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x-i][y] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x+i][y+i] < 1 || array[x+i][y+i] == 3){ break;}
        if(array[x+i][y+i] != turnFlag){inFlag = true;}
        if((array[x+i][y+i] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x+i][y+i] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x-i][y+i] < 1 || array[x-i][y+i] == 3){ break;}
        if(array[x-i][y+i] != turnFlag){inFlag = true;}
        if((array[x-i][y+i] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x-i][y+i] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x+i][y-i] < 1 || array[x+i][y-i] == 3){ break;}
        if(array[x+i][y-i] != turnFlag){inFlag = true;}
        if((array[x+i][y-i] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x+i][y-i] == turnFlag && inFlag == false)) { break;}
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x-i][y-i] < 1 || array[x-i][y-i] == 3){ break;}
        if(array[x-i][y-i] != turnFlag){inFlag = true;}
        if((array[x-i][y-i] == turnFlag) && inFlag){ retFlag = true;}
        if((array[x-i][y-i] == turnFlag && inFlag == false)) { break;}
    }
    //alert(retFlag);
    return retFlag;
}

function reverse(x,y){
    if(array[x][y] != 3){return false;}
    for(let i = 1,inFlag = false;;i++){
        if(array[x][y+i] < 1 || array[x][y-i] == 3){ break;}
        if(array[x][y+i] != turnFlag){inFlag = true;}
        if((array[x][y+i] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x][y+j] = turnFlag;
            }
            break;
        }
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x][y-i] < 1 || array[x][y-i] == 3){ break;}
        if(array[x][y-i] != turnFlag){inFlag = true;}
        if((array[x][y-i] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x][y-j] = turnFlag;
            }
            break;
        }
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x+i][y] < 1 || array[x+i][y] == 3){ break;}
        if(array[x+i][y] != turnFlag){inFlag = true;}
        if((array[x+i][y] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x+j][y] = turnFlag;
            }
            break;
        }
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x-i][y] < 1 || array[x-i][y] == 3){ break;}
        if(array[x-i][y] != turnFlag){inFlag = true;}
        if((array[x-i][y] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x-j][y] = turnFlag;
            }
            break;
        }
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x+i][y+i] < 1 || array[x+i][y+i] == 3){ break;}
        if(array[x+i][y+i] != turnFlag){inFlag = true;}
        if((array[x+i][y+i] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x+j][y+j] = turnFlag;
            }
            break;
        }
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x-i][y+i] < 1 || array[x-i][y+i] == 3){ break;}
        if(array[x-i][y+i] != turnFlag){inFlag = true;}
        if((array[x-i][y+i] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x-j][y+j] = turnFlag;
            }
            break;
        } 
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x+i][y-i] < 1 || array[x+i][y-i] == 3){ break;}
        if(array[x+i][y-i] != turnFlag){inFlag = true;}
        if((array[x+i][y-i] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x+j][y-j] = turnFlag;
            }
            break;
        }
    }
    for(let i = 1, inFlag = false;;i++){
        if(array[x-i][y-i] < 1 || array[x-i][y-i] == 3){ break;}
        if(array[x-i][y-i] != turnFlag){inFlag = true;}
        if((array[x-i][y-i] == turnFlag) && inFlag){
            for(let j = 0; j <= i; j++){
                array[x-j][y-j] = turnFlag;
            }
            break;
        }
    }
    if(turnFlag == 1){ turnFlag = 2;}
    else{turnFlag = 1;}
    erase();
    return true;
}

function findAll(){
    let flag = false;
    for (let y = 1; y < size-1; y++) {
        for (let x = 1; x < size-1; x++) {
            flag = find(x,y) || flag;
            if(find(x,y)){
                array[x][y] = 3;
            }
        }
    }
    
}

function randPick(){
    let xar = new Array();
    let yar = new Array();
    for (let y = 1; y < size-1; y++) {
        for (let x = 1; x < size-1; x++) {
            if(array[x][y] == 3){
                xar.push(x);
                yar.push(y);
            }
        }
    }
    let rand = Math.floor(Math.random() * xar.length);
    return [xar[rand], yar[rand]];
}

function main() {
    init();

    if(firSec == 1){
        findAll();
        describe();
        let xy = randPick();
        reverse(xy[0],xy[1]);
        erase();
    }
    findAll();
    describe();
    
    document.body.addEventListener( "click", function( event ) {
        count();
        let x = parseInt(event.pageX / 64) + 1;
        let y = parseInt(event.pageY / 64) + 1;
        
        if(reverse(x,y)){
            erase();
            describe();
            
            findAll();
            let xy = randPick();
            reverse(xy[0],xy[1]);
            erase();
            findAll();
            describe();
            count();
        }
    } ) ;
}

main();

