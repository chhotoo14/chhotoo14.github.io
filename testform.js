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
                .error-message {
                    color: #dc3545;
                    font-size: 12px;
                    margin-top: -10px;
                    margin-bottom: 5px;
                    display: none;
                }
                .invalid {
                    border-color: #dc3545 !important;
                }
            </style>

            <div class="return-form">
                <!-- Full Name -->
                <label for="name">Full name *</label>
                <input type="text" id="name" required placeholder="e.g. Emma Carter">
                <div class="error-message" id="name-error">Please enter a valid name (letters and spaces only)</div>

                <!-- Email -->
                <label for="email">Email *</label>
                <input type="email" id="email" required placeholder="e.g. emma123@gmail.com">
                <div class="error-message" id="email-error">Please enter a valid email address</div>

                <!-- Problem Description -->
                <label for="description">Describe the problem *</label>
                <textarea id="description" required placeholder="e.g. Is this product safe for sensitive skin?"></textarea>

                <button type="submit">Submit</button>
            </div>
        `;

        // Get DOM elements
        const nameInput = formContainer.querySelector('#name');
        const emailInput = formContainer.querySelector('#email');
        const nameError = formContainer.querySelector('#name-error');
        const emailError = formContainer.querySelector('#email-error');

        // Validation functions
        const validateName = (name) => {
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
            return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
        };

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        };

        // Real-time validation
        nameInput.addEventListener('input', () => {
            const isValid = validateName(nameInput.value);
            nameError.style.display = isValid ? 'none' : 'block';
            nameInput.classList.toggle('invalid', !isValid);
        });

        emailInput.addEventListener('input', () => {
            const isValid = validateEmail(emailInput.value);
            emailError.style.display = isValid ? 'none' : 'block';
            emailInput.classList.toggle('invalid', !isValid);
        });

        // Form submission handler
        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = nameInput.value;
            const email = emailInput.value;
            const description = formContainer.querySelector('#description').value;

            // Validate inputs
            let isValid = true;
            
            if (!validateName(name)) {
                nameError.style.display = 'block';
                nameInput.classList.add('invalid');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                emailError.style.display = 'block';
                emailInput.classList.add('invalid');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // Submit if valid
            window.voiceflow.chat.interact({
                type: 'complete',
                payload: { name, email, description }
            });
        });

        element.appendChild(formContainer);
    }
};
