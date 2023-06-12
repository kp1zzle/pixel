precision highp float;
#include "./lygia/generative/pnoise.glsl"

#define MAX_EFFECTS 10

uniform vec2 u_resolution;
uniform sampler2D u_pixelArray;
uniform float u_time;

uniform int u_numEffects;
uniform int u_effectTypes[MAX_EFFECTS];
uniform vec2 u_effectCenters[MAX_EFFECTS];
uniform vec2 u_effectDimensions[MAX_EFFECTS];
uniform vec4 u_effectColors[MAX_EFFECTS];
uniform vec4 u_effectSettings[MAX_EFFECTS];

varying vec2 vTexCoord;

vec4 lerpBlend(vec4 top, vec4 back) {
    return vec4((top.rgb * top.a + back.rgb * (1. - top.a)), 1);
}

bool isWithinDims(vec2 largePixelCoords, vec2 center, vec2 dims) {
    if ((largePixelCoords.x >= center.x - (dims.x/2.)) && (largePixelCoords.x <= center.x + (dims.x/2.)) && (largePixelCoords.y >= center.y - (dims.y/2.)) && (largePixelCoords.y <= center.y + (dims.y/2.))) {
        return true;
    }
    return false;
}

vec4 mountain(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color, vec4 settings) {
    if (!isWithinDims(largePixelCoords, center, dims)) {
        return vec4(0,0,0,0);
    }

    float cutoff = (pnoise(vec2(largePixelCoords.x/11. + u_time/2.,  u_time*settings.x), vec2(200,200)) * dims.y) + dims.y/2.;
    if (largePixelCoords.y < cutoff + center.y) {
        return vec4(0,0,0,0);

    } else {
        //        gl_FragColor = vec4(1. - (largePixelCoords.x / u_resolution.x), 1.- (largePixelCoords.y / u_resolution.y), u_time/10.,1);
//        return vec4(1. - vTexCoord.x + sin(u_time*2.), 1. - vTexCoord.x + sin(u_time*3.), 1. - vTexCoord.x + sin(u_time*4.), 1.);
        if (color != vec4(0)) {
            return color;
        } else {
            return vec4(1. - vTexCoord.x + sin(u_time*2.), 1. - vTexCoord.x + sin(u_time*3.), 1. - vTexCoord.x + sin(u_time*4.), 1.);
        }

    }
}

vec4 rect(vec2 largePixelCoords, vec2 center, vec2 dims) {
    if (!isWithinDims(largePixelCoords, center, dims)) {
        return vec4(0,0,0,0);
    }

     vec4 displacement = vec4(
        pnoise(vec2((largePixelCoords.x - center.x)/20. + u_time*4.,  1), vec2(200,200)) * 4.,
        pnoise(vec2((largePixelCoords.x - center.x)/20. + u_time*4.,  1), vec2(40,344)) * 4.,
        pnoise(vec2((largePixelCoords.y - center.y)/20. + u_time*4.,  1), vec2(232,190)) * 4.,
        pnoise(vec2((largePixelCoords.y - center.y)/20. + u_time*4.,  1), vec2(200,200)) * 4.
     );

    if (largePixelCoords.y < center.y + dims.y/2. - displacement.x &&
    largePixelCoords.y > center.y - dims.y/2. + displacement.y &&
    largePixelCoords.x < center.x + dims.x/2. - displacement.z &&
    largePixelCoords.x > center.x - dims.x/2. + displacement.a) {
        return vec4(0.9*sin(u_time*2.) , 0, 0.9, 1);
    } else {
        return vec4(0,0,0,0);

    }
}



void main() {
    vec2 largePixelCoords = floor(vTexCoord * u_resolution);
    vec4 color = vec4(0);
    for (int i = 0; i < MAX_EFFECTS; i++) {
        if (u_effectTypes[i] == 1) {
            color = mountain(largePixelCoords, u_effectCenters[i], u_effectDimensions[i], u_effectColors[i], u_effectSettings[i]);
        } else if (u_effectTypes[i] == 2) {
            color = rect(largePixelCoords, u_effectCenters[i], u_effectDimensions[i]);
        } else {
            color = vec4(0,0,0,0);
        }
        gl_FragColor = lerpBlend(color, gl_FragColor);

    }
}

