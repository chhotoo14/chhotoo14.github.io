export const LoadingAnimation = {
    name: 'LoadingAnimation',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_loading_animation' || (trace.payload && trace.payload.name === 'ext_loading_animation'),
    render: ({ element }) => {
        // Create container
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.height = '200px';
        container.style.padding = '20px';

        // Create animated dots
        const dotsContainer = document.createElement('div');
        dotsContainer.style.display = 'flex';
        dotsContainer.style.gap = '10px';
        dotsContainer.style.marginBottom = '30px';

        const dots = [];
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.style.width = '20px';
            dot.style.height = '20px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = '#447f76';
            dot.style.opacity = i === 0 ? '1' : '0.3';
            dot.style.transition = 'all 0.4s ease';
            dot.style.boxShadow = '0 0 10px rgba(68, 127, 118, 0.5)';
            dots.push(dot);
            dotsContainer.appendChild(dot);
        }

        // Create text element
        const textElement = document.createElement('div');
        textElement.textContent = 'Please wait a minute';
        textElement.style.fontSize = '18px';
        textElement.style.fontWeight = '500';
        textElement.style.color = '#333';
        textElement.style.transition = 'all 0.5s ease';
        textElement.style.opacity = '1';
        textElement.style.textAlign = 'center';
        textElement.style.minHeight = '25px';

        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.style.width = '100%';
        progressBar.style.height = '6px';
        progressBar.style.backgroundColor = '#eee';
        progressBar.style.borderRadius = '3px';
        progressBar.style.marginTop = '20px';
        progressBar.style.overflow = 'hidden';
        progressBar.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.1)';

        const progressFill = document.createElement('div');
        progressFill.style.width = '0%';
        progressFill.style.height = '100%';
        progressFill.style.backgroundColor = '#447f76';
        progressFill.style.borderRadius = '3px';
        progressFill.style.transition = 'width 4s linear';
        progressFill.style.boxShadow = '0 0 10px rgba(68, 127, 118, 0.5)';
        progressBar.appendChild(progressFill);

        // Assemble container
        container.appendChild(dotsContainer);
        container.appendChild(textElement);
        container.appendChild(progressBar);
        element.appendChild(container);

        // Animation sequence
        const messages = [
            'Please wait a minute',
            'Placing your order',
            'Almost there'
        ];

        // Start dot animation
        let currentDot = 0;
        const dotInterval = setInterval(() => {
            dots.forEach((dot, index) => {
                dot.style.opacity = index === currentDot ? '1' : '0.3';
                dot.style.transform = index === currentDot ? 'scale(1.2)' : 'scale(1)';
            });
            currentDot = (currentDot + 1) % 3;
        }, 500);

        // Start progress animation
        setTimeout(() => {
            progressFill.style.width = '100%';
        }, 100);

        // Change text every 4 seconds
        let currentIndex = 0;
        const textInterval = setInterval(() => {
            textElement.style.opacity = '0';
            setTimeout(() => {
                currentIndex++;
                if (currentIndex < messages.length) {
                    textElement.textContent = messages[currentIndex];
                    textElement.style.opacity = '1';
                }
            }, 300);
        }, 4000);

        // Clean up after 12 seconds
        setTimeout(() => {
            clearInterval(dotInterval);
            clearInterval(textInterval);
            window.voiceflow.chat.interact({
                type: 'complete',
                payload: {}
            });
        }, 12000);
    }
};
