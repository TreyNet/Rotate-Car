import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import CarModel from './components/CarModel';

function App() {
  const [rotationY, setRotationY] = useState(0);
  const isDragging = useRef(false);
  const prevX = useRef(0); // rotación horizontal → usamos movimiento X

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    prevX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      const deltaX = e.clientX - prevX.current;
      prevX.current = e.clientX;
      setRotationY((prev) => prev + deltaX * 0.01); // sensibilidad de rotación
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: '#1e1e1e', margin: 'auto'}}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas camera={{ position: [3, 2, 5], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow/>
        <Suspense fallback={null}>
          <CarModel rotationY={rotationY} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
