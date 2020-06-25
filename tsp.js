let data = [{
    "name": "Random",
    "value": 0,
},
{
    "name": "Permutations",
    "value": 0,
},
{
    "name": "Nearest Neighbor",
    "value": 0,
},
{
    "name": "Christofides–Serdyukov alg.",
    "value": 0,
}];


const drawBars = (data)=> {
    d3.selectAll(".bar").remove();
    d3.selectAll(".label").remove();

    const svgBar = d3.select("#graph").append("svg")
            .attr("width", 800)
            .attr("height", 300)
            .append("g")
            .attr("transform", "translate(" + 200 + "," + 15 + ")");


        let x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, 300]);
            
           

        let y = d3.scaleBand()
            .domain(data.map(function (d) {
                    return d.name;
                }))
                .rangeRound([0, 100])
                      .padding([0.1]);


        let yAxis = d3.axisLeft()
            .scale(y)
            .tickSize(0);


        let gy = svgBar.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        let bars = svgBar.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        console.log('it draws a bar')
        bars.append("rect")
            .attr("class", "bar")
            .style("fill", "url(#bg-gradient)")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });

        


    const defs = svgBar.append('defs');

    const bgGradient = defs
        .append('linearGradient')
        .attr('id', 'bg-gradient')
        // .attr('gradientTransform', 'rotate(90)');
    bgGradient
        .append('stop')
        .attr('stop-color', '#3d4e52')
        .attr('offset', '0%');
    bgGradient
        .append('stop')
        .attr('stop-color', '#aadae6')
        .attr('offset', '100%');
} 

drawBars(data)


const t = d3.transition()
.duration(2000)
.delay(2000)
.ease(d3.easeLinear);

const svgRoot = document.getElementById('svg')

const svg = d3.select(svgRoot);
let points = [];

// const svg = d3.select("body")
//       .append("svg")
//       .attr("width", 600)    
//       .attr("height", 600)
//       .attr("fill", 'green'); 
// let points = [[186, 106],[412, 49],[349, 181], [360, 258], [186, 106]];

const graphRoot = document.getElementById('graph')
const graph = d3.select(graphRoot)
//------ drawing circles------
const drawCircle = (x, y, size) => {
    console.log('Drawing circle at', x, y, size);
    svg.append("circle")
        .attr('class', 'click-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", size);
}

const drawHelperCircle = (x, y) => {
    svg.append("circle")
        .transition(t)
        .attr('class', 'helper-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 15);
}

svg.on('click', function() {
    var coords = d3.mouse(this);
    // console.log('this',this)
    // console.log(coords);
    drawCircle(coords[0], coords[1], 7);
    points.push(coords);
});


const generatePoints = (input) => {
    svg.selectAll('circle').remove();
    svg.selectAll('line').remove();
    points = [];
    for(i=0; i <= input; i++){
        let thisX = Math.floor(Math.random() * Math.floor(600));
        let thixY = Math.floor(Math.random() * Math.floor(570));
        drawCircle(thisX, thixY, 10);
        points.push([ thisX, thixY])
    }
}

//http://bl.ocks.org/milkbread/5902470

// const drawline = () => {
//     return d3.line()
//     .x(function(d) { return d.x; })
//     .y(function(d) { return d.y; })
//     .curve(d3.curveBasis);
// }
//------ drawing lines-----
const drawLines = (points) => {
    // debugger
    for(i=0; i < points.length - 1; i++){
        // debugger
        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .style("stroke", "black")
        .style("stroke-width", 3)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);


    }   
}


const drawHelperLines = (points) => {
    // debugger
    for(i=0; i < points.length - 1; i++){
        // debugger
        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .attr('class', 'path-helper')
        .style("stroke", "red")
        .style("stroke-opacity", .1) 
        .style("stroke-width", 4)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);
 
        // duration not working

    }   
}

const drawPermLines = (points) => {
    // debugger
    for(i=0; i < points.length - 1; i++){
        // debugger
        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .attr('class', 'path-helper')
        .style("stroke", "red")
        .style("stroke-opacity", .02) 
        .style("stroke-width", 4)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);
        
        // duration not working

    }   
}

const drawMatchLines = (points) => {
    // debugger
    for(i=0; i < points.length - 1; i++){
        // debugger
        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .attr('class', 'path-helper')
        .style("stroke", "blue")
        .style("stroke-opacity", .5) 
        .style("stroke-width", 8)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);
        
        // duration not working

    }   
}

// ------ appending path
const appendPath = (path) => {
    // debugger
    svg.append("path")
    .datum(points)
    .transition(t)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", drawLines(path))
      .delay(500)
	  .duration(2500);
}

const appendHelperPath = (path, permPoint) => {
    console.log('path', path)
    console.log('permPoint', permPoint)
    svg.append("path")
      .datum(permPoint)
      .attr('class', 'path-helper')
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-opacity", .2) 
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .transition(t)
      .attr("d", drawHelperLines(path));
      

}

const appendPermPath = (path, permPoint) => {
    console.log('path', path)
    console.log('permPoint', permPoint)
    svg.append("path")
      .datum(permPoint)
      .attr('class', 'path-helper')
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-opacity", .02) 
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", drawPermLines(path))
      .transition(t);

}

const appendMatchPath = (path) => {
    svg.append("path")
      .datum(path)
      .attr('class', 'path-helper')
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("stroke-opacity", .6) 
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", drawMatchLines(path))
      .transition(t);

}
// - permutations 
const permutationsPath = (points) => {
    let permutedPoints = permutations(points);
    let dist = {}
    // console.log('permutedPoints', permutedPoints)
    permutedPoints.forEach(permPoint => {  
        permPoint.push(permPoint[0]);
        // console.log('permPoint', permPoint)
        appendPermPath(permPoint, permPoint);
        permDist = distanceHelper(permPoint);
        dist[permDist] = permPoint;
        // console.log('permDist', permDist)
    }) 
    
    let goodKey = Object.keys(dist).map((key) => { return parseInt(key, 10)}).sort(function(a, b){return a - b})[0];
    // console.log('all keys sorted', Object.keys(dist).map((key) => { return parseInt(key, 10)}).sort(function(a, b){return a - b}))
    // console.log('good permDist', goodKey)
    let goodPoints = dist[goodKey];
    // setTimeout(appendPath(goodPoints), 5000);
    data[1]['value']= parseInt(goodKey);
    drawBars(data);
    appendPath(goodPoints);

}

// - nearest naighbor 

const nearestNeighborpath = (points) => {
    points.push(points[0])
    appendHelperPath(points, points);
    let progressPoints = points.slice();

    let newpoints = [points[0]];

    for(let i = 0; i < points.length-2; i++) {
        // console.log('points i', points[i])
        // console.log('progress points', progressPoints)
        let minDistCoord = progressPoints[i+1];
        let minDist = distanceHelper([progressPoints[i], progressPoints[i+1]]);
        let newIndex = i+1;
        for(let j = i+1; j < points.length-1; j++) {
            let curDist = distanceHelper([progressPoints[i], progressPoints[j]]);
            if (minDist > curDist) {
                // console.log('minDist', minDist)
                // console.log('curDist', curDist)
                minDist = curDist;
                minDistCoord = progressPoints[j];
                newIndex = j;
                // progressPoints = swapLines(progressPoints, i+1, j)
                
            }
            // progressPoints = swapLines(progressPoints, i+1, newIndex)
            //     console.log('progress points', progressPoints)
        }
        progressPoints = swapLines(progressPoints, i+1, newIndex)
        newpoints.push(minDistCoord);
    }
    newpoints.push(newpoints[0])
    // console.log('newpoints', newpoints)
    // console.log('points', points)
    let nndist = distanceHelper(newpoints);
    data[2]['value']= parseInt(nndist);
    drawBars(data);
    appendPath(newpoints)
}

// - Christofides–Serdyukov algorithm

const chrisSerd = (points) => {
    let helperPoints = drawMatrix(points)
    helperPoints.forEach((subHelper) => {
        appendHelperPath(subHelper, subHelper);   
       })
 
    console.log(points)
    let mst = prims(points);
    let treePoints = createTreePoints(mst, points);
    

    treePoints.forEach((subTree) => {
     appendPath(subTree);   
    })

    let oddVerts = findOddVerts(mst);
    oddVerts.forEach((vert) => {
        let point = points[vert]
        let thisX = point[0];
        let thixY = point[1];
        drawHelperCircle(thisX, thixY);
    })

    let matchingPairs = createMatchingPairs(oddVerts, points);
    // console.log('matchingPairs', matchingPairs)
    matchingPairs.forEach((pair) => {
        // console.log('pair', pair)
        let convertedPair = pair.map( (el) => { return points[parseInt(el)] } )
        // console.log('convertedPair', convertedPair)
        appendMatchPath(convertedPair)
    })
    
}


// d3.select('#random').on('click', appendPath(points));
d3.select('#random')
  .on('click', () => {
    console.log('random runs')
    svg.selectAll('line').remove();   
    points.push(points[0])
    appendPath(points)
    let dist = distanceHelper(points);
    data[0]['value']= dist;
    console.log('dist', dist)
    console.log('data', data)
    drawBars(data);
    let randText = document.getElementById("random-text");
    let randCode = document.getElementById("random-code");
    randText.classList.add("visible");
    randCode.classList.add("visible");
    let permText = document.getElementById("perm-text");
    let permCode = document.getElementById("perm-code");
    permText.classList.remove("visible");
    permCode.classList.remove("visible");
    let nnText = document.getElementById("nn-text");
    let nnCode = document.getElementById("nn-code");
    nnText.classList.remove("visible");
    nnCode.classList.remove("visible");
    let csText = document.getElementById("cs-text");
    let csCode = document.getElementById("cs-code");
    csText.classList.remove("visible");
    csCode.classList.remove("visible");
});

d3.select('#permutations')
  .on('click', () => {
    console.log('permutations run')
    console.log('length', points.length)   
    console.log('points', points)   
    if(points.length > 7){
        alert("Too many points for this slow algorithm. Sorry")
    } else {
        svg.selectAll('line').remove();
        permutationsPath(points)   
    }
    let randText = document.getElementById("random-text");
    let randCode = document.getElementById("random-code");
    randText.classList.remove("visible");
    randCode.classList.remove("visible");
    let permText = document.getElementById("perm-text");
    let permCode = document.getElementById("perm-code");
    permText.classList.add("visible");
    permCode.classList.add("visible");
    let nnText = document.getElementById("nn-text");
    let nnCode = document.getElementById("nn-code");
    nnText.classList.remove("visible");
    nnCode.classList.remove("visible");
    let csText = document.getElementById("cs-text");
    let csCode = document.getElementById("cs-code");
    csText.classList.remove("visible");
    csCode.classList.remove("visible");
});

d3.select('#nearestneighbor')
  .on('click', () => {
    console.log('nearestneighbor runs')
    svg.selectAll('line').remove();   
    nearestNeighborpath(points)
    let randText = document.getElementById("random-text");
    let randCode = document.getElementById("random-code");
    randText.classList.remove("visible");
    randCode.classList.remove("visible");
    let permText = document.getElementById("perm-text");
    let permCode = document.getElementById("perm-code");
    permText.classList.remove("visible");
    permCode.classList.remove("visible");
    let nnText = document.getElementById("nn-text");
    let nnCode = document.getElementById("nn-code");
    nnText.classList.add("visible");
    nnCode.classList.add("visible");
    let csText = document.getElementById("cs-text");
    let csCode = document.getElementById("cs-code");
    csText.classList.remove("visible");
    csCode.classList.remove("visible");
});

d3.select('#christofides–serdyukov')
  .on('click', () => {
    console.log('christofides–serdyukov runs')
    svg.selectAll('line').remove();   
    chrisSerd(points)
    let randText = document.getElementById("random-text");
    let randCode = document.getElementById("random-code");
    randText.classList.remove("visible");
    randCode.classList.remove("visible");
    let permText = document.getElementById("perm-text");
    let permCode = document.getElementById("perm-code");
    permText.classList.remove("visible");
    permCode.classList.remove("visible");
    let nnText = document.getElementById("nn-text");
    let nnCode = document.getElementById("nn-code");
    nnText.classList.remove("visible");
    nnCode.classList.remove("visible");
    let csText = document.getElementById("cs-text");
    let csCode = document.getElementById("cs-code");
    csText.classList.add("visible");
    csCode.classList.add("visible");

});


d3.select('#clear')
  .on('click', () => {
    console.log('it clears')
    svg.selectAll('circle').remove();
    svg.selectAll('line').remove();   
    points=[];
    data[0]['value']= 0;
    data[1]['value']= 0;
    data[2]['value']= 0;
    data[3]['value']= 0;
    console.log('data', data)
    drawBars(data);
    let randText = document.getElementById("random-text");
    let randCode = document.getElementById("random-code");
    randText.classList.remove("visible");
    randCode.classList.remove("visible");
    let permText = document.getElementById("perm-text");
    let permCode = document.getElementById("perm-code");
    permText.classList.remove("visible");
    permCode.classList.remove("visible");
    let nnText = document.getElementById("nn-text");
    let nnCode = document.getElementById("nn-code");
    nnText.classList.remove("visible");
    nnCode.classList.remove("visible");
    let csText = document.getElementById("cs-text");
    let csCode = document.getElementById("cs-code");
    csText.classList.remove("visible");
    csCode.classList.remove("visible");
});


d3.select("#range").on("input", () => {
    let rangeVal;
    rangeVal = document.getElementById("range").value;
    console.log(rangeVal);
    generatePoints(rangeVal);
});

