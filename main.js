let size = 10;   //ヴァン面の大きさ
let firSec = 0; //0: プレイヤーの先行 1: CPUの先行
let turnFlag = 1;   //1:白 2:黒
let paceCount = 0;
let img = new Array("pic/0.bmp", "pic/1.bmp", "pic/2.bmp", "pic/3.bmp");
let array;


function init() {
    let tmp = 0;
    //盤面の大きさ入力
    do {
        tmp = parseInt(window.prompt("4以上50以下の偶数で盤面の大きさを指定してください", "8"));
    } while (isNaN(tmp) || tmp > 50 || tmp < 4 || tmp % 2 == 1);
    size = tmp;

    size += 2;
    array = new Array(size);
    for (let y = 0; y < size; y++) {
        array[y] = new Array(size);
        for (let x = 0; x < size; x++) {
            array[y][x] = 0;
        }
    }
    array[size / 2 - 1][size / 2 - 1] = 1;
    array[size / 2][size / 2] = 1;
    array[size / 2 - 1][size / 2] = 2;
    array[size / 2][size / 2 - 1] = 2;
    for (let i = 0; i < size; i++) {
        array[i][0] = -1;
        array[0][i] = -1;
        array[i][size - 1] = -1;
        array[size - 1][i] = -1;
    }

    for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
            let s = '<img id="' + x + "," + y + '" src=pic/';
            s += array[x][y];
            s += '.bmp' + ' left="' + x * 20 + '" top="' + y * 20 + '" id="pic"/>'
            document.write(s);
        }
        document.write("<br>");
    }

    //先攻後攻決定
    firSec = Math.floor(Math.random() * 2);
    if (firSec == 0) {
        alert("あなたは先攻です");
    } else {
        alert("あなたは後攻です");
    }
}

function describe() {
    for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
            document.getElementById(x + "," + y).src = img[array[x][y]];
        }
    }
}

function count() {
    let w = 0;
    let b = 0;
    for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
            if (array[x][y] == 1) { w++; }
            else if (array[x][y] == 2) { b++ };
        }
    }
    let greet = document.getElementById('p')
    greet.innerHTML = '<h3>白:' + w + ' 黒:' + b + '</h3>'
}

function erase() {
    for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
            if (array[x][y] == 3) {
                array[x][y] = 0;
            }
        }
    }
}

function turnOver() {
    if (turnFlag == 1) { turnFlag = 2; }
    else { turnFlag = 1; }
}

function sw(x, y, h, i) {
    let xx = x, yy = y;
    switch (h) {
        case 0:
            yy = y + i;
            break;
        case 1:
            yy = y - i;
            break;
        case 2:
            xx = x + i;
            break;
        case 3:
            xx = x - i;
            break;
        case 4:
            xx = x + i;
            yy = y + i;
            break;
        case 5:
            xx = x - i;
            yy = y + i;
            break;
        case 6:
            xx = x + i;
            yy = y - i;
            break;
        case 7:
            xx = x - i;
            yy = y - i;
            break;
    }
    return [xx,yy];
}

function find(x, y) {
    let retFlag = false;
    if (array[x][y] != 0) { return false; }
    for (let h = 0; h < 8; h++) {
        for (let i = 1, inFlag = false; ; i++) {
            let xy = sw(x,y,h,i);
            let xx = xy[0], yy = xy[1];
            if (array[xx][yy] < 1 || array[xx][yy] == 3) { break; }
            if (array[xx][yy] != turnFlag) { inFlag = true; }
            if ((array[xx][yy] == turnFlag) && inFlag) { retFlag = true; }
            if ((array[xx][yy] == turnFlag && inFlag == false)) { break; }
        }
    }
    //alert(retFlag);
    return retFlag;
}

function reverse(x, y) {
    if (array[x][y] != 3) { return false; }
    for (let h = 0; h < 8; h++) {
        for (let i = 1, inFlag = false; ; i++) {
            let xy = sw(x,y,h,i);
            let xx = xy[0], yy = xy[1];
            if (array[xx][yy] < 1 || array[xx][yy] == 3) { break; }
            if (array[xx][yy] != turnFlag) { inFlag = true; }
            if ((array[xx][yy] == turnFlag) && inFlag) {
                for (let j = 0; j <= i; j++) {
                    let xxy = sw(x,y,h,j);
                    let xxx = xxy[0], yyy = xxy[1];
                    array[xxx][yyy] = turnFlag;
                }
                break;
            }
        }
    }
    turnOver();
    erase();
    describe();
    count();
    return true;
}

function findAll() {
    erase();
    let flag = false;
    for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
            if (find(x, y)) {
                array[x][y] = 3;
                flag = true;
            }
        }
    }
    describe();
    return flag;
}

function randPick() {
    let xar = new Array();
    let yar = new Array();
    for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
            if (array[x][y] == 3) {
                xar.push(x);
                yar.push(y);
            }
        }
    }
    let rand = Math.floor(Math.random() * xar.length);
    return [xar[rand], yar[rand]];
}

function bot(){
    if(!findAll()){
        turnOver();
        return false;
    }
    let xy = randPick();
    reverse(xy[0], xy[1]);
}

function player(x,y){
    if(!findAll()){
        turnOver();
        bot();
        describe();
        return false;
    }
    return reverse(x, y)
}


function main() {
    init();
    findAll();
    //describe();
    if (firSec == 1) {
        bot();
        findAll();
    }
    document.body.addEventListener("click", function (event) {
        let x = parseInt(event.pageX / 64) + 1;
        let y = parseInt(event.pageY / 64) + 1;

        if (player(x, y)) {
            bot();
        }
        findAll();
    });
}

main();

