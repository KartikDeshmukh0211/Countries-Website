const countryContainer = document.querySelector('.countries-container')
const filter = document.querySelector('.filter')
const input = document.querySelector('.search input')
let allCountryData 
const darkModeBtn = document.querySelector('.theme-changer')
// const darkModeTxt = document.querySelector('.dark-mode')


if(localStorage.getItem('darkmode') === 'true'){
    console.log("dark mode is on")
    document.body.classList.toggle('dark-mode')
    darkModeBtn.innerHTML = '<i class="fa-regular fa-sun"></i><span class="dark-mode">Light Mode</span>'
}



fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) =>{
    allCountryData = data
    render(data)
})

filter.addEventListener('change' ,(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) =>{
        countryContainer.innerHTML = ""
        render(data)
    })
})

input.addEventListener('input', (e) =>{
    // console.log(e.target.value)
    let filterCountry = allCountryData.filter((ele) =>{
        return ele.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    // console.log(filterCountry)
    countryContainer.innerHTML = ""
    render(filterCountry)
})

darkModeBtn.addEventListener('click' ,(e)=>{
    document.body.classList.toggle('dark-mode')
    if(document.body.classList[0] === 'dark-mode'){
        darkModeBtn.innerHTML = '<i class="fa-regular fa-sun"></i><span class="dark-mode">Light Mode</span>'
        localStorage.setItem('darkmode', true)
    }
    else{
        darkModeBtn.innerHTML = '<i class="fa-regular fa-moon"></i><span class="dark-mode">Dark Mode</span>'
        localStorage.setItem('darkmode', false)
    }
})

function render(data){
    data.forEach((ele) =>{
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.classList.add('cmn')
        countryCard.href = `./country.html?name=${ele.name.common}`

        const cardHtml = `
            <img src= "${ele.flags.svg}" alt="flag">
            <div class="card-txt">
                <h3>${ele.name.common}</h3>
                <p><b>population: </b>${ele.population.toLocaleString('en-IN')}</p>
                <p><b>region: </b>${ele.region}</p>
                <p><b>capital: </b>${ele.capital}</p>
            </div>
        `
        countryCard.innerHTML = cardHtml
        countryContainer.append(countryCard)
    })
}














