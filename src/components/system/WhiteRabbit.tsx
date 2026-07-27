/**
 * A white rabbit that hops into the corner. Click it and it takes you down the hole.
 *
 * A real button with a label and a 44px hit area, because an easter egg that only
 * a mouse can find is still a control on the page.
 */
export function WhiteRabbit({ onCatch }: { onCatch: () => void }) {
  return (
    <button
      type="button"
      className="fx-rabbit"
      onClick={onCatch}
      title="follow the white rabbit"
      aria-label="Follow the white rabbit"
    >
      <svg viewBox="0 0 64 48" aria-hidden="true">
        <ellipse cx="27" cy="35" rx="16" ry="10" fill="currentColor" />
        <circle cx="44" cy="27" r="7.5" fill="currentColor" />
        <ellipse cx="41" cy="14" rx="2.8" ry="9" fill="currentColor" transform="rotate(-14 41 14)" />
        <ellipse cx="48" cy="15" rx="2.8" ry="9" fill="currentColor" transform="rotate(8 48 15)" />
        <circle cx="12" cy="38" r="4.5" fill="currentColor" />
        <circle cx="46.5" cy="26" r="1.1" fill="#050805" />
      </svg>
    </button>
  );
}
