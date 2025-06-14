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
                    min-height: 40px;
                    background: transparent !important;
                    padding: 8px 0;
                    transform: scale(0.85);
                    opacity: 0.9;
                }
                
                .text-container {
                    position: relative;
                    height: 22px;
                    width: 160px;
                    text-align: center;
                }
                
                .loading-text {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    font-size: 13px;
                    font-weight: 500;
                    color: #000;
                    letter-spacing: 0.2px;
                    opacity: 0;
                    text-align: center;
                    animation: textFlow 13.5s infinite;
                }
                
                .text-1 { animation-delay: 0s; }
                .text-2 { animation-delay: 4.5s; }
                .text-3 { animation-delay: 9s; }
                
                @keyframes textFlow {
                    0% { 
                        opacity: 0;
                        transform: translateY(6px) scale(0.96);
                        filter: blur(1.5px);
                    }
                    8% { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                    28% { 
                        opacity: 1;
                        transform: translateY(0) scale(1.02);
                    }
                    36% { 
                        opacity: 0;
                        transform: translateY(-4px) scale(0.98);
                        filter: blur(1px);
                    }
                    100% { opacity: 0; }
                }

                /* Modern gradient wave effect */
                .loading-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(90deg, transparent, rgba(150,150,150,0.3), transparent);
                    background-size: 200% 100%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    animation: waveMove 2.2s linear infinite;
                    opacity: 0.7;
                }
                
                @keyframes waveMove {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            </style>
            
            <div class="text-container">
                <div class="loading-text text-1" data-text="Processing your request">Processing your request</div>
                <div class="loading-text text-2" data-text="Generating response">Generating response</div>
                <div class="loading-text text-3" data-text="Almost there">Almost there</div>
            </div>
        `;

        element.appendChild(container);
        
        // Auto-removal when AI responds
        const observer = new MutationObserver(() => {
            const aiMessages = document.querySelectorAll('.vfrc-message--chat, .vfrc-message--assistant');
            if (aiMessages.length > 0) {
                container.style.opacity = '0';
                container.style.transform = 'scale(0.85)';
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
