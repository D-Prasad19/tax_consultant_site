document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile menu toggle ----
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // ---- FAQ accordion ----
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const icon = btn.querySelector('.faq-icon');
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                const ic = i.querySelector('.faq-icon');
                if (ic) ic.textContent = '+';
            });
            if (!isOpen) {
                item.classList.add('active');
                if (icon) icon.textContent = '−';
            }
        });
    });

    // ---- Document checklist tabs ----
    document.querySelectorAll('.doc-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.doc-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.doc-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.target);
            if (target) target.classList.add('active');
        });
    });

    // ---- GST Calculator ----
    const gstBtn = document.getElementById('calcGstBtn');
    if (gstBtn) {
        gstBtn.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('gstAmount').value) || 0;
            const rate = parseFloat(document.getElementById('gstRate').value) || 0;
            const type = document.querySelector('input[name="gstType"]:checked').value;

            let net, gstAmt, total;
            if (type === 'exclusive') {
                net = amount;
                gstAmt = (amount * rate) / 100;
                total = amount + gstAmt;
            } else {
                total = amount;
                net = amount / (1 + rate / 100);
                gstAmt = total - net;
            }
            const cgst = gstAmt / 2;
            const sgst = gstAmt / 2;

            const fmt = n => '₹ ' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('resNetAmount').textContent = fmt(net);
            document.getElementById('resCgst').textContent = fmt(cgst);
            document.getElementById('resSgst').textContent = fmt(sgst);
            document.getElementById('resGstAmount').textContent = fmt(gstAmt);
            document.getElementById('resTotalAmount').textContent = fmt(total);
        });
    }

    // ---- Tax Regime Estimator (your original logic, kept as-is) ----
    const calcTaxBtn = document.getElementById('calcTaxBtn');
    if (calcTaxBtn) {
        calcTaxBtn.addEventListener('click', calculateTaxComparison);
        calculateTaxComparison();
    }

    function calculateTaxComparison() {
        const incomeInput = parseFloat(document.getElementById('annualIncome').value) || 0;
        const deductionsInput = parseFloat(document.getElementById('deductions80C').value) || 0;

        const stdDeductionNew = 75000;
        let taxableNew = Math.max(0, incomeInput - stdDeductionNew);
        let taxNew = 0;

        if (taxableNew <= 1200000) {
            taxNew = 0;
        } else {
            if (taxableNew > 400000) taxNew += Math.min(taxableNew - 400000, 400000) * 0.05;
            if (taxableNew > 800000) taxNew += Math.min(taxableNew - 800000, 400000) * 0.10;
            if (taxableNew > 1200000) taxNew += Math.min(taxableNew - 1200000, 400000) * 0.15;
            if (taxableNew > 1600000) taxNew += Math.min(taxableNew - 1600000, 400000) * 0.20;
            if (taxableNew > 2000000) taxNew += Math.min(taxableNew - 2000000, 400000) * 0.25;
            if (taxableNew > 2400000) taxNew += (taxableNew - 2400000) * 0.30;
            taxNew += taxNew * 0.04;
        }

        const stdDeductionOld = 50000;
        let taxableOld = Math.max(0, incomeInput - stdDeductionOld - deductionsInput);
        let taxOld = 0;

        if (taxableOld <= 500000) {
            taxOld = 0;
        } else {
            if (taxableOld > 250000) taxOld += Math.min(taxableOld - 250000, 250000) * 0.05;
            if (taxableOld > 500000) taxOld += Math.min(taxableOld - 500000, 500000) * 0.20;
            if (taxableOld > 1000000) taxOld += (taxableOld - 1000000) * 0.30;
            taxOld += taxOld * 0.04;
        }

        document.getElementById('taxNewRegime').innerText = '₹ ' + Math.round(taxNew).toLocaleString('en-IN');
        document.getElementById('taxOldRegime').innerText = '₹ ' + Math.round(taxOld).toLocaleString('en-IN');

        const recommendationEl = document.getElementById('taxRecommendation');
        const diff = Math.abs(taxOld - taxNew);

        recommendationEl.classList.remove('rec-new', 'rec-old', 'rec-equal');
        if (taxNew < taxOld) {
            recommendationEl.classList.add('rec-new');
            recommendationEl.innerText = `💡 New Tax Regime saves you ₹ ${Math.round(diff).toLocaleString('en-IN')}!`;
        } else if (taxOld < taxNew) {
            recommendationEl.classList.add('rec-old');
            recommendationEl.innerText = `💡 Old Tax Regime saves you ₹ ${Math.round(diff).toLocaleString('en-IN')}!`;
        } else {
            recommendationEl.classList.add('rec-equal');
            recommendationEl.innerText = ' Both regimes yield the same tax output.';
        }
    }
});