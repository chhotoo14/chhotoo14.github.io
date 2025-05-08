export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
  render: ({ element }) => {
    element.innerHTML = '';
    const wrapperContainer = document.createElement('div');
    wrapperContainer.innerHTML = `
      <style>
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
          transform: translateY(2px);
        }
        /* Increased to 40px */
        .tf-face { width: 40px; height: 40px; }
        .tf-text {
          font-size: 18px;
          color: #333;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .tf-text .dot {
          width: 5px;
          height: 5px;
        }
        /* Keep existing animations below */
        .tf-face .antenna { stroke: currentColor; stroke-width: 2; fill: transparent; }
        .tf-face .body { stroke: currentColor; stroke-width: 2; fill: transparent; }
        .tf-face .eye { fill: currentColor; animation: tf-blink 1.5s infinite; }
        @keyframes tf-blink { 0%, 30%, 50%, 100% { opacity:1; } 40% { opacity:0; } }
        @keyframes tf-text-pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes tf-dot { 0%,80%,100% { opacity:0.4; } 40% { opacity:1; } }
      </style>
      <div class="tf-container">
        <div class="tf-wrapper">
          <svg class="tf-face" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <!-- Antenna with radius 3 -->
            <line class="antenna" x1="12" y1="2" x2="12" y2="9" />
            <circle cx="12" cy="2" r="3" fill="currentColor" />
            <!-- Adjusted body position -->
            <rect class="body" x="4" y="9" width="16" height="12" rx="4" />
            <!-- Eyes -->
            <circle class="eye" cx="9" cy="15" r="2" />
            <circle class="eye" cx="15" cy="15" r="2" />
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
