export const ThinkingAnimation = {
    name: 'ThinkingAnimation', // Changed to match export name
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
    render: ({ trace, element }) => {
        console.log('Rendering Thinking Animation');

        // Parse payload dynamically
        let payloadObj;
        if (typeof trace.payload === 'string') {
            try {
                payloadObj = JSON.parse(trace.payload);
            } catch (e) {
                console.error('Error parsing payload:', e);
                payloadObj = {};
            }
        } else {
            payloadObj = trace.payload || {};
        }

        // Extract configurable properties
        const animationColor = payloadObj.color || '#447f76';
        const message = payloadObj.message || 'Processing your request...';
        const dotSize = payloadObj.size || '10px';

        // Create animation container
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                @keyframes bounce {
                    0%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-12px); }
                }
                .thinking-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 0;
                    margin: 12px 0;
                    justify-content: center;
                }
                .thinking-dot {
                    width: ${dotSize};
                    height: ${dotSize};
                    background-color: ${animationColor};
                    border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out;
                }
                .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
                .thinking-dot:nth-child(2) { animation-delay: -0.16s; }
                .thinking-text {
                    color: ${animationColor};
                    font-size: 14px;
                    font-weight: 500;
                    margin-left: 8px;
                }
            </style>
            <div class="thinking-container" role="status" aria-live="polite">
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
                <div class="thinking-text">${message}</div>
            </div>
        `;

        element.appendChild(container);
    },
};
