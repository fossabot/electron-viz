const csvFilePath = './teams.csv';
const picasso = require('picasso.js'); 
const csv = require('csvtojson');

let Data;
// csv to json 
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{ 
    let transformed = transform(jsonObj); 
    Data = transformed;  
    drawPieChart(transformed);
    drawDonutChart(transformed); 

});
 
// convert to picasso data format
let transform = (data) => { 
  let dataArray = [];
  let transformedData = [];
  
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
  dataArray.unshift(['draws', 'games', 'goalsAgainst', 'goalsFor', 'losses', 'ranking', 'redCards', 'team', 'wins', 'yellowCards']); 
  
  
  return dataArray;
};


let win = document.querySelector("#win");
win.addEventListener('click', () => {
  drawPieChart(Data, "wins");  
});
 
let lose = document.querySelector("#lose");
lose.addEventListener('click', () => {
  drawPieChart(Data, "losses");  
});

// pie chart for wins
let drawPieChart = (Data, field = "wins") => {
  picasso.chart({
    element: document.querySelector('#pie'),
    data: [{
      type: "matrix",
      data: Data
    }],
    settings: {
      scales: {
        c: {
          data: {
            extract: {
              field: 'team'
            }
          },
          type: 'color'
        }
      },
      components: [{
        type: 'legend-cat',
        scale: 'c'
      }, {
        key: 'p',
        type: 'pie',
        data: {
          extract: {
            field: 'team',
            props: {
              num: {
                field: field
              }
            }
          }
        },
        settings: {
          slice: {
            arc: {
              ref: 'num'
            },
            fill: {
              scale: 'c'
            }
          }
        }
      }]
    },
    created: () => console.log("I've been created"),
    beforeRender: () => console.log("Before Render"),
    beforeMount: () => console.log("Before Mount"),
    mounted:() => console.log("Mounted")

  });

};



let drawDonutChart = (Data) => {
  picasso.chart({
    element: document.querySelector('#donut'),
    data: [{
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
      }, {
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
          padAngle: 0.01,
          slice: {
            cornerRadius: 2,
            innerRadius: 0.2,
            arc: { ref: 'num' },
            fill: { scale: 'c' } 
          }
        }
      }]
    }
  });
};


let drawScatter = (Data) => {
  picasso.chart({
    element: document.querySelector('#scatter'),
    data: [{
      type: "matrix",
      data: Data
    }],
    settings: {
      scales: {
        s: {
          data: {
            field: 'yellowCards'
          },
          expand: 0.2,
          invert: true
        },
        m: {
          data: {
            field: 'team'
          },
          expand: 0.1
        },
        col: {
          data: { extract: { field: 'team' } },
          type: 'color'
        }
      },
      components: [{
        key: 'y-axis',
        type: 'axis',
        scale: 's',
        dock: 'left'
      }, {
        type: 'legend-cat',
        dock: 'right',
        scale: 'col'
      }, {
        key: 'x-axis',
        type: 'axis',
        scale: 'm',
        dock: 'bottom'
      }, {
        key: 'p',
        type: 'point',
        data: {
          extract: {
            field: 'yellowCards',
            props: {
              y: { field: 'yellowCards' },
              x: { field: 'team' },
              group: { field: 'yellowCards' }
            }
          }
        },
        settings: {
          x: { scale: 'm' },
          y: { scale: 's' },
          shape: 'circle',
          size: () => Math.random(),
          strokeWidth: 2,
          stroke: '#fff',
          opacity: 0.8,
          fill: { scale: 'col', ref: 'group' }
        }
      }]
    }
  });
};