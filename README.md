# Museum Project - Data Collection

> ## Hosted site link: 
> ## https://bespoke-cheesecake-846a37.netlify.app/

> ## Main project repository (With all the information about the museum project you might need): 
> ## https://github.com/lgb94/museum-project-frontend

> ## Repository for the back-end architecture which used the data collected by these functions: 
> ## https://github.com/lgb94/museum-back-end

This repo contains a bunch of functions I had to write to collect and collate information about exhibits from the Metropolitan Museum of Art and Harvard Art Museums apis, in order to build my own database of objects with common information fields. I figured out the shared fields outside of this repo in a very hastily put together excalidraw which looked like charlie day from always sunny in philadelphias mailroom conspiracy board, so that's not included for your sake. This probably was unnecessary, but it was part of my project experience so I thought i'd get these uploaded as well.

Each function should contain an explanation of what each function does at the top of the page - either written at the time to help me process EXACTLY what i needed my function to do, or after the fact to explain to you, the prospective viewer (and hopefully, employer) what each function was written to do. 

The harvard-data-collection folder hosts all the functions for data requests i made for the harvard API, the met-data-collection is the same but for the met API. 

'combine-datasets.js' combined the data collected from both APIs into a unified-data-set.json which was then used to seed the database (linked above).

The loose unified-data-xxxxx.js files were made to run once data from both sets of functions had been collated to check certain fields, before my database had the ability to do so.

### To see these functions work will require two things:

1. Run an npm install to install axios - this was used to make requests for the apis.
2. You'll need an API key for the Harvard API (all instances where this is needed are labelled)
    - This is extremely easy to acquire from here: https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform

### These are the API's these functions access:

- Met API: https://metmuseum.github.io/
- Harvard API: https://github.com/harvardartmuseums/api-docs?tab=readme-ov-file

#### Nice one!
    