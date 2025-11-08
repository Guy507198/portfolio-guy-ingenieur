// src/components/CyberWallpaper.jsx
export default function CyberWallpaper() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* the image */}
      <div
        className="absolute inset-0 bg-[url('/bg-cyber.jpg')] bg-cover bg-center"
        style={{
          filter: 'brightness(0.28) contrast(1.15) saturate(1.05)',
          transform: 'translateZ(0)',
        }}
        aria-hidden
      />
      {/* global dark overlay to guarantee contrast */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      {/* soft vignette to avoid edges being too bright */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% 20%, rgba(0,0,0,0.0), rgba(0,0,0,0.55))',
        }}
        aria-hidden
      />
    </div>
  );
}
