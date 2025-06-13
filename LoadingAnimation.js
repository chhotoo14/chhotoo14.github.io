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
                    padding: 30px 20px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #2c3e50, #1a1a2e);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    max-width: 320px;
                    margin: 0 auto;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    position: relative;
                    overflow: hidden;
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
                        rgba(68, 127, 118, 0.8),
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
                
                .loading-spinner {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 20px;
                }
                
                .spinner-circle {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 4px solid transparent;
                    mix-blend-mode: overlay;
                }
                
                .circle-1 {
                    border-top-color: #447f76;
                    animation: spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                
                .circle-2 {
                    border-left-color: #5da399;
                    animation: spin 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                
                .circle-3 {
                    border-right-color: #76c7bc;
                    animation: spin 2.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                
                @keyframes spin {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                .loading-text {
                    font-size: 18px;
                    font-weight: 500;
                    margin: 15px 0;
                    height: 30px;
                    position: relative;
                    overflow: hidden;
                }
                
                .text-slider {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    animation: textCycle 9s infinite ease-in-out;
                }
                
                .text-slider span {
                    display: block;
                    line-height: 30px;
                    opacity: 0;
                    animation: textFade 3s infinite;
                }
                
                .text-slider span:nth-child(1) {
                    animation-delay: 0s;
                }
                
                .text-slider span:nth-child(2) {
                    animation-delay: 3s;
                }
                
                .text-slider span:nth-child(3) {
                    animation-delay: 6s;
                }
                
                @keyframes textFade {
                    0%, 100% { opacity: 0; transform: translateY(10px); }
                    10%, 90% { opacity: 1; transform: translateY(0); }
                }
                
                .progress-bar {
                    width: 100%;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    margin-top: 20px;
                }
                
                .progress-fill {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, #447f76, #5da399, #76c7bc);
                    border-radius: 3px;
                    animation: progressLoad 9s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                @keyframes progressLoad {
                    0% { width: 0%; }
                    30% { width: 30%; }
                    60% { width: 70%; }
                    90% { width: 95%; }
                    100% { width: 100%; }
                }
            </style>
            
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner-circle circle-1"></div>
                    <div class="spinner-circle circle-2"></div>
                    <div class="spinner-circle circle-3"></div>
                </div>
                
                <div class="loading-text">
                    <div class="text-slider">
                        <span>Placing your order...</span>
                        <span>Just a min...</span>
                        <span>Almost there...</span>
                    </div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        `;

        element.appendChild(container);
    }
};
