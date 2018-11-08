
import { remote } from "electron";
export interface KeyAction {
    onKeyDown?:  (event: KeyboardEvent) => void; 
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
}

export interface KeyMapping {
    [index: string ]: KeyAction[];
}

const DEFAULTKEYMAP : KeyMapping = {
    "KeyQ" : [{
        onKeyDown : function(ev: KeyboardEvent){
            remote.getCurrentWindow().close();
        }
    }]
}
export  {DEFAULTKEYMAP}

export interface KeyboardOptions{
    enableLogging : boolean;
}



export class Keyboard {

    private enableLogging : boolean;
    private keymap: KeyMapping;
    constructor( keys: KeyMapping,  opts: Partial<KeyboardOptions> = {}){
        if(keys === undefined) {
            console.error("undefined keymap");
            this.keymap = DEFAULTKEYMAP;

        }else {
            this.keymap = keys;
        }

        let {
            enableLogging = false
        } = opts;
        this.enableLogging = enableLogging;
        if(this.enableLogging){
            console.table(this.keymap);
        }
        
        window.addEventListener('keydown', (ev) => this.onKeyDown(ev) );
        window.addEventListener('keypress', (ev) => this.onKeyPress(ev));
        window.addEventListener('keyup', (ev) => this.onKeyUp(ev));
    }

    private onKeyDown(ev: KeyboardEvent){
        if(this.enableLogging){
            console.log(ev);
            console.table(this.keymap);
        }
        if(this.keymap[ev.code]){
            this.keymap[ev.code].forEach(element => {
                if(element.onKeyDown){
                    element.onKeyDown(ev);
                }
            });
        }
    }

    private onKeyPress(ev: KeyboardEvent){
        if(this.enableLogging){
            console.table(ev);
        }
        if(this.keymap[ev.code]){
            this.keymap[ev.code].forEach(element => {
                if(element.onKeyPress){
                    element.onKeyPress(ev);
                }
            });
        }

    }

    private onKeyUp(ev: KeyboardEvent){
        if(this.enableLogging){
            console.table(ev);
        }
        if(this.keymap[ev.code]){
            this.keymap[ev.code].forEach(element => {
                if(element.onKeyUp){
                    element.onKeyUp(ev);
                }
            });
        }
    }
    
    registerAction(key: string, action: KeyAction){
        if(!this.keymap[key]){
            this.keymap[key] = [];
        }
        this.keymap[key].push(action);
    }
    removeAction(key: string, action: KeyAction){
        if(this.keymap[key]){
            const ind = this.keymap[key].findIndex((a) => a === action);
            if(ind >= 0){
                this.keymap[key].splice(ind,1);
            }
        }
    }

    

}