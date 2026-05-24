
// CENTRAL CORE ENGINE ELEMENTS SELECTION

let themeToggleBtn = document.querySelector("#theme-toggle");
let body = document.querySelector("body");
let liveTime = document.querySelector("#live-time");
let liveDate = document.querySelector("#live-date");
let ethPriceStream = document.querySelector("#eth-price-stream");
let assetForm = document.querySelector("#asset-form");
let assetNameInput = document.querySelector("#asset-name");
let assetQtyInput = document.querySelector("#asset-qty");
let assetTypeSelect = document.querySelector("#asset-type");
let ledgerList = document.querySelector("#ledger-list");
let ledgerBtn = document.querySelector("#commit-transaction-btn");
//LIVE CLOCK

function clock(){
    let now= new Date();
    let timeString = now.toLocaleTimeString();
    liveTime.textContent = timeString;
}
setInterval(clock,1000);

//LIVE DATE

function date(){
    let now=new Date();
    let dateString = now.toLocaleDateString();
    liveDate.textContent = dateString;
}
date();

//THEME - TOGGLE

function darkMode(){
    body.classList.toggle("dark-theme");
}

themeToggleBtn.addEventListener("click", darkMode);

//Asynchronous Market Price Stream

async function fetchEthPrice(){
    try{
    ethPriceStream.textContent = "Connecting to data node...";
    ethPriceStream.style.color = "var(--color-stock)"
    let response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);
    let data = await response.json();
    ethPriceStream.textContent = `$${data.USD} USD`;
    }
    catch (error) {
        ethPriceStream.textContent = "Error!";
        ethPriceStream.style.color = "var(--color-erasure)";
    } 
}
setInterval(fetchEthPrice, 3000);

//THE PORTFOLIO LEDGER



function addToLedger(){
    let name = assetNameInput.value.trim();
    let qty = assetQtyInput.value.trim();
    let type = assetTypeSelect.value;
    if(name === "" || qty === ""){
        return;
    } else {
        let newLi = document.createElement("li");
        newLi.textContent = `${name} - Qty: ${qty} (${type})`;
        let delBtn = document.createElement("button");
        delBtn.textContent="delete";
        delBtn.addEventListener("click",function(){
            newLi.remove();
        })
        newLi.appendChild(delBtn);
        ledgerList.appendChild(newLi);

        if(assetTypeSelect.value === "Stock"){
           newLi.style.borderLeft = "5px solid var(--color-stock)"; 
        } else {
            newLi.style.borderLeft = "5px solid var(--color-crypto)";
        }
    };
}

ledgerBtn.addEventListener("click", addToLedger);

