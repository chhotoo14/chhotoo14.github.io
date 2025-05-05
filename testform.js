export const SkincareConcernForm = {
    name: 'SkincareConcernForm',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_skincare_concern' || (trace.payload && trace.payload.name === 'ext_skincare_concern'),
    render: ({ trace, element }) => {
        let payloadObj = {};
        try {
            payloadObj = typeof trace.payload === 'string' ? JSON.parse(trace.payload) : trace.payload || {};
        } catch (e) {
            console.error('Payload parse error:', e);
        }

        const formContainer = document.createElement('form');
        formContainer.innerHTML = `
            <style>
                .return-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 20px;
                    border-radius: 8px;
                    background: #f9f9f9;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    max-width: 320px;
                    margin: auto;
                }
                label {
                    font-weight: bold;
                    font-size: 14px;
                    margin-bottom: 5px;
                    color: #333;
                }
                input, textarea, button {
                    padding: 12px;
                    font-size: 16px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    width: 100%;
                    outline: none;
                    transition: all 0.3s ease;
                }
                ::placeholder {
                    color: #999;
                    opacity: 1;
                }
                textarea {
                    height: 80px;
                    resize: vertical;
                }
                button {
                    background-color: #447f76;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                }
                button:hover {
                    background-color: #36645d;
                }
            </style>

            <div class="return-form">
                <!-- Full Name -->
                <label for="name">Full name *</label>
                <input type="text" id="name" required placeholder="e.g. Emma Carter">

                <!-- Email -->
                <label for="email">Email *</label>
                <input type="email" id="email" required placeholder="e.g. emma123@gmail.com">

                <!-- Problem Description -->
                <label for="description">Describe the problem *</label>
                <textarea id="description" required placeholder="e.g. Is this product safe for sensitive skin?"></textarea>

                <button type="submit">Submit</button>
            </div>
        `;

        // Form submission handler
        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = {
                name: formContainer.querySelector('#name').value,
                email: formContainer.querySelector('#email').value,
                description: formContainer.querySelector('#description').value
            };
            window.voiceflow.chat.interact({
                type: 'complete',
                payload: formData
            });
        });

        element.appendChild(formContainer);
    }
};
