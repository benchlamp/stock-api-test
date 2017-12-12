$(document).ready(function() {
    
    //Y0J7OXEQ2QLJPWUE
    
    //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=Y0J7OXEQ2QLJPWUE
    

 

    
    
    $("#submit").click(function() {
        console.log("click event")
        if ($("#input").val() !== "") {
            $.ajax({
                type: "GET",
                url: "https://www.alphavantage.co/query?",
                data: {
                   "function": "TIME_SERIES_INTRADAY",
                   "symbol": $("#input").val(),
                   "interval": "60min",
                   "apikey": "Y0J7OXEQ2QLJPWUE"
                },
                success: function(data) {
                    processResults(data);
                },
                error: function() {
                    console.log("whoops");
                }
            }) 
        }
    })
    
    /* DEV CALL */
    $.ajax({
    type: "GET",
    url: "https://www.alphavantage.co/query?",
    data: {
       "function": "TIME_SERIES_INTRADAY",
       "symbol": "GOOG",
       "interval": "60min",
       "apikey": "Y0J7OXEQ2QLJPWUE"
    },
    success: function(data) {
        processResults(data);
    },
    error: function() {
        console.log("whoops");
    }
}) 
    
    /* */
    
    function processResults(data) {
            renderChart(data);
           $("#results").html("");
            var keys = Object.keys(data)

            $("#results").append(data[keys[0]]["2. Symbol"] + "<br />");
            
            for (var props in data[keys[1]]) {
                $("#results").append(props + " : " + data[keys[1]][props]["2. high"] + "<br />");
            } 
    }
    
    
    
    function renderChart(data) {
        
        
        
        console.log(data)
        
        var keys = Object.keys(data);
        
        console.log("keys = ", keys)
        
        console.log( data[keys[1]]);
        
        var stockData = [];
        var dates = [];
        var values = [];
        for (var prop in data[keys[1]]) {
            stockData.push({
                date: prop, 
                value: data[keys[1]][prop]["2. high"]
            });
            dates.push(prop);
            values.push(Number(data[keys[1]][prop]["2. high"]));
        }
        
        //console.log(stockData);
        
        
 var title = {
               text: 'Stock Values'   
            };
            var subtitle = {
               text: ''
            };
            var xAxis = {
               categories: dates
            };
            var yAxis = {
               title: {
                  text: 'Value'
               },
               plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
               }]
            };   
            var tooltip = {
               valueSuffix: '\xB0C'
            }
            var legend = {
               layout: 'vertical',
               align: 'right',
               verticalAlign: 'middle',
               borderWidth: 0
            };
            var series =  [{
                  name: 'GOOG',
                  data: values
               }
            ];

            var json = {};
            json.title = title;
            json.subtitle = subtitle;
            json.xAxis = xAxis;
            json.yAxis = yAxis;
            json.tooltip = tooltip;
            json.legend = legend;
            json.series = series;
            
            $('#chart').highcharts(json);
    };

    
})

