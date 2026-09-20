"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

function PageLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    // Complete loading after a short delay
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  if (!loading && progress === 0) return null;

  return (
    <>
      {/* Top Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "transparent",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#fc0000",
            width: `${progress}%`,
            transition: "width 0.3s ease-out",
            boxShadow: "0 0 15px rgba(252, 0, 0, 0.6)",
          }}
        />
      </div>

      {/* Full Page Overlay with Loader Image */}
      {loading && progress < 90 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Loader Image with Fading Effect */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              animation: "fadeInOut 2s ease-in-out infinite",
            }}
          >
            <Image
              src="/loader.png"
              alt=""
              width={120}
              height={120}
              priority
              unoptimized
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 0 20px rgba(252, 0, 0, 0.4))",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderInner />
    </Suspense>
  );
}
