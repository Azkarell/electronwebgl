precision mediump float;

uniform vec4 color;
uniform float tick;

const vec4 Chocolate5  = vec4(139.0/255.0,69.0/255.0, 19.0/255.0, 1);
const vec4 Chocolate2 = vec4(255.0/255.0,127.0/255.0,36.0/255.0,1);

varying vec2 tc;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float makeStep(float inp, int count, float minval, float maxval){
    if(inp < minval) return minval;
    if(inp > maxval) return maxval;
    float fcount = float(count);
    return  minval+((floor(((inp - minval)/maxval) * fcount))/fcount)*maxval;

}
vec4 getColor(vec4 first, vec4 second){
    vec2 normalizedtc = vec2(makeStep(tc.x,20,0.0,1.0),makeStep(tc.y,20,0.0,1.0));
    float r = rand(normalizedtc);
    float st =makeStep(r,5,0.0,1.0);
    return mix(Chocolate2,Chocolate5,st);

}



void main(){

    gl_FragColor = getColor(Chocolate2,Chocolate5);
    // gl_FragColor = vec4( sin( color.r * tick * rand(color.rg)) * color.a, cos( color.g * tick * rand(color.rb)) * color.a, cos( color.g * tick * rand(color.rb))*sin( color.r * tick * rand(color.rg)) * color.a, color.a  );
}