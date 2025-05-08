export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_thinking' || trace.payload?.name === 'ext_thinking',
  render: ({ trace, element }) => {
    const payloadObj = typeof trace.payload === 'string'
      ? JSON.parse(trace.payload || '{}')
      : trace.payload || {};

    const {
      message = 'Thinking...',
      textColor = '#333',
      barColor = '#e0e0e0',
      progressColor = '#4a90e2',
      catImage = 'https://your-cdn.com/cat.png',
      speed = 2, // seconds per cycle
      catWidth = 24
    } = payloadObj;

    const container = document.createElement('div');
    container.className = 'thinking-wrapper';
    container.innerHTML = `
      <style>
        .thinking-wrapper {
          position: relative;
          overflow: visible;
          width: 100%;
          max-width: 300px;
          margin: 10px auto;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          text-align: center;
        }
        .bar {
          position: relative;
          width: 100%;
          height: 6px;
          background: ${barColor};
          border-radius: 3px;
          overflow: visible;
          margin: 0 auto;
        }
        .progress {
          position: absolute;
          top: 0;
          left: -50%;
          width: 50%;
          height: 100%;
          background: ${progressColor};
          animation: slide ${speed}s linear infinite;
        }
        @keyframes slide {
          0% { left: -50%; }
          100% { left: 100%; }
        }
        .cat {
          position: absolute;
          bottom: 100%;
          left: 0;
          width: ${catWidth}px;
          height: auto;
          z-index: 1;
          animation: walk ${speed}s linear infinite;
        }
        @keyframes walk {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100% - ${catWidth}px)); }
        }
        .thinking-text {
          margin-top: 8px;
          color: ${textColor};
          font-size: 14px;
          animation: fade 1.5s ease-in-out infinite;
        }
        @keyframes fade {
          0%,100% { opacity: .8; }
          50% { opacity: .4; }
        }
      </style>
      <div class="bar">
        <div class="progress"></div>
        <img src="${catImage}" class="cat" alt="Cat loading" />
      </div>
      <div class="thinking-text">${message}</div>
    `;

    element.addEventListener('remove', () => {
      container.querySelectorAll('*').forEach(el => el.remove());
    });

    element.appendChild(container);
  },
};
