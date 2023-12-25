class Circle
{
    #id;
    #center;
    #radius;
    #color;
    
    constructor(id , center , radius , color){
        this.#id = id;
        this.#center = center;
        this.#radius = radius;
        this.#color = color;
    }

    getId(){
        return this.#id;
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

function isOverlap(circle1 , circle2){
    let circle1_center_x = circle1.getCenter().getPositionX();
    let circle1_center_y = circle1.getCenter().getPositionY();

    let circle2_center_x = circle2.getCenter().getPositionX();
    let circle2_center_y = circle2.getCenter().getPositionY();
    
    let sum_radius = circle1.getRadius() + circle2.getRadius();
    let distanceCenter = Math.sqrt(Math.pow(circle2_center_x-circle1_center_x , 2) + Math.pow(circle2_center_y-circle1_center_y , 2));

    return distanceCenter < sum_radius;
}   


function translate(circle1 , circle2){
    let t = {
        x:0,
        y:0
    }

    let circle1_center_x = circle1.getCenter().getPositionX();
    let circle1_center_y = circle1.getCenter().getPositionY();

    let circle2_center_x = circle2.getCenter().getPositionX();
    let circle2_center_y = circle2.getCenter().getPositionY();
    
    let angle = Math.atan(circle2_center_y - circle1_center_y  / circle2_center_x - circle1_center_x);
    let distanceCenter = Math.sqrt(Math.pow(circle2_center_x-circle1_center_x , 2) + Math.pow(circle2_center_y-circle1_center_y , 2));

    t.x = Math.cos(angle) * distanceCenter;
    t.y = Math.sin(angle) * distanceCenter; 

    return t;
}

function convertToFormatDisplayX(x , x_max){
    return  parseFloat(((x*x_max) / boardWidth).toFixed(2));
}

function convertToFormatDisplayY(y , y_max){
    return  parseFloat(((y*y_max) / boardWidth).toFixed(2));
}


const boardWidth = 600;
const boardHeight = 600;

const min_radius = 10.0;
const max_radius = 20.0;

const x_min_center = 20.0;
const x_max_center = boardWidth - max_radius;

const y_min_center = 20.0;
const y_max_center = boardHeight - max_radius;

const rand_min_circle_nbr = 10;
const rand_max_circle_nbr = 20;



window.onload = function(){
    
    //BOARD 
    let board = document.querySelector('#board');
    board.width = boardWidth;
    board.height = boardHeight;
    let context = board.getContext('2d');
    
    let tabCircle = []
    let tabOverlap = []


    //random the number of circle
    let numberCircle = getRandomInt(rand_min_circle_nbr , rand_max_circle_nbr);
    

    //Add circles in tabCircle
    for(let i = 0 ; i < numberCircle ; i++){
        let center = new Point(getRandomDouble(x_min_center , x_max_center) , getRandomDouble(y_min_center , y_max_center));
        let circle = new Circle(i , center , getRandomDouble(min_radius , max_radius) , getRandomColor());
        tabCircle.push(circle);
    }

    //draw circle in board
    drawCircleInBoard(tabCircle , context);


    //Display information about circles
    let info1 = document.querySelector('.info1');
    displayInfoAboutCircle(info1 , tabCircle);
    

    //Display information about overlapping
    let info2 = document.querySelector('.info2');
    displayInfoAboutOverlap(info2 , tabCircle , tabOverlap);


    //button to translate position 
    const btn = document.querySelector('button');
    
    btn.addEventListener('click' , ()=>{
        context.clearRect(0 , 0, boardWidth , boardHeight);
        info1.innerHTML = "";
        info2.innerHTML = "";
            
        tabOverlap.forEach(elToTranslate => {
            tabCircle.forEach(circle =>{
                if(elToTranslate[0] - 1  == circle.getId()){
                    let vectTrans = elToTranslate[2];
                    let x_center = circle.getCenter().getPositionX();
                    let y_center = circle.getCenter().getPositionY();
                    circle.getCenter().setPositionXY(x_center + vectTrans.x , y_center + vectTrans.y);                    
                }
                if(elToTranslate[1] - 1  == circle.getId()){
                    let vectTrans = elToTranslate[2];
                    let x_center = circle.getCenter().getPositionX();
                    let y_center = circle.getCenter().getPositionY();
                    circle.getCenter().setPositionXY(x_center - vectTrans.x , y_center - vectTrans.y);                    
                }
            })
        })

        //Update board
        drawCircleInBoard(tabCircle , context);


        //Update information about circles
        displayInfoAboutCircle(info1 , tabCircle);

        //Upadate information about 
        displayInfoAboutOverlap(info2 , tabCircle , tabOverlap);
    })

}


function displayInfoAboutOverlap(info2 , tabCircle , tabOverlap){
    let isCircleOverlap = false;
    
    for(let i = 0 ; i < tabCircle.length ; i++){
        for(let j = i+1 ; j < tabCircle.length ;j++){
            if(isOverlap(tabCircle[i] , tabCircle[j])){
                tabOverlap.push([i+1 , j+1 , translate(tabCircle[i] , tabCircle[j])]);
                isCircleOverlap = true;
            }
        }
    }    
    
    if(isCircleOverlap){
        const info = document.createElement('div');
        const btn = document.querySelector('button');
        
        btn.classList.add('btn-hero');
        
        for(let i = 0 ; i < tabOverlap.length ; i++){
            let translate_x = convertToFormatDisplayX(tabOverlap[i][2].x , 10);
            let translate_y = convertToFormatDisplayY(tabOverlap[i][2].y , 10);
 
            info.innerHTML += `<p>Circle${tabOverlap[i][0]} and Circle${tabOverlap[i][1]} is overlap Translation 's vector u = (${translate_x} , ${translate_y})</p>`;
        }
        
        info2.appendChild(info);
    }
    else{
        const info = document.createElement('h1');
        const btn = document.querySelector('button');
        
        btn.classList.add('no-display-btn');
        
        info.innerText = "No overlapping circles";
        info2.appendChild(info);
    }
}



function displayInfoAboutCircle(parentContainer , tabCircle){
    for(let i = 0 ; i < tabCircle.length ; i++){
        const infoAboutCircle = document.createElement('div');
      
        let x = tabCircle[i].getCenter().getPositionX();
        let y = boardHeight-tabCircle[i].getCenter().getPositionY();

        let center_position_x = convertToFormatDisplayX(x , 10);
        let center_position_y = convertToFormatDisplayY(y , 10);
      
        infoAboutCircle.innerHTML = `
            <div class="infocircle">
                <div style="display:flex; padding:10px;">
                    <p>CIRCLE ${i+1}&nbsp&nbsp</p> 
                    <div class="circle" style="background-color:${tabCircle[i].getColor()};"></div>    
                </div>
                <ul>
                    <li>Color : ${tabCircle[i].getColor()}</li>
                    <li>CenterPosition : (${center_position_x} , ${center_position_y})</li>
                    <li>Radius : ${tabCircle[i].getRadius()}</li>
                </ul>
            </div>
        `;
        
        parentContainer.appendChild(infoAboutCircle);
    }
}




function drawCircleInBoard(tabCircle , context){
    for(let i = 0 ; i < tabCircle.length ; i++){
        
        context.fillStyle = tabCircle[i].getColor();
        
        let x = tabCircle[i].getCenter().getPositionX();
        let y = tabCircle[i].getCenter().getPositionY();
            
        context.beginPath();
        context.arc(x , y , tabCircle[i].getRadius() , 0 , 2 * Math.PI);
        context.stroke(); // Dessiner le contour
        context.fill();   // Remplir le cercle
        context.closePath();
        
        context.font = "10px sans-serif"; 
        context.fillStyle = "white"; 
        let texte = +(i+1);
        context.fillText(texte, x-2 , y+2);            
    }
}




