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


export default Point;