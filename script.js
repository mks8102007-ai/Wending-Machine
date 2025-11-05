let balance = 0;
let cart = {};
let totalCost = 0;

const balanceDisplay = document.getElementById("balance");
const message = document.getElementById("message");
const moneyInput = document.getElementById("moneyinput");
const insertButton = document.getElementById("insertbutton");
const purchaseButton = document.getElementById("purchasebutton");
const returnChangeButton = document.getElementById("returnchangebutton");
const products = document.querySelectorAll(".product");

products.forEach(product => {
  product.addEventListener("click", () => {
    const name = product.dataset.item;
    const price = parseInt(product.dataset.price);
    let stock=parseInt(product.dataset.stock);
    const stockDisplay = product.querySelector(".stock");

    if(stock<=0){
      message.textcontent=`${name}is out of stock`;
      product.Style.opacity="0.5";
      return;
    }

    if (cart[name]) {
      if(cart[name].qty<stock){
      cart[name].qty++;
    } else {
      message.textContent=`${name}only has ${stock} left!`;
      return;
    }
  }else{
      cart[name]={price:price,qty:1};
    }

    totalCost += price;
    message.textContent = `${name} added! Total cost: Rs.${totalCost}`;
  });
});

insertButton.addEventListener("click", () => {
  const amount = parseInt(moneyInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter valid amount");
    return;
  }
  balance += amount;
  balanceDisplay.textContent = balance;
  message.textContent = `You inserted Rs.${amount}. Current balance: Rs.${balance}`;
  moneyInput.value = "";
});

purchaseButton.addEventListener("click", () => {
  if (totalCost === 0) {
    alert("No items selected");
    return;
  }

  if (balance >= totalCost) {
    balance-= totalCost;
    balanceDisplay.textContent = balance;

    let summary = "Purchase successful\nItems bought:\n";

    for (let item in cart) {
      summary += `${item} *${cart[item].qty} = Rs.${cart[item].price * cart[item].qty}\n`;

      const product=[...products].find(p=>p.dataset.item===item);
      let stock=parseInt(product.dataset.stock);
      stock-=cart[item].qty;
      product.dataset.stock=stock;
      
      const stockLabel=product.querySelector(".stock");
      if(stockLabel){
        stockLabel.textContent=stock;
      }
      if(stock<=0){
        product.style.opacity="0.5";
      }
    }

    alert(summary + `\nRemaining balance: Rs.${balance}`);
    message.textContent = "Thank you for buying";

    cart = {};
    totalCost = 0;
  } else {
    alert("Not enough balance, Please insert more money.");
    message.textContent = "Insufficient balance.";
  }
});

returnChangeButton.addEventListener("click", () => {
  alert(`Returning Rs.${balance} change.`);
  balance = 0;
  balanceDisplay.textContent = balance;
  message.textContent = "Change returned.";
  cart = {};
  totalCost = 0;
});