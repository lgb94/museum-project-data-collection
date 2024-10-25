/* what we are doing here:

first we need to make a request for the object id's of all the objects belonging to the department we want to collect the data of.

Our department of choice - Greek and Roman Art has a departmentID of 13.

to make a request for the object ids, we use this request:

GET https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=13

we then need to take that response and store those returned IDs for us to later go through and find all sculptures amonst that department.

*/

const axios = require('axios');
const fs = require('fs');

function getObjectIds() {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects', {
        params: {
            departmentIds: 13
        }
    })
    .then(response => {
        const objectIds = response.data.objectIDs;
        fs.writeFileSync('greek-and-roman-art-ids.json', JSON.stringify(objectIds, null, 2), 'utf-8');
        console.log(`${objectIds.length} object IDs from Greek and Roman art department.`);

    })
    .catch(error => {
        console.error('Error getting object IDs:', error);
    });
}

getObjectIds();