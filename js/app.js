/**
 * Created by Pie 5 on 01/03/2017.
 */

var rt;

window.onload = () => {
    "use strict";
    rt = new RayTracer(document.getElementById("canvas"));
    rt.start();
};