"use client";

import { useState } from "react";

type ImageSize = "small" | "medium" | "large" | "full";

interface ImageWithSourceProps {
  src: string;
  alt?: string;
  source?: string;
  sourceUrl?: string;
  caption?: string;
  size?: ImageSize;
}

const sizeClasses: Record<ImageSize, string> = {
  small:  "max-w-sm mx-auto",
  medium: "max-w-lg mx-auto",
  large:  "max-w-2xl mx-auto",
  full:   "w-full",
};

export default function ImageWithSource({ src, alt, source, sourceUrl, caption, size = "large" }: ImageWithSourceProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return null;
  }

  return (
    <figure className={`my-6 ${sizeClasses[size]}`}>
      <img
        src={src}
        alt={alt}
        className="rounded-lg border border-card-border w-full"
        onError={() => setImgError(true)}
      />
      {(caption || source) && (
        <figcaption className="mt-2 text-xs text-muted text-center">
          {caption && <span className="block text-sm mb-0.5">{caption}</span>}
          {source && (
            <>
              Source :{" "}
              {sourceUrl ? (
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {source}
                </a>
              ) : (
                source
              )}
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
