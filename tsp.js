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
    "name": "MST-DFS",
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
.duration(600)
.delay(600)
.ease(d3.easeLinear);

const svgRoot = document.getElementById('svg')

const svg = d3.select(svgRoot);
let points = [];

const graphRoot = document.getElementById('graph')
const graph = d3.select(graphRoot)

const drawCircle = (x, y, size, num) => {
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

function addPoint(coords) {
    drawCircle(coords[0], coords[1], 7, points.length);
    points.push(coords);
}

svg.on('click', function() {
    let coords = d3.mouse(this);
    addPoint(coords);

    svg.append('text')
    .attr('x', coords[0] + 6)
    .attr('y', coords[1] + 6 )
    .text(`${points.length}`)
});


const generatePoints = (input) => {
    svg.selectAll('circle').remove();
    svg.selectAll('line').remove();
    points = [];
    for(i=0; i <= input; i++){
        let thisX = Math.floor(Math.random() * Math.floor(600));
        let thixY = Math.floor(Math.random() * Math.floor(570));
        drawCircle(thisX, thixY, 7);
        points.push([ thisX, thixY])
    }
}

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
    for(i=0; i < points.length - 1; i++){
        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .attr('class', 'path-helper')
        .style("stroke", "red")
        .style("stroke-opacity", .03) 
        .style("stroke-width", 4)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);

    }   
}

const drawMatchLines = (points) => {

    for(i=0; i < points.length - 1; i++){

        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .attr('class', 'path-helper')
        .style("stroke", "blue")
        .style("stroke-opacity", .7) 
        .style("stroke-width", 12)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);
        

    }   
}

const drawPurpleLines = (points) => {
    for(i=0; i < points.length - 1; i++){
        let startX = points[i][0]
        let startY = points[i][1]
        let endX = points[i+1][0]
        let endY = points[i+1][1]

        svg.append('line')
        .style("stroke", "purple")
        .style("stroke-opacity", .6) 
        .style("stroke-width", 6)
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX)
        .attr("y2", startY)
        .transition(t)
        .attr("x2", endX)
        .attr("y2", endY);


    }   
}

const appendPath = (path) => {

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

    svg.append("path")
      .datum(permPoint)
      .attr('class', 'path-helper')
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-opacity", .03) 
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

const appendPurplePath = (path) => {

    svg.append("path")
    .datum(path)
    .transition(t)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", drawPurpleLines(path))
      .delay(500)
	  .duration(2500);
}

const permutationsPath = (points) => {
    let permutedPoints = permutations(points);
    let dist = {}

    permutedPoints.forEach(permPoint => {  
        permPoint.push(permPoint[0]);
        appendPermPath(permPoint, permPoint);
        permDist = distanceHelper(permPoint);
        dist[permDist] = permPoint;
    }) 
    
    let goodKey = Object.keys(dist).map((key) => { return parseInt(key, 10)}).sort(function(a, b){return a - b})[0];
    let goodPoints = dist[goodKey];
    data[1]['value']= parseInt(goodKey);
    drawBars(data);
    appendPath(goodPoints);
}


const nearestNeighborpath = (points) => {
    let circlePoints = points.slice();
    circlePoints.push(points[0])
    appendHelperPath(circlePoints, circlePoints);
    let progressPoints = circlePoints.slice();

    let newpoints = [circlePoints[0]];

    for(let i = 0; i < circlePoints.length-2; i++) {

        let minDistCoord = progressPoints[i+1];
        let minDist = distanceHelper([progressPoints[i], progressPoints[i+1]]);
        let newIndex = i+1;
        for(let j = i+1; j < circlePoints.length-1; j++) {
            let curDist = distanceHelper([progressPoints[i], progressPoints[j]]);
            if (minDist > curDist) {

                minDist = curDist;
                minDistCoord = progressPoints[j];
                newIndex = j;
            }
        }
        progressPoints = swapLines(progressPoints, i+1, newIndex)
        newpoints.push(minDistCoord);
    }
    newpoints.push(newpoints[0])
    let nndist = distanceHelper(newpoints);
    data[2]['value']= parseInt(nndist);
    drawBars(data);
    appendPath(newpoints)
}

function MSTnDFS(points) {
    const helperPoints = drawMatrix(points)
    helperPoints.forEach((subHelper) => {
        appendHelperPath(subHelper, subHelper);
    })

    const {path, root} = generateMST(points);
    const walkIndexes = depthFirstMSTWalk(root);
    const prunedIndexes = pruneDepthFirstWalk(walkIndexes);
    const fullWalk = prunedIndexes.concat([0]);
    pathToPoints(path, points).forEach(pair => setTimeout(() => {appendPurplePath(pair)}, 600));

    for (let i = 1; i < fullWalk.length; i++) {
        setTimeout(() => {appendPath([points[fullWalk[i-1]], points[fullWalk[i]] ])}, 1200)
        
    }

    let convertedSub = fullWalk.map( (el) => { return points[parseInt(el)] } )

    let mstdist = distanceHelper(convertedSub);
    data[3]['value']= parseInt(mstdist);
    drawBars(data);
}

const chrisSerd = (points) => {

    MSTnDFS(points);

    // const {path, root} = generateMST(points);
    // const oddDegreeIndexes = findOddDegreeIndexes(root);

    // console.log('oddDegreeIndexes:', oddDegreeIndexes);
    // const pairings = findPerfectPairingIndexes(points, oddDegreeIndexes, path);
    // console.log('pairings:', pairings);
    // const fullPath = path.concat(pairings);
    // console.log('fullPath:', fullPath);
    // pathToPoints(fullPath, points).forEach(pair => appendPath(pair));
//--------
    // let helperPoints = drawMatrix(points)
    // helperPoints.forEach((subHelper) => {
    //     appendHelperPath(subHelper, subHelper);
    //    })
    //
    // let mst = prims(points);
    // let treePoints = createTreePoints(mst, points);
    //
    //
    // treePoints.forEach((subTree) => {
    //     appendPurplePath(subTree);
    // })
    //
    // let oddVerts = findOddVerts(mst);
    // oddVerts.forEach((vert) => {
    //     let point = points[vert]
    //     let thisX = point[0];
    //     let thixY = point[1];
    //     drawHelperCircle(thisX, thixY);
    // })
    //
    // let matchingPairs = createMatchingPairs(oddVerts, points);
    //
    // matchingPairs.forEach((pair) => {
    //
    //     let convertedPair = pair.map( (el) => { return points[parseInt(el)] } )
    //     appendMatchPath(convertedPair)
    // })
    // let pointsTrial = buildPath(mst, points, matchingPairs);
    // let convertedSub = pointsTrial.map( (el) => { return points[parseInt(el)] } )
    // appendPath(convertedSub);
    //
    // let mstdist = distanceHelper(convertedSub);
    // data[3]['value']= parseInt(mstdist);
    // drawBars(data);
}

d3.select('#random')
  .on('click', () => {
    svg.selectAll('line').remove();  
    let newpoints = points.slice();
    newpoints.push(points[0])
    appendPath(newpoints)
    let dist = distanceHelper(newpoints);
    data[0]['value']= dist;
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
    svg.selectAll('line').remove();  
    if(points.length > 10){
        alert("Too many points for this slow algorithm. Sorry")
    } else if(points.length < 7){
        const solution = shortestPathBruteforce(points);
        solution.all.forEach(path => setTimeout(() => {appendPermPath(path)}, 300) )
        setTimeout(() => {
            appendPath(solution.shortestPath);
            let dist = distanceHelper(solution.shortestPath);
            data[1]['value']= dist;
            drawBars(data);
        }, 800);
    }else{
        const solution = shortestPathBruteforce(points);
            appendPath(solution.shortestPath);
            let dist = distanceHelper(solution.shortestPath);
            data[1]['value']= dist;
            drawBars(data);        
    };
   
    

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

d3.select('#mstdfs')
  .on('click', () => {
    svg.selectAll('line').remove();   
    MSTnDFS(points);
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
    svg.selectAll('circle').remove();
    svg.selectAll('text').remove();
    svg.selectAll('line').remove();   
    points=[];
    data[0]['value']= 0;
    data[1]['value']= 0;
    data[2]['value']= 0;
    data[3]['value']= 0;
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
    svg.selectAll('text').remove();
    let rangeVal;
    rangeVal = document.getElementById("range").value;
    generatePoints(rangeVal);
});

