"use client";

export default function BackgroundFX({ opacity = 0.22 }) {
  // 3 calques :
  // - image "circuit" fixe en plein écran (cover)
  // - scrim sombre pour le contraste
  // - vignette/mesh doux pour éviter que le centre soit trop lumineux
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-center bg-cover will-change-transform"
        style={{
          backgroundImage: "url('/assets/bg-circuit.jpg')",
          filter: "saturate(105%) contrast(105%)",
          opacity, // réglable
        }}
      />

      {/* Scrim sombre pour lisibilité (pas d’interférences avec le texte) */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Vignette douce + highlight central très subtil */}
      <div
        className="absolute inset-0"
        style={{
          // vignette + léger halo central vert/bleu
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(50% 40% at 60% 60%, rgba(59,130,246,0.10), transparent 60%)",
          mixBlendMode: "screen",
          opacity: 0.5,
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          // vignette sombre pour garder les bords calmes
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
