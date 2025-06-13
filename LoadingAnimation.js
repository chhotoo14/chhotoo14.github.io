export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload && trace.payload.name === 'loading_screen'),
    render: ({ element }) => {
        const container = document.createElement('div');
        container.classList.add('vf-loading-container');
        
        container.innerHTML = `
            <style>
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    background: transparent !important;
                    position: relative;
                }
                
                .loading-content {
                    text-align: center;
                }
                
                .text-loader {
                    font-size: 24px;
                    font-weight: 500;
                    color: #ffffff;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    position: relative;
                    display: inline-block;
                }
                
                .text-loader::after {
                    content: "";
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                    overflow: hidden;
                }
                
                .text-loader::before {
                    content: "";
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 40%;
                    height: 3px;
                    background: #ffffff;
                    border-radius: 2px;
                    animation: loadingLine 2s infinite ease-in-out;
                    box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
                }
                
                @keyframes loadingLine {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(250%); }
                    100% { transform: translateX(250%); }
                }
                
                .pulse-dots {
                    display: flex;
                    margin-top: 30px;
                    justify-content: center;
                }
                
                .dot {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    margin: 0 6px;
                    animation: pulse 1.5s infinite ease-in-out;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                }
                
                .dot:nth-child(1) { animation-delay: 0s; }
                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }
                
                @keyframes pulse {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    50% { 
                        transform: scale(1.4);
                        opacity: 1;
                    }
                }
                
                .glow-text {
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                }
            </style>
            
            <div class="loading-content">
                <div class="text-loader glow-text">Just a moment</div>
                <div class="pulse-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;

        element.appendChild(container);
    }
};
