<script setup>
//let a = [1, 2, 3]

// 1  2  6  24  120  720
// 1  2  3   4   5    6

// 1 1
// 2 2
// 3 6
// 4 24
// 5 120
// 6 720
// 1 2 3
// 1 3 2
// 2 1 3
// 2 3 1
// 3 1 2
// 3 2 1
// 1 2 3 4
// 1 2 4 3
// 1 3 2 4
// 1 3 4 2
// 1 4 3 2
// 1 4 2 3
//
// 5 5 5 5 5 5

let a = [1, 2, 3, 4, 5, 6]

function getNumbers(source, count, isPermutation = true) {
  //如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
  let currentList = source.map((item) => [item]);
  if (count === 1) {
    return currentList;
  }
  let result = [];
  //取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
  for (let i = 0; i < currentList.length; i++) {
    let current = currentList[i];
    //如果是排列的方式，在取count-1时，源数组中排除当前项
    let children = [];
    if (isPermutation) {
      children = getNumbers(source.filter(item => item !== current[0]), count - 1, isPermutation);
    }
    //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
    else {
      children = getNumbers(source.slice(i + 1), count - 1, isPermutation);
    }
    for (let child of children) {
      result.push([...current, ...child]);
    }
  }
  return result;
}


for (let i = 1; i <= a.length; i++) {
  console.log(getNumbers(a, i));
  console.log('\r\n');
}

</script>

<template>
  <div style="width:100%;height:100%">

  </div>
</template>

<style scoped>

</style>
