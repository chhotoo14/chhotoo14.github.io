export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => {
    console.log('[DEBUG] Trace received:', trace); // Add debug logging
    return trace.type === 'ext_thinking' || trace.payload?.name === 'ext_thinking';
  },
  render: ({ trace, element }) => {
    console.log('[DEBUG] Rendering animation...');
    
    // Create shadow DOM for style isolation
    const shadow = element.attachShadow({ mode: 'open' });
    
    // Create container with atomic CSS
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          contain: content;
        }
        
        .container {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 24px;
          background: #f0f9ff;
          font-family: system-ui, sans-serif;
        }
        
        .text {
          font-size: 14px;
          color: #1e3a8a;
          animation: text-pulse 1.4s infinite;
        }
        
        .dots {
          display: flex;
          gap: 4px;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          animation: dot-bounce 1.4s infinite;
        }
        
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes text-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      </style>
      
      <div class="container">
        <span class="text">${trace.payload?.message || 'Processing...'}</span>
        <div class="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;

    // Force animation start
    setTimeout(() => {
      shadow.querySelectorAll('.dot').forEach(dot => {
        dot.style.animation = 'none';
        void dot.offsetWidth; // Trigger reflow
        dot.style.animation = '';
      });
    }, 50);

    console.log('[DEBUG] Animation elements:', shadow.innerHTML);
  }
};
