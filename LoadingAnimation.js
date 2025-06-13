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
                    padding: 25px 15px;
                    min-height: 120px;
                    background: transparent !important;
                }
                
                .spinner {
                    position: relative;
                    width: 56px;
                    height: 56px;
                    margin-bottom: 16px;
                }
                
                .spinner-inner {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: conic-gradient(transparent, #6e44ff, #b892ff, #ff7ed0);
                    mask: radial-gradient(white 55%, transparent 56%);
                    -webkit-mask: radial-gradient(white 55%, transparent 56%);
                    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
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
                    font-size: 15px;
                    font-weight: 500;
                    letter-spacing: 0.3px;
                    background: linear-gradient(90deg, #e0d1ff, #ffc2eb, #b5deff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    opacity: 0.9;
                    transition: opacity 0.4s;
                }
                
                .loading-text:nth-child(2) {
                    animation: pulse 1.5s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                
                /* Auto-remove when AI responds */
                .vfrc-assistant-trace:has(.loading-animation-container) {
                    transition: opacity 0.4s, height 0.4s, padding 0.4s;
                }
            </style>
            
            <div class="spinner">
                <div class="spinner-inner"></div>
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
