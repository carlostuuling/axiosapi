import { API } from './config/API';
let dropdown = document.getElementById("countries");

dropdown.addEventListener('input', async (e) => {
    let country = e.target.value;
    console.log(country)

    try {
        await API.get('statistics', {params: {country:country}})
        .then(response => {
            console.log(response.data.response[0]);
            let infoDiv = document.getElementById('infoDiv')
            infoDiv.innerHTML = '<p> Population: ' + response.data.response[0].population + '</p>' + '<p> Cases: ' +
            response.data.response[0].cases.active + '</p>' + '<p> continent: ' + response.data.response[0].continent + '</p>' +
            '<p> Deaths: ' + response.data.response[0].deaths.total + '</p>'


        })
    } catch (error) {
        console.error(error);
    }
})

try {
    await API.get('countries')
    .then(response => {
        const allCountries = response.data.response;
        allCountries.forEach(country => {
            let option = document.createElement("option");
            option.innerHTML = country;
            dropdown.appendChild(option);

        });

    })
} catch (error) {
    console.error(error);
}
