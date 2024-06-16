function thankyou(){
    alert('Thank you for contacting us!')
}


function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    function displayResults(items) {
        items.forEach(item => {
            resultDiv.innerHTML += `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <img id="recommendedImg" src="${item.imageUrl}" alt="${item.name}">
            `;            
        })
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let found = false;

            if (input.includes('beach')) {
                found = true;
                displayResults(data.beaches);
            } else if (input.includes('temple')) {
                found = true;
                displayResults(data.temples);
            } else if (input.includes('countr')) {
                found = true;
                data.countries.forEach(country => {
                    displayResults(country.cities);
                })
            }

            if (!found) {
                resultDiv.innerHTML = 'Destination not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', searchCondition);

function clear() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';    
}

btnClear.addEventListener('click', clear);