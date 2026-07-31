import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleSystem({ count = 800 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 50 - 25;
      const y = Math.random() * 50 - 25;
      const z = Math.random() * 50 - 25;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      
      const t = (particle.time += speed);
      
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      // Rotate particles slightly
      dummy.rotation.set(t, t, t);
      
      // Pulse scale
      const s = Math.max(0.1, Math.cos(t));
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={2} color="#fbcfe8" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.04, 0]} />
        <meshStandardMaterial color="#c8934f" roughness={0.4} />
      </instancedMesh>
    </>
  );
}
