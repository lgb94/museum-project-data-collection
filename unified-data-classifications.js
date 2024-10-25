/* 
I've noticed after combining the datasets that im seeing some objects included that I dont want - a couple rings specifically and (there are probably more).
this function should serve to log every classification along with the amount of times they appear in the data so I can adjust the unification code accordingly.
*/

const unifiedDataset = require('./unified-data-set.json');

function listClassifications(dataset) {
    const classificationCount = {};

    dataset.forEach(item => {
        const classification = item.classification;
        if (classification) {
            classificationCount[classification] = (classificationCount[classification] || 0) + 1;
        }
    });

    console.log('Unique Classifications and Counts:');
    Object.entries(classificationCount).forEach(([classification, count]) => {
        console.log(`${classification}: ${count}`);
    });
}

listClassifications(unifiedDataset);
