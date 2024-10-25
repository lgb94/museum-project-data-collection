/* 
This function was made much later than the others in this repo, in fact i had to create this halfway through the backend to find an errant object that was refusing to be entered into my database.

There was one object with an absurdly long entry for the medium field that didnt want to go in using my seed function, so this function was made to sniff it out and log it.

*/

const unifiedDataset = require('./unified-data-set.json');

function listLongMediums(dataset) {
    const longMediums = [];

    dataset.forEach(item => {
        const medium = item.medium;
        if (medium && medium.length > 100) {
            longMediums.push({
                title: item.title,
                culture: item.culture,
                period: item.period,
                medium: medium,
                length: medium.length,
                museumDataset: item.museumDataset
            });
        }
    });

    console.log('Objects with medium longer than 100 characters:');
    longMediums.forEach(item => {
        console.log(`Title: ${item.title}, Medium Length: ${item.length}, Medium: ${item.medium}, Museum Dataset: ${item.museumDataset}`);
    });

    return longMediums; 
}

listLongMediums(unifiedDataset);
