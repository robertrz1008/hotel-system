
const  pser = [
    [1, "jose", 40, "saul"],
    [2, "jott", 41, "dal"],
    [3, "jase", 44, "dddl"],
]

function orderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])
      iArr.push(i[2])
      iArr.push(i[1])

      iArr.push(newArr)
    }
    return iArr
}

console.log(orderArray(pser))