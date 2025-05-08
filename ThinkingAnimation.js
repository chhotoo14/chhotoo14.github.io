export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => 
    trace.type === 'ext_thinking' || trace.payload?.name === 'ext_thinking',
  render: ({ trace, element }) => { // Added trace parameter
    // Clear previous content properly
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    // Create container with proper encapsulation
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        .wf-think {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #E7F5FD;
          padding: 6px 12px;
          border-radius: 8px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .wf-think span {
          font-size: 14px;
          color: #666;
          animation: text-pulse 1.2s ease-in-out infinite;
        }
        .wf-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #888;
          opacity: 0.3;
          animation: wf-blink 1.2s infinite ease-in-out;
        }
        .wf-dot:nth-child(2) { animation-delay: 0.2s; }
        .wf-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes wf-blink {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.6; }
        }
      </style>
      <div class="wf-think">
        <span>${trace.payload?.message || 'Thinking...'}</span>
        <div class="wf-dot"></div>
        <div class="wf-dot"></div>
        <div class="wf-dot"></div>
      </div>
    `;

    // Proper cleanup
    const cleanup = () => {
      wrapper.remove();
    };
    element.addEventListener('remove', cleanup);

    element.appendChild(wrapper);
  }
};
