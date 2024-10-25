/* Here we have a script that sends a single request to the met API for details about an object via its ID - I want to check we are collecting the right thing, but also need to determine how we can filter out some results for our purposes. since I dont want a dataset of 33k things.

We are also probably going to be using a very similar request when we have our own dataset, so make note! */

const axios = require('axios');

function getObjectDetails(objectID) {
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
        .then(response => {
            const objectDetails = response.data;
            console.log(objectDetails);
        })
        .catch(error => {
            console.error(`Error getting details for object ${objectID}:`, error);
        });
}

// Replace this with object ID you want info for

const objectID =  395290 ;  

getObjectDetails(objectID);