export const SkincareConcernForm = {
    name: 'SkincareConcernForm',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_skincare_concern' || (trace.payload && trace.payload.name === 'ext_skincare_concern'),
    render: ({ trace, element }) => {
        // Parse payload dynamically (same pattern as OrderReturnForm)
        let payloadObj = {};
        try {
            payloadObj = typeof trace.payload === 'string' ? JSON.parse(trace.payload) : trace.payload || {};
        } catch (e) {
            console.error('Payload parse error:', e);
        }

        // Create form container with matching UI
        const formContainer = document.createElement('form');
        formContainer.innerHTML = `
            <style>
                /* Maintain original OrderReturnForm styling */
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
                }
                input, textarea, button {
                    padding: 12px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    width: 100%;
                    outline: none;
                    transition: all 0.3s ease;
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
                }
                .file-upload {
                    font-size: 14px;
                    color: #666;
                }
            </style>

            <div class="return-form">
                <!-- Full Name -->
                <label for="name">Full name *</label>
                <input type="text" id="name" required placeholder="Emma Carter">

                <!-- Email -->
                <label for="email">Email *</label>
                <input type="email" id="email" required placeholder="emma123@gmail.com">

                <!-- Problem Description -->
                <label for="description">Describe the problem *</label>
                <textarea id="description" required placeholder="Is this product safe for sensitive skin?"></textarea>

                <!-- File Upload -->
                <label class="file-upload">
                    <input type="file" id="photo" accept="image/jpeg, image/png">
                    Upload Picture (optional)
                </label>

                <button type="submit">Submit</button>
            </div>
        `;

        // Handle form submission
        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get form values
            const formData = {
                name: formContainer.querySelector('#name').value,
                email: formContainer.querySelector('#email').value,
                description: formContainer.querySelector('#description').value,
                photo: formContainer.querySelector('#photo').files[0] || null
            };

            // Send to Voiceflow
            window.voiceflow.chat.interact({
                type: 'complete',
                payload: formData
            });
        });

        element.appendChild(formContainer);
    }
};