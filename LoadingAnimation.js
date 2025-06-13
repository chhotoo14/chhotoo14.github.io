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
                    min-height: 140px;
                    background: transparent !important;
                    position: relative;
                    overflow: hidden;
                }
                
                .spinner {
                    position: relative;
                    width: 48px;
                    height: 48px;
                    margin-bottom: 20px;
                }
                
                .spinner-dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: linear-gradient(45deg, #8a2be2, #5d3fd3, #1e90ff);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0.7;
                    filter: drop-shadow(0 0 4px rgba(138, 43, 226, 0.6));
                }
                
                .spinner-dot:nth-child(1) {
                    top: 0;
                    left: 50%;
                    animation: pulse 1.2s ease-in-out infinite;
                }
                
                .spinner-dot:nth-child(2) {
                    top: 15px;
                    right: 8px;
                    animation: pulse 1.2s ease-in-out 0.2s infinite;
                }
                
                .spinner-dot:nth-child(3) {
                    bottom: 8px;
                    right: 15px;
                    animation: pulse 1.2s ease-in-out 0.4s infinite;
                }
                
                .spinner-dot:nth-child(4) {
                    bottom: 0;
                    left: 50%;
                    animation: pulse 1.2s ease-in-out 0.6s infinite;
                }
                
                .spinner-dot:nth-child(5) {
                    bottom: 8px;
                    left: 15px;
                    animation: pulse 1.2s ease-in-out 0.8s infinite;
                }
                
                .spinner-dot:nth-child(6) {
                    top: 15px;
                    left: 8px;
                    animation: pulse 1.2s ease-in-out 1.0s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
                    50% { transform: translate(-50%, -50%) scale(1.8); opacity: 1; }
                }
                
                .text-container {
                    position: relative;
                    height: 28px;
                    overflow: hidden;
                }
                
                .text-slider {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    animation: slide 6s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
                }
                
                @keyframes slide {
                    0%, 25% { transform: translateY(0); }
                    33%, 58% { transform: translateY(-28px); }
                    66%, 100% { transform: translateY(-56px); }
                }
                
                .loading-text {
                    height: 28px;
                    font-size: 16px;
                    font-weight: 500;
                    letter-spacing: 0.3px;
                    color: rgba(255, 255, 255, 0.92);
                    text-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    opacity: 0.9;
                    transition: opacity 0.4s;
                }
                
                /* Auto-remove when AI responds */
                .vfrc-assistant-trace:has(.loading-animation-container) {
                    transition: opacity 0.4s, height 0.4s, padding 0.4s;
                }
            </style>
            
            <div class="spinner">
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
            </div>
            
            <div class="text-container">
                <div class="text-slider">
                    <div class="loading-text">Processing your request</div>
                    <div class="loading-text">Generating response</div>
                    <div class="loading-text">Almost there</div>
                </div>
            </div>
        `;

        element.appendChild(container);
        
        // Auto-removal when AI responds
        const observer = new MutationObserver(() => {
            const aiMessages = document.querySelectorAll('.vfrc-message--chat, .vfrc-message--assistant');
            if (aiMessages.length > 0) {
                container.style.opacity = '0';
                container.style.transform = 'scale(0.9)';
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
