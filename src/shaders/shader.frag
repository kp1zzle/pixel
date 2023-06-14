precision highp float;
#include "./lygia/generative/snoise.glsl"
#include "./lygia/generative/worley.glsl"

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

vec4 fillMode(vec4 color) {
    if (color != vec4(0)) {
        return color;
    } else {
        return vec4(1. - vTexCoord.x + sin(u_time*2.), 1. - vTexCoord.x + sin(u_time*3.), 1. - vTexCoord.x + sin(u_time*4.), 1.);
    }
}

vec4 mountain(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color, vec4 settings) {
    if (!isWithinDims(largePixelCoords, center, dims)) {
        return vec4(0,0,0,0);
    }

    float cutoff = ((snoise(vec2(largePixelCoords.x/50.*settings.z + u_time/2.*settings.x,  u_time*settings.y)))/2. * dims.y);
    if (largePixelCoords.y < cutoff + center.y) {
        return vec4(0,0,0,0);

    } else {
        //        gl_FragColor = vec4(1. - (largePixelCoords.x / u_resolution.x), 1.- (largePixelCoords.y / u_resolution.y), u_time/10.,1);
//        return vec4(1. - vTexCoord.x + sin(u_time*2.), 1. - vTexCoord.x + sin(u_time*3.), 1. - vTexCoord.x + sin(u_time*4.), 1.);
        return fillMode(color);

    }
}

vec4 dancingRect(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color, vec4 settings) {
    if (!isWithinDims(largePixelCoords, center, dims + 2.*settings.x)) {
        return vec4(0,0,0,0);
    }

     vec4 displacement = vec4(
        snoise(vec2((largePixelCoords.x - center.x)/50. * settings.y + u_time*settings.z,  u_time * settings.a)) * settings.x,
        snoise(vec2((dims.x/2. + largePixelCoords.y - center.y)/50. * settings.y - u_time*settings.z,  u_time * settings.a)) * settings.x,
        snoise(vec2((dims.x + largePixelCoords.x - center.x)/50. * settings.y - u_time*settings.z,  u_time * settings.a)) * settings.x,
        snoise(vec2((dims.x * 1.5 + largePixelCoords.y - center.y)/50. * settings.y + u_time*settings.z,  u_time * settings.a)) * settings.x
     );

    if (largePixelCoords.y < center.y + dims.y/2. - displacement.x &&
    largePixelCoords.x < center.x + dims.x/2. - displacement.y&&
    largePixelCoords.y > center.y - dims.y/2. + displacement.z &&
    largePixelCoords.x > center.x - dims.x/2. + displacement.a) {
        return vec4(0.9*sin(u_time*2.) , 0, 0.9, 1);
    } else {
        return vec4(0,0,0,0);

    }
}

vec4 rect(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color) {
    if (!isWithinDims(largePixelCoords, center, dims)) {
        return vec4(0,0,0,0);
    }
        return fillMode(color);
}

vec4 circle(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color) {
    largePixelCoords += 0.5;
    float dist = distance(largePixelCoords, center);
    if (dist <= dims.x/2.) {
        return fillMode(color);
    } else {
        return vec4(0,0,0,0);
    }
}

vec4 grid(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color) {
    float v = 10.;
    largePixelCoords += v/2.;
    if (mod(largePixelCoords.x, v) == 0. && mod(largePixelCoords.y, v) == 0.) {
        return fillMode(color);
    } else {
        return vec4(0,0,0,0);
    }
}

vec4 stars(vec2 largePixelCoords, vec2 center, vec2 dims, vec4 color) {
    float v = worley(largePixelCoords);
    if (v >= 0.9 + sin(u_time)*0.01) {
        return fillMode(color);
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
            color = rect(largePixelCoords, u_effectCenters[i], u_effectDimensions[i], u_effectColors[i]);
        } else if (u_effectTypes[i] == 3) {
            color = circle(largePixelCoords, u_effectCenters[i], u_effectDimensions[i], u_effectColors[i]);
        } else if (u_effectTypes[i] == 4) {
            color = stars(largePixelCoords, u_effectCenters[i], u_effectDimensions[i], u_effectColors[i]);
        } else if (u_effectTypes[i] == 5) {
            color = dancingRect(largePixelCoords, u_effectCenters[i], u_effectDimensions[i], u_effectColors[i], u_effectSettings[i]);
        }else {
            color = vec4(0,0,0,0);
        }
        gl_FragColor = lerpBlend(color, gl_FragColor);

    }
}

