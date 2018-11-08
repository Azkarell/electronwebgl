import { IRenderable, IPartialRenderable } from "../renderer";
import * as glslify from "glslify";
import { Regl, DrawCommand, DefaultContext, Vec2, Vec4, Vec3 } from "regl";
import * as regl from'regl';
import { IMaterial } from "../material/material";
import { IShape } from "./shape";
import { Dirt } from "../material/dirt";
import { vec2 } from "gl-matrix";



interface ISquareAttributes {
    position: [Vec2,Vec2,Vec2,Vec2]
}

interface SquareProps {
    mat: IMaterial<DefaultContext>
}

export class Square implements IShape<DefaultContext>, SquareProps{


    private static position: [Vec2,Vec2,Vec2,Vec2] = [[0,0],[1,0],[1,1],[0,1]];
    private static elements: [Vec3,Vec3] = [[0,1,2],[0,2,3]];
    mat: IMaterial<DefaultContext>;
    private cmd : DrawCommand;
    constructor(regl: Regl, obj: Partial<SquareProps> = {}){
        let {
            mat = new Dirt(regl,{offset: vec2.fromValues(Math.random(),Math.random())})
        } = obj;
        this.mat = mat;
        this.cmd = regl<{},ISquareAttributes>({
            attributes: {
                position: Square.position
            },
            elements: Square.elements,


        });

    }

    render (context: DefaultContext) {
       this.cmd(() => {
            this.mat.render(context);
        });
         
    }



}
