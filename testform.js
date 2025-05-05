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
                /* Updated styles */
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
                /* File upload styling */
                .file-upload-wrapper {
                    position: relative;
                    margin-top: 5px;
                }
                .custom-file-upload {
                    display: inline-block;
                    padding: 10px 15px;
                    background: #447f76;
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                }
                .custom-file-upload:hover {
                    background-color: #36645d;
                }
                #file-name {
                    margin-left: 10px;
                    font-size: 14px;
                    color: #666;
                }
                input[type="file"] {
                    display: none;
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

                <!-- File Upload Section -->
                <label>Upload Picture (optional)</label>
                <div class="file-upload-wrapper">
                    <label class="custom-file-upload">
                        <input type="file" id="photo" accept="image/jpeg, image/png"/>
                        Choose File
                    </label>
                    <span id="file-name"></span>
                </div>

                <button type="submit">Submit</button>
            </div>
        `;

        // File input handler
        const fileInput = formContainer.querySelector('#photo');
        const fileName = formContainer.querySelector('#file-name');

        fileInput.addEventListener('change', function() {
            fileName.textContent = this.files[0] ? this.files[0].name : '';
        });

        // Form submission handler
        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = {
                name: formContainer.querySelector('#name').value,
                email: formContainer.querySelector('#email').value,
                description: formContainer.querySelector('#description').value,
                photo: formContainer.querySelector('#photo').files[0] || null
            };
            window.voiceflow.chat.interact({
                type: 'complete',
                payload: formData
            });
        });

        element.appendChild(formContainer);
    }
};
