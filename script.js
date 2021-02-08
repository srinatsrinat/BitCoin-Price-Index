var headerBlock = document.createElement('marquee')
var a = Date()
headerBlock.innerHTML = a + ' &nbsp&nbsp&nbspInfo: Bitcoin prices are expected to hit $62000 by July 2021'
document.body.append(headerBlock)



var topBlock = document.createElement('div')
topBlock.name = 'Head'
topBlock.id ="topBlock"
topBlock.classList.add('topBlock','container-fluid')
document.body.append(topBlock)

var choose = document.createElement('div')
choose.innerHTML="Choose currency to see current equivalent Bitcoin price"
choose.setAttribute('style','position:relative;top:201px;left:155px;font-style:italic;width:50%')

var welcome = document.createElement('div')
welcome.innerHTML="<b>BITCOIN PRICE INDEX<b>"
welcome.setAttribute('style','text-align:center;font-size:35;')

var topLine = document.createElement('hr')
topLine.classList.add('hrTop')
welcome.append(topLine)

var val=''

var dropDown = document.createElement('select')
dropDown.id = 'dropDown'
dropDown.value = "Default"
dropDown.classList.add('dropDown')
dropDown.setAttribute('onchange','bitcoin(this), val = this.value')

//console.log(val)

var opt = document.createElement('option')
   opt.innerHTML= 'Choose'
    opt.value = 'Default'
    dropDown.append(opt)

var currency = 'https://restcountries.eu/rest/v2/all'

fetch(currency)
.then(resp=>resp.json())
.then(result=>{

result.map((element)=>{

    var opt = document.createElement('option')
    var CCname =  element.currencies[0]["code"] + ", " + element.name 
    opt.innerHTML= CCname
    opt.value= element.currencies[0]["code"]
    
    dropDown.append(opt)
})
})
.catch(error=>console.log(error))

topBlock.append(choose, welcome, dropDown)

var midBlock = document.createElement('div')
midBlock.name = 'Middle'
midBlock.id ="midBlock"
midBlock.classList.add('midBlock','container-fluid')
document.body.append(midBlock)

var rateDis = document.createElement('div')
    rateDis.id = 'rateDis'
    rateDis.innerHTML = 'Your data will appear here.'
    rateDis.setAttribute('style','font-size:45;')
    rateDis.classList.add('rateDisBlock')
    midBlock.append(rateDis)


var curData = 'https://api.coindesk.com/v1/bpi/currentprice/'



function bitcoin(ele){


//console.log(ele.value)

fetch(curData + ele.value)
.then(resp=>resp.json())
.then(result=>{

    while(rateDis.firstChild)
    rateDis.removeChild(rateDis.firstChild)

    console.log(result)

    var rate = result["bpi"][ele.value]["rate"]
    var curName = result["bpi"][ele.value]["description"]
    console.log(rate)
    
    var displayRate= document.createElement('div')
    displayRate.classList.add('row')
    displayRate.setAttribute = ('style','width:75%;')
    displayRate.innerHTML= `1 Bitcoin =  ${rate} ${curName}`
    rateDis.append(displayRate)

    var mesRow = document.createElement('div')
    mesRow.classList.add('row')
    mesRow.setAttribute('style','position:relative;top:30px;text-align:center;font-size:25')
    mesRow.innerHTML = "Enter Bitcoin or Currency to convert"
    rateDis.append(mesRow)

    var inputRow = document.createElement('div')
    inputRow.classList.add('row')
    inputRow.setAttribute('style','position:relative;top:30px;text-align:center;font-size:25;width:75%')

    var inputBox1 = document.createElement('div')
    inputBox1.classList.add('col-4')
    inputBox1.innerHTML="Bitcoin(s)"
    inputRow.append(inputBox1)

    var BoxBit = document.createElement('input')
    BoxBit.type ='text'
    BoxBit.id='bit'
    BoxBit.setAttribute('onkeyup','calculate(this)')
    inputBox1.append(BoxBit)

    var inputBox2 = document.createElement('div')
    inputBox2.classList.add('col-4')
    inputBox2.setAttribute('style','text-align:center;left:4%;')
    inputBox2.innerHTML="<= to =>"
    inputRow.append(inputBox2)
    

    var inputBox3 = document.createElement('div')
    inputBox3.classList.add('col-4')
    inputBox3.innerHTML= `${curName}(s)`
    inputRow.append(inputBox3)

    var BoxCur = document.createElement('input')
    BoxCur.type ='text'
    BoxCur.id='cur'
    BoxCur.setAttribute('onkeyup','calculate(this)')
    inputBox3.append(BoxCur)

    rateDis.append(inputRow)


    
})
.catch(error=>{console.log(error)   
            rateDis.innerHTML="Sorry, nothing to show."})


        
}



function calculate(num){

fetch(curData + val)
.then(resp=>resp.json())
.then(result=>{

    if(num.id=='bit')
    {       
        var sum = num.value * result["bpi"][val]["rate_float"]
        document.getElementById('cur').value = sum
    }
    else if(num.id=='cur')
    {
        var sum1 = (num.value/result["bpi"][val]["rate_float"])
        document.getElementById('bit').value = sum1
    }

})}


var bottomBlock = document.createElement('div')
bottomBlock.name = 'bottom'
bottomBlock.id ="bottomBlock"
bottomBlock.classList.add('bottomBlock','container-fluid')
document.body.append(bottomBlock)



var hisText = document.createElement('div')
hisText.classList.add('row')
hisText.setAttribute('style','text-align: center;position:relative; top:29px;left:36%; width:50%;')
hisText.innerHTML = 'Set date to view historical data'
bottomBlock.append(hisText)

var dateRow = document.createElement('div')
    dateRow.classList.add('row')
    dateRow.setAttribute('style','position:relative;top:120px;text-align:center;font-size:25;width:75%;left:12%')

    var fromDate = document.createElement('div')
    fromDate.classList.add('col-6')
    fromDate.innerHTML='From <br>'
    dateRow.append(fromDate)

    var fromBox = document.createElement('input')
    fromBox.type ='date'
    fromBox.id='fromdate'
    fromBox.value = "yyyy-mm-dd"
    fromDate.append(fromBox)

    var toDate = document.createElement('div')
    toDate.classList.add('col-6')
    toDate.innerHTML= 'To <br>'
    dateRow.append(toDate)

    var toBox = document.createElement('input')
    toBox.type ='date'
    toBox.id='todate'
    toBox.value = "yyyy-mm-dd"
    toDate.append(toBox)

    bottomBlock.append(dateRow)

    var submitDate = document.createElement('button')
    submitDate.type = 'button'
    submitDate.innerHTML = 'Submit'
    submitDate.setAttribute('onclick','chart()')
    submitDate.setAttribute('style','position:relative;width:110px;left:46%;border-radius:10px;border:1px solid black;top:40px;')
    
    dateRow.append(submitDate)

    var histData = 'https://api.coindesk.com/v1/bpi/historical/close.json?'

  
    var a = ''
    var b = ''

    var holdChart = document.createElement('figure')
        bottomBlock.append(holdChart)
        holdChart.classList.add('highcharts-figure,row')
        
        holdChart.setAttribute('style','position:relative;top:200px;')

        var chart1 = document.createElement('div')
        chart1.classList.add('container')
        chart1.id = 'container'
        
        chart1.innerHTML = "Your chart will appear here."
        holdChart.append(chart1)


    function chart(){
        while(chart1.firstChild)
        chart1.removeChild(chart1.firstChild)

        a = document.getElementById('fromdate').value
        b = document.getElementById('todate').value

        //console.log(a,b)

        var c = parseInt(a.split('-').join(''))
        var d = parseInt(b.split('-').join(''))

       //console.log(c,d)

        if(d<c)
        {
            chart1.innerHTML = "Enter correct date."
            
        }
 
        
        
    Highcharts.getJSON(histData + 'start=' + a + '&end=' + b,
        function (see) {
           

            //console.log(see)

            var mainData = see['bpi']
            //console.log(mainData)
    
           

           var data = Object.keys(mainData).map(function (key) { 
               
            return [key, mainData[key]]
        })

    


        var holdDate = []

            //console.log(data)

            for(i=0;i<data.length;i++)
            {
                holdDate.push(data[i][0])

            }

            //console.log(holdDate)

 
                
            

         Highcharts.chart('container', {
            optimize: {
                range: 230000,
                autoExtremes: false,
                enableTooltip: true
             },
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Bitcoin Historical Data'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in and scroll along date axis' : 'Pinch the chart to zoom in and scroll along date axis'
                },
                xAxis: {
                    title:{
                    text: 'Date'},
                    categories : holdDate,
                    
                },
                yAxis: {
                    title: {
                        text: 'Bitcoin rate in USD'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
    
                series: [{
                    type: 'area',
                    name: 'Bitcoin Price in USD',
                    data: data,
                    turboThreshold: 0
                }]
            })
         
        
        }
    )
 
    }

    



var disclaimerBlock = document.createElement('footer')
disclaimerBlock.innerHTML = '*All realtime data. Powered by CoinDesk'
document.body.append(disclaimerBlock) 