export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload && trace.payload.name === 'loading_screen'),
    render: ({ element }) => {
        // Create container with unique ID
        const container = document.createElement('div');
        container.classList.add('vf-loading-container');
        container.id = 'vf-custom-loading-animation';
        
        // Create the animation with enhanced effects
        container.innerHTML = `
            <style>
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: transparent !important;
                    min-height: 100px;
                }
                
                .quantum-loader {
                    position: relative;
                    width: 50px;
                    height: 50px;
                    margin-bottom: 15px;
                }
                
                .quantum-dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: #ff8c00;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(255, 140, 0, 0.8);
                    animation: quantumOrbit 2s infinite cubic-bezier(0.55, 0, 0.1, 1);
                    transform-origin: 25px 25px;
                    opacity: 0.9;
                }
                
                .quantum-dot:nth-child(1) {
                    animation-delay: 0.15s;
                    transform: translate(25px, 0);
                }
                
                .quantum-dot:nth-child(2) {
                    animation-delay: 0.3s;
                    transform: translate(50px, 25px);
                }
                
                .quantum-dot:nth-child(3) {
                    animation-delay: 0.45s;
                    transform: translate(25px, 50px);
                }
                
                .quantum-dot:nth-child(4) {
                    animation-delay: 0.6s;
                    transform: translate(0, 25px);
                }
                
                @keyframes quantumOrbit {
                    0% { transform: rotate(0deg) translate(25px) rotate(0deg); opacity: 1; }
                    25% { background: #ffb142; }
                    50% { background: #ff793f; opacity: 0.7; }
                    75% { background: #ff5252; }
                    100% { transform: rotate(360deg) translate(25px) rotate(-360deg); opacity: 1; }
                }
                
                .loading-text {
                    font-size: 16px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    letter-spacing: 0.5px;
                    animation: textFade 3.5s infinite ease-in-out;
                    text-shadow: 0 0 8px rgba(255, 140, 0, 0.5);
                    opacity: 0;
                }
                
                @keyframes textFade {
                    0%, 100% { opacity: 0; transform: translateY(5px); }
                    30%, 70% { opacity: 1; transform: translateY(0); }
                }
            </style>
            
            <div class="quantum-loader">
                <div class="quantum-dot"></div>
                <div class="quantum-dot"></div>
                <div class="quantum-dot"></div>
                <div class="quantum-dot"></div>
            </div>
            <div class="loading-text">Just a moment</div>
        `;

        // Add to Voiceflow element
        element.appendChild(container);
        
        // Reliable removal when AI responds
        const removeWhenAIResponds = () => {
            // Find parent chat container
            const chatContainer = element.closest('.vfrc-chat');
            if (!chatContainer) return;
            
            // Observer to detect new AI messages
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        // Check for both possible AI message classes
                        if (node.classList?.contains('vfrc-message--chat') || 
                            node.classList?.contains('vfrc-message--assistant')) {
                            
                            // Fade out and remove our animation
                            container.style.opacity = '0';
                            container.style.transition = 'opacity 0.5s ease';
                            
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
            observer.observe(chatContainer, { 
                childList: true, 
                subtree: true 
            });
            
            // Fallback timeout (safety measure)
            setTimeout(() => {
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
                observer.disconnect();
            }, 10000); // 10 seconds max
        };
        
        // Initialize the removal observer
        setTimeout(removeWhenAIResponds, 100);
    }
};
