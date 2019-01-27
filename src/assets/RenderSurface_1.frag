precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float turbulence;
uniform float whiteout;
uniform float curTime;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float rand(float x, float y){
	return rand(vec2(x, y));
}
float map(float value, float min1, float max1, float min2, float max2){
	return (value - min1) / (max1 - min1) * (max2 - min2) + min2;
}

void main(void) {
	// get pixels
	vec2 r = vTextureCoord;

	// original
	vec3 orig = texture2D(uSampler, vTextureCoord).rgb;

	// new
	float rain = (rand(r.x+r.y*-0.1, mod(curTime/1000.0,1000.0))*2.0 - 1.0)*map(turbulence, 0.0, 1.0, 0.5, 1.0);
	float rainStep = step(abs(rain), map(turbulence, 0.0, 1.0, 0.0, 0.5));
	r.y += rain*rainStep*0.5;
	r.x += rain*rainStep*0.5*0.1;
	vec3 col = texture2D(uSampler, r).rgb;
    col += vec3(whiteout);
	
	// combined
	float mixAmount = 1.0;
	vec3 outColor = mix(orig, col, mixAmount);
	gl_FragColor = vec4(outColor, 1.0);
}
