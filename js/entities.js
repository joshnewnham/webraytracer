/**
 * Created by Pie 5 on 01/03/2017.
 */

class Entity{
    constructor(position = new Vector()){
        this.name = "Entity";
        this.type = "Entity";

        this.position = position;
    }
}

class SceneEntity extends Entity{
    constructor(surface=null){
        super();
    }

    /**
     *
     * @param ray
     * @returns ISect
     */
    intersect(ray){
        throw "not implemented";
    }

    /**
     *
     * @param position
     * @returns Vector
     */
    normal(position){
        throw "not implemented";
    }

}

class Camera extends Entity{
    constructor(position = new Vector(), forward = new Vector3(0, 0, 1), up = new Vector(0, 1, 0), right = new Vector(1, 0, 0)){
        super(position);
        this.type = "Camera";

        this.forward = forward;
        this.up = up;
        this.right = right;
    }

    static Create(position, lookAt){
        var forward = Vector.Norm(Vector.Subtract(lookAt, position));
        var down = new Vector(0, -1.0, 0);
        var right = Vector.Scale(Vector.Norm(Vector.Cross(forward, down)), 1.5);
        var up = Vector.Scale(Vector.Norm(Vector.Cross(forward, right)), 1.5);

        return new Camera(position, forward, up, right);
    }
}

class Light extends Entity{
    constructor(position = new Vector(), color = new Color()){
        super(position);
        this.type = "Light";
        this.color = color;
    }
}

class ISect {
    constructor(sceneObject=null, ray=null, distance=0.0){
        this.sceneObject = sceneObject;
        this.ray = ray;
        this.distance = distance;
    }
}

class Surface{
    constructor(diffuseFunc=null, specularFunc=null, reflectFunc=null, roughness=0.0){
        this.diffuseFunc = diffuseFunc;
        this.specularFunc = specularFunc;
        this.reflectFunc = reflectFunc;
        this.roughness = roughness;
    }
}

