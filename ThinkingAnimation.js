export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => 
    trace.type === 'ext_thinking' || trace.payload?.name === 'ext_thinking',
  render: ({ trace, element }) => {
    // Clear previous content
    element.replaceChildren();
    
    // Create container with scoped styles
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        /* Unique animation names with component prefix */
        @keyframes wf-think-blink {
          0%, 80%, 100% { 
            opacity: 0.3; 
            transform: translateY(0); 
          }
          40% { 
            opacity: 1; 
            transform: translateY(-2px); 
          }
        }
        
        @keyframes wf-think-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.6; }
        }
        
        .wf-think-container {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #E7F5FD;
          padding: 6px 12px;
          border-radius: 8px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .wf-think-text {
          font-size: 14px;
          color: #666;
          animation: wf-think-pulse 1.2s ease-in-out infinite;
        }
        
        .wf-think-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #888;
          opacity: 0.3;
          animation: wf-think-blink 1.2s infinite ease-in-out;
        }
        
        .wf-think-dot:nth-child(2) { 
          animation-delay: 0.2s; 
        }
        .wf-think-dot:nth-child(3) { 
          animation-delay: 0.4s; 
        }
      </style>
      <div class="wf-think-container">
        <span class="wf-think-text">${trace.payload?.message || 'Thinking...'}</span>
        <div class="wf-think-dot"></div>
        <div class="wf-think-dot"></div>
        <div class="wf-think-dot"></div>
      </div>
    `;

    // Force animation restart
    requestAnimationFrame(() => {
      wrapper.querySelectorAll('.wf-think-dot').forEach(dot => {
        dot.style.animation = 'none';
        dot.offsetHeight; // Trigger reflow
        dot.style.animation = '';
      });
    });

    // Cleanup
    const cleanup = () => wrapper.remove();
    element.addEventListener('remove', cleanup);
    
    element.appendChild(wrapper);
  }
};
