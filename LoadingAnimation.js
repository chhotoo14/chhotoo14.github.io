export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload && trace.payload.name === 'loading_screen'),
    render: ({ element }) => {
        // Create container
        const container = document.createElement('div');
        container.classList.add('vf-loading-container');
        
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
                
                /* Auto-remove animation */
                .vfrc-assistant-trace:has(.vf-loading-container) {
                    animation: fadeOut 0.5s forwards;
                    animation-delay: 0.5s;
                }
                
                @keyframes fadeOut {
                    to { 
                        opacity: 0; 
                        height: 0; 
                        padding: 0; 
                        margin: 0;
                        display: none;
                    }
                }
            </style>
            
            <div class="minimal-spinner"></div>
            <div class="loading-text">Just a moment</div>
        `;

        // Add to the element
        element.appendChild(container);
        
        // Auto-remove after 3 seconds as a safety measure
        setTimeout(() => {
            if (container.parentNode) {
                container.style.opacity = '0';
                container.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }, 300);
            }
        }, 3000);
    }
};
