export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  // match either trace.type or payload name
  match: ({ trace }) =>
    trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
  render: ({ element }) => {
    element.innerHTML = '';
    const wrapperContainer = document.createElement('div');
    wrapperContainer.innerHTML = `
      <style>
        /* Center everything in the bubble */
        .tf-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .tf-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
        }
        /* Larger head */
        .tf-face { width: 28px; height: 28px; }
        .tf-face .antenna { stroke: currentColor; stroke-width: 2; fill: transparent; }
        .tf-face .body { stroke: currentColor; stroke-width: 2; fill: transparent; }
        .tf-face .eye { fill: currentColor; animation: tf-blink 1.5s infinite; }
        @keyframes tf-blink { 0%, 30%, 50%, 100% { opacity:1; } 40% { opacity:0; } }
        /* Slightly bigger, darker text */
        .tf-text {
          font-size: 16px;
          color: #333;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          animation: tf-text-pulse 2s infinite;
        }
        @keyframes tf-text-pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .tf-text .dot {
          width: 4px;
          height: 4px;
          background: #666;
          border-radius:50%;
          opacity:0.4;
          animation: tf-dot 1.2s infinite ease-in-out;
        }
        .tf-text .dot:nth-child(2) { animation-delay:0.3s; }
        .tf-text .dot:nth-child(3) { animation-delay:0.6s; }
        @keyframes tf-dot { 0%,80%,100% { opacity:0.4; } 40% { opacity:1; } }
      </style>
      <div class="tf-container">
        <div class="tf-wrapper">
          <svg class="tf-face" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <!-- antenna -->
            <line class="antenna" x1="12" y1="2" x2="12" y2="6" />
            <circle cx="12" cy="2" r="1.5" fill="currentColor" />
            <!-- body -->
            <rect class="body" x="4" y="6" width="16" height="12" rx="4" />
            <!-- eyes -->
            <circle class="eye" cx="9" cy="12" r="1.5" />
            <circle class="eye" cx="15" cy="12" r="1.5" />
          </svg>
          <div class="tf-text">
            Thinking
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    `;
    element.appendChild(wrapperContainer);
  }
};
