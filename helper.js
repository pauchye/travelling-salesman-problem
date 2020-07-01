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
        let a; 
        let b;
        
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


// const createMatrix = (points) => {
//     let matrix = [];
//     for(let i = 0; i < points.length; i++){
//         matrix[i] = []
//         for(let j = 0; j < points.length; j++){
//             matrix[i][j] = distanceHelper([points[i], points[j]])
//         }
//     }
//     return matrix;
// }

const drawMatrix = (points) => {
    let matrix = [];
    for(let i = 0; i < points.length; i++){
        for(let j = 0; j < points.length; j++){
            matrix.push([points[i], points[j]])
        }
    }
    return matrix;
}

// function prims(pointsArray) {

//     let adjMatrix = createMatrix(pointsArray);
//     let length = pointsArray.length;
//     let vertexes = [0];

//     let mst = [];
//     let edges = [];
//     let visited = [];
//     let minEdge = [null,null,Infinity];
    
//     while (mst.length !== length-1) {

//         vertexes.forEach((vertex) => {
//             visited.push(vertex);
//         })

//         for (let i = 0; i < length; i++) {
//             vertexes.forEach((vertex) => {
//                 if (adjMatrix[vertex][i] !== 0) { 
//                  edges.push([vertex, i, adjMatrix[vertex][i]]); 
//                 }
//             }) 
//           }
  
//       for (let j = 0; j < edges.length; j++) {
//         if (edges[j][2] < minEdge[2] && visited.indexOf(edges[j][1]) === -1) { 
//           minEdge = edges[j]; 
//         }
//       }
  
//       edges.splice(edges.indexOf(minEdge), 1);
  
//       mst.push(minEdge);
        
//       vertexes.push(minEdge[1]);
//       minEdge = [null,null,Infinity];
      
//     }
    
//     return mst.map(edge => { return [edge[0], edge[1]]});
    
//   }

// const createTreePoints = (mst, points) => {
//     let newArray = [];
//     mst.forEach((len, id) => {
//       newArray.push([points[len[0]], points[len[1]]])     
//     })
//     console.log('mst', mst)
//     console.log('newArray', newArray)
//     return newArray;
// }

// const findOddVerts = (mst) => {
//     let verts = [];
//     let flatMst = []
//     let helper = {};
//     mst.forEach((subArr) => {
//         flatMst.push(subArr[0]);
//         flatMst.push(subArr[1]);
//     })
//     flatMst.forEach((num) => {
//         if (!helper[num]) helper[num] = 0;
//         helper[num] += 1;
//     })
//     Object.keys(helper).forEach((key) => {
//         if(helper[key] % 2 !== 0){
//             verts.push(key)
//         }
//     })
//     return verts;
// }
  
// const  createMatchingPairs = (verts, points) => {
//     let oddVerts = verts.slice();
//     let matcingPairs = [];
//     for(let i = 0; i < oddVerts.length; i++){
//         if(oddVerts[i]){
//             let pair = [oddVerts[i], []];
//             let oldDist;
//             let secondInd = i+1;
//             for(let j = 0; j < oddVerts.length; j++){
//                 if(oddVerts[j]){
//                     let dist = distanceHelper([points[parseInt(oddVerts[i])], points[parseInt(oddVerts[j])]]);
//                     if(!oldDist || oldDist > dist) {
//                         oldDist = dist;
//                         pair[1] = oddVerts[j];
//                         secondInd = j;
//                     }   
//                 }
//             }
//             oddVerts[i] = null;
//             oddVerts[secondInd] = null; 
//             matcingPairs.push(pair)
//         }
//     }
//     return matcingPairs;
// }


// const buildPath = (tree, points, matches) => {
    
//     let matchesInt = matches.map((pair) => {
//         return [parseInt(pair[0]), parseInt(pair[1])]
//     })

//     matchesInt.forEach((line) => {
//         tree.push(line)
//     })

//     let pointsObj = {};
//     points.forEach((point, i) => {
//         pointsObj[i] = [];
//     })

//     tree.forEach((line) => {
//         let first = line[0].toString();
//         let second = line[1].toString();
//         pointsObj[first].push(line);
//         pointsObj[second].push(line);
//     })

//     let treeStr = [];
//     let queue = [];

//     let first = tree[0];
//     queue.push(first[0])
//     queue.push(first[1])
//     treeStr.push(first.toString())
//     let x = 1;

//     while(treeStr.length < tree.length-1){
//         let num = queue[queue.length-x];
//         let array = pointsObj[num.toString()];
//         if(array.length === 0){
//             x +=1;
//         } else {
//             x = 1;
//             let pair = array.pop();
            
//             if(!treeStr.includes(pair.toString())){
//                treeStr.push(pair.toString()) 
//             }
//             if(num !== pair[0]) {
//                 queue.push(pair[0])
//             } else {
//                 queue.push(pair[1])
//             }
//         }
//     }

//     let newQueue = [queue[0]];
//     queue.forEach((num) => {
//         if(!newQueue.includes(num)){
//             newQueue.push(num)
//         }
//     })
//     newQueue.push(newQueue[0]);

//    return newQueue;
// }

function seq(from, to, step = 1) {
    const arr = [];
    for (let i = from; i < to; i += step) {
        arr.push(i);
    }
    return arr;
}

function makeItStartWithZero(indexes) {
    const zeroIndex = indexes.indexOf(0);
    return indexes.slice(zeroIndex).concat(indexes.slice(0, zeroIndex));
}

function generateIndexPerm(array) {
    switch (array.length) {
        case 1:
            return array;
        case 2:
            const [a, b] = array;
            return [[a, b], [b, a]];
        default:
            const result = [];
            array.forEach((x, i) => {
                const head = array.slice(0, i);
                const tail = array.slice(i + 1);
                generateIndexPerm(head.concat(tail)).map(p => [x].concat(p)).forEach(p => result.push(p));
            });
        return result;
    }
}

function uniqPathPermNaive(points) {
    const indexes = seq(0, points.length);

    const hash = {};
    console.time('generate');
    let indexPerm = generateIndexPerm(indexes);
    console.timeEnd('generate');
    console.time('filter');
    const uniqIndexPerm = indexPerm.filter(x => {
        const prev = hash[makeItStartWithZero(x).toString()];
        hash[x.toString()] = true;
        return !prev;
      }
    ).map(x => x.concat([0])).filter(x => {
        const prev = hash[x.slice().reverse().toString()];
        hash[x.toString()] = true;
        return !prev;
      }
    );
    console.timeEnd('filter');

    return uniqIndexPerm.map(indexes => indexes.map(i => points[i]));
}

function uniqPathPerm(points) {
    const indexes = seq(1, points.length);

    console.time('generate 2');
    let indexPerm = generateIndexPerm(indexes).map(x => [0].concat(x, [0]));
    console.timeEnd('generate 2');

    return indexPerm.map(indexes => indexes.map(i => points[i]));
}

function distance(p1, p2) {
    const x = p1[0] - p2[0];
    const y = p1[1] - p2[1];
    return Math.sqrt(x * x + y * y);
}

function distanceHelper2(coords) {
    return coords.reduce((dist, p1, idx, arr) => {
        const nextIdx = (idx + 1) % coords.length;
        const p2 = arr[nextIdx];
        return dist + distance(p1, p2);
    }, 0);
}

function shortestPathBruteforce(coords) {
    let shortestDist = Number.MAX_VALUE;
    let shortestPath = null;
    const all = uniqPathPerm(coords);
    all.forEach(path => {
        const dist = distanceHelper2(path)
        if (dist < shortestDist) {
            shortestDist = dist;
            shortestPath = path;
        }
    });

    console.log('shortestDist:', shortestDist, 'shortestPath:', shortestPath);

    return {
        shortestPath,
        shortestDist,
        all
    }
}

function generateMST(points) {
    const visIdx = [0];
    let unvisIdx = seq(1, points.length);
    const path = [];

    while(unvisIdx.length > 0) {
        let from = null;
        let to = null;
        let shortestDistance = Number.MAX_VALUE;
        for (let i = 0; i < visIdx.length; i++) {
            for (let j = 0; j < unvisIdx.length; j++) {
                const dist = distance(points[visIdx[i]], points[unvisIdx[j]])
                if (dist < shortestDistance) {
                    shortestDistance = dist;
                    from = i;
                    to = j;
                }
            }
        }

        path.push([visIdx[from], unvisIdx[to]]);
        visIdx.push(unvisIdx[to]);
        unvisIdx = unvisIdx.slice(0, to).concat(unvisIdx.slice(to + 1));
    }

    console.log('path:', path);

    const root = {
        idx: 0,
        children: []
    }

    const nodes = {0: root};
    path.forEach(([from, to]) => {
        const toNode = {
            idx: to,
            children: []
        }
        const fromNode = nodes[from];
        fromNode.children.push(toNode);
        nodes[to] = toNode;
    });

    return {
        path,
        root
    };
}

function pathToPoints(path, points) {
    return path.map(indexes => indexes.map(i => points[i]));
}

function depthFirstMSTWalk(root) {
    let walk = [root.idx];

    root.children.map(child => {
        walk = walk.concat(depthFirstMSTWalk(child), [root.idx]);
    });

    return walk;
}

function pruneDepthFirstWalk(walk) {
    const seen = {};
    const pruned = [];
    walk.forEach(x => {
        const visited = seen[x];
        seen[x] = true;
        if (!visited) {
            pruned.push(x);
        }
    })

    return pruned;
}

function findOddDegreeIndexes(root, isRoot = true) {
    let indices = [];
    if (root.children.length % 2 === (isRoot ? 1 : 0)) {
        indices.push(root.idx);
    }

    root.children.map(child => {
        indices = indices.concat(findOddDegreeIndexes(child, false));
    });

    return indices;
}

function findPerfectPairingIndexes(points, indexes, mstPath) {
    let pairings = [];

    while(indexes.length > 0) {
        let from = indexes[0];
        let to = null;
        let shortestDistance = Number.MAX_VALUE;
        for (let i = 1; i < indexes.length; i++) {
            const dist = distance(points[from], points[indexes[i]]);
            if (dist < shortestDistance && !mstPath.find(([f1, t1]) => f1 === from && t1 === indexes[i])) {
                shortestDistance = dist;
                to = i;
            }
        }

        pairings.push([from, indexes[to]]);
        indexes = indexes.slice(1, to).concat(indexes.slice(to + 1));
    }

    return pairings;
}

function MST2indices(root) {
    let indices = [root.idx];

    root.children.map(child => {
        indices = indices.concat(MST2indices(child));
    });

    return indices;
}
 