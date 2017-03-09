/**
 * Created by Pie 5 on 01/03/2017.
 */

class Vector{
    constructor(x=0.0, y=0.0, z=0.0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    static Forward(){
        return new Vector(0.0, 0.0, 1.0);
    }

    static Zero(){
        return new Vector(0.0, 0.0, 0.0);
    }

    static One(){
        return new Vector(1.0, 1.0, 1.0);
    }

    static Up(){
        return new Vector(0.0, 1.0, 0.0);
    }

    static Right(){
        return new Vector(1.0, 0.0, 0.0);
    }

    static CreateXYZ(x, y, z) {
        return new Vector(x, y, z);
    }

    static CreateFromString(xyz) {
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

    static Norm(v)
    {
        var len = v.length();
        var div = len == 0 ? Number.MAX_VALUE : 1 / div;
        return Vector3.Multiply(div, v);
    }

    static Length(v){
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    static Equals(v1, v2){
        return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
    }
}

class Color{
    constructor(r=1.0, g=1.0, b=1.0, a=1.0){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    legalize(d) {
        return d > 1 ? 1 : d;
    }

    static Make(r=1.0, g=1.0, b=1.0, a=1.0){
        return new Color(r, g, b, a);
    }

    static White(){
        return new Color(1, 1, 1, 1);
    }

    static Black(){
        return new Color(0, 0, 0, 1);
    }

    static Red(){
        return new Color(1, 0, 0, 1);
    }

    static Green(){
        return new Color(0, 1, 0, 1);
    }

    static Blue(){
        return new Color(0, 0, 1, 1);
    }

    static Add(c1, c2){
        return new Color(c1.r + c2.r, c1.g + c2.g, c1.b + c2.b, c1.a + c2.a);
    }

    static Subtract(c1, c2){
        return new Color(c1.r - c2.r, c1.g - c2.g, c1.b - c2.b, c1.a - c2.a);
    }

    static Multiply(c1, v2){
        return new Color(c1.r * c2.r, c1.g * c2.g, c1.b * c2.b, c1.a * c2.a);
    }

    static Divide(c1, c2){
        return new Color(c1.r / c2.r, c1.g / c2.g, c1.b / c2.b, c1.a / c2.a);
    }

    static Scale(c, scale){
        return new Color(c.x * scale, c.y * scale, c.z * scale);
    }
}

class Ray{
    constructor(position = new Vector(), direction = new Vector()){
        this.position = position;
        this.direction = direction;
    }

    get start(){
        return this.position;
    }
}