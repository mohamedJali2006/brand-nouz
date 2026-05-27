'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  color: string;
  shape: 'circle' | 'ellipse' | 'heart';
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      '#F9A8D4',
      '#EC4899',
      '#FECDD3',
      '#FDA4AF',
      '#D4AF37',
      '#F0D080',
      '#BE185D',
    ];
    const shapes: Petal['shape'][] = ['circle', 'ellipse', 'heart'];

    const generated: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${6 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${8 + Math.random() * 14}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setPetals(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 opacity-70"
          style={{
            left: petal.left,
            animation: `petal${(petal.id % 5) + 1} ${petal.animationDuration} linear ${petal.animationDelay} infinite`,
          }}
        >
          {petal.shape === 'heart' ? (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill={petal.color}
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          ) : petal.shape === 'ellipse' ? (
            <svg
              width={petal.size}
              height={parseFloat(petal.size) * 1.6 + 'px'}
              viewBox="0 0 10 16"
            >
              <ellipse cx="5" cy="8" rx="5" ry="8" fill={petal.color} />
            </svg>
          ) : (
            <div
              style={{
                width: petal.size,
                height: petal.size,
                borderRadius: '50% 0 50% 0',
                backgroundColor: petal.color,
                transform: 'rotate(45deg)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
