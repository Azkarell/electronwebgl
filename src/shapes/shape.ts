import { IPartialRenderable } from "../renderer";
import { IMaterial } from "../material/material";
import { DefaultContext } from "regl";


export interface IShape<Context extends DefaultContext> extends IPartialRenderable<Context> {

}