const ThinkingAnimationExtension = {
  name: 'Thinking Animation',
  type: 'response',
  match: ({ trace }) => 
    trace.type === 'Thinking' || trace.payload?.name === 'Thinking_Animation',
  render: ({ element }) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '8px';
    container.style.padding = '12px 0';
    container.style.margin = '8px 0';

    container.innerHTML = `
      <style>
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
        .dot {
          width: 8px;
          height: 8px;
          background-color: #666;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
      </style>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;

    element.appendChild(container);
  },
};
