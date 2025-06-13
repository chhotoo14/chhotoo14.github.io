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
                    min-height: 100px;
                    background: transparent !important;
                    padding: 20px 0;
                }
                
                .text-container {
                    position: relative;
                    height: 28px;
                    width: 220px;
                    text-align: center;
                    margin-bottom: 15px;
                }
                
                .loading-text {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                    letter-spacing: 0.3px;
                    opacity: 0;
                    animation: textFade 13.5s infinite;
                    text-align: center;
                }
                
                .text-1 { animation-delay: 0s; }
                .text-2 { animation-delay: 4.5s; }
                .text-3 { animation-delay: 9s; }
                
                @keyframes textFade {
                    0% { opacity: 0; transform: translateY(8px); }
                    10% { opacity: 1; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(0); }
                    40% { opacity: 0; transform: translateY(-8px); }
                    100% { opacity: 0; }
                }
                
                .dot-wave {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    height: 20px;
                }
                
                .dot {
                    width: 8px;
                    height: 8px;
                    background: #555;
                    border-radius: 50%;
                    animation: wave 1.8s ease-in-out infinite;
                }
                
                .dot:nth-child(1) { animation-delay: 0s; }
                .dot:nth-child(2) { animation-delay: 0.3s; }
                .dot:nth-child(3) { animation-delay: 0.6s; }
                .dot:nth-child(4) { animation-delay: 0.9s; }
                .dot:nth-child(5) { animation-delay: 1.2s; }
                
                @keyframes wave {
                    0%, 60%, 100% { 
                        transform: translateY(0);
                        background: #555;
                    }
                    30% { 
                        transform: translateY(-10px);
                        background: #222;
                    }
                }
            </style>
            
            <div class="text-container">
                <div class="loading-text text-1">Processing your request</div>
                <div class="loading-text text-2">Generating response</div>
                <div class="loading-text text-3">Almost there</div>
            </div>
            
            <div class="dot-wave">
                <div class="dot"></div>
                <div class="dot"></div>
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
                container.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                    observer.disconnect();
                }, 300);
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
