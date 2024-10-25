/* 

YOU WILL NEED AN API KEY FOR THE HARVARD MUSEUM FOR THIS TO RUN

now we want to refine our search to give us the object data for the pieces we want - greek and roman sculpture.

From their website, i've determined we need to apply the following filters to these parameters:

classification : sculpture
culture : greek
culture : roman

the search on the website returns 686 objects, so our function if done correctly should return about the same amount.

There's a paramater for imagepermissionlevel, so we want that at 0 so we have permission to display images on our site. We can't filter our request by this, so we'll have to bare this in mind when building OUR dataset.

imagePermissionLevel : 0

this api paginates results and limits results to 100 per page, so for now we'll just get 10 results but we'll need to iterate through all pages for full data set - make note of result amount. 

results: 711

*/

const axios = require('axios');
const fs = require('fs')

const apiKey = 'You need to obtain an API Key for the harvard museum API';

function getGRSObjects() {
    axios.get('https://api.harvardartmuseums.org/object', {
        params: {
            apikey: apiKey,
            q: 'classification:"Sculpture" AND (culture:"Greek" OR culture:"Roman")',
            size: 10
        }
    })
    .then(response => {
        console.log(response.data.info)
        const objects = response.data.records;
        fs.writeFileSync('grs-test-objects.json', JSON.stringify(objects, null, 2), 'utf-8');
    })
    .catch(error => {
        console.error('Error getting data:', error);
    });
}

getGRSObjects();

