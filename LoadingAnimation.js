export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload && trace.payload.name === 'loading_screen'),
    render: ({ element }) => {
        // Create container
        const container = document.createElement('div');
        container.classList.add('vf-loading-container');
        container.id = 'vf-loading-animation'; // Add ID for easy selection
        
        // Create the animation HTML
        container.innerHTML = `
            <style>
                /* Container styling */
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: transparent !important;
                    position: relative;
                    min-height: 80px;
                }
                
                /* Minimalist spinner */
                .minimal-spinner {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    margin-bottom: 15px;
                }
                
                .minimal-spinner:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                /* Text animation */
                .loading-text {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.85);
                    letter-spacing: 0.5px;
                    animation: textFade 3s infinite ease-in-out;
                    opacity: 0;
                }
                
                @keyframes textFade {
                    0%, 100% { opacity: 0; transform: translateY(5px); }
                    30%, 70% { opacity: 1; transform: translateY(0); }
                }
            </style>
            
            <div class="minimal-spinner"></div>
            <div class="loading-text">Just a moment</div>
        `;

        // Add to the element
        element.appendChild(container);
        
        // Add MutationObserver
        const chatMessages = document.querySelector('.vf-chat-messages'); // Adjust selector if needed
        if (chatMessages) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        const addedNode = mutation.addedNodes[0];
                        if (addedNode.classList.contains('vf-assistant-message')) { // Adjust class if needed
                            const loadingContainer = document.getElementById('vf-loading-animation');
                            if (loadingContainer) {
                                loadingContainer.style.opacity = '0';
                                setTimeout(() => {
                                    if (loadingContainer.parentNode) {
                                        loadingContainer.parentNode.removeChild(loadingContainer);
                                    }
                                }, 300);
                            }
                            observer.disconnect();
                        }
                    }
                });
            });
            observer.observe(chatMessages, { childList: true });
        }
        
        // Fallback timeout
        setTimeout(() => {
            const loadingContainer = document.getElementById('vf-loading-animation');
            if (loadingContainer && loadingContainer.parentNode) {
                loadingContainer.style.opacity = '0';
                setTimeout(() => {
                    loadingContainer.parentNode.removeChild(loadingContainer);
                }, 300);
            }
        }, 10000); // 10 seconds fallback
    }
};
