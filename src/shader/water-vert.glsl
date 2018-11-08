precision mediump float;

attribute vec2 position;

uniform mat4 view;
uniform mat4 proj;
uniform mat4 model;
uniform float layer;
varying vec2 tc;
varying vec4 sc_pos;

void main(){

    tc = vec2(position.x, position.y);
    gl_Position = proj * view * model* vec4(position.x,position.y,layer,1);
    sc_pos = gl_Position;
}