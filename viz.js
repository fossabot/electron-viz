const csvFilePath = './players.csv';
const picasso = require('picasso.js'); 
const csv = require('csvtojson');

var a = new Array();

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  transform(jsonObj);
    let ans = transform(jsonObj);     
    drawPieChart(ans);
});
 

let transform = (data) => { 
  let dataArray = [];
  let transformedData = [];
  for(let i = 0; i < data.length; i++) {
    if(i === 20) break;
    transformedData.push(data[i].surname);
    transformedData.push(data[i].team);
    transformedData.push(data[i].position);
    transformedData.push(data[i].minutes);
    transformedData.push(data[i].shots);
    transformedData.push(data[i].passes);
    transformedData.push(data[i].tackles);
    transformedData.push(data[i].saves);
    dataArray.push(transformedData);
    transformedData = [];    
  }

  dataArray.unshift(['surname', 'team', 'position', 'minutes', 'shots', 'passes', 'tackles', 'saves']); 
  console.log(dataArray);
  return dataArray;
};


// visualization
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
        data: { extract: { field: 'surname' } }, type: 'color'
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
          field: 'surname',
          props: {
            num: { field: 'minutes' }
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
