/**
 * Created by Pie 5 on 09/03/2017.
 */

class RayTracer{

    constructor(width=500, height=500, maxDepth=5){
        this.width = width;
        this.height = height;
        this.maxDepth = maxDepth;

        this.scene = null;

        this.intersections = this.intersections.bind(this);
    }

    intersections(ray, scene){
        return scene.intersect(ray).sort((iA, iB) => {
            if(iA.distance < iB.distance){
                return -1;
            }

            if(iA.distance > iB.distance){
                return 1;
            }

            return 0;
        });
    }

    testRay(ray, scene){
        var isects = this.intersections(ray, scene);

        if(isects.length == 0){
            return 0;
        }

        return isects[0].distance;
    }

    get currentScene(){
        return this.scene;
    }

    set currentScene(scene){
        this.scene = scene;
    }

    traceRay(ray, scene, depth){
        var isects = this.intersections(ray, scene);

        if(isects.length == 0){
            return Color.White();
        }

        var isect = isects[0];
        return this.shade(isect, scene, depth);
    }

    getNaturalColor(entity, pos, norm, rd, scene){
        var ret = Color.Make(0, 0, 0, 1);
        scene.lights.forEach((light) => {
            var ldis = Vector.Subtract(light.position, pos);
            livec = Vector.Norm(ldis);
            var neatIsect = this.testRay(new Ray(pos, livec), scene);
            var isInShadow = !(neatIsect > Vector.Length(ldis) || (neatIsect == 0));
            if(!isInShadow){
                var illum = Vector.Dot(livec, norm);
                var lcolor = illum > 0 ? Color.Multiply(illum, light.color) : Color.Make(0, 0, 0, 1);
                var specular = Vector.Dot(livec, Vector.Norm(rd));
                var scolor = specular > 0 ? Color.Multiply(Math.pow(specular, entity.surface.roughness), light.color) : Color.Make(0, 0, 0, 1);
                ret = Color.Add(ret, Color.Add(Color.Multiply(entity.surface.diffuseFunc(pos), lcolor), Color.Multiply(entity.surface.specularFunc(pos), scolor)));
            }
        });

        return ret;
    }

    getReflectionColor(entity, pos, norm, rd, scene, depth){
        return Color.Multiply(entity.surface.reflectFunc(pos), this.traceRay(new Ray(pos, rd), scene, depth + 1));
    }

    shade(isect, scene, depth){
        var d = isect.ray.direction;
        var pos = Vector.Add(Vector.Multiply(isect.distance, isect.ray.direction), isect.ray.start);
        var normal = isect.sceneEntity.normal(pos);
        var reflectDir = Vector.Subtract(d, Vector.Multiply(2 * Vector.Dot(normal, d), normal));

        var ret = Color.White();
        ret = Color.Add(ret, this.getNaturalColor(isect.sceneEntity, pos, normal, reflectDir, scene));
        if(depth >= this.maxDepth){
            return Color.Add(ret, Color.Make(0.5, 0.5, 0.5));
        }

        return Color.Add(ret, this.getReflectionColor(isect.sceneEntity, Vector.Add(pos, Vector.Multiply(0.001, reflectDir)), normal, reflectDir, scene, depth));
    }

    recenterX(x){
        return (x - (this.width / 2.0)) / (2.0 * this.width);
    }

    recenterY(y){
        return (y - (this.height/ 2.0)) / (2.0 * this.height);
    }

    getPoint(x, y, camera){
        return Vector.Norm(Vector.Add(camera.forward, Vector.Add(Vector.Multiply(this.recenterX(x), camera.right),
            Vector.Multiply(this.recenterY(y), camera.up))));
    }

    /*
     internal readonly Scene DefaultScene =
     new Scene() {
     Things = new SceneObject[] {
     new Plane() {
     Norm = Vector.Make(0,1,0),
     Offset = 0,
     Surface = Surfaces.CheckerBoard
     },
     new Sphere() {
     Center = Vector.Make(0,1,0),
     Radius = 1,
     Surface = Surfaces.Shiny
     },
     new Sphere() {
     Center = Vector.Make(-1,.5,1.5),
     Radius = .5,
     Surface = Surfaces.Shiny
     }},
     Lights = new Light[] {
     new Light() {
     Pos = Vector.Make(-2,2.5,0),
     Color = Color.Make(.49,.07,.07)
     },
     new Light() {
     Pos = Vector.Make(1.5,2.5,1.5),
     Color = Color.Make(.07,.07,.49)
     },
     new Light() {
     Pos = Vector.Make(1.5,2.5,-1.5),
     Color = Color.Make(.07,.49,.071)
     },
     new Light() {
     Pos = Vector.Make(0,3.5,0),
     Color = Color.Make(.21,.21,.35)
     }},
     Camera = Camera.Create(Vector.Make(3,2,4), Vector.Make(-1,.5,0))
     };
     */

    /*
     static class Surfaces {
     // Only works with X-Z plane.
     public static readonly Surface CheckerBoard  =
     new Surface() {
     Diffuse = pos => ((Math.Floor(pos.Z) + Math.Floor(pos.X)) % 2 != 0)
     ? Color.Make(1,1,1)
     : Color.Make(0,0,0),
     Specular = pos => Color.Make(1,1,1),
     Reflect = pos => ((Math.Floor(pos.Z) + Math.Floor(pos.X)) % 2 != 0)
     ? .1
     : .7,
     Roughness = 150
     };


     public static readonly Surface Shiny  =
     new Surface() {
     Diffuse = pos => Color.Make(1,1,1),
     Specular = pos => Color.Make(.5,.5,.5),
     Reflect = pos => .6,
     Roughness = 50
     };
     }
     */

    update(timestamp){

    }

    draw(device){
        for(var y=0; y < this.height; y++){
            for(var x=0; x < this.width; x++){
                var color = this.traceRay(new Ray(scene.camera.position, this.getPoint(x, y, this.currentScene.camera)), this.currentScene, 0);
                device.putPixel(x, y, color);
            }
        }

    }
}