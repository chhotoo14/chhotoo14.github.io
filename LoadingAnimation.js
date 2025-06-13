export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload && trace.payload.name === 'loading_screen'),
    render: ({ element }) => {
        // Create container for our animation
        const container = document.createElement('div');
        container.classList.add('vf-loading-container');
        
        container.innerHTML = `
            <style>
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 25px;
                    background: rgba(0, 0, 0, 0.7) !important;
                    border-radius: 20px;
                    position: relative;
                    min-height: 120px;
                    min-width: 200px;
                    backdrop-filter: blur(5px);
                }
                
                .pulse-loader {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    margin-bottom: 25px;
                }
                
                .pulse-dot {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: #ff8c00;
                    border-radius: 50%;
                    box-shadow: 0 0 15px rgba(255, 140, 0, 0.8);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: pulse 1.5s infinite ease-in-out;
                }
                
                @keyframes pulse {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.5);
                        opacity: 0.7;
                    }
                }
                
                .loading-text {
                    font-size: 18px;
                    font-weight: 500;
                    color: white;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-shadow: 0 0 10px rgba(255, 140, 0, 0.7);
                }
                
                /* FIX: Auto-remove loading animation after response */
                .vfrc-assistant-trace:has(.vf-loading-container) {
                    animation: fadeOut 0.5s forwards;
                    animation-delay: 0.5s;
                }
                
                @keyframes fadeOut {
                    to { 
                        opacity: 0; 
                        height: 0; 
                        padding: 0; 
                        margin: 0;
                        display: none;
                    }
                }
            </style>
            
            <div class="pulse-loader">
                <div class="pulse-dot"></div>
            </div>
            <div class="loading-text">Just a moment</div>
        `;

        element.appendChild(container);
        
        // FIX: Auto-remove after 3 seconds (safety)
        setTimeout(() => {
            if (container.parentNode) {
                container.style.opacity = '0';
                container.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }, 300);
            }
        }, 3000);
    }
};
