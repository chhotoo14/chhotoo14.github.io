export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) => 
        trace.type === 'loading_screen' || (trace.payload && trace.payload.name === 'loading_screen'),
    render: ({ element }) => {
        const container = document.createElement('div');
        container.classList.add('vf-loading-container');
        
        container.innerHTML = `
            <style>
                /* Container styling */
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 25px;
                    background: rgba(0, 0, 0, 0.7) !important;
                    border-radius: 20px;
                    position: relative;
                    min-height: 120px;
                    min-width: 200px;
                    backdrop-filter: blur(5px);
                }
                
                /* Orbital loader */
                .orbital-loader {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    margin-bottom: 25px;
                }
                
                .orbital-dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: #ff8c00;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(255, 140, 0, 0.8);
                    animation: orbitalRotate 2s infinite cubic-bezier(0.55, 0, 0.1, 1);
                    transform-origin: 30px 30px;
                }
                
                .orbital-dot:nth-child(1) {
                    animation-delay: 0.15s;
                    transform: translate(30px, 0);
                }
                
                .orbital-dot:nth-child(2) {
                    animation-delay: 0.3s;
                    transform: translate(60px, 30px);
                }
                
                .orbital-dot:nth-child(3) {
                    animation-delay: 0.45s;
                    transform: translate(30px, 60px);
                }
                
                .orbital-dot:nth-child(4) {
                    animation-delay: 0.6s;
                    transform: translate(0, 30px);
                }
                
                @keyframes orbitalRotate {
                    0% {
                        transform: rotate(0deg) translate(30px) rotate(0deg);
                        opacity: 1;
                    }
                    25% {
                        background: #ffb142;
                    }
                    50% {
                        background: #ff793f;
                        opacity: 0.7;
                    }
                    75% {
                        background: #ff5252;
                    }
                    100% {
                        transform: rotate(360deg) translate(30px) rotate(-360deg);
                        opacity: 1;
                    }
                }
                
                /* Text animation */
                .loading-text {
                    font-size: 18px;
                    font-weight: 500;
                    color: white;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    animation: textFade 3.5s infinite ease-in-out;
                    text-shadow: 0 0 10px rgba(255, 140, 0, 0.7);
                    opacity: 0;
                }
                
                @keyframes textFade {
                    0%, 100% { 
                        opacity: 0; 
                        transform: translateY(10px);
                    }
                    30%, 70% { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }
                
                /* SOLUTION TO STOP EXTENSION */
                .vfrc-assistant-trace:has(.vf-loading-container) {
                    animation: fadeOut 0.5s forwards;
                    animation-delay: 0.5s; /* Start fading after 0.5 seconds */
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
            
            <div class="orbital-loader">
                <div class="orbital-dot"></div>
                <div class="orbital-dot"></div>
                <div class="orbital-dot"></div>
                <div class="orbital-dot"></div>
            </div>
            <div class="loading-text">Just a moment</div>
        `;

        element.appendChild(container);
        
        // Auto-remove after 3 seconds as a safety measure
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 3000);
    }
};
