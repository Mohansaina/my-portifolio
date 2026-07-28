/**
 * The page's ambient lighting.
 *
 * Pure CSS: a soft studio wash from a key light above, and a trace of film
 * grain so no area of the page is ever perfectly flat. This replaces two
 * simultaneous requestAnimationFrame canvases that were each running O(n²)
 * neighbour checks every frame — roughly 5,500 distance calculations and
 * thousands of stroke() calls per frame, for an effect the eye read as
 * texture. Texture is cheaper as texture.
 *
 * No client boundary: there is nothing here to hydrate.
 */
export const GlobalBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none">
    <div className="studio-wash" />
    <div className="grain" />
  </div>
);
