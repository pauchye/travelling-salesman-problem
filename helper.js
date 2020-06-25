const permutations = (array, memo = {}) => {
    let result = [];

    const perm = (arr, sub = []) => {
      if (arr.length === 0) {
        result.push(sub)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let current = arr.slice();//copy
          let next = current.splice(i, 1); // remove i from current
          perm(current.slice(), sub.concat(next))
       }
     }
   }
   perm(array)
   return result;
}
// let pointArr = [[1, 3], [10, 4], [12, 7], [1, 3]]
// let pointArr2 = [[1, 3], [10, 4]]
const distanceHelper = (array) => {
    dist = 0;
    for(let i = 0; i < array.length-1; i++) {
        let a 
        let b
        
        if(array[i][0] > array[i+1][0]) {
            a = array[i][0] - array[i+1][0];
        } else {
            a = array[i+1][0] - array[i][0];
        }

        if(array[i][1] > array[i+1][1]) {
            b = array[i][1] - array[i+1][1];
        } else {
            b = array[i+1][1] - array[i][1];
        }

        let c = Math.sqrt(a*a + b*b);
        dist += c;
    }
    return Math.floor(dist);
}

const swapLines = (path, ind1, ind2) => {
    let pathFirst = path[ind1];
    let pathSecond = path[ind2];
    let nextPath = path.slice();
    console.log(pathFirst, pathSecond)
    nextPath[ind2] = pathFirst;
    nextPath[ind1] = pathSecond;

    return nextPath;
}


const createMatrix = (points) => {
    let matrix = [];
    for(let i = 0; i < points.length; i++){
        matrix[i] = []
        for(let j = 0; j < points.length; j++){
            matrix[i][j] = distanceHelper([points[i], points[j]])
        }
    }
    return matrix;
}

const drawMatrix = (points) => {
    let matrix = [];
    for(let i = 0; i < points.length; i++){
        // matrix[i] = []
        for(let j = 0; j < points.length; j++){
            matrix.push([points[i], points[j]])
        }
    }
    return matrix;
}

function prims(pointsArray) {

    let adjMatrix = createMatrix(pointsArray);
    let length = pointsArray.length;
    let vertexes = [0];

    let mst = [];
    let edges = [];
    let visited = [];
    let minEdge = [null,null,Infinity];
    
    while (mst.length !== length-1) {

        vertexes.forEach((vertex) => {
            visited.push(vertex);
        })

        for (let i = 0; i < length; i++) {
            vertexes.forEach((vertex) => {
                if (adjMatrix[vertex][i] !== 0) { 
                 edges.push([vertex, i, adjMatrix[vertex][i]]); 
                }
            }) 
          }
  
      for (let j = 0; j < edges.length; j++) {
        if (edges[j][2] < minEdge[2] && visited.indexOf(edges[j][1]) === -1) { 
          minEdge = edges[j]; 
        }
      }
  
      edges.splice(edges.indexOf(minEdge), 1);
  
      mst.push(minEdge);
        
      vertexes.push(minEdge[1]);
      minEdge = [null,null,Infinity];
      
    }
    
    return mst.map(edge => { return [edge[0], edge[1]]});
    
  }

const createTreePoints = (mst, points) => {
    let newArray = [];
    mst.forEach((len, id) => {
      newArray.push([points[len[0]], points[len[1]]])     
    })
    console.log('mst', mst)
    console.log('newArray', newArray)
    return newArray;
}

const findOddVerts = (mst) => {
    let verts = [];
    let flatMst = []
    let helper = {};
    mst.forEach((subArr) => {
        flatMst.push(subArr[0]);
        flatMst.push(subArr[1]);
    })
    flatMst.forEach((num) => {
        if (!helper[num]) helper[num] = 0;
        helper[num] += 1;
    })
    Object.keys(helper).forEach((key) => {
        if(helper[key] % 2 !== 0){
            verts.push(key)
        }
    })
    return verts;
}
  
const  createMatchingPairs = (verts, points) => {
    let oddVerts = verts.slice();
    let matcingPairs = [];
    for(let i = 0; i < oddVerts.length; i++){
        if(oddVerts[i]){
            let pair = [oddVerts[i], []];
            let oldDist;
            let secondInd = i+1;
            for(let j = 0; j < oddVerts.length; j++){
                if(oddVerts[j]){
                    let dist = distanceHelper([points[parseInt(oddVerts[i])], points[parseInt(oddVerts[j])]]);
                    if(!oldDist || oldDist > dist) {
                        oldDist = dist;
                        pair[1] = oddVerts[j];
                        secondInd = j;
                    }   
                }
            }
            oddVerts[i] = null;
            oddVerts[secondInd] = null; 
            matcingPairs.push(pair)
        }
    }
    return matcingPairs;
}
