export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => trace.type === 'thinking',
  render: ({ element }) => {
    // Minimal CSS-in-JS implementation
    const style = `
      .thinking {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        color: #666;
      }
      .dot {
        width: 4px;
        height: 4px;
        background: #888;
        border-radius: 50%;
        animation: blink 1.4s infinite;
      }
      .dot:nth-child(2) { animation-delay: 0.2s; }
      .dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes blink {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
    `;

    // Create elements
    const container = document.createElement('div');
    container.innerHTML = `
      <style>${style}</style>
      <div class="thinking">
        <span>Thinking</span>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;

    // Cleanup
    element.addEventListener('remove', () => {
      container.remove();
    });

    element.appendChild(container);
  }
};
