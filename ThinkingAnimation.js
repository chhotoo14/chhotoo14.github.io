export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_thinking',
  render: ({ element }) => {
    // Clear previous
    element.innerHTML = '';

    const faceSize = 16;
    const dotColor = '#888';
    const speed = 1;

    const container = document.createElement('div');
    container.innerHTML = `
      <style>
        .tv-thinking { display: inline-flex; align-items: center; gap: 4px; background: transparent !important; padding: 0; }
        .tv-thinking .face { width: ${faceSize}px; height: ${faceSize}px; animation: blink ${speed * 3}s infinite; }
        @keyframes blink { 0%,75%,100% { opacity:1 } 80%,90% { opacity:0 } }
        .tv-thinking .txt { display: flex; align-items: center; font-size: 12px; color: ${dotColor}; margin: 0; }
        .tv-thinking .dot { width: 4px; height: 4px; margin: 0 2px; border-radius:50%; background:${dotColor}; opacity:0.3; animation: dot ${speed}s infinite; }
        .tv-thinking .dot:nth-child(2) { animation-delay: ${speed/3}s; }
        .tv-thinking .dot:nth-child(3) { animation-delay: ${(speed/3)*2}s; }
        @keyframes dot { 0%,80%,100% { opacity:0.3 } 40% { opacity:1 } }
      </style>
      <div class="tv-thinking">
        <!-- Inline AI face SVG -->
        <svg class="face" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="18" height="10" rx="5" stroke="currentColor" stroke-width="2" fill="transparent" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <rect x="11" y="2" width="2" height="5" rx="1" fill="currentColor" />
        </svg>
        <div class="txt">Thinking...<div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
      </div>
    `;
    element.appendChild(container);
  }
};
