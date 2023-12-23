function getRandomDouble(min , max){
    let randNumber = Math.random() * (max - min) + min;
    return parseFloat(randNumber.toFixed(2));
}

function getRandomInt(min , max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor(){
    let letters = "0123456789ABCDEF";
    
    let color = "#";
    
    for(let i = 0 ; i < 6 ; i++){
        color += letters[getRandomInt(0 , 15)];
    }

    return color;
}

export {getRandomInt , getRandomDouble , getRandomColor};