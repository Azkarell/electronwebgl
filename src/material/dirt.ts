import { Regl, DrawCommand, DefaultContext } from "regl";
import { vec3, vec2 } from "gl-matrix";
import * as glslify from 'glslify';
import { BACKGROUNDLAYER, BASETILESTEPS, BASECOLORSTEPS } from "../core/constants";
import { IMaterial } from "./material";

interface DirtUniform  {
    colorLight : vec3;
    colorDark: vec3;
    tileSteps: number;
    colorSteps: number;
    layer: number;
    offset: vec2;
}


export class Dirt implements IMaterial<DefaultContext>{

    static readonly  frag: string = glslify('../shader/dirt-frag.glsl');
    static readonly  vert: string = glslify('../shader/dirt-vert.glsl');
    colorSteps: number;
    tileSteps: number;
    baseColorDark: vec3;
    baseColorLight: vec3;
    offset: vec2;
    layer: number;
    cmd: DrawCommand;
    constructor(regl: Regl, obj: Partial<DirtUniform> = {}){
        let { colorSteps = BASETILESTEPS,
            colorDark = vec3.fromValues(139.0/255.0,69.0/255.0, 19.0/255.0),
            colorLight = vec3.fromValues(255.0/255.0,127.0/255.0,36.0/255.0),
            tileSteps = BASECOLORSTEPS,
            offset = vec2.fromValues(Math.random(),Math.random()),
            layer = BACKGROUNDLAYER
            } = obj;

        this.colorSteps = colorSteps;
        this.tileSteps = tileSteps;
        this.offset = offset;
        this.baseColorDark = colorDark;
        this.baseColorLight = colorLight;
        this.layer = layer;
        this.cmd = regl<DirtUniform>(
            {
                frag: Dirt.frag,
                vert: Dirt.vert,
                uniforms: {
                    colorSteps: this.colorSteps,
                    tileSteps: this.tileSteps,
                    offset: this.offset,
                    colorDark: this.baseColorDark,
                    colorLight: this.baseColorLight,
                    layer: this.layer
                },
                
                
                

            }
        );
    }

    
    render(context: DefaultContext){

        this.cmd();
    }




}

