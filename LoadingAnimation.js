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
                    min-height: 60px;
                    background: transparent !important;
                    padding: 10px 0;
                }
                
                .text-container {
                    position: relative;
                    height: 24px;
                    width: 180px;
                    text-align: center;
                }
                
                .loading-text {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    font-size: 14px;
                    font-weight: 500;
                    color: #000;
                    letter-spacing: 0.2px;
                    opacity: 0;
                    animation: waveFade 13.5s infinite;
                    text-align: center;
                }
                
                .text-1 { animation-delay: 0s; }
                .text-2 { animation-delay: 4.5s; }
                .text-3 { animation-delay: 9s; }
                
                @keyframes waveFade {
                    0% { 
                        opacity: 0; 
                        transform: translateY(5px) scale(0.95);
                        filter: blur(1px);
                    }
                    10% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                    30% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                    40% { 
                        opacity: 0; 
                        transform: translateY(-5px) scale(0.95);
                        filter: blur(1px);
                    }
                    100% { opacity: 0; }
                }
            </style>
            
            <div class="text-container">
                <div class="loading-text text-1">Processing your request</div>
                <div class="loading-text text-2">Generating response</div>
                <div class="loading-text text-3">Almost there</div>
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
