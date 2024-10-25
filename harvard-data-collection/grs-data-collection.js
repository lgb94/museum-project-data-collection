/* 

YOU WILL NEED AN API KEY FOR THE HARVARD MUSEUM FOR THIS TO RUN

from our test we got 711 results, meaning that with a max page size of 100 objects, we'll have to collect pages 1 - 8 with this request

*/

const axios = require('axios');
const fs = require('fs');


const apiKey = 'You need to obtain an API Key for the harvard museum API';

function getAllGRSObjects() {
    let page = 1;
    let allObjects = [];

    function getPage() {
        axios.get('https://api.harvardartmuseums.org/object', {
            params: {
                apikey: apiKey,
                q: 'classification:"Sculpture" AND (culture:"Greek" OR culture:"Roman")',
                size: 100,
                page: page
            }
        })
        .then(response => {
            const { records, info } = response.data;
            console.log(`got page ${page} of ${Math.ceil(info.totalrecords / 100)}...`);

            allObjects = allObjects.concat(records);

            if (allObjects.length < info.totalrecords) {
                page++; 
                getPage();  
            } else {
                fs.writeFileSync('harvard-grs-objects.json', JSON.stringify(allObjects, null, 2), 'utf-8');
                console.log(`Got a total of ${allObjects.length} objects.`);
            }
        })
        .catch(error => {
            console.error('Error getting data:', error);
        });
    }
    getPage();
}

getAllGRSObjects();