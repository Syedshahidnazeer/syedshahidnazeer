"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsInstancesProps) => {
  const ref = useRef<PointsType | null>(null);
  // The buffer length MUST be a multiple of 3 (x, y, z per point) to match
  // `stride={3}` below. 5000 is not, so maath leaves the trailing partial
  // triple unwritten as NaN, and three.js then fails to compute a bounding
  // sphere ("Computed radius is NaN"). 5001 = 1667 whole points.
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.2 }),
  );

  useFrame((_state, delta) => {
    // Backgrounded tabs already get throttled rAF from the browser, but
    // skipping the update outright avoids waking this up at all.
    if (document.hidden || !ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    {/*
      A full-viewport canvas redraws every frame forever, so its pixel cost
      scales directly with devicePixelRatio — on a 3x-DPR phone that's 9x the
      fragment-shader work of a 1x display for a starfield nobody can tell
      apart at that resolution. Capped rather than left at the device default.
    */}
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
