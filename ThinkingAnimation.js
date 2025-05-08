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
      faceSize = 16,
      speed = 1
    } = payload;

    // Clear previous content
    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'tv-thinking';
    container.innerHTML = `
      <style>
        .tv-thinking { display: inline-flex; align-items: center; gap: 4px; background: transparent !important; padding: 0; }
        .tv-thinking .face { width: ${faceSize}px; height: auto; animation: blink ${speed * 3}s infinite; }
        @keyframes blink { 0%,75%,100% { opacity:1 } 80%,90% { opacity:0 } }
        .tv-thinking .txt { display: flex; align-items: center; font-size: 12px; color: ${dotColor}; margin: 0; }
        .tv-thinking .dot { width: 4px; height: 4px; margin: 0 2px; border-radius:50%; background:${dotColor}; opacity:0.3; animation: dot ${speed}s infinite; }
        .tv-thinking .dot:nth-child(2) { animation-delay: ${speed/3}s; }
        .tv-thinking .dot:nth-child(3) { animation-delay: ${(speed/3)*2}s; }
        @keyframes dot { 0%,80%,100% { opacity:0.3 } 40% { opacity:1 } }
      </style>
      <img src="${faceSrc}" class="face" alt="AI face" />
      <div class="txt">${text}<div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    `;
    element.appendChild(container);
  }
};
