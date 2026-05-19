export default function CosmicBackground() {
  return (
    <>
      {/* Top Glow */}
      <div className="fixed -top-50 left-1/2 -translate-x-1/2 w-175 h-175 bg-purple-700/20 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Bottom Glow */}
      <div className="fixed -bottom-75 -right-50 w-150 h-150 bg-blue-600/20 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] pointer-events-none z-0" />
    </>
  );
}
