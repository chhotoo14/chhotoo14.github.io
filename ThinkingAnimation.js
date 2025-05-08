export const ThinkingAnimation = {
  name: 'Thinking',
  type: 'response',
  match: ({ trace }) => trace.type === 'thinking',
  render: ({ element }) => {
    element.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: system-ui;
        color: #666;
        padding: 8px;
      ">
        <span>Thinking</span>
        ${Array(3).fill('<div style="\
          width: 5px;\
          height: 5px;\
          background: #888;\
          border-radius: 50%;\
          animation: blink 1.2s infinite;\
        "></div>').join('')}
      </div>
      <style>
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        div[style*="animation: blink"]:nth-child(2) { animation-delay: 0.2s; }
        div[style*="animation: blink"]:nth-child(3) { animation-delay: 0.4s; }
      </style>
    `;
  }
};
