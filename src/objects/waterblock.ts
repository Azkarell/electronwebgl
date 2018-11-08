import { IObject } from "./object";
import { IMaterial } from "../material/material";
import { IShape } from "../shapes/shape";
import { Regl, DrawCommand, DefaultContext } from "regl";
import { mat4, vec2 } from "gl-matrix";
import { Square } from "../shapes/square";
import { Water } from "../material/water";





export class Waterblock implements IObject<DefaultContext> {
    position: vec2;
    modelmatrix: mat4;
    material: IMaterial<DefaultContext>;   
    shape: IShape<DefaultContext>;
    cmd: DrawCommand;
    constructor(regl: Regl, position?: vec2){
        this.material = new Water(regl,{offset: vec2.fromValues(Math.random(),Math.random())});
        this.shape = new Square(regl, {mat: this.material});
        
        this.position = position ? position : vec2.fromValues(0,0);
        this.modelmatrix= mat4.fromTranslation(mat4.create(),[this.position[0], this.position[1],0]);
        this.cmd = regl({
            uniforms:{
                model: this.modelmatrix
            },
            
            depth: {
                enable: false,
            },
            blend: {
                enable: true,
                func: {
                    dst: 'one minus src alpha',
                    dstAlpha: 'one minus src alpha',
                    src: 'one',
                    srcAlpha: 'one'
                    
                }
            }
        });
    }

    render(context: DefaultContext): void {

       this.cmd(() => {
            this.shape.render(context);
        });

    }


}