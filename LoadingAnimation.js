export const LoadingAnimationExtension = {
    name: 'LoadingAnimationExtension',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_loading_animation' || 
        (trace.payload && trace.payload.name === 'ext_loading_animation'),
    render: ({ element }) => {
        const container = document.createElement('div');
        container.classList.add('loading-animation-container');
        
        container.innerHTML = `
            <style>
                .loading-animation-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 80px;
                    background: transparent !important;
                    position: relative;
                }
                
                .text-container {
                    position: relative;
                    height: 24px;
                    width: 100%;
                    text-align: center;
                }
                
                .loading-text {
                    position: absolute;
                    width: 100%;
                    font-size: 15px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    letter-spacing: 0.3px;
                    opacity: 0;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                    animation: textFade 13.5s infinite;
                }
                
                .text-1 { animation-delay: 0s; }
                .text-2 { animation-delay: 4.5s; }
                .text-3 { animation-delay: 9s; }
                
                @keyframes textFade {
                    0% { opacity: 0; transform: translateY(5px); }
                    8% { opacity: 1; transform: translateY(0); }
                    32% { opacity: 1; transform: translateY(0); }
                    40% { opacity: 0; transform: translateY(-5px); }
                    100% { opacity: 0; }
                }
                
                .dot-pulse {
                    display: flex;
                    justify-content: center;
                    gap: 5px;
                    margin-top: 15px;
                }
                
                .dot {
                    width: 6px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    animation: dotPulse 1.5s infinite;
                }
                
                .dot:nth-child(1) { animation-delay: 0s; }
                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }
                
                @keyframes dotPulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                
                /* Auto-remove when AI responds */
                .vfrc-assistant-trace:has(.loading-animation-container) {
                    transition: opacity 0.4s;
                }
            </style>
            
            <div class="text-container">
                <div class="loading-text text-1">Processing your request</div>
                <div class="loading-text text-2">Generating response</div>
                <div class="loading-text text-3">Almost there</div>
            </div>
            <div class="dot-pulse">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;

        element.appendChild(container);
        
        // Auto-removal when AI responds
        const observer = new MutationObserver(() => {
            const aiMessages = document.querySelectorAll('.vfrc-message--chat, .vfrc-message--assistant');
            if (aiMessages.length > 0) {
                container.style.opacity = '0';
                container.style.transform = 'scale(0.95)';
                container.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                    observer.disconnect();
                }, 400);
            }
        });
        
        const chatContainer = document.querySelector('.vfrc-chat');
        if (chatContainer) {
            observer.observe(chatContainer, { 
                childList: true, 
                subtree: true 
            });
        }
        
        // Fallback removal after 15 seconds
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
                observer.disconnect();
            }
        }, 15000);
    }
};
