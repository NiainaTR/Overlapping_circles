class Circle
{
    #center;
    #radius;
    #color;
    
    constructor(center , radius , color){
        this.#center = center;
        this.#radius = radius;
        this.#color = color;
    }


    getCenter(){
       return this.#center; 
    }

    setRadius(radius){
       this.#radius = radius;
    }

    getRadius(){
        return this.#radius;
    }

    setColor(color){
        this.#color = color;
    }
    
    getColor(){
        return this.#color;
    }
}
class Point
{
    #x;
    #y;

    constructor(x , y){
        this.#x = x;
        this.#y = y;
    }
    
    //getter 
    getPositionX(){
        return this.#x;
    }
    
    getPositionY(){
        return this.#y;
    }

    //setter
    setPositionXY(x , y){
        this.#x = x;
        this.#y = y;
    }
}
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


const boardWidth = 600;
const boardHeight = 500;

const min_radius = 10.0;
const max_radius = 20.0;

const x_min_center = 20.0;
const x_max_center = boardWidth - max_radius;

const y_min_center = 20.0;
const y_max_center = boardHeight - max_radius;


window.onload = function(){
    let board = document.querySelector('#board');
    board.width = boardWidth;
    board.height = boardHeight;
    let context = board.getContext('2d');
    
    //random the number of circle
    let numberCircle = getRandomInt(2 , 7);
    let tabCircle = []
    
    for(let i = 0 ; i < numberCircle ; i++){
        let center = new Point(getRandomDouble(x_min_center , x_max_center) , getRandomDouble(y_min_center , y_max_center));
        let circle = new Circle(center , getRandomDouble(min_radius , max_radius) , getRandomColor());
        console.log(circle);
        

        context.fillStyle = circle.getColor();
        
        context.beginPath();
        context.arc(center.getPositionX() , center.getPositionY() , circle.getRadius() , 0 , 2 * Math.PI);
        context.stroke(); // Dessiner le contour
        context.fill();   // Remplir le cercle
        context.closePath();

        tabCircle.push(circle);
    }
    
    


}






