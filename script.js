const inputEle = document.getElementById("input");
const sortMktBtn = document.getElementById("sort-by-mkt");
const sortPerBtn = document.getElementById("sort-by-per");
const tBody = document.getElementById("tbody");



function adData(receivedData){

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.classList.add("td");
    let receivedName = receivedData.name;
    let receivedImageUrl = receivedData.image;

    let nameLogoDiv = document.createElement("div");
    nameLogoDiv.classList.add("name-logo-div");

    let imageEle = document.createElement("img");
    imageEle.setAttribute("src", receivedImageUrl);
    imageEle.setAttribute("alt", receivedName);
    imageEle.classList.add("image");

    let span = document.createElement("span");
    span.innerText = receivedData.name;
    span.classList.add("span");

    nameLogoDiv.appendChild(imageEle);
    nameLogoDiv.appendChild(span)

    td1.appendChild(nameLogoDiv);
    tr.appendChild(td1);


    let td2 = document.createElement("td");
    td2.classList.add("td");
    let receivedSymbol = receivedData.symbol;
    let receivedSymbolCap = receivedSymbol.toUpperCase();
    td2.innerText = receivedSymbolCap;
    tr.appendChild(td2);


    let td3 = document.createElement("td");
    td3.classList.add("td");
    td3.innerText = `$${receivedData.current_price}`;
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.classList.add("td");
    td4.innerText = `$${receivedData.total_volume}`;
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.classList.add("td");
    let per = receivedData.market_cap_change_percentage_24h;

    if(per < 0){
        td5.classList.add("red");
    }else if(per > 0){
        td5.classList.add("green");
    }
    td5.innerText = `${per}%`;
    tr.appendChild(td5);

    let td6 = document.createElement("td");
    td6.classList.add("td");
    td6.innerText = `Mkt Cap: $${receivedData.market_cap}`;
    tr.appendChild(td6);

    tBody.appendChild(tr);
    console.log("added");

}

async function makeCall(){
let received = await  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")

.then((data) => {
    return data.json()
}).then((rec) => {


    for(let j = 0; j < rec.length; j++){
        adData(rec[j])
    }

    function search(searchedValue){
        return rec.filter((each) => {
            return each.name.includes(searchedValue)
        })
    }
   
    inputEle.addEventListener("keyup", (event) => {
        let searchedValue = event.target.value;
       
        let filteredArr = search(searchedValue);
            
        tBody.innerHTML = "";

        for(let i = 0; i < filteredArr.length; i++){
            adData(filteredArr[i])
        }
    })


    sortMktBtn.addEventListener("click", function(){
        rec.sort((a,b) => a.market_cap - b.market_cap)
        tBody.innerHTML = "";
        for(let k = 0; k < rec.length; k++){
            adData(rec[k]);
        }
    })

    sortPerBtn.addEventListener("click", function(){
        rec.sort((a,b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h)
        tBody.innerHTML = "";
        for(let l = 0; l < rec.length; l++){
            adData(rec[l]);
        }
    })


})

.catch((error) => {
    console.log(error)
})

}


makeCall();