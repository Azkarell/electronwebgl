import { Regl, DrawCommand, DefaultContext } from "regl";
import { vec3, vec2 } from "gl-matrix";
import * as glslify from 'glslify';
import { BACKGROUNDLAYER, BASETILESTEPS, BASECOLORSTEPS } from "../core/constants";
import { IMaterial } from "./material";

interface WaterUniform {
    offset: vec2;
    colorLight : vec3;
    colorDark: vec3;
    tileSteps: number;
    colorSteps: number;
    layer: number;
    tick: number;
}

export class Water implements IMaterial<DefaultContext>{

    static readonly  frag: string = glslify('../shader/water-frag.glsl');
    static readonly  vert: string = glslify('../shader/water-vert.glsl');

    colorSteps: number;
    tileSteps: number;
    baseColorDark: vec3;
    baseColorLight: vec3;
    offset: vec2;
    layer: number;
    cmd: DrawCommand;
    constructor(regl: Regl, obj: Partial<WaterUniform> = {}){
        let { colorSteps = BASECOLORSTEPS,
            colorDark = vec3.fromValues(0.0/255.0,0.0/255.0, 102.0/255.0),
            colorLight = vec3.fromValues(102.0/255.0,153.0/255.0,255.0/255.0),
            tileSteps = BASETILESTEPS,
            offset = vec2.fromValues(Math.random(),Math.random()),
            layer = BACKGROUNDLAYER
            } = obj;

        this.colorSteps = colorSteps;
        this.tileSteps = tileSteps;
        this.offset = offset;
        this.baseColorDark = colorDark;
        this.baseColorLight = colorLight;
        this.layer = layer;
        this.cmd = regl<WaterUniform>(
            {
                frag: Water.frag,
                vert: Water.vert,
                uniforms: {
                    tick: (ctx) => ctx.tick,
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

