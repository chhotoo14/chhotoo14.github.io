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
                .vf-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    border-radius: 24px;
                    background: linear-gradient(135deg, #1e1e2e, #2c2c3e);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
                    max-width: 300px;
                    margin: 0 auto;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                
                .vf-loading-container::before {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(
                        transparent,
                        rgba(255, 140, 0, 0.6),
                        transparent 70%
                    );
                    animation: rotate 3s linear infinite;
                    z-index: 0;
                }
                
                @keyframes rotate {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                .loading-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    width: 100%;
                }
                
                .quantum-loader {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 25px;
                }
                
                .quantum-dot {
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    background: #ff8c00;
                    border-radius: 50%;
                    animation: quantumOrbit 3s infinite cubic-bezier(0.5, 0, 0.5, 1);
                    box-shadow: 0 0 10px rgba(255, 140, 0, 0.7);
                }
                
                .quantum-dot:nth-child(1) {
                    animation-delay: 0s;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .quantum-dot:nth-child(2) {
                    animation-delay: -0.5s;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
                
                .quantum-dot:nth-child(3) {
                    animation-delay: -1s;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .quantum-dot:nth-child(4) {
                    animation-delay: -1.5s;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
                
                @keyframes quantumOrbit {
                    0% {
                        transform: rotate(0deg) translate(40px) rotate(0deg);
                    }
                    25% {
                        background: #ffb142;
                    }
                    50% {
                        background: #ff793f;
                    }
                    75% {
                        background: #ff5252;
                    }
                    100% {
                        transform: rotate(360deg) translate(40px) rotate(-360deg);
                    }
                }
                
                .loading-text {
                    font-size: 22px;
                    font-weight: 500;
                    margin: 25px 0 15px;
                    position: relative;
                    display: inline-block;
                    background: linear-gradient(90deg, #ff8c00, #ffb142, #ff793f);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                
                .loading-text::after {
                    content: "";
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, #ff8c00, #ffb142, #ff793f);
                    border-radius: 2px;
                    animation: textUnderline 2s infinite;
                }
                
                @keyframes textUnderline {
                    0% { transform: scaleX(0); transform-origin: left; }
                    50% { transform: scaleX(1); transform-origin: left; }
                    51% { transform: scaleX(1); transform-origin: right; }
                    100% { transform: scaleX(0); transform-origin: right; }
                }
                
                .loading-subtext {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.7);
                    letter-spacing: 1px;
                    margin-top: 10px;
                    animation: fadePulse 3s infinite;
                }
                
                @keyframes fadePulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
            </style>
            
            <div class="loading-content">
                <div class="quantum-loader">
                    <div class="quantum-dot"></div>
                    <div class="quantum-dot"></div>
                    <div class="quantum-dot"></div>
                    <div class="quantum-dot"></div>
                </div>
                
                <div class="loading-text">just a moment</div>
                <div class="loading-subtext">Preparing your experience</div>
            </div>
        `;

        element.appendChild(container);
    }
};
