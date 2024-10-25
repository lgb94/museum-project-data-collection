/* 
This function serves the same purpose as the classifications check, but for cultures - I just want to check.

I'm also doing all these checks before loading them into my SQL database as i dont want to enter irrelevant data into the database which will be accessed by my frontend.
*/

const unifiedDataset = require('./unified-data-set.json');

function listCultures(dataset) {
    const cultureCount = {};

    dataset.forEach(item => {
        const culture = item.culture;
        if (culture) {
            cultureCount[culture] = (cultureCount[culture] || 0) + 1;
        }
    });

    console.log('Unique cultures and Counts:');
    Object.entries(cultureCount).forEach(([culture, count]) => {
        console.log(`${culture}: ${count}`);
    });
}

listCultures(unifiedDataset);
