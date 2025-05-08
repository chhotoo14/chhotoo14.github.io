export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_thinking',
  render: ({ trace, element }) => {
    const payload = typeof trace.payload === 'string'
      ? JSON.parse(trace.payload || '{}')
      : trace.payload || {};
    const {
      faceSrc = 'https://your-cdn.com/ai-face.png',
      text = 'Thinking...',
      dotColor = '#888',
      faceSize = 24,
      speed = 1.2
    } = payload;

    const c = document.createElement('div');
    c.innerHTML = `
      <style>
        .ta{display:flex;align-items:center;gap:8px;background:transparent}
        .face{width:${faceSize}px;height:auto;animation:blink ${speed * 4}s infinite}
        @keyframes blink{
          0%,75%,100%{opacity:1}
          80%,90%{opacity:0.3}
        }
        .txt{font-size:14px;color:${dotColor};display:flex;gap:4px;margin-left:4px}
        .dot{width:6px;height:6px;border-radius:50%;background:${dotColor};opacity:0.3;animation:dot ${speed}s infinite}
        .dot:nth-child(2){animation-delay:${speed/3}s}
        .dot:nth-child(3){animation-delay:${(speed/3)*2}s}
        @keyframes dot{0%,80%,100%{opacity:0.3}40%{opacity:1}}
      </style>
      <div class="ta">
        <img src="${faceSrc}" class="face" alt="AI" />
        <div class="txt">
          ${text}<div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>
    `;
    element.appendChild(c);
  }
};
