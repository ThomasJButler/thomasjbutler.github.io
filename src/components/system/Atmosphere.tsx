/**
 * Fixed CRT layers that sit above the page but below the overlays.
 *
 * These are real elements rather than pseudo-elements on Layout's root because
 * the scanline layer needs its own ::after for the drifting refresh band.
 */
export function Atmosphere() {
  return (
    <>
      <div className="fx-vignette" aria-hidden="true" />
      <div className="fx-scanlines" aria-hidden="true" />
    </>
  );
}
