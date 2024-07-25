
// Navigation

document.getElementById('main-action-btn').onclick = () =>{
    document.getElementById('products').scrollIntoView({behavior: "smooth"});
}

const links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = () =>{
        document.getElementById(links[i].getAttribute('data-link')).scrollIntoView({behavior: "smooth"});
    }
}



const productName = document.getElementsByClassName("products-item-title");
const btns = document.querySelectorAll(".products-items .btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = () =>{
        document.getElementById("order").scrollIntoView({behavior: "smooth"});
        document.getElementById("product").value = productName[i].innerText
    }
}


// Currenst settings 

// Function to fetch exchange rates (API)

async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates;
}

// Function to convert and display the price

async function convertCurrency(toCurrency, newCurrency) {
    const exchangeRates = await fetchExchangeRates();
    const priceElements = document.getElementsByClassName("products-item-price");

    for (let priceElement of priceElements) {
        const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
        const convertedPrice = basePrice * exchangeRates[toCurrency];
        priceElement.textContent = `${convertedPrice.toFixed(2)} ${newCurrency}`;
    }
}

document.getElementById('change-currency').onclick = async (e) => {
    const currentCurrency = e.target.innerText;

    let newCurrency = '$';
    let targetCurrency = 'USD';

    if (currentCurrency === '$') {
        newCurrency = '₽';
        targetCurrency = 'RUB';
    } else if (currentCurrency === '₽') {
        newCurrency = 'BYN';
        targetCurrency = 'BYN';
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        targetCurrency = 'EUR';
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        targetCurrency = 'CNY';
    } else if (currentCurrency === '¥') {
        newCurrency = '₴';
        targetCurrency = 'UAH';
    }

    e.target.innerText = newCurrency;

    // Convert and update the prices
    await convertCurrency(targetCurrency, newCurrency);
};


// Validation 


const products = document.getElementById("product");
const userName = document.getElementById("userName");
const phone = document.getElementById("phone");

document.getElementById("order-action").onclick = () => {
    let hasError = false

   const arr = [products, userName, phone].forEach(el => {
        if(!el.value){
            el.style.borderColor = 'red';
            hasError = true;
        } else{
            el.style.borderColor = '';
        }
   });

   if(!hasError){
    [products, userName, phone].forEach(el => {
       el.value = ""
   });
   alert("Спасибо за заказ! Мы скоро свяжемся с вами!")
    }
} 
