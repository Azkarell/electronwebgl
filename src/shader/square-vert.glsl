precision mediump float;

attribute vec2 position;

uniform float scale;
uniform vec2 offset;
uniform mat4 view;
uniform mat4 proj;
varying vec2 tc;
void main(){

    tc = vec2(position.x, position.y);
    gl_Position = proj * view * vec4(scale*(position.x + offset.x),scale*(position.y + offset.y),2,1);
}