export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload?.name === 'loading_screen'),
    render: ({ element }) => {
        // Create transparent container
        const container = document.createElement('div');
        container.className = 'vf-loading-container';
        container.style.opacity = '0.9'; // Slightly visible but transparent
        
        // Animation with two text states
        container.innerHTML = `
            <style>
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 12px 20px;
                    background: transparent !important;
                    border-radius: 16px;
                    min-height: 60px;
                    transition: opacity 0.5s ease;
                }
                
                .text-container {
                    position: relative;
                    height: 24px;
                    width: 160px;
                    text-align: center;
                }
                
                .loading-text {
                    position: absolute;
                    width: 100%;
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.85);
                    letter-spacing: 0.5px;
                    opacity: 0;
                    animation: textFade 6s infinite;
                }
                
                .text-1 { animation-delay: 0s; }
                .text-2 { animation-delay: 3s; }
                
                @keyframes textFade {
                    0% { opacity: 0; transform: translateY(5px); }
                    20% { opacity: 1; transform: translateY(0); }
                    50% { opacity: 1; transform: translateY(0); }
                    70% { opacity: 0; transform: translateY(-5px); }
                    100% { opacity: 0; }
                }
            </style>
            
            <div class="text-container">
                <div class="loading-text text-1">Just a moment</div>
                <div class="loading-text text-2">Almost there</div>
            </div>
        `;

        element.appendChild(container);
        
        // Auto-removal when AI responds
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    // Check for Voiceflow response containers
                    if (node.classList?.contains('vfrc-message--chat') || 
                        node.classList?.contains('vfrc-message--assistant')) {
                        // Fade out animation before removal
                        container.style.opacity = '0';
                        setTimeout(() => {
                            if (container.parentNode) {
                                container.parentNode.removeChild(container);
                            }
                            observer.disconnect();
                        }, 500);
                        return;
                    }
                }
            }
        });
        
        // Start observing the chat container
        const chatContainer = document.querySelector('.vfrc-chat');
        if (chatContainer) {
            observer.observe(chatContainer, { 
                childList: true, 
                subtree: true 
            });
        }
        
        // Fallback removal after 10 seconds
        setTimeout(() => {
            if (container.parentNode) {
                container.style.opacity = '0';
                setTimeout(() => {
                    container.parentNode.removeChild(container);
                }, 500);
                observer.disconnect();
            }
        }, 10000);
    }
};
