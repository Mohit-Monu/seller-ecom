const box = document.getElementById("boxx");

document.getElementById("form").addEventListener("submit", addele);

window.addEventListener("DOMContentLoaded", () => {
  pageloader();
});
async function pageloader() {
  const res = await axios.get("http://localhost:3000/get/");
  console.log(res.data);
  const total = document.getElementById("totall");
  var temp = 0;
  var count = 0;
  res.data.forEach((element) => {
    count++;
    const h2 = document.createElement("label");
    const div = document.createElement("div");
    const idstorer = document.createElement("input");
    const delbtn = document.createElement("button");

    idstorer.type = "hidden";

    idstorer.value = element.id;
    delbtn.innerHTML = "Delete Products";

    h2.innerHTML =
      count + "  -  Price = " + element.price + " - Name = " + element.name;
    div.appendChild(idstorer);
    div.appendChild(h2);
    div.appendChild(delbtn);

    box.appendChild(div);

    delbtn.addEventListener("click", delfun);

    temp += element.price;
  });
  total.innerHTML = temp;
}
async function delfun(e) {
  const par = e.target.parentElement;
  const id = par.firstChild;
  console.log(id.value);
  await axios.get("http://localhost:3000/delete/" + id.value);
  await delall();
  await pageloader();
}
async function addele(e) {
  e.preventDefault();
  console.log("updated");
  const price = document.getElementById("pricee");
  const name = document.getElementById("namee");
  const config = {
    method: "POST",
    url: "http://localhost:3000/add/",
    data: {
      price: price.value,
      name: name.value,
    },
  };
  const res = await axios(config);
  await delall();
  await pageloader();
}
async function delall() {
  return new Promise((resolve, reject) => {
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
    resolve();
  });
}
