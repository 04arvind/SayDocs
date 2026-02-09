import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LinearAudioWave = () => {
    const meshRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#00FFFF") }, // Electric Blue
        uColor2: { value: new THREE.Color("#8A2BE2") }, // Violet
    }), []);

    useFrame((state) => {
        meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    });

    const vertexShader = `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Ultra-detailed high-frequency "energetic" wave
            float freq = 12.0; 
            float speed = 8.0;
            float amp = 2.5;
            
            // Primary high-freq wave
            float elevation = sin(pos.x * freq + uTime * speed) * amp;
            
            // Complex micro-waves for detailed "sound" look
            elevation += sin(pos.x * freq * 2.5 + uTime * speed * 1.5) * amp * 0.4;
            elevation += sin(pos.x * freq * 0.5 + uTime * speed * 0.5) * amp * 0.6;
            
            // Edge fade
            float strength = 1.0 - abs(pos.x / 10.0);
            elevation *= strength;

            pos.y += elevation;
            vElevation = elevation;

            vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        varying float vElevation;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        void main() {
            // Highly dynamic color mixing
            float mixValue = (vElevation / 2.5 + 1.0) * 0.5;
            vec3 finalColor = mix(uColor2, uColor1, mixValue);
            
            // High contrast glow/brightness
            float brightness = 0.8 + abs(vElevation) * 1.2;
            
            // Sharp line feel
            float alpha = 1.0 - pow(abs(vUv.y - 0.5) * 6.0, 2.0);
            alpha = clamp(alpha, 0.0, 1.0);
            
            gl_FragColor = vec4(finalColor * brightness, alpha * 0.9);
        }
    `;

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[100, 2.0, 512, 10]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

const Waves = () => {
    return (
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-64 z-0 pointer-events-none opacity-80">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                <LinearAudioWave />
            </Canvas>
        </div>
    );
};

export default Waves;
