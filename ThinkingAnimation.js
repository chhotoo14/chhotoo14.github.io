export const ThinkingAnimation = {
    name: 'ThinkingAnimation',
    type: 'response',
    match: ({ trace }) => trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
    render: ({ trace, element }) => {
        // Parse payload with safe defaults
        const payloadObj = typeof trace.payload === 'string' 
            ? JSON.parse(trace.payload || '{}') 
            : trace.payload || {};

        const {
            message = 'Thinking',
            textColor = '#666',
            dotColor = '#888',
            speed = 1.5
        } = payloadObj;

        // Create animation container
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .thinking-container {
                    display: flex;
                    align-items: center;
                    gap: 0.8em;
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .text-container {
                    position: relative;
                    font-size: 14px;
                    color: ${textColor};
                    animation: text-pulse 1.2s ease-in-out infinite;
                }

                @keyframes text-pulse {
                    0%, 100% { opacity: 0.9; transform: translateY(0); }
                    50% { opacity: 0.6; transform: translateY(-1px); }
                }

                .orbit {
                    position: relative;
                    width: 2.2em;
                    height: 2.2em;
                }

                .dot {
                    position: absolute;
                    width: 0.4em;
                    height: 0.4em;
                    background: ${dotColor};
                    border-radius: 50%;
                    animation: orbit ${2 / speed}s linear infinite;
                }

                .dot:nth-child(1) { animation-delay: -0.1s; }
                .dot:nth-child(2) { animation-delay: -0.33s; }
                .dot:nth-child(3) { animation-delay: -0.66s; }

                @keyframes orbit {
                    0% {
                        transform: 
                            rotate(0deg) 
                            translateX(1em) 
                            rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: 
                            rotate(180deg) 
                            translateX(1em) 
                            rotate(-180deg);
                        opacity: 0.7;
                    }
                    100% {
                        transform: 
                            rotate(360deg) 
                            translateX(1em) 
                            rotate(-360deg);
                        opacity: 1;
                    }
                }
            </style>
            <div class="thinking-container">
                <div class="text-container">${message}</div>
                <div class="orbit">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;

        // Cleanup when removed
        element.addEventListener('remove', () => {
            container.querySelectorAll('*').forEach(el => el.remove());
        });

        element.appendChild(container);
    },
};
