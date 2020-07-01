const refresh = document.querySelector("table tfoot button");
refresh.addEventListener("click", (e) => {
  newData();
});
function getData() {
  return fetch("http://localhost:5000/data").then((res) => res.json());
}

function updateTable(arr) {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = arr.reduce((acc, curr) => {
    return (acc += `<tr><td>${curr[0]}</td><td>${curr[1]}</td><td>${curr[2]}</td><td>${curr[3]}</td></tr>`);
  }, "");
}

async function newData() {
  const { rows, updatedAt } = await getData();
  document.querySelector(".tracker").innerHTML = `Last updated ${updatedAt}`;
  updateTable(rows);
}

(() => newData())();
