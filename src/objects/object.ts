import { IRenderable } from "../renderer";
import { IMaterial } from "../material/material";
import { IShape } from "../shapes/shape";
import { mat4, vec2 } from "gl-matrix";
import { DefaultContext } from "regl";


export interface IObject<Context extends DefaultContext> extends IRenderable<Context>{
    material: IMaterial<Context>,
    shape: IShape<Context>,
    position: vec2
}