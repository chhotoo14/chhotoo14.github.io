export const ThinkingAnimation = {
    name: 'ThinkingAnimation',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_thinking' || (trace.payload && trace.payload.name === 'ext_thinking'),
    render: ({ trace, element }) => {
        console.log('Rendering ThinkingAnimation');

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
        const message = payloadObj.message || 'thinking';
        const textColor = payloadObj.textColor || 'black';
        const textPositionLeft = payloadObj.textPositionLeft || '10px';
        const textPositionTop = payloadObj.textPositionTop || '15px';

        // Create animation container
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .bar {
                    position: relative;
                    width: 200px;
                    height: 50px;
                    background-color: lightgray;
                    border-radius: 10px;
                    margin: 12px 0;
                }
                .cat-container {
                    position: absolute;
                    left: 20px;
                    top: -40px;
                }
                .cat-body {
                    position: absolute;
                    width: 100px;
                    height: 30px;
                    background-color: black;
                    border-radius: 50px;
                    left: 0;
                    top: 10px;
                }
                .cat-head {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: black;
                    border-radius: 50%;
                    left: -10px;
                    top: 0;
                    animation: nod 3s infinite;
                }
                @keyframes nod {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(5deg); }
                    100% { transform: rotate(0deg); }
                }
                .cat-tail {
                    position: absolute;
                    width: 20px;
                    height: 40px;
                    background-color: black;
                    left: 100px;
                    top: 20px;
                    transform-origin: top left;
                    animation: sway 2s infinite;
                }
                @keyframes sway {
                    0% { transform: rotate(-10deg); }
                    50% { transform: rotate(10deg); }
                    100% { transform: rotate(-10deg); }
                }
                .cat-ear {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 10px solid black;
                    left: 5px;
                    top: -10px;
                    animation: twitch 1s infinite;
                }
                @keyframes twitch {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(15deg); }
                    100% { transform: rotate(0deg); }
                }
                .thinking-text {
                    position: absolute;
                    left: ${textPositionLeft};
                    top: ${textPositionTop};
                    color: ${textColor};
                    font-size: 14px;
                    font-weight: 500;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                }
            </style>
            <div class="bar" role="status" aria-live="polite">
                <div class="cat-container">
                    <div class="cat-body"></div>
                    <div class="cat-head"></div>
                    <div class="cat-tail"></div>
                    <div class="cat-ear"></div>
                </div>
                <div class="thinking-text"></div>
            </div>
        `;

        element.appendChild(container);

        // Add dynamic dots to the "thinking" text
        const thinkingText = container.querySelector('.thinking-text');
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            thinkingText.textContent = message + '.'.repeat(dots);
        }, 1000);

        // Cleanup interval when component is removed
        element.addEventListener('remove', () => clearInterval(interval));
    },
};
