precision mediump float;


uniform vec2 offset;
uniform vec3 colorLight;
uniform vec3 colorDark;
uniform int colorSteps;
uniform int tileSteps;
uniform float tick;
varying vec2 tc;
varying vec4 sc_pos;
#define M_PI 3.1415926535897932384626433832795
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
    float val = 0.2* sin(tc.x * 2.0*  M_PI + tick/10.0);
    float val1 = 0.2 + val;
    float val2 = 0.4 +val;
    float val3 = 0.6 + val;
    float val4 = 0.8 + val;
    float val5 = 1.0 + val;
    float mindist = min(abs(val-tc.y),min(abs(val1-tc.y),min(abs(val2 - tc.y),min(abs(val3 -tc.y),min(abs(val4-tc.y),abs(val5-tc.y))))));
    // float other = makeStep(tc.y,3,0.0,1.0);

    float st = makeStep(5.0*mindist,colorSteps,0.0,1.0);
    return mix(first,second,st);

}



void main(){
    gl_FragColor = getColor(vec4(colorLight,1),vec4(colorDark,1));
}