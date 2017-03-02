/**
 * Created by Pie 5 on 01/03/2017.
 */

class Vector{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    static MakeXYZ(x, y, z) {
        return new Vector(x, y, z);
    }

    static MakeFromString(xyz) {
        var parts = xyz.split(",");
        x = 0.0;
        y = 0.0;
        z = 0.0;

        if(parts.length > 0){
            x = parseFloat(parts[0]);
        }

        if(parts.length > 1){
            y = parseFloat(parts[1]);
        }

        if(parts.length > 2){
            z = parseFloat(parts[2]);
        }

        return new Vector(x, y, z);
    }

    static Add(v1, v2){
        return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    static Subtract(v1, v2){
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    static Multiply(v1, v2){
        return new Vector(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }

    static Divide(v1, v2){
        return new Vector(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }

    static Dot(v1, v2){
        return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
    }

    static Cross(v1, v2){
        return new Vector(((v1.y * v2.z) - (v1.z * v2.y)),
            ((v1.z * v2.x) - (v1.x * v2.z)),
            ((v1.x * v2.y) - (v1.y * v2.x)));
    }

    static Scale(v1, scale){
        return new Vector(v1.x * scale, v1.y * scale, v1.z * scale);
    }

    static norm(v)
    {
        var len = v.length();
        var div = len == 0 ? Number.MAX_VALUE : 1 / div;
        return Vector3.Multiply(div, v);
    }

    static Equals(v1, v2){
        return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
    }
}