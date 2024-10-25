/* 
ok so this is the most complicated function out of everything in this repository (this is being written weeks after this was created so forgive me if my memory is a little sketchy, but i remember the basic premise)

Essentially, we have a list of object ids obtained from a previous search from the met which matched our criteria of greek or roman sculpture, and we need to obtain the detailed information about each of those objects so that we can add them to our collated database.

That means iterating through the collected array of ids, pumping each one into a request and collating the results into one big json file.

This was complicated by the fact that the met api had a request limit in place of upto 80 requests per second, so i had to create away of iterating through the array and serving up these requests for information about 1000+ object_ids in batches.

I was worried about doing batches of exactly 80 per second in case something bugs out or whatever, so i served up requests in batches of 50 - ensuring i didnt get close.

This function took a while o work, but boy did it.

I have since erased this from my memory as it was traumatic to write up.

*/

const axios = require('axios');
const fs = require('fs');

const metObjectIds = require('./greek-and-roman-sculpture-ids.json');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getObjectDetails(id) {
    return axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error getting object ID ${id}:`, error);
            return null; 
        });
}

function processBatches(metObjectIds, batchSize) {
    const totalBatches = Math.ceil(metObjectIds.length / batchSize);
    let allObjects = [];

    function getBatch(batchNumber) {
        if (batchNumber > totalBatches) {
            fs.writeFileSync('met-grs-objects.json', JSON.stringify(allObjects, null, 2), 'utf-8');
            console.log(`Got details for ${allObjects.length} objects.`);
            return;
        }
        const batchIds = metObjectIds.slice((batchNumber - 1) * batchSize, batchNumber * batchSize);
        console.log(`Getting batch ${batchNumber} of ${totalBatches}...`);
        Promise.all(batchIds.map(id => getObjectDetails(id)))
            .then(results => {
                allObjects = allObjects.concat(results.filter(obj => obj !== null));
                return delay(1000);
            })
            .then(() => {
                getBatch(batchNumber + 1);
            });
    }
    getBatch(1);
}

processBatches(metObjectIds, 50);
