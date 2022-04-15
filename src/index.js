const banks = document.getElementById('banks');
const maxLoanDefault = document.getElementById('max-loan-default');
const minDownPayDefault = document.getElementById('min-down-payment');
const interestRateDefault = document.getElementById('interest-rate');
const maxLoanTermDefault = document.getElementById('max-loan-term');
const closeAddBlank = document.querySelector('.add-bank-page__close');
const closeCalc = document.querySelector('.mortgage-calc__close');
const removeBankItem = document.querySelectorAll('.list-item_delete');
const editBankItem = document.querySelectorAll('.list-item_edit');
const btnCreateBank = document.querySelector('.btn-create-bank');
const btnAddBank = document.querySelector('.add');
const btnCalc = document.querySelector('.calc');
const clientLoan = document.getElementById('clientLoan');
const clientDownPayment = document.getElementById('client-down-payment');
const clientInterestRate = document.querySelector('.client-interest-rate');
const clientLoanRate = document.getElementById('client-loan-rate');
let yearInput = document.querySelector('.year-input');
let interestRateInputInput = document.querySelector('.interest-rate-input');
const yearInputText = document.querySelector('.year-input-val');
const interestRateValue = document.querySelector('.interest-rate-value');
const calcLoanInp = document.querySelector('.loan-input');
const monthPayOut = document.getElementById('month-payment');
const totalPayOut = document.getElementById('total-payment');
const interestPaidOut = document.getElementById('interest-paid');
const bankinglist = document.querySelectorAll('.banking_list-item');
const mainBank = document.querySelector('.mainBank');
const mainInitLoan = document.querySelector('.mainInitLoan');
const mainDownPaym = document.querySelector('.mainDownPaym');
const mainInterestRate = document.querySelector('.mainInterestRate');

// data

const bankConditions = [
    {
        id: 1,
        bank: "Bank - 1",
        maxLoan: 500000,
        minDownPay: 20000,
        intRate: 10,
        period: 60
    },
    {
        id: 2,
        bank: "Bank - 2",
        maxLoan: 100000,
        minDownPay: 10000,
        intRate: 18,
        period: 24
    },
    {
        id: 3,
        bank: "Bank - 3",
        maxLoan: 2000000,
        minDownPay: 75000,
        intRate: 5,
        period: 84
    },
    {
        id: 4,
        bank: "Bank - 4",
        maxLoan: 360000,
        minDownPay: 6600,
        intRate: 24,
        period: 36
    }
];

const dataUserBank = [];

let monthRange = 1;
let interestRateRange = 1;
let sumRange = 0;

renderBankList();

function renderBankList() {
    let htmlRender = '';
    dataUserBank.forEach((el, i) => {
        htmlRender += `
        <div onclick="refreshValues(${i})" id="${i+1}" class="banking_list-item">
            <div class="list-item__btns">
                <div onclick="removeBank(${i})" class="list-item_delete">
                </div>
            </div>
            <div class="banking__bank-name">${el.bank}</div>
            <div class="banking_list-item__body">
                <div class="body__bank_max-loan">
                    <p>Initial<br/>loan</p>
                    <p>${el.clientLoan - el.clientDownPay}</p>
                </div>
                <div class="body__bank_min-down-payment">
                    <p>Down<br/>Payment</p>
                    <p>${el.clientDownPay}</p>
                </div>
                <div class="body__bank_interest-rate">
                    <p>Interest<br/>rate</p>
                    <p>${el.clientIntRate} %</p>
                </div>
                <div class="body__bank_loan-term">
                    <p>Loan<br/>term</p>
                    <p>${el.clientPeriod} months</p>
                </div>
                <div class="body__bank_loan-term">
                    <p>Min<br/>month payment</p>
                    <p>${calculate(el.clientLoan, el.clientIntRate, el.clientPeriod, el.clientDownPay)} $</p>
                </div>
            </div>
        </div>
        `
    });
    document.querySelector('.banking_list__items').innerHTML = htmlRender;
}

function refreshValues(i) {
    mainBank.innerText = dataUserBank[i].bank;
    mainInitLoan.innerText = dataUserBank[i].clientLoan;
    mainDownPaym.innerText = dataUserBank[i].clientDownPay;
    mainInterestRate.innerText = dataUserBank[i].clientIntRate;
}

function refreshDefaultBankValues () {
    maxLoanDefault.innerText = bankConditions[banks.selectedIndex].maxLoan;
    minDownPayDefault.innerText = bankConditions[banks.selectedIndex].minDownPay;
    interestRateDefault.innerText = bankConditions[banks.selectedIndex].intRate;
    maxLoanTermDefault.innerText = bankConditions[banks.selectedIndex].period;
    clientInterestRate.innerText = bankConditions[banks.selectedIndex].intRate;
}

function clientRequest () {

    if(clientLoan.value > bankConditions[banks.selectedIndex].maxLoan) {
        alert('Initial loan should be less than Maximum loan');
        return null
    } if(clientDownPayment.value < bankConditions[banks.selectedIndex].minDownPay) {
        alert('Down Payment should be bigger than Minimum down payment');
        return null
    } if(clientLoanRate.value > bankConditions[banks.selectedIndex].period) {
        alert('Maximum Loan term term should be less than Loan term');
        return null
    }

    let clientItemObj = {
        clientId: dataUserBank.length,
        bank: banks.value,
        clientLoan: clientLoan.value,
        clientDownPay: clientDownPayment.value,
        clientIntRate: interestRateDefault.innerText,
        clientPeriod: clientLoanRate.value
    }

    dataUserBank.push(clientItemObj);
    clearInputs();
    renderBankList();
}

function createBankItem () {
    clientRequest();
    clearInputs();
}

function clearInputs() {
    dataUserBank.value = '';
    clientLoan.value = '';
    clientDownPayment.value = '';
    clientLoanRate.value = '';
}
function removeBank(i) {
   dataUserBank.splice(i, 1)
   renderBankList();
   epmtyData ()

}

function editBank(i) {
    console.log(`edit id ${i + 1}`)
}

function calcOutText (result) {
    monthPayOut.innerText = result.toFixed(2);
    totalPayOut.innerText = (result * +yearInputText.innerHTML).toFixed(2);
    interestPaidOut.innerText = (result * +yearInputText.innerHTML - sumRange).toFixed(2);
}

function calculate (sum, rate, month, downPaym = 0) {
    let b = rate / 12 / 100;
    let c = Math.pow(b + 1, month);
    let d = c - 1;
    const result = ((sum - downPaym) * b * c) / d;

    calcOutText (result);
    return result.toFixed(2);
}

banks.onclick = () => {
    refreshDefaultBankValues();
}

btnCreateBank.onclick = () => {

    createBankItem();
    document.querySelector('.add-bank-page-wrapper').classList.remove('active')
}

closeAddBlank.onclick = () => {
    document.querySelector('.add-bank-page-wrapper').classList.remove('active')
}

closeCalc.onclick = () => {
    document.querySelector('.mortgage-calc__wrapper').classList.remove('calc-active')
}

btnAddBank.onclick = () => {
    document.querySelector('.add-bank-page-wrapper').classList.add('active')
}

btnCalc.onclick = () => {
    document.querySelector('.mortgage-calc__wrapper').classList.add('calc-active')
}

yearInput.addEventListener('mousemove', (e) => {
    yearInputText.innerText = e.target.value;
    monthRange = e.target.value;

    calculate(sumRange, interestRateRange, monthRange);
})

interestRateInputInput.addEventListener('mousemove', (e) => {
    interestRateValue.innerText = e.target.value;
    interestRateRange = e.target.value;

    calculate(sumRange, interestRateRange, monthRange);
})

calcLoanInp.addEventListener('change', (e) => {
    sumRange = e.target.value;
})

function epmtyData () {
    dataUserBank.length == 0
    ? document.querySelector('.banking_list__items').innerHTML = `<h2 style="margin-bottom:0">Bank List is empty</h2><br/> <h3 style="margin:0;text-align:center">Press add bank</h3>`
    : null
}

epmtyData();












