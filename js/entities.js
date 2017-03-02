/**
 * Created by Pie 5 on 01/03/2017.
 */

class Entity{
    constructor(){
        this.name = "Entity";
        this.type = "Entity";

        this.position = new Vector(0, 0, 0);
    }
}

class Camera extends Entity{
    constructor(){
        super();
        this.type = "Camera";

        this.forward = new Vector3(0, 0, 1);
        this.up = new Vector(0, 1, 0);
        this.right = new Vector(1, 0, 0);
    }
}