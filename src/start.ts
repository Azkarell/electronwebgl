import * as regl from 'regl';
import "reflect-metadata";
import { Service,Container } from "typedi";
import { Renderer } from "./renderer";
import { Keyboard, DEFAULTKEYMAP, KeyMapping } from './core/keyboard';
import { remote, dialog } from 'electron';
import { Camera } from './core/camera';
import { Dirtblock } from './objects/dirtblock';
import { vec2 } from 'gl-matrix';
import { Waterblock } from './objects/waterblock';

const keymap : KeyMapping = {
    'KeyQ' : [{
        onKeyUp: (ev) => {
            remote.getCurrentWindow().close();
        }
    }]


}
function main(){
    const r = regl();
    const keyboard = new Keyboard(keymap, {enableLogging: true});
    const camera = Camera.createOrtho({left: -10, right: +10, top: 10, bottom: -10, far: 20, near: 0.1});
    keyboard.registerAction('KeyW', {
        onKeyPress: (ev) => {
            camera.moveWithDir('up',0.1)
        }
    });
    keyboard.registerAction('KeyS',{
        onKeyPress: (ev) => {
            camera.moveWithDir('down', 0.1)
        }
    });
    keyboard.registerAction('KeyA', {
        onKeyPress: (ev) => {
            camera.moveWithDir('left',0.1);
        }
    });
    keyboard.registerAction('KeyD', {
        onKeyPress: (ev) => {
            camera.moveWithDir('right',0.1);
        }
    });
    const renderer = new Renderer(r);
    renderer.useCamera(camera);
    for(let i = 0; i < 20; i++){
        for(let j = 0; j<20; j++){
            let rand = Math.random();
            if(rand < 0.5){
                renderer.add(new Dirtblock(r,vec2.fromValues(i,j)));
            } else {
                renderer.add(new Waterblock(r,vec2.fromValues(i,j)));
            }

        }
    }
}

main();