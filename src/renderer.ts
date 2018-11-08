import * as regl from 'regl';
import * as glslify from 'glslify';
import * as reglcamera from "regl-camera";
import { mat4 } from 'gl-matrix';
import { Camera } from './core/camera';
import { unwatchFile } from 'fs';



export interface DefaultUniforms {
  mvp: mat4;
}

export interface IRenderable<Context extends regl.DefaultContext> {
  render(context: Context): void;
}



export interface IPartialRenderable<Context extends regl.DefaultContext> {
  render(context: Context ): void;
}

interface ViewProjProp {
  view: mat4;
  proj: mat4;
}

export class Renderer {
  private obj: IRenderable<regl.DefaultContext>[] = [];
  private frag: string;
  private vert: string;
  private camera: Camera;
  constructor(private regl: regl.Regl) {
    this.camera = Camera.createOrtho({ left: -10, right: +10, top: 10, bottom: -10, far: 20, near: 0.1 });
    this.vert = glslify("../src/shader/simple-vert.glsl");
    this.frag = glslify("../src/shader/simple-frag.glsl");
    this.regl.frame((ctx) => this.render(ctx));
  }

  public add(obj: IRenderable<regl.DefaultContext>): void {
    this.obj.push(obj);
  }

  private setUpView: regl.DrawCommand;
  

  public render(context: regl.DefaultContext) {
    if(!this.setUpView){
      this.setUpView =   this.regl<ViewProjProp>({
        frag: this.frag,
        vert: this.vert,
        uniforms: {
          view: this.regl.prop<ViewProjProp,'view'>('view'),
          proj: this.regl.prop<ViewProjProp,'proj'>('proj')
        },
        depth: {
          enable: false
        },
        cull: {
          enable: false
        }
  
  
      });
    }
    this.camera.ortho(-24.0, 24.0, ((context.viewportHeight / context.viewportWidth) * 48.0) - 24.0, -24.0, 0.1, 20);
    this.regl.clear({
      color: [0.1, 0.1, 0.1, 1]
    });
    this.setUpView({view: this.camera.view, proj: this.camera.proj}, () => {
      this.obj.forEach(element => {
        element.render(context);
      });
    });

    // This tells regl to execute the command once for each object

  }

  public useCamera(camera: Camera) {
    this.camera = camera;
  }



}

