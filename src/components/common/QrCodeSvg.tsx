import React from 'react';

interface QrCodeSvgProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * Clean SVG QR Code generator simulating high-density matrix with brand anchor
 */
export const QrCodeSvg: React.FC<QrCodeSvgProps> = ({ value, size = 120, className = '' }) => {
  // Deterministic pseudo-random pattern based on string hash
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  const cells = 21; // 21x21 QR matrix
  const matrix: boolean[][] = [];

  for (let r = 0; r < cells; r++) {
    matrix[r] = [];
    for (let c = 0; c < cells; c++) {
      // Corner Finder Patterns
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= cells - 7;
      const inBottomLeft = r >= cells - 7 && c < 7;

      if (inTopLeft || inTopRight || inBottomLeft) {
        // Outer border
        const rSub = inBottomLeft ? r - (cells - 7) : r;
        const cSub = inTopRight ? c - (cells - 7) : c;
        const isBorder = rSub === 0 || rSub === 6 || cSub === 0 || cSub === 6;
        const isInner = rSub >= 2 && rSub <= 4 && cSub >= 2 && cSub <= 4;
        matrix[r][c] = isBorder || isInner;
      } else {
        // Data region hash modulation
        const seed = Math.abs(hash * (r + 1) * 31 + c * 17);
        matrix[r][c] = (seed % 3 === 0 || (r + c) % 2 === 0) && (seed % 7 !== 0);
      }
    }
  }

  const cellSize = size / cells;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`bg-white p-1 rounded ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`QR Code for ${value}`}
    >
      <rect width={size} height={size} fill="#ffffff" />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize + 0.2}
              height={cellSize + 0.2}
              fill="#1e1b4b"
            />
          ) : null
        )
      )}
      {/* Central Brand Dot */}
      <rect
        x={size / 2 - cellSize * 1.5}
        y={size / 2 - cellSize * 1.5}
        width={cellSize * 3}
        height={cellSize * 3}
        fill="#ffffff"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={cellSize * 1.1}
        fill="#db2777"
      />
    </svg>
  );
};
