export const LoadingAnimationExtension = {
    name: 'LoadingAnimationExtension',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_loading_animation' || 
        (trace.payload && trace.payload.name === 'ext_loading_animation'),
    render: ({ element }) => {
        // Create container for our animation
        const container = document.createElement('div');
        container.classList.add('loading-animation-container');
        
        // Create the animation with fade in/out effect
        container.innerHTML = `
            <style>
                .loading-animation-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;
                    background: transparent !important;
                    min-height: 80px;
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
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    letter-spacing: 0.5px;
                    opacity: 0;
                    animation: textFade 6s infinite;
                    text-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
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
                
                /* Auto-remove when AI responds */
                .vfrc-assistant-trace:has(.loading-animation-container) {
                    animation: fadeOut 0.5s forwards;
                }
                
                @keyframes fadeOut {
                    to { opacity: 0; height: 0; padding: 0; margin: 0; }
                }
            </style>
            
            <div class="text-container">
                <div class="loading-text text-1">Just a moment</div>
                <div class="loading-text text-2">Almost there</div>
            </div>
        `;

        // Add to the element
        element.appendChild(container);
        
        // Auto-removal when AI responds
        const observer = new MutationObserver(() => {
            const aiMessages = document.querySelectorAll('.vfrc-message--chat, .vfrc-message--assistant');
            if (aiMessages.length > 0) {
                // Start fade out animation
                container.style.opacity = '0';
                container.style.transition = 'opacity 0.5s ease';
                
                // Remove after animation completes
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                    observer.disconnect();
                }, 500);
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
                container.parentNode.removeChild(container);
                observer.disconnect();
            }
        }, 10000);
    }
};
