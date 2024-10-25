/* we dont want a data set of 33 thousand objects, so to narrow it down, i've determined some parameters we can use with the met's API to narrow down our results.

I want to only store greek and roman sculpture, so:
departmentID=13, q = sculpture, statue

we make our request to this endpoint: 'https://collectionapi.metmuseum.org/public/collection/v1/search'

we want to write our results to new file

*/

const axios = require('axios');
const fs = require('fs')

function searchFilteredObjects() {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search', {
        params: {
            departmentId: 13,
            q: 'sculpture, statue',
        }
    })
    .then(response => {
        const objectIds = response.data.objectIDs;
        fs.writeFileSync('greek-and-roman-sculpture-ids.json', JSON.stringify(objectIds, null, 2), 'utf-8');
        console.log(`Fetched ${objectIds.length} object IDs returned.`);
    })
    .catch(error => {
        console.error('Error fetching filtered object IDs:', error);
    });
}

searchFilteredObjects();