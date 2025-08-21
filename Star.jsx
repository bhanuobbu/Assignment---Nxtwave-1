import React from 'react';

export default function Star({ n }){
  const val = typeof n === 'number' ? n : (n ? Number(n) : null);
  if (val == null || Number.isNaN(val)) return <span className="text-sm text-gray-500">(n/a)</span>;
  const full = Math.round(val * 2) / 2;
  const stars = [];
  for (let i=1;i<=5;i++){
    if (full >= i) stars.push('★');
    else if (full >= i - 0.5) stars.push('☆');
    else stars.push('☆');
  }
  return <span className="text-yellow-600">{stars.join('')} <span className="text-gray-600 text-xs">{val}</span></span>;
}