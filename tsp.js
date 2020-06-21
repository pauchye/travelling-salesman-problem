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

svg.on('click', function() {
    var coords = d3.mouse(this);
    console.log('this',this)
    console.log(coords);
    drawCircle(coords[0], coords[1], 10);
    points.push(coords);
});
//----not working--------
// svg.on('click', () => {
//     debugger
//     const coords = d3.mouse(this);
//     console.log(coords);
//     drawCircle(coords[0], coords[1], 10);
//     points.push(coords);
//     console.log(points)
// });

const generatePoints = (input) => {
    svg.selectAll('circle').remove();
    svg.selectAll('line').remove();

    points = [];
    for(i=0; i <= input; i++){
        let thisX = Math.floor(Math.random() * Math.floor(600));
        let thixY = Math.floor(Math.random() * Math.floor(600));
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
        .attr("x2", endX)
        .attr("y2", endY)
        .transition()
        .duration(10000)
        .ease(d3.easeLinear);

        // svg.append("line")
        // .attr("x1", startX)
        // .attr("y1", startY)
        // .attr("x2", endX)
        // .attr("y2", endY);  
    }   
}

// x = d3.scaleLinear()
//     .domain(d3.extent(data, d => d.x)).nice()
//     .range([margin.left, width - margin.right])



// let line = d3.line()
//     .curve(d3.curveCatmullRom)
//     .x(d => x(d.x))
//     .y(d => y(d.y))

const appendPath = (path) => {
    // debugger
    // svg.append('path')
    // .datum(points)
    // .attr('d', drawLines(path))
    // .attr('fill', 'non')
    // .attr('stroke', 'black')
    // .transition()
    //   .duration(10000)
    //   .ease(d3.easeLinear)
    // //   .attr("stroke-dasharray", `${l},${l}`);
    svg.append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", drawLines(path))
    .transition()
      .duration(5000)
      .ease(d3.easeLinear)




}


// d3.select('#run').on('click', appendPath(points));
d3.select('#run')
  .on('click', () => {
    console.log('it runs')
    appendPath(points)
    // d3.select(this)
    //   .style('fill', 'orange');
  });

d3.select('#clear')
  .on('click', () => {
    console.log('it clears')
    svg.selectAll('circle').remove();
    svg.selectAll('line').remove();   
    points=[];
});

// const clearPoints = () => {
//     points = [];

// }



d3.select("#range").on("input", () => {
    let rangeVal;
    rangeVal = document.getElementById("range").value;
    console.log(rangeVal);
    generatePoints(rangeVal);
});

// drawLines(points)

