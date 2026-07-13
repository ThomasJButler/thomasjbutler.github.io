export function LinkedInBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '4/1' }}>
      {/* aria-hidden, not role="presentation": ARIA forbids the presentation role on
          <video>, which fails axe (aria-allowed-role). The banner is decorative and
          silent, so hiding it from the accessibility tree is both legal and accurate,
          and it keeps the captions rule from firing on a video with no audio track. */}
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="https://res.cloudinary.com/depqttzlt/video/upload/vc_auto,q_auto,w_1200/v1752558251/large_green_banner_dv0bkk.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
    </div>
  );
}
