const countryName = new URLSearchParams(location.search).get('name')
const flag = document.querySelector('.flag img')
const cName = document.querySelector('.deatils-txt-container h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.reg')
const subregion = document.querySelector('.sub')
const capital = document.querySelector('.cap')
const tld= document.querySelector('.tld')
const currency= document.querySelector('.currency')
const language= document.querySelector('.lang')
const border = document.querySelector('.border')
const backBtn = document.querySelector('.back-btn')
const darkModeBtn = document.querySelector('.theme-changer')

backBtn.addEventListener('click', (e)=>{
    history.back()
})

if(localStorage.getItem('darkmode') === 'true'){
    console.log("dark mode is on")
    document.body.classList.toggle('dark-mode')
    darkModeBtn.innerHTML = '<i class="fa-regular fa-sun"></i><span class="dark-mode">Light Mode</span>'
}


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((data) =>{
    flag.src = data[0].flags.svg
    cName.innerText = data[0].name.common
    if(data[0].name.nativeName){
        nativeName.innerText = Object.values(data[0].name.nativeName)[0].common
    }
    else{
        nativeName.innerText = data[0].name.common
    }
    population.innerText = data[0].population.toLocaleString('en-IN')
    region.innerText = data[0].region
    if(data[0].subregion){
        subregion.innerText = data[0].subregion
    }
    else{
        subregion.innerText = 'no subregion'
    }
    if(data[0].capital){
        capital.innerText = data[0].capital.join(', ')
    }
    else{
        capital.innerText = 'no capital'
    }
    tld.innerText = data[0].tld.join(', ')
    if(data[0].currencies){
        currency.innerText =Object.values(data[0].currencies).map((ele) => ele.name).join(', ')
    }
    else{
        currency.innerText = 'no currency'
    }
    if(data[0].languages){
        language.innerText =Object.values(data[0].languages).join(', ')
    }
    else{
        language.innerText = 'no language'
    }

    if(data[0].borders){
        data[0].borders.forEach((ele) =>{
            // console.log(ele)
            fetch(`https://restcountries.com/v3.1/alpha/${ele}`).then((res) => res.json())
            .then(([countryData]) =>{
                // console.log(countryData)

                const borderCountry = document.createElement('a');
                borderCountry.classList.add('cmn')
                borderCountry.innerText = countryData.name.common
                borderCountry.href = `./country.html?name=${countryData.name.common}`
                border.append(borderCountry)
            })
        })
    }
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