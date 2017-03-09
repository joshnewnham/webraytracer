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
    constructor(position = new Vector(), surface=null){
        super(position);
        this.surface = surface;
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
    constructor(sceneEntity=null, ray=null, distance=0.0){
        this.sceneEntity = sceneEntity;
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

class SphereEntity extends SceneEntity{
    constructor(position = new Vector(), surface=null, radius=3.0) {
        super(position, surface);
        this.radius = radius;
    }

    intersect(ray){
        var eo = Vector.Subtract(this.position, ray.start);
        var v = Vector.Dot(eo, ray.direction);
        var dist;
        if(v < 0){
            dist = 0.0;
        } else{
            var disc = Math.pow(this.radius, 2) - (Vector.Dot(eo, eo) - Math.pow(v, 2));
            dist = disc < 0 ? 0 : v - Math.sqrt(disc);
        }

        if(dist == 0) return null;

        return new ISect(this, ray, dist);
    }

    normal(position){
        return Vector.Norm(Vector.Subtract(position, this.position));
    }
}

class PlaneEntity extends SceneEntity{
    constructor(position = new Vector(), surface=null, norm = Vector.Up, offset=0.0) {
        super(position, surface);
        this.norm = norm;
        this.offset = offset;
    }

    intersect(ray){
        var denom = Vector.Dot(this.norm, ray.direction);
        if(denom > 0) return null;

        var dist = (Vector.Dot(this.norm, ray.start) + this.offset) / -denom;
        return new ISect(this, ray, dist);
    }

    normal(position){
        return this.norm;
    }
}

class Scene {
    constructor(camera=null){
        this.entities = new Array();
        this.lights = new Array();
        this.camera = camera;
    }

    Intersect(ray){
        return this.entities.map((entity) => {
            return entity.intersect(ray)
        }).filter((intersect) => {
            return intersect != null;
        });
    }
}