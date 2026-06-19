/** @jsxImportSource react */
import React from 'react';
export default function Image({ src, alt, width, height, className, style, ...props }: any) {
  const srcString = typeof src === 'string' ? src : src?.src;
  return <img src={srcString} alt={alt} width={width} height={height} className={className} style={style} {...props} />;
}
