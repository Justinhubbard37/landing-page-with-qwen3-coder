/**
 * Ambient operating field: 12-column blueprint grid,
 * controlled vignette, 5% procedural grain. All fixed, all quiet.
 */
export default function Background() {
  return (
    <>
      <div aria-hidden className="blueprint-grid" />
      <div aria-hidden className="vignette" />
      <div aria-hidden className="noise-overlay" />
    </>
  );
}
