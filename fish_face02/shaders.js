var frag=`
// Author Pierre MARZIN 01/2017

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform bool running;
uniform float iTime;
uniform sampler2D iImg;
uniform float c[22];
float mousefactor;

float noise( in vec2 x )
{
  return abs(sin(1.5*x.x)*sin(1.5*x.y));
}
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main() {
    vec2 mouse=iMouse/iResolution;
vec2 p = gl_FragCoord.xy/iResolution;
vec2 q=vec2(p.x,1.0-p.y);
vec3 color=texture2D(iImg,vec2(q.x,q.y)).rgb;
float l=length(q-mouse);
l=pow(l,.5);
q-=mouse;
float a=2.0*atan(q.y,q.x);
vec2 r=l*vec2(q.x*cos(a)+q.y*sin(a),q.x*sin(a)-q.y*cos(a));
r+=mouse;
color=.8*texture2D(iImg,r).rgb+.4*(1.0-l)*vec3(texture2D(iImg,r).r,0.,0.);
gl_FragColor = vec4(color,1.);
}

`
var vert=`
//standard vertex shader
#ifdef GL_ES
      precision highp float;
    #endif
    #extension GL_OES_standard_derivatives : enable
    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;
    attribute vec4 aVertexColor;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec4 var_vertCol;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);

      // just passing things through
      var_vertPos      = aPosition;
      var_vertCol      = aVertexColor;
      var_vertNormal   = aNormal;
      var_vertTexCoord = aTexCoord;
    }
`;
