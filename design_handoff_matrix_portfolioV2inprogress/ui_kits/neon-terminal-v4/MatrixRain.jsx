/* MatrixRain.jsx — canvas digital rain (port of v4.0 MatrixRain.tsx) */
function MatrixRain() {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const dropsRef = React.useRef([]);
  const [visible, setVisible] = React.useState(false);
  const reduce = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!visible || reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01';
    const fontSize = 16;

    const initDrops = () => {
      const cols = Math.floor((canvas.width / fontSize) * 0.7);
      dropsRef.current = Array.from({ length: cols }, () => {
        const isBg = Math.random() < 0.45;
        return {
          y: Math.random() * canvas.height * 2 - canvas.height,
          speed: isBg ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.4,
          chars: Array.from(
            { length: Math.floor(canvas.height / fontSize) + 15 },
            () => chars[Math.floor(Math.random() * chars.length)]
          ),
          brightness: isBg ? Math.random() * 0.25 + 0.1 : Math.random() * 0.4 + 0.35,
          isBg
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';

      for (let x = 0; x < dropsRef.current.length; x++) {
        const drop = dropsRef.current[x];
        drop.y += drop.speed;
        if (drop.y > canvas.height && Math.random() > 0.975) {
          drop.y = -drop.chars.length * fontSize - Math.random() * 300;
          drop.speed = drop.isBg
            ? Math.random() * 0.3 + 0.15
            : Math.random() * 0.5 + 0.4;
        }
        const len = drop.chars.length;
        for (let i = 0; i < len; i++) {
          const py = drop.y + i * fontSize;
          if (py < -fontSize || py > canvas.height + fontSize) continue;
          const fade = (1 - (i / len) * 0.85) * drop.brightness;
          if (i >= len - 2) {
            ctx.fillStyle = 'rgba(200, 255, 200, ' + Math.min(fade * 1.5, 0.9) + ')';
          } else {
            ctx.fillStyle = 'rgba(0, 200, 0, ' + fade * 0.7 + ')';
          }
          if (Math.random() < 0.002) {
            drop.chars[i] = chars[Math.floor(Math.random() * chars.length)];
          }
          ctx.fillText(drop.chars[i], x * (fontSize / 0.7) + fontSize / 2, py);
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [visible, reduce]);

  if (!visible || reduce) return null;
  return React.createElement('canvas', {
    ref: canvasRef,
    className: 'matrix-rain-canvas',
    'aria-hidden': true
  });
}

window.MatrixRain = MatrixRain;
