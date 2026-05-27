'use client';

import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 52 },
    lg: { width: 220, height: 72 },
  };

  const { width, height } = dimensions[size];

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg
        width={width}
        height={height}
        viewBox="0 0 220 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Floral emblem */}
        <g transform="translate(4, 4)">
          {/* Center circle */}
          <circle cx="32" cy="32" r="8" fill="#D4AF37" opacity="0.9" />
          {/* Petals */}
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#F9A8D4" opacity="0.85" transform="rotate(0 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#EC4899" opacity="0.7" transform="rotate(45 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#F9A8D4" opacity="0.85" transform="rotate(90 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#EC4899" opacity="0.7" transform="rotate(135 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#F9A8D4" opacity="0.85" transform="rotate(180 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#EC4899" opacity="0.7" transform="rotate(225 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#F9A8D4" opacity="0.85" transform="rotate(270 32 32)" />
          <ellipse cx="32" cy="16" rx="5" ry="10" fill="#EC4899" opacity="0.7" transform="rotate(315 32 32)" />
          {/* Gold center dot */}
          <circle cx="32" cy="32" r="5" fill="#D4AF37" />
          <circle cx="32" cy="32" r="2.5" fill="#F0D080" />
          {/* Small leaf accents */}
          <path d="M 20 44 Q 26 38 32 40 Q 26 46 20 44 Z" fill="#C9A84C" opacity="0.8" />
          <path d="M 44 44 Q 38 38 32 40 Q 38 46 44 44 Z" fill="#C9A84C" opacity="0.8" />
        </g>

        {/* Brand name text */}
        <text
          x="76"
          y="28"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="3"
          fill="url(#goldGrad)"
        >
          BRAND
        </text>
        <text
          x="76"
          y="52"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="3"
          fill="url(#pinkGrad)"
        >
          NOUZ
        </text>

        {/* Decorative line */}
        <line x1="76" y1="34" x2="210" y2="34" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F0D080" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
          <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9A8D4" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
}
