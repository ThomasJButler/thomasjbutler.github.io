export function LinkedInBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '4/1' }}>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        role="presentation"
      >
        <source
          src="https://res.cloudinary.com/depqttzlt/video/upload/v1752558251/large_green_banner_dv0bkk.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
    </div>
  );
}
