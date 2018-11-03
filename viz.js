const csvFilePath = './teams.csv';
const picasso = require('picasso.js'); 
const csv = require('csvtojson');

// csv to json 
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{ 
    let transformed = transform(jsonObj);   
    drawPieChart(transformed);
});
 
// convert to picasso data format
let transform = (data) => { 
  let dataArray = [];
  let transformedData = [];
  dataArray.push(['draws', 'games', 'goalsAgainst', 'goalsFor', 'losses', 'ranking', 'redCards', 'team', 'wins', 'yellowCards']); 
  
  for(let i = 0; i < data.length; i++) { 
    transformedData.push(data[i].draws);
    transformedData.push(data[i].games);
    transformedData.push(data[i].goalsAgainst);
    transformedData.push(data[i].goalsFor);
    transformedData.push(data[i].losses);
    transformedData.push(data[i].ranking);
    transformedData.push(data[i].redCards);
    transformedData.push(data[i].team);
    transformedData.push(data[i].wins);
    transformedData.push(data[i].yellowCards);
    dataArray.push(transformedData);
    transformedData = [];    
  }
  
  return dataArray;
};
 


// pie chart visualization
let drawPieChart = (Data) => {
  picasso.chart({
  element: document.querySelector('#pie'),
  data : [{
    type: "matrix",
    data: Data
  }],
  settings: {
    scales: {
      c: {
        data: { extract: { field: 'team' } }, type: 'color'
      }
    },
    components: [{
      type: 'legend-cat',
      scale: 'c'
    },{
      key: 'p',
      type: 'pie',
      data: {
        extract: {
          field: 'team',
          props: {
            num: { field: 'wins' }
          }
        }
      },
      settings: {
        slice: {
          arc: { ref: 'num' },
          fill: { scale: 'c' }
        }
      }
    }]
  }
})
    
  };
