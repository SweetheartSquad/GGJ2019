precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float rain;
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
	vec2 uv = vTextureCoord;
	float t = mod(curTime/1000.0,1000.0);

	// original
	vec3 orig = texture2D(uSampler, vTextureCoord).rgb;

	// new
	float wind = map(rain, 0.0, 1.0, 0.1, 0.4);
	float rainAmount = (rand(uv.x+uv.y*-wind, t)*2.0 - 1.0)*map(rain, 0.0, 1.0, 0.5, 1.0);
	float rainStep = step(abs(rainAmount), map(rain, 0.0, 1.0, 0.0, 0.5));
	uv.y += rainAmount*rainStep*0.5;
	uv.x += rainAmount*rainStep*0.5*wind;
	vec3 col = texture2D(uSampler, uv).rgb;
    col += vec3(whiteout);

	// combined
	float mixAmount = 1.0;
	vec3 outColor = mix(orig, col, mixAmount);
	gl_FragColor = vec4(outColor, 1.0);
}
