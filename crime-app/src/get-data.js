import restClient, {SETTINGS, GET} from '../node_modules/es6-rest-client/dist/client.es6.js';

function getData () {

  const crimeSettings = {
                    baseURI: 'https://data.police.uk/api/crimes-street/all-crime',
                    params: {
                        lat: "51.5203883", 
                        lng: "-0.120268",
                        date: "2017-11"
                    }
                };
                
  restClient[SETTINGS](crimeSettings);

  return restClient[GET]();
};

export default getData; 

// GET 
// https://data.police.uk/api/crimes-street/all-crime