precision mediump float;


uniform vec2 offset;
uniform vec3 colorLight;
uniform vec3 colorDark;
uniform int colorSteps;
uniform int tileSteps;
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
    vec2 normalizedtc = vec2(makeStep(tc.x,tileSteps,0.0,1.0),makeStep(tc.y,tileSteps,0.0,1.0))  + offset;
    float r = rand(normalizedtc);
    float st = makeStep(r,colorSteps,0.0,1.0);
    return mix(first,second,st);

}



void main(){
    gl_FragColor = getColor(vec4(colorLight,1),vec4(colorDark,1));
}