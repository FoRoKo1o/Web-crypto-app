//define apiKey
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ff274ec820msh82adb6e3d9e9117p11c245jsn2117e4cf67ee',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};

//get data from api
fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
    .then(response => response.json())
    .then(response => getDataFromApi(response.data))
    .catch(err => console.error(err));

//display how many coins are on screen
const favoriteNumber = document.getElementById('favoriteNumber');
function updateFavoriteCount(){
    favoriteNumber.innerHTML = favoritesList.length;
}
//set global variable globalData containing api response
var globalData = [];
var globalSelectedCoin;
function setGlobalData(data){
    globalData = data;
}
//pass api data to functions
function getDataFromApi(data) {
    setGlobalData(data);
    createNavigationBar(data.stats);
    createCoinsTable(data.coins); //1st app startup
    checkboxCheck(data.coins);  // change display when checkbox is checked and unchecked
    updateFavoriteCount();

}
//creating Navigation Bar
function createNavigationBar(data) {
    document.getElementById("total").innerHTML = ("Total: " + data.total);
    document.getElementById("totalCoins").innerHTML = ("Total Coins: " + data.totalCoins);
    document.getElementById("totalMarkets").innerHTML = ("Total Markets: " + data.totalMarkets);
    document.getElementById("totalExchanges").innerHTML = ("Total Exchanges: " + data.totalExchanges);
    document.getElementById("totalMarketCap").innerHTML = ("Total Market Cap: " + data.totalMarketCap);
    document.getElementById("total24hVolume").innerHTML = ("Total 24h Volume: " + data.total24hVolume);
}
//checking if sort param is chosen
document.getElementById("coinRank").addEventListener("click", sortRank);
document.getElementById("coinName").addEventListener("click", sortName);
document.getElementById("coinSymbol").addEventListener("click", sortSymbol);
document.getElementById("coinPrice").addEventListener("click", sortPrice);
document.getElementById("zmianaProcentowa").addEventListener("click", sortChange);
document.getElementById("CoinMarketCap").addEventListener("click", sortMarketCap);
function clearSort(){
    document.getElementById('coinRank').innerHTML = "#";
    document.getElementById('coinRank').style.backgroundColor = 'rgb(103, 167, 87)';
    document.getElementById('coinName').innerHTML = "Nazwa";
    document.getElementById('coinName').style.backgroundColor = 'rgb(103, 167, 87)';
    document.getElementById('coinSymbol').innerHTML = "Symbol";
    document.getElementById('coinSymbol').style.backgroundColor = 'rgb(103, 167, 87)';
    document.getElementById('coinPrice').innerHTML = "Cena";
    document.getElementById('coinPrice').style.backgroundColor = 'rgb(103, 167, 87)';
    document.getElementById('zmianaProcentowa').innerHTML = "Zmiana Procentowa";
    document.getElementById('zmianaProcentowa').style.backgroundColor = 'rgb(103, 167, 87)';
    document.getElementById('CoinMarketCap').innerHTML = "Kapitalizacja";
    document.getElementById('CoinMarketCap').style.backgroundColor = 'rgb(103, 167, 87)';
}
//sorting data with that param
var flag = false;
function sortRank(){
    let coinRank = document.getElementById('coinRank');
    clearSort();
    if(flag){
        coinsSorted = globalData.coins.sort((a,b) => a.rank - b.rank)
        flag = false;
        coinRank.innerHTML = "# ⇧";
    }
    else{
        coinsSorted = globalData.coins.sort((a,b) => b.rank - a.rank)
        coinRank.innerHTML = "# ⇩";
        flag = true;
    }
    clearCoinsTable();
    clearSearch();
    coinRank.style.backgroundColor = 'rgb(44, 89, 33)';
    createCoinsTable(coinsSorted);
}
function sortName(){
    clearSort();
    coinArray = globalData.coins;
    let coinName = document.getElementById('coinName');
    if(flag){
        coinName.innerHTML = "Nazwa ⇧";
        coinsSorted = coinArray.sort((a, b) =>
        a.name.localeCompare(b.name));
        flag = false;
    }
    else{
        coinName.innerHTML = "Nazwa ⇩";
        coinsSorted = coinArray.sort((b, a) =>
        a.name.localeCompare(b.name));
        flag = true;
    }
    clearCoinsTable();
    clearSearch();
    coinName.style.backgroundColor = 'rgb(44, 89, 33)';
    createCoinsTable(coinsSorted);
}
function sortSymbol(){
    clearSort();
    coinArray = globalData.coins;
    let coinSymbol = document.getElementById('coinSymbol');
    if(flag){
        coinSymbol.innerHTML = "Symbol ⇧";
        coinsSorted = coinArray.sort((a, b) =>
        a.symbol.localeCompare(b.symbol));
        flag = false;
    }
    else{
        coinSymbol.innerHTML = "Symbol ⇩";
        coinsSorted = coinArray.sort((b, a) =>
        a.symbol.localeCompare(b.symbol));
        flag = true;
    }
    clearCoinsTable();
    clearSearch();
    coinSymbol.style.backgroundColor = 'rgb(44, 89, 33)';
    createCoinsTable(coinsSorted);
    
}
function sortPrice(){
    clearSort();
    let coinPrice = document.getElementById('coinPrice');
    if(flag){
        coinPrice.innerHTML = "Cena ⇧";
        coinsSorted = globalData.coins.sort((a,b) => a.price - b.price)
        flag = false;
    }
    else{
        coinPrice.innerHTML = "Cena ⇩";
        coinsSorted = globalData.coins.sort((a,b) => b.price - a.price)
        flag = true;
    }
    clearCoinsTable();
    clearSearch();
    coinPrice.style.backgroundColor = 'rgb(44, 89, 33)';
    createCoinsTable(coinsSorted);
}
function sortChange(){
    clearSort();
    let coinChange = document.getElementById('zmianaProcentowa');
    if(flag){
        coinChange.innerHTML = "Zmiana Procentowa ⇧";
        coinsSorted = globalData.coins.sort((a,b) => a.change - b.change)
        flag = false;
    }
    else{
        coinChange.innerHTML = "Zmiana Procentowa ⇩";
        coinsSorted = globalData.coins.sort((a,b) => b.change - a.change)
        flag = true;
    }
    clearCoinsTable();
    clearSearch();
    coinChange.style.backgroundColor = 'rgb(44, 89, 33)';
    createCoinsTable(coinsSorted);
}
function sortMarketCap(){
    clearSort();
    let CoinMarketCap = document.getElementById('CoinMarketCap');
    if(flag){
        CoinMarketCap.innerHTML = "Kapitalizacja ⇧";
        coinsSorted = globalData.coins.sort((a,b) => a.marketCap - b.marketCap)
        flag = false;
    }
    else{
        CoinMarketCap.innerHTML = "Kapitalizacja ⇩";
        coinsSorted = globalData.coins.sort((a,b) => b.marketCap - a.marketCap)
        flag = true;
    }
    clearCoinsTable();
    clearSearch();
    CoinMarketCap.style.backgroundColor = 'rgb(44, 89, 33)';
    createCoinsTable(coinsSorted);
}
//formating price form float to en-US values
function formatPrice(price) {
    return parseFloat(price).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
//checking if checkbox is checked and displaying favorite if so
function checkboxCheck(data){
    const favoriteCheckbox = document.getElementById('favoriteCheckbox');
    favoriteCheckbox.addEventListener('change', (event) => {
        clearSort();
        document.getElementById("searchBar").value = "";
        if (event.currentTarget.checked) {
            var newList = [];
          favoritesList.forEach(favElement => {
            data.forEach(dataElement => {
                if(dataElement.uuid == favElement){
                    newList.push(dataElement);
                }
            });
          });
          clearCoinsTable()
          newList.sort((a,b)=> a.rank - b.rank)
          createCoinsTable(newList);
        } 
        else {
            clearCoinsTable()
            createCoinsTable(data);
        }
      })
}
//removing data from coinsTable
function clearCoinsTable(){
    const coinsTableBodyElement = document.getElementById("coinsTableBody");
    coinsTableBodyElement.innerHTML = '';
}
//creating coinsTable containing (data) from api
function createCoinsTable(data) {
    const coinsTableBodyElement = document.getElementById("coinsTableBody");
    document.getElementById('searchCount').innerHTML = "Number of coins: " + data.length;
    data.forEach(element => {
        let isCoinInFavorite = favoritesList.includes(element.uuid);
        priceFormatted = formatPrice(element.price);
        let marketCapFormatted = parseInt(element.marketCap).toLocaleString("en-US", { style: "currency", currency: "USD" });

        let priceColor = "text-danger"
        if (element.change > 0) {
            priceColor = "text-success"
        }
        coinsTableBodyElement.innerHTML += `
        <tr class="table_row" id="${element.uuid}">
            <td onClick="displayCoinModal(this.parentNode.id)">${element.rank}</td>
            <td onClick="displayCoinModal(this.parentNode.id)"><img src="${element.iconUrl}" alt="${element.name} icon" > ${element.name}</td>
            <td onClick="displayCoinModal(this.parentNode.id)">${element.symbol}</td>
            <td onClick="displayCoinModal(this.parentNode.id)">${priceFormatted}</td>
            <td onClick="displayCoinModal(this.parentNode.id)" class="${priceColor}">${element.change}</td>
            <td onClick="displayCoinModal(this.parentNode.id)">${marketCapFormatted}</td>
            <td><i id="icon${element.uuid}" class="fa-solid fa-star ${isCoinInFavorite ? 'text-warning' : ''}" onClick="addCoinToFavorites(this.id)"<i/></td>
        </tr>
        `;
    });
}
//adding coint to local storage
function addCoinToFavorites(coinId){
    let iconElement = document.getElementById(coinId);
    let coinUuid = coinId.replace("icon","");

    if(iconElement.classList.contains("text-warning")){
        let coinIndex = favoritesList.indexOf(coinUuid);
        favoritesList.splice(coinIndex, 1);
        localStorage.favorites = JSON.stringify(favoritesList);
        iconElement.classList.remove("text-warning");
        updateFavoriteCount();
    }
    else{
        favoritesList.push(coinUuid);
        localStorage.favorites = JSON.stringify(favoritesList);
        iconElement.classList.add("text-warning");
        updateFavoriteCount();
    }
    
}
//getting data of specific coin from api and displaying modal
function displayCoinModal(coinId) {
    fetch('https://coinranking1.p.rapidapi.com/coin/' + coinId + '?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', options)
        .then(response => response.json())
        .then(response => getCoinPriceHistory(response.data.coin))
        .catch(err => console.error(err));
    const coinModal = new bootstrap.Modal("#coinModal", {
        keyboard: false
    });
    coinModal.show();
}
//listening for change of dropdown menu inside modal
const dropdownSelect = document.getElementById('time');
dropdownSelect.addEventListener('change', (event) => {
  getCoinPriceHistory(globalSelectedCoin);
});
//getting price history of specific coin and time period
function getCoinPriceHistory(coinInfo){
    let coinId = coinInfo.uuid;
    globalSelectedCoin = coinInfo;
    var dropDownValue = document.getElementById("time").value;
    fetch('https://coinranking1.p.rapidapi.com/coin/' + coinId + '/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod='+ dropDownValue, options)
	.then(response => response.json())
	.then(response => displayCoinModalInfo(coinInfo,response))
	.catch(err => console.error(err));
}
// removing data from chart
function clearChart(){
    document.getElementById("chart").innerHTML = '<canvas id="myChart"></canvas>';
}
//
function displayCoinModalInfo(coindata,priceHistory) {
    clearChart();
    let price = [];
    let dates = [];
    var interval = Math.floor(priceHistory.data.history.length / 30);
    for (var i = 0; i < priceHistory.data.history.length; i += interval) {
        if (priceHistory.data.history[i].price !== null) {
            price.push(parseInt((priceHistory.data.history[i].price)).toFixed(2));
            dates.push(convertTimeStampToDate(priceHistory.data.history[i].timestamp*1000));
        } else {
            // if price is null get next not null value
            for (var j = i + 1; j < priceHistory.data.history.length; j++) {
                if (priceHistory.data.history[j].price !== null) {
                    price.push(priceHistory.data.history[j].price);
                    dates.push(convertTimeStampToDate(priceHistory.data.history[j].timestamp*1000));
                    break;
                }
            }
        }
    }
    price = price.reverse();
    dates = dates.reverse();
    createChart(dates,price);
    document.getElementById("modalTitle").innerHTML = `<img src="${coindata.iconUrl}"/>&nbsp;` + (coindata.name) +  `, Current price: ${formatPrice(coindata.price)}`;
    displayMoreCoinInfo(coindata,priceHistory);
}
//adding more information about coin into modal
function displayMoreCoinInfo(coindata,priceHistory){
    moreInfo = document.getElementById('moreInfo');
    time = document.getElementById("time").value;
    let minPrice = priceHistory.data.history[0].price;
    let maxPrice = priceHistory.data.history[0].price;
    let minPriceDate = convertTimeStampToDate(priceHistory.data.history[0].timestamp);
    let maxPriceDate = convertTimeStampToDate(priceHistory.data.history[0].timestamp);
    let change;
    priceHistory.data.history.forEach(element => {
        price = parseFloat(element.price);
        if(minPrice > price && price != null){
            minPriceDate = convertTimeStampToDate(element.timestamp*1000);
            minPrice = price;
        }
        if(maxPrice < price && price != null){
            maxPrice = price;
            maxPriceDate = convertTimeStampToDate(element.timestamp*1000);
        }
    });
    let minPriceDateFormated = new Date(minPriceDate);
    let maxPriceDateFormated = new Date(maxPriceDate);
    if(minPriceDateFormated < maxPriceDateFormated){
        profit = true;
    }
    else{
        profit = false;
    }
    change = maxPrice - minPrice;
    moreInfo.innerHTML = `During last ${time}, price of ${globalSelectedCoin.name}<br>
    was lowest on ${minPriceDate} reaching: ${formatPrice(minPrice)}<br>
    was highest on  ${maxPriceDate}  reaching:  ${formatPrice(maxPrice)} <br>
    that gives: ${changeDisplay(change,profit)} per coin`;

}
//changing display of value if its profit or no
function changeDisplay(change,profit){
    if(profit){
        return `<span class="text-success">$${change} profit</span>`;
    }
    else
    {
        return `<span class="text-danger">$${change} loss</span>`;
    }
    
}
//converting timestamps to human date format
function convertTimeStampToDate(timestamp){
    date = new Date(timestamp).toLocaleDateString("en-GB");
    hours = new Date(timestamp).toLocaleTimeString("en-GB");
    return date + ' ' + hours;
}
//creating chart of coin price 
function createChart(dates,data){
    new Chart("myChart", {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
            backgroundColor: "rgba(0,100,0,0.5)",
            borderColor: "rgba(0,0,0,0.1)",
            data: data
          }]
        },
          options: {
            legend: {display: false},
            stacked : false,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Price'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }]
            }
          }
      });
}
//adding coin to localstorage
let favoritesList = new Array();
if(localStorage.favorites == undefined){
    localStorage.favorites = JSON.stringify(favoritesList);
} else{
    favoritesList = JSON.parse(localStorage.favorites);
}
searchBar = document.getElementById('searchBar');

//listening for searchBar inputs, and displaying matching data
searchBar.addEventListener("input", (e) => {
    clearSort();
    document.getElementById('favoriteCheckbox').checked = false;
    let searchCount = document.getElementById('searchCount');
    let searchDatalist = [];
    let value = e.target.value
    globalData.coins.forEach(element => {
        let name = element.name.toLowerCase();
        let symbol = element.symbol.toLowerCase();
        if(name.includes(value) || symbol.includes(value) ){
            searchDatalist.push(element);
        }
    });
    clearCoinsTable();

    if(searchDatalist.length > 0){
        searchCount.classList.remove("text-warning");
        searchBar.classList.remove("text-warning");
        searchCount.innerHTML = "Number of Coins: " + searchDatalist.length;
        createCoinsTable(searchDatalist) ;
    }
    else{
        searchCount.classList.add("text-warning");
        searchBar.classList.add("text-warning");
        searchCount.innerHTML = '0';
        document.getElementById("coinsTableBody").innerHTML = `<tr class="table_row"><td colspan="7" class="text-danger">No coins named: "${value}" Found</td></tr>`;
    }
});
//clearing searchBar and unchecking checkbox
function clearSearch(){
    document.getElementById("searchBar").value = "";
    document.getElementById('favoriteCheckbox').checked = false;
}