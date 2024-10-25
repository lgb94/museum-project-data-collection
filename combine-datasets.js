/* THIS FUNCTION RELIES UPON ALREADY HAVING COLLECTED DATA USING HARVARD DATA COLLECTION AND MET DATA COLLECTION FUNCTIONS.

To combine our datasets, we need to first identify common keys amongst our datasets:

met - harvard

primary image: 
primaryImage - primaryimageurl

title:
title - title

culture:
culture - culture

period:
period - period

object begin date:
objectBeginDate - datebegin

object end date:
objectEndDate - dateend

medium:
medium - medium

object URL:
objectURL - url

we also want to add a key to tell us which dataset the object came from:

museum dataset:

met - harvard

There are a few additional considerations for objects to add to our dataset:

for the met, there are some entries without images - we need to omit objects where primaryImage = ""

for harvard there is an imagePermissionLevel key - we need to omit objects where imagePermissionLevel does NOT EQUAL 0

i'd also like to include a counter to see how many objects from each museum are added to my dataset.

*/

const fs = require('fs');

const harvardObjects = require('./harvard-data-collection/harvard-grs-objects.json');
const metObjects = require('./met-data-collection/met-grs-objects.json');

const excludedClassifications = ['Vases', 'Gems', 'Glass'];

function isExcludedClassification(classification) {
    return excludedClassifications.includes(classification);
}

function unifyDatasets(metObjects, harvardObjects) {
    let unifiedDataset = [];
    let metCount = 0; 
    let harvardCount = 0; 

    metObjects.forEach(item => {
        if (item.primaryImage !== "" && !isExcludedClassification(item.classification)) { 
            unifiedDataset.push({
                title: item.title,
                culture: item.culture,
                period: item.period,
                objectBeginDate: item.objectBeginDate,
                objectEndDate: item.objectEndDate,
                medium: item.medium,
                classification: item.classification, 
                primaryImage: item.primaryImage,
                objectURL: item.objectURL,
                museumDataset: 'met' 
            });
            metCount++;
        }
    });

    harvardObjects.forEach(item => {
        if (item.imagepermissionlevel === 0 && !isExcludedClassification(item.classification)) { 
            unifiedDataset.push({
                title: item.title,
                culture: item.culture,
                period: item.period,
                objectBeginDate: item.datebegin,
                objectEndDate: item.dateend,
                medium: item.medium,
                classification: item.classification,  
                primaryImage: item.primaryimageurl,
                objectURL: item.url,
                museumDataset: 'harvard' 
            });
            harvardCount++; 
        }
    });

    fs.writeFileSync('unified-data-set.json', JSON.stringify(unifiedDataset, null, 2), 'utf-8');
    
    console.log(`Unified dataset with ${unifiedDataset.length} objects saved to 'unified-data-set.json'`);
    console.log(`Counts: Met Museum - ${metCount}, Harvard Art Museums - ${harvardCount}`);
}

unifyDatasets(metObjects, harvardObjects);
