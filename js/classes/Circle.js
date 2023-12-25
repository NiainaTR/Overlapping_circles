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

    
    
    setRadius(radius){
       this.#radius = radius;
    }

    getRadius(){
        return this.#radius;
    }
    setColor(color){
        this.#color = color;
    }
}

export default Circle;