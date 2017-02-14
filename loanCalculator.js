// ==UserScript==
// @name         Loan Repayment Calculator
// @namespace    https://accountaccess.myfedloan.org/payments/makePayment.do?payall=n
// @version      0.1
// @description  balance loan payment based on interest rate
// @author       HarleyKwyn
// @match        https://accountaccess.myfedloan.org/payments/makePayment.do?payall=n
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var paymentTotal = prompt("How much would you like to pay?");
    var loan_table_class = "specifyPaymentTable";
    var interest_rate_cell_class = "tdSecondCell";
    var interest_rate_regex = /(\d.\d+)%/;
    // get rows
    var rows = document.getElementsByClassName(loan_table_class)[0].getElementsByTagName("tr");
    rows = Array.prototype.slice.apply(rows);
    rows.shift();
    function getInterestRate(row) {
      var interest_rate_cell = row.getElementsByClassName(interest_rate_cell_class)[0];
      var match = interest_rate_cell.innerHTML.match(interest_rate_regex);
      return Number(match[1], 10);
    }

    function fillInputValue(row, amount) {
      var input = row.getElementsByTagName('input')[0];
      input.value = amount;
      input.dispatchEvent(new Event('change'));
    }

    var rates = rows.map(getInterestRate);
    var rateDenominator = rates.reduce(function(total, rate) { return total + rate; }, 0);
    rows.map(function(row) {
      var rate = getInterestRate(row);
      var weight = rate/rateDenominator;
      var payment = Number((weight * paymentTotal).toFixed(2), 10);
      fillInputValue(row, payment);
    });
})();
