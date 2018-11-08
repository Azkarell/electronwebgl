import { Regl, DrawCommand, DefaultContext } from "regl";
import { IPartialRenderable } from "../renderer";


export interface IMaterial<Context extends DefaultContext, Props = {}> extends IPartialRenderable<Context>{

    render(context: Context, props?: Props);
}