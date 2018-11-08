import { mat4, vec3, quat, mat3} from "gl-matrix";
import { Vec3 } from 'regl';
export type CameraKind = 'ortho' |'perspective';

export interface IOrthoCameraOptions {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
        near?: number,
        far?: number
}

export interface IPerspectiveCameraOptions {
        fovy?: number,
        aspect?: number,
        near?: number,
        far?: number
}

export class Camera {

    view: mat4 = mat4.create();
    proj: mat4 = mat4.create();
    position: vec3 = vec3.fromValues(0,0, -5);
    lookdirection: vec3 = vec3.fromValues(0,0,1);
    updir: vec3 = vec3.fromValues(0,1,0);
    speed: number = 10;
    private constructor(private kind: CameraKind){
        
    }

    static createOrtho(opts: IOrthoCameraOptions = {}): Camera{
        let {
            left = 0,
            right = 100,
            top = 100,
            bottom = 0,
            near= 1,
            far = 100
        } = opts;
        const camera = new Camera('ortho');
        camera.ortho(left,right,top,bottom,near,far);
        camera.updateView();
        return camera;
    }

    static createPerspective(opts: IPerspectiveCameraOptions = {}):Camera {
        let {
            aspect = 16.0/9.0,
            fovy = 60,
            far = 100,
            near = 1
        } = opts;
        const camera = new Camera('perspective');
        camera.perspective(fovy,aspect,near,far);
        camera.updateView();
        return camera;
    }

    ortho(left: number, right: number, top: number, bot : number, near: number, far: number){
        this.proj = mat4.ortho(this.proj,left,right,bot,top,near,far);
    }
    perspective(fovy: number, aspect: number, near: number, far: number){

        this.proj = mat4.perspective(this.proj,fovy,aspect,near,far);
    }

    moveWithDir(dir: 'up' | 'down' | 'left' | 'right', d: number):void
    {
        
        switch(dir){
            case 'up': this.position = vec3.scaleAndAdd(this.position,this.position,vec3.negate(vec3.create(),this.updir),this.speed * d); break;
            case 'down':this.position = vec3.scaleAndAdd(this.position,this.position,this.updir,this.speed *d); break;
            case 'left': this.position = vec3.scaleAndAdd(this.position,this.position,vec3.cross(vec3.create(),this.updir,this.lookdirection),this.speed *d); break;
            case 'right': this.position = vec3.scaleAndAdd(this.position,this.position,vec3.negate(vec3.create(),vec3.cross(vec3.create(),this.updir,this.lookdirection)),this.speed * d); break;
        }
        this.updateView();
        console.log(this);
    }

    private updateView(){
        // this.view = mat4.frustum(this.view,-1,1,-1,1,0.1,10);
        
        this.view = mat4.fromRotationTranslation(this.view,quat.fromEuler(quat.create(),0.0,Math.PI,0.0), this.position);
        // this.view = mat4.lookAt(this.view,this.position,vec3.scaleAndAdd(vec3.create(),this.position,this.lookdirection,1),this.updir);
    }
    move(vec: Vec3)
    {
        this.position = vec3.add(this.position, vec,this.position);
        this.updateView();
    }


}