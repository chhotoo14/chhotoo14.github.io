export const VariantSelectionForm = {
    name: 'VariantSelectionForm',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_variant_selection' || (trace.payload && trace.payload.name === 'ext_variant_selection'),
    render: ({ trace, element }) => {
        console.log('Rendering VariantSelectionForm');

        let payloadObj;
        if (typeof trace.payload === 'string') {
            try {
                payloadObj = JSON.parse(trace.payload);
            } catch (e) {
                console.error('Error parsing payload:', e);
                payloadObj = {};
            }
        } else {
            payloadObj = trace.payload || {};
        }

        console.log('Parsed Payload:', payloadObj);

        const variantIDs = payloadObj.selectedVariantID || '';
        const variantTitles = payloadObj.selectedVariantTitle || '';
        const variantPrices = payloadObj.selectedVariantPrices || '';
        const lb_quantity = payloadObj.lb_quantity || 'Quantity';
        const bt_submit = payloadObj.bt_submit || 'Submit';

        const idsArray = variantIDs.split(',').map(id => id.trim());
        const titlesArray = variantTitles.split(',').map(title => title.trim());
        const pricesArray = variantPrices.split(',').map(price => parseFloat(price.trim()));

        const formContainer = document.createElement('form');
        formContainer.innerHTML = `
            <style>
                .simple-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 20px;
                    border-radius: 8px;
                    background: #f9f9f9;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    max-width: 300px;
                    margin: auto;
                }
                select, input, button {
                    padding: 12px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    width: 100%;
                    outline: none;
                    transition: all 0.3s ease;
                }
                select:focus, input:focus {
                    border-color: #447f76;
                    box-shadow: 0 0 8px rgba(68, 127, 118, 0.3);
                }
                input[type="number"] {
                    text-align: center;
                }
                button {
                    cursor: pointer;
                    background-color: #447f76;
                    color: white;
                    border: none;
                    font-weight: bold;
                    transition: background-color 0.2s ease;
                }
                button:hover {
                    background-color: #376b62;
                }
                .price {
                    font-weight: bold;
                    font-size: 18px;
                    color: #333;
                    text-align: center;
                }
            </style>

            <div class="simple-form">
                <select id="variant">
                    ${titlesArray.map((title, index) =>
                        `<option value="${index}">${title}</option>`
                    ).join('')}
                </select>

                <input type="number" id="quantity" name="quantity" value="1" min="1" required placeholder="${lb_quantity}">

                <div class="price">€${pricesArray[0].toFixed(2)}</div>

                <button type="submit">${bt_submit}</button>
            </div>
        `;

        const variantSelect = formContainer.querySelector('#variant');
        const quantityInput = formContainer.querySelector('#quantity');
        const priceDisplay = formContainer.querySelector('.price');

        variantSelect.addEventListener('change', () => {
            const selectedIndex = variantSelect.value;
            priceDisplay.textContent = `€${pricesArray[selectedIndex].toFixed(2)}`;
        });

        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();

            const selectedIndex = variantSelect.value;
            const payload = {
                selectedVariantID: idsArray[selectedIndex],
                selectedVariantTitle: titlesArray[selectedIndex],
                selectedVariantPrice: pricesArray[selectedIndex],
                quantity: parseInt(quantityInput.value, 10),
            };

            console.log('Submitting payload:', payload);

            window.voiceflow.chat.interact({
                type: 'complete',
                payload: payload,
            });
        });

        element.appendChild(formContainer);
    },
};

export const OrderReturnForm = {
    name: 'OrderReturnForm',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_order_return' || (trace.payload && trace.payload.name === 'ext_order_return'),
    render: ({ trace, element }) => {
        console.log('Rendering OrderReturnForm');

        let payloadObj;
        if (typeof trace.payload === 'string') {
            try {
                payloadObj = JSON.parse(trace.payload);
            } catch (e) {
                console.error('Error parsing payload:', e);
                payloadObj = {};
            }
        } else {
            payloadObj = trace.payload || {};
        }

        console.log('Parsed Payload:', payloadObj);

        const orderedQuantity = payloadObj.orderedQuantity || '1';
        const lb_quantity = payloadObj.lb_quantity || 'Quantity';
        const lb_reason = payloadObj.lb_reason || 'Return Reason';
        const bt_submit = payloadObj.bt_submit || 'Create Return';

        const returnReasons = {
            'Defective': 'DEFECTIVE',
            'Not as Described': 'NOT_AS_DESCRIBED',
            'Other': 'OTHER',
            'Unwanted': 'UNWANTED',
            'Wrong Item': 'WRONG_ITEM'
        };

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
                }
                select, input, button {
                    padding: 12px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    width: 100%;
                    outline: none;
                    transition: all 0.3s ease;
                }
                select:focus, input:focus {
                    border-color: #447f76;
                    box-shadow: 0 0 8px rgba(68, 127, 118, 0.3);
                }
                input[type="number"]:disabled {
                    background-color: #e9e9e9;
                    cursor: not-allowed;
                }
                button {
                    cursor: pointer;
                    background-color: #447f76;
                    color: white;
                    border: none;
                    font-weight: bold;
                    transition: background-color 0.2s ease;
                }
                button:hover {
                    background-color: #376b62;
                }
            </style>

            <div class="return-form">
                <label for="quantity">${lb_quantity}:</label>
                <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    value="1" 
                    min="1" 
                    max="${orderedQuantity}" 
                    ${orderedQuantity === '1' ? 'disabled' : ''}
                    required
                >

                <label for="reason">${lb_reason}:</label>
                <select id="reason" required>
                    <option value="" disabled selected>Select a reason</option>
                    ${Object.keys(returnReasons).map(reason => `
                        <option value="${returnReasons[reason]}">${reason}</option>
                    `).join('')}
                </select>

                <button type="submit">${bt_submit}</button>
            </div>
        `;

        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();

            const quantityInput = formContainer.querySelector('#quantity');
            const reasonInput = formContainer.querySelector('#reason');

            const payload = {
                returnQuantity: parseInt(quantityInput.value, 10),
                returnReason: reasonInput.value,
            };

            console.log('Submitting return payload:', payload);

            window.voiceflow.chat.interact({
                type: 'complete',
                payload: payload,
            });
        });

        element.appendChild(formContainer);
    },
};

export const OrderSelectionExtension = {
    name: 'OrderSelectionExtension',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_order_selection' || (trace.payload && trace.payload.name === 'ext_order_selection'),
    render: ({ trace, element }) => {
        console.log('Rendering OrderSelectionExtension');

        let payloadObj;
        if (typeof trace.payload === 'string') {
            try {
                payloadObj = JSON.parse(trace.payload);
            } catch (e) {
                console.error('Error parsing payload:', e);
                payloadObj = {};
            }
        } else {
            payloadObj = trace.payload || {};
        }

        console.log('Parsed Payload:', payloadObj);

        const orderNumbers = payloadObj.orderNumbers
            ? payloadObj.orderNumbers.split(',').map(order => order.trim())
            : [];

        const returnProductTitles = payloadObj.returnProductTitles
            ? payloadObj.returnProductTitles.split('|').map(products => products.split(',').map(p => p.trim()))
            : [];

        const orderedQuantities = payloadObj.orderedQuantities
            ? payloadObj.orderedQuantities.split('|').map(qty => qty.split(',').map(q => q.trim()))
            : [];

        const returnOrderIds = payloadObj.returnOrderIds
            ? payloadObj.returnOrderIds.split(',').map(id => id.trim())
            : [];

        console.log('Parsed Orders:', orderNumbers);
        console.log('Parsed Products:', returnProductTitles);
        console.log('Parsed Quantities:', orderedQuantities);
        console.log('Parsed Order IDs:', returnOrderIds);

        if (
            orderNumbers.length !== returnProductTitles.length ||
            orderNumbers.length !== orderedQuantities.length ||
            orderNumbers.length !== returnOrderIds.length
        ) {
            console.error('Mismatch between order numbers, products, quantities, and order IDs!');
            return;
        }

        const container = document.createElement('div');
        container.classList.add('order-selection-container');

        container.innerHTML = `
            <style>
                :root {
                    --order-glow-color: #447f76;
                }

                .order-selection-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 10px;
                    width: 100%;
                    max-width: 400px;
                }
                .order-card {
                    background: #ffffff;
                    border-radius: 8px;
                    padding: 15px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
                    display: flex;
                    flex-direction: column;
                    border: 2px solid transparent;
                }
                .order-card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
                }
                .order-card.selected {
                    border: 2px solid var(--order-glow-color);
                    box-shadow: 0 0 10px var(--order-glow-color);
                }
                .order-number {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                .product-list {
                    font-size: 14px;
                    color: #555;
                }
                .product-list ul {
                    padding-left: 20px;
                    margin: 5px 0 0;
                }
            </style>
        `;

        let selectedOrder = null;

        orderNumbers.forEach((orderNum, index) => {
            const orderId = returnOrderIds[index];
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');
            orderCard.dataset.orderNumber = orderNum;
            orderCard.dataset.orderId = orderId;
            orderCard.dataset.products = JSON.stringify(returnProductTitles[index] || []);
            orderCard.dataset.quantities = JSON.stringify(orderedQuantities[index] || []);

            orderCard.innerHTML = `
                <div class="order-number">Order ${orderNum}</div>
                <div class="product-list">
                    <ul>
                        ${(returnProductTitles[index] || []).map(product => `<li>${product}</li>`).join('')}
                    </ul>
                </div>
            `;

            orderCard.addEventListener('click', () => {
                if (selectedOrder === orderCard) {
                    orderCard.classList.remove('selected');
                    selectedOrder = null;

                    window.voiceflow.chat.interact({
                        type: 'complete',
                        payload: { 
                            selectedOrderNumber: null, 
                            selectedOrderId: null,
                            selectedProducts: '',
                            selectedQuantities: ''
                        },
                    });

                    console.log('Order deselected');
                } else {
                    if (selectedOrder) selectedOrder.classList.remove('selected');

                    orderCard.classList.add('selected');
                    selectedOrder = orderCard;

                    const payload = {
                        selectedOrderNumber: orderNum,
                        selectedOrderId: orderId,
                        selectedProducts: returnProductTitles[index].join(', '),
                        selectedQuantities: orderedQuantities[index].join(', ')
                    };

                    console.log('Submitting Order Selection:', payload);

                    window.voiceflow.chat.interact({
                        type: 'complete',
                        payload: payload,
                    });
                }
            });

            container.appendChild(orderCard);
        });

        element.appendChild(container);
    },
};

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
                <label for="name">Full name *</label>
                <input type="text" id="name" required placeholder="e.g. Emma Carter">
                <div class="error-message" id="name-error">Please enter a valid name (letters and spaces only)</div>

                <label for="email">Email *</label>
                <input type="email" id="email" required placeholder="e.g. emma123@gmail.com">
                <div class="error-message" id="email-error">Please enter a valid email address</div>

                <label for="description">Describe the problem *</label>
                <textarea id="description" required placeholder="e.g. Is this product safe for sensitive skin?"></textarea>

                <button type="submit">Submit</button>
            </div>
        `;

        const nameInput = formContainer.querySelector('#name');
        const emailInput = formContainer.querySelector('#email');
        const nameError = formContainer.querySelector('#name-error');
        const emailError = formContainer.querySelector('#email-error');

        const validateName = (name) => {
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
            return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
        };

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        };

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

        formContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = nameInput.value;
            const email = emailInput.value;
            const description = formContainer.querySelector('#description').value;

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

            if (!isValid) return;

            window.voiceflow.chat.interact({
                type: 'complete',
                payload: { name, email, description }
            });
        });

        element.appendChild(formContainer);
    }
};
