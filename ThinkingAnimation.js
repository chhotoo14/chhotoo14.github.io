export const ThinkingAnimation = {
    name: 'ThinkingAnimation',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_thinking' || (trace.payload?.name === 'ext_thinking'),
    render: ({ trace, element }) => {
        console.log('Rendering ThinkingAnimation');

        // Parse payload with error handling
        let payloadObj = {};
        try {
            payloadObj = typeof trace.payload === 'string' ? 
                JSON.parse(trace.payload) : 
                trace.payload || {};
        } catch (e) {
            console.error('Payload parse error:', e);
        }

        // Configuration with defaults
        const config = {
            message: payloadObj.message || 'Thinking',
            textColor: payloadObj.textColor || '#333',
            textPositionLeft: payloadObj.textPositionLeft || '120px',
            textPositionTop: payloadObj.textPositionTop || '15px',
            backgroundColor: payloadObj.backgroundColor || '#f0f0f0',
            catColor: payloadObj.catColor || '#2c2c2c'
        };

        // Create container
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .thinking-container {
                    position: relative;
                    width: 200px;
                    height: 60px;
                    background: ${config.backgroundColor};
                    border-radius: 12px;
                    margin: 10px 0;
                    overflow: hidden;
                }

                .cat {
                    position: absolute;
                    left: 20px;
                    top: 15px;
                    width: 80px;
                    height: 30px;
                }

                .cat-body {
                    position: absolute;
                    width: 60px;
                    height: 25px;
                    background: ${config.catColor};
                    border-radius: 15px;
                }

                .cat-head {
                    position: absolute;
                    left: -10px;
                    top: -5px;
                    width: 25px;
                    height: 25px;
                    background: ${config.catColor};
                    border-radius: 50%;
                    animation: nod 2s infinite;
                }

                .cat-tail {
                    position: absolute;
                    right: -15px;
                    top: 5px;
                    width: 20px;
                    height: 40px;
                    background: ${config.catColor};
                    transform-origin: top left;
                    animation: sway 1.5s infinite;
                }

                @keyframes nod {
                    0%, 100% { transform: rotate(0); }
                    50% { transform: rotate(8deg); }
                }

                @keyframes sway {
                    0%, 100% { transform: rotate(-15deg); }
                    50% { transform: rotate(15deg); }
                }

                .thinking-text {
                    position: absolute;
                    left: ${config.textPositionLeft};
                    top: ${config.textPositionTop};
                    color: ${config.textColor};
                    font: 500 14px/1.5 system-ui;
                    display: flex;
                    gap: 2px;
                }
            </style>

            <div class="thinking-container">
                <div class="cat">
                    <div class="cat-body"></div>
                    <div class="cat-head"></div>
                    <div class="cat-tail"></div>
                </div>
                <div class="thinking-text"></div>
            </div>
        `;

        // Animated dots logic
        const thinkingText = container.querySelector('.thinking-text');
        let dots = 0;
        const animateDots = () => {
            dots = (dots + 1) % 4;
            thinkingText.textContent = config.message + '.'.repeat(dots);
        };
        
        const interval = setInterval(animateDots, 500);
        animateDots(); // Initial call

        // Cleanup
        const cleanup = () => {
            clearInterval(interval);
            container.removeEventListener('animation-cancel', cleanup);
        };
        container.addEventListener('animation-cancel', cleanup);

        element.appendChild(container);
    }
};
