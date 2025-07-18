import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface CarModelProps {
  rotationY: number; 
}

export default function CarModel({ rotationY }: CarModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/Ambulance.glb');

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} 
      scale={[0.15, 0.15, 0.15]} > 
      <primitive object={scene} />
    </group>
  );
}
