export const ThinkingAnimation = {
  name: 'ThinkingAnimation',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_thinking',
  render: ({ element }) => {
    element.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        .typewriter {
          font-family: monospace;
          font-size: 16px;
          color: #333;
          overflow: hidden;
          border-right: .15em solid #333;
          white-space: nowrap;
          letter-spacing: .1em;
          animation:
            typing 2s steps(11, end) infinite,
            blink-caret .75s step-end infinite;
        }
        @keyframes typing {
          0% { width: 0; }
          50% { width: 11ch; }
          100% { width: 0; }
        }
        @keyframes blink-caret {
          50% { border-color: transparent; }
        }
      </style>
      <div class="typewriter">Thinking...</div>
    `;
    element.appendChild(wrapper);
  }
};
