document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loanAgreementForm');
    const submitButton = document.getElementById('submitButton');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmSubmit = document.getElementById('confirmSubmit');
    const cancelSubmit = document.getElementById('cancelSubmit');
  
    // Elements for calculations
    const loanAmountInput = document.getElementById('loanAmount');
    const durationInput = document.getElementById('duration');
    const processingFeeInput = document.getElementById('processingFee');
    const monthlyInstallmentInput = document.getElementById('monthlyInstallment');
    const oneMonthInstallmentInput = document.getElementById('oneMonthLoanInstallment');
    const commencementDateInput = document.getElementById('commencementDate');
    const maturityDateInput = document.getElementById('maturityDate');
  
    const INTEREST_RATE = 0.065;  // 6.5% interest
    const PROCESSING_FEE_RATE = 0.05;  // 5% processing fee
    const ONE_MONTH_INTEREST = 0.10;  // 10% one-month installment
  
    // Function to calculate processing fee
    function calculateProcessingFee() {
      const loanAmount = parseFloat(loanAmountInput.value);
      if (!isNaN(loanAmount)) {
        const processingFee = loanAmount * PROCESSING_FEE_RATE;
        processingFeeInput.value = processingFee.toFixed(2);
      }
    }
  
    // Function to calculate monthly installment
    function calculateMonthlyInstallment() {
      const loanAmount = parseFloat(loanAmountInput.value);
      const duration = parseInt(durationInput.value);
      if (!isNaN(loanAmount) && !isNaN(duration)) {
        const totalInterest = loanAmount * INTEREST_RATE * duration;
        const totalAmount = loanAmount + totalInterest;
        const monthlyInstallment = totalAmount / duration;
        monthlyInstallmentInput.value = monthlyInstallment.toFixed(2);
      }
    }
  
    // Function to calculate one month loan installment
    function calculateOneMonthInstallment() {
      const loanAmount = parseFloat(loanAmountInput.value);
      if (!isNaN(loanAmount)) {
        const oneMonthInstallment = loanAmount * ONE_MONTH_INTEREST + loanAmount;
        oneMonthInstallmentInput.value = oneMonthInstallment.toFixed(2);
      }
    }
  
    // Function to calculate maturity date based on loan duration
    function calculateMaturityDate() {
      const commencementDate = new Date(commencementDateInput.value);
      const duration = parseInt(durationInput.value);
      if (!isNaN(commencementDate.getTime()) && !isNaN(duration)) {
        const maturityDate = new Date(commencementDate);
        maturityDate.setMonth(maturityDate.getMonth() + duration);
        maturityDateInput.value = maturityDate.toISOString().split('T')[0];  // Format to YYYY-MM-DD
      }
    }
  
    // Function to set commencement date (22 working days after form submission)
    function setCommencementDate() {
      const currentDate = new Date();
      let workingDays = 22;
      let daysAdded = 0;
  
      while (workingDays > 0) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {  // Skip weekends
          workingDays--;
        }
        daysAdded++;
      }
      commencementDateInput.value = currentDate.toISOString().split('T')[0];  // Format to YYYY-MM-DD
    }
  
    // Event listeners to calculate values dynamically
    loanAmountInput.addEventListener('input', function() {
      calculateProcessingFee();
      calculateMonthlyInstallment();
      calculateOneMonthInstallment();
    });
  
    durationInput.addEventListener('input', function() {
      calculateMonthlyInstallment();
      calculateMaturityDate();
    });
  
    // Set commencement date when the page loads
    setCommencementDate();
  
    // Event listener for the confirmation modal
    submitButton.addEventListener('click', function() {
      confirmationModal.style.display = 'flex';
    });
  
    cancelSubmit.addEventListener('click', function() {
      confirmationModal.style.display = 'none';
    });
  
    confirmSubmit.addEventListener('click', function() {
      // Prepare data for EmailJS
      const formData = {
        name: document.getElementById('name').value,
        ghanaCard: document.getElementById('ghanaCard').files[0],
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        houseNumber: document.getElementById('houseNumber').value,
        digitalAddress: document.getElementById('digitalAddress').value,
        town: document.getElementById('town').value,
        region: document.getElementById('region').value,
        occupation: document.getElementById('occupation').value,
        loanPurpose: document.getElementById('loanPurpose').value,
        loanType: document.getElementById('loanType').value,
        loanAmount: document.getElementById('loanAmount').value,
        processingFee: document.getElementById('processingFee').value,
        commencementDate: document.getElementById('commencementDate').value,
        maturityDate: document.getElementById('maturityDate').value,
        paymentMode: document.getElementById('paymentMode').value,
        monthlyInstallment: document.getElementById('monthlyInstallment').value,
        oneMonthLoanInstallment: document.getElementById('oneMonthLoanInstallment').value,
        guarantorName: document.getElementById('guarantorName').value,
        guarantorPhone: document.getElementById('guarantorPhone').value,
        guarantorEmail: document.getElementById('guarantorEmail').value,
        mandateNumber: document.getElementById('mandateNumber').value,
        fourDigitCode: document.getElementById('fourDigitCode').value,
        nationalId: document.getElementById('nationalId').files[0]
      };
  
      // Send data using EmailJS
      emailjs.send('service_0ej85ku', 'template_gngm9le', formData, '9NEJarwtmNyR7LByn')
        .then(function(response) {
          alert('Loan agreement form sent successfully.');
          loanForm.reset(); // Reset the form after successful submission
        }, function(error) {
          alert('Failed to send the loan agreement form. Please try again.');
        });
  
      // Hide modal after submission
      confirmationModal.style.display = 'none';
    });
  });
  