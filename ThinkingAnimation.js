export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_thinking',
  render: ({ element }) => {
    element.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        .wf-think {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #E7F5FD !important;
          padding: 6px 10px;
          border-radius: 8px;
        }
        .wf-think span {
          font-size: 14px;
          color: #666;
        }
        .wf-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #888;
          opacity: 0.3;
          animation: wf-blink 1s infinite ease-in-out;
        }
        .wf-dot:nth-child(2) { animation-delay: 0.2s; }
        .wf-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes wf-blink {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      </style>
      <div class="wf-think">
        <span>Thinking...</span>
        <div class="wf-dot"></div>
        <div class="wf-dot"></div>
        <div class="wf-dot"></div>
      </div>
    `;
    element.appendChild(wrapper);
  }
};
