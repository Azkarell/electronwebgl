precision mediump float;
attribute vec2 position;

uniform float angle;
uniform vec2 offset;
uniform mat4 view;
uniform mat4 proj;
void main() {
    gl_Position = proj * view * vec4(
    cos(angle) * position.x + sin(angle) * position.y + offset.x,
    -sin(angle) * position.x + cos(angle) * position.y + offset.y,
     0,
      1);
}