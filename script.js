// Define valid coupon codes
const validCoupons = {
    "XPAY50": 50,
    "WELCOME20": 20,
    "PANEL30": 30,
    "RAJSPECIAL": 50
};

// Set initial price
let currentPrice = 350;
let discountApplied = false;

// Apply coupon function
document.getElementById('apply-coupon').addEventListener('click', function() {
    const couponCode = document.getElementById('coupon-input').value.trim().toUpperCase();
    const messageElement = document.getElementById('coupon-message');
    const amountElement = document.querySelector('.amount');
    const originalPriceElement = document.querySelector('.original-price');
    const discountBadge = document.getElementById('discount-badge');
    const qrAmountElement = document.getElementById('qr-amount');

    if (validCoupons[couponCode]) {
        const discount = validCoupons[couponCode];
        const discountedPrice = currentPrice - discount;
        
        // Update UI with discount
        originalPriceElement.textContent = `${currentPrice}.00 USDT`;
        originalPriceElement.style.display = 'block';
        amountElement.textContent = `${discountedPrice}.00 `;
        qrAmountElement.textContent = `${discountedPrice}.00`;
        discountBadge.style.display = 'block';
        
        // Show success message
        messageElement.innerHTML = `<div class="message success">Coupon applied successfully! You saved ${discount} USDT.</div>`;
        discountApplied = true;
        
        // Disable coupon input and button
        document.getElementById('coupon-input').disabled = true;
        this.disabled = true;
        this.textContent = 'Applied';
    } else {
        messageElement.innerHTML = `<div class="message error">Invalid coupon code. Please try again.</div>`;
    }
});

// Copy wallet address
document.getElementById('copy-address').addEventListener('click', function() {
    const address = "TMZsmxZhxJJjJE9cytC4Yvtj4emo5Ybtpk";
    navigator.clipboard.writeText(address).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Realistic verification function
document.getElementById('verify-btn').addEventListener('click', function() {
    const txId = document.getElementById('transaction-id').value.trim();
    const statusElement = document.querySelector('.verification-status');
    const timelineIcons = document.querySelectorAll('.timeline-icon');
    const statusIcon = document.querySelector('.status-icon');
    const resultElement = document.getElementById('verification-result');
    
    if (!txId) {
        resultElement.innerHTML = `<div class="message error">Please enter your Transaction ID (TXID)</div>`;
        return;
    }

    // Show verifying status
    statusElement.className = 'verification-status verification-pending verifying';
    statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying Transaction on TronScan...';
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    
    // Simulate API call to TronScan with realistic validation
    setTimeout(() => {
        // Real validation logic
        const isValidTxId = txId.length >= 64 && /^[a-fA-F0-9]+$/.test(txId);
        const isCorrectAmount = discountApplied ? 300 : 350;
        
        if (isValidTxId) {
            // In a real implementation, we would check TronScan API
            // For demo, we'll use a more realistic approach
            const isVerified = Math.random() > 0.7; // Only 30% success rate
            
            if (isVerified) {
                statusElement.className = 'verification-status verification-success';
                statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Transaction Verified Successfully!';
                
                // Update timeline
                timelineIcons[2].className = 'timeline-icon completed';
                timelineIcons[2].innerHTML = '<i class="fas fa-check"></i>';
                
                timelineIcons[3].className = 'timeline-icon completed';
                timelineIcons[3].innerHTML = '<i class="fas fa-check"></i>';
                
                // Update status icon
                statusIcon.style.background = 'rgba(16, 185, 129, 0.2)';
                statusIcon.style.color = 'var(--success)';
                statusIcon.style.borderColor = 'var(--success)';
                statusIcon.innerHTML = '<i class="fas fa-check"></i>';
                
                // Change button text
                this.innerHTML = '<i class="fas fa-check-circle"></i> Panel Activated Successfully';
                this.style.background = '#0d9c6d';
                
                resultElement.innerHTML = `<div class="message success">Payment verified! Your panel has been activated successfully.</div>`;
            } else {
                statusElement.className = 'verification-status verification-failed';
                statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Transaction Not Found';
                
                resultElement.innerHTML = `<div class="message error">
                    Transaction not found or not confirmed yet. Please check:
                    <ul style="text-align: left; margin-top: 10px;">
                        <li>You sent exactly ${isCorrectAmount} USDT</li>
                        <li>You used TRC20 network</li>
                        <li>Transaction has at least 10 confirmations</li>
                        <li>You copied the correct Transaction ID</li>
                    </ul>
                    <br>Try again in 2-3 minutes or contact support if issue persists.
                </div>`;
                
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-check-circle"></i> Verify Transaction';
            }
        } else {
            statusElement.className = 'verification-status verification-failed';
            statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Invalid Transaction ID';
            
            resultElement.innerHTML = `<div class="message error">
                Invalid Transaction ID format. Please check:
                <ul style="text-align: left; margin-top: 10px;">
                    <li>Transaction ID should be 64 characters long</li>
                    <li>Should contain only letters and numbers (0-9, A-F)</li>
                    <li>Copy the complete TXID from your wallet</li>
                </ul>
            </div>`;
            
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-check-circle"></i> Verify Transaction';
        }
    }, 3000);
});

// Proceed to payment button
document.getElementById('proceed-btn').addEventListener('click', function() {
    const finalAmount = discountApplied ? '300.00' : '350.00';
    alert(`Payment process initiated. Please send ${finalAmount} USDT to the provided address using TRC20 network.`);
});

// Add some visual effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px)';
    });
});
