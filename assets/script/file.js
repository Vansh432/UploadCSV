
const tr = document.querySelectorAll('.detailsRow');//select all details rows-->
const tbody = document.querySelectorAll('tbody');// select all body of table-->

let rowsOfTr = [];//push rows in array
tr.forEach((element) => {
  rowsOfTr.push(element);
})

let rowsStore = rowsOfTr;//store the rows;
//search row in table--->
const search = document.getElementById("search");//select search input field-->

//add event listener when key is pressed up-->
search.addEventListener("keyup", () => {
  getRows(search.value.toLowerCase());
})

//gives the matching rows-->
function getRows(value) {
  tbody[0].innerHTML = "";
  let matchElments = [];
  for (let i of rowsOfTr) {
    let children = i.children;
    //sort by first column 0-
    let s = children[0].innerText.trim().toLowerCase();
    if (s.startsWith(value)) {
      matchElments.push(i);
    }
  }
  rowsStore = [];
  for (let i of matchElments) {
    rowsStore.push(i);
    tbody[0].appendChild(i);
  }
}

//ascending  sort order-->
function ascendSort(i) {
  tbody[0].innerHTML = "";
  // sort the array in ascending order-->
  rowsStore.sort(function (rowA, rowB) {
    let textA = rowA.children[i].innerText;
    let textB = rowB.children[i].innerText;
    let a = textA, b = textB;
    if (!isNaN(parseFloat(textA)) && !isNaN(parseFloat(textA))) {
      a = parseFloat(textA);
      b = parseFloat(textB);
    }
    if (a > b) {
      return 1;
    } else if (b > a) {
      return -1;
    }
    return 0;
  });
  for (let i of rowsStore) {
    tbody[0].appendChild(i);
  }

}

//descending sort order-->
function descendSort(i) {
  tbody[0].innerHTML = "";
  // sort the array in descending order-->
  rowsStore.sort(function (rowA, rowB) {
    let textA = rowA.children[i].innerText;
    let textB = rowB.children[i].innerText;
    let a = textA, b = textB;
    if (!isNaN(parseFloat(textA)) && !isNaN(parseFloat(textA))) {
      a = parseFloat(textA);
      b = parseFloat(textB);
    }
    if (a > b) {
      return -1;
    } else if (b > a) {
      return 1;
    }
    return 0;
  });
  for (let i of rowsStore) {
    tbody[0].appendChild(i);
  }

}



