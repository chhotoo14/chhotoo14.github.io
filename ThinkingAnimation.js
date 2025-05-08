export const ThinkingAnimation = {
    name: 'ThinkingAnimation',
    type: 'response',
    match: ({ trace }) => trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
    render: ({ trace, element }) => {
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
        const message = payloadObj.message || 'Thinking';
        const textColor = payloadObj.textColor || 'black';

        // Create animation container
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .thinking-container {
                    display: flex;
                    align-items: center;
                }
                .thinking-text {
                    font-size: 14px;
                    color: ${textColor};
                    margin-right: 10px;
                }
                .dot-container {
                    position: relative;
                    width: 40px;
                    height: 40px;
                }
                .dot {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -5px;
                    margin-top: -5px;
                    width: 10px;
                    height: 10px;
                    background-color: black;
                    border-radius: 50%;
                    animation: rotate 2s linear infinite;
                }
                @keyframes rotate {
                    from {
                        transform: rotate(0deg) translateX(20px) rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg) translateX(20px) rotate(-360deg);
                    }
                }
            </style>
            <div class="thinking-container">
                <span class="thinking-text" id="thinking-text">${message}</span>
                <div class="dot-container">
                    <div class="dot"></div>
                </div>
            </div>
        `;

        // Get thinking text element
        const thinkingText = container.querySelector('#thinking-text');

        // Add blinking dots
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            thinkingText.textContent = message + '.'.repeat(dots);
        }, 500);

        // Cleanup interval when component is removed
        element.addEventListener('remove', () => clearInterval(interval));

        // Append container to element
        element.appendChild(container);
    },
};
