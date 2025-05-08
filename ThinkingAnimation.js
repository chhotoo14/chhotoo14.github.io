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
      message = '',
      dotColor = '#888',
      background = 'transparent',
      size = 8,
      speed = 0.8
    } = payloadObj;

    const container = document.createElement('div');
    container.className = 'thinking-bubble';
    container.innerHTML = `
      <style>
        .thinking-bubble {
          display: inline-flex;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          background: ${background};
        }
        .dot {
          width: ${size}px;
          height: ${size}px;
          margin: 0 ${size / 2}px;
          background: ${dotColor};
          border-radius: 50%;
          opacity: 0.3;
          animation: blink ${speed}s infinite;
        }
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: ${speed / 3}s; }
        .dot:nth-child(3) { animation-delay: ${(speed / 3) * 2}s; }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        .message {
          font-size: 14px;
          color: ${dotColor};
          margin-left: 6px;
          opacity: ${message ? 1 : 0};
        }
      </style>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="message">${message}</div>
    `;

    element.addEventListener('remove', () => {
      container.querySelectorAll('*').forEach(el => el.remove());
    });

    element.appendChild(container);
  }
};
