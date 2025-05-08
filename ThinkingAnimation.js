export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  // match either trace.type or payload name
  match: ({ trace }) =>
    trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
  render: ({ element }) => {
    element.innerHTML = '';
    const html = document.createElement('div');
    html.innerHTML = `
      <style>
        .tf-wrapper { display: inline-flex; align-items: center; gap: 6px; background: transparent; }
        .tf-face { width: 20px; height: 16px; }
        .tf-face .eye { fill: currentColor; animation: tf-blink 2s infinite; }
        .tf-face .eye.right { animation-delay: 0.4s; }
        @keyframes tf-blink { 0%,90%,100% { opacity:1; } 92%,98% { opacity:0; } }
        .tf-text { font-size: 14px; color: #666; display: flex; align-items: center; gap: 2px; }
        .tf-text .dot { display: inline-block; width: 4px; height: 4px; background: #888; border-radius:50%; opacity:0.3; animation: tf-dot 1s infinite ease-in-out; }
        .tf-text .dot:nth-child(2) { animation-delay:0.2s; }
        .tf-text .dot:nth-child(3) { animation-delay:0.4s; }
        @keyframes tf-dot { 0%,80%,100% { opacity:0.3; } 40% { opacity:1; } }
      </style>
      <div class="tf-wrapper">
        <svg class="tf-face" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="14" rx="4" stroke="currentColor" stroke-width="2" fill="transparent"/>
          <circle class="eye left" cx="8" cy="8" r="1.5" />
          <circle class="eye right" cx="16" cy="8" r="1.5" />
        </svg>
        <div class="tf-text">
          Thinking
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;
    element.appendChild(html);
  }
};
