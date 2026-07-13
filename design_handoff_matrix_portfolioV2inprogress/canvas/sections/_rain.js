// Tiny matrix-rain canvas helper for section files
(function () {
  const initRain = (canvas) => {
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; init(); };
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01';
    const fs = 14; let drops = [];
    const init = () => {
      const cols = Math.floor((canvas.width / fs) * 0.7);
      drops = Array.from({length: cols}, () => ({
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.5 + 0.2,
        chars: Array.from({length: Math.floor(canvas.height/fs)+10},
          () => chars[Math.floor(Math.random()*chars.length)]),
        brightness: Math.random() * 0.4 + 0.3,
      }));
    };
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fs + 'px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      for (let x=0; x<drops.length; x++) {
        const d = drops[x]; d.y += d.speed;
        if (d.y > canvas.height && Math.random() > 0.97) { d.y = -d.chars.length*fs; }
        const len = d.chars.length;
        for (let i=0; i<len; i++) {
          const py = d.y + i*fs;
          if (py < -fs || py > canvas.height+fs) continue;
          const fade = (1 - (i/len)*0.85) * d.brightness;
          ctx.fillStyle = i >= len-2
            ? `rgba(200,255,200,${Math.min(fade*1.5,0.9)})`
            : `rgba(0,200,0,${fade*0.7})`;
          if (Math.random() < 0.003) d.chars[i] = chars[Math.floor(Math.random()*chars.length)];
          ctx.fillText(d.chars[i], x*(fs/0.7)+fs/2, py);
        }
      }
      requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize);
  };
  document.querySelectorAll('canvas.rain').forEach(initRain);
})();
