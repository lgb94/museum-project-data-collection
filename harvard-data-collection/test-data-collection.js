/* 

YOU WILL NEED AN API KEY FOR THE HARVARD MUSEUM FOR THIS TO RUN

harvards api works a little differently to the met, so first of all i just want to see if we can get a response out of it.

we should write it to a file as well like we were doing with the met

*/

const axios = require('axios');
const fs = require('fs');

const apiKey = 'You need to obtain an API Key for the harvard museum API';

function getHarvardArtObjects() {
    axios.get('https://api.harvardartmuseums.org/object', {
        params: {
            apikey: apiKey,
            size: 10 
        }
    })
    .then(response => {
        console.log(response.data.info)
        const objects = response.data.records;
        fs.writeFileSync('test-harvard-objects.json', JSON.stringify(objects, null, 2), 'utf-8');
    })
    .catch(error => {
        console.error('Error getting data', error);
    });
}

getHarvardArtObjects();
