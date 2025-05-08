export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => 
    trace.type === 'ext_thinking' || trace.payload?.name === 'ext_thinking',
  render: ({ trace, element }) => {
    const payload = typeof trace.payload === 'string' 
      ? JSON.parse(trace.payload || '{}')
      : trace.payload || {};

    const config = {
      text: payload.text || 'Thinking',
      color: payload.color || '#3b82f6',
      bgColor: payload.bgColor || '#f0f9ff',
      speed: payload.speed || 1.2
    };

    const container = document.createElement('div');
    const shadow = container.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          contain: content;
        }

        .bubble {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 24px;
          background: ${config.bgColor};
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          gap: 6px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .text-container {
          position: relative;
          color: ${config.color};
          font-size: 14px;
          font-weight: 500;
        }

        .text {
          display: inline-block;
          margin-right: 0.3em;
        }

        .dots {
          display: inline-flex;
          gap: 2px;
        }

        .dot {
          width: 4px;
          height: 4px;
          background: ${config.color};
          border-radius: 50%;
          opacity: 0;
          animation: dot-wave ${1.8 / config.speed}s infinite;
        }

        .dot:nth-child(1) { animation-delay: 0.1s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes dot-wave {
          0%, 40%, 100% { 
            opacity: 0.2;
            transform: translateY(0);
          }
          20% { 
            opacity: 1;
            transform: translateY(-3px);
          }
        }
      </style>

      <div class="bubble">
        <div class="text-container">
          <span class="text">${config.text}</span>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    `;

    // Animation restart for Safari
    requestAnimationFrame(() => {
      shadow.querySelectorAll('.dot').forEach(dot => {
        dot.style.animation = 'none';
        void dot.offsetWidth;
        dot.style.animation = '';
      });
    });

    element.addEventListener('remove', () => container.remove());
    element.appendChild(container);
  }
};
