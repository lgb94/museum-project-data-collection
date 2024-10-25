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
