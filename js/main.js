let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// get total
function getTotal() {
    if (price.value != "") {
        let result = (+taxes.value + +ads.value + +price.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";

    }
}
let dataPro;
// save data at localstorage
if (localStorage.prducts != null) {
    dataPro = JSON.parse(localStorage.prducts)
} else {
    dataPro = [];
}
// create products
submit.onclick = function () {
    let newPro = {
        title: title.value.toLocaleLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLocaleLowerCase()
    };
    // count
    // validation
    if (title.value != "" && price.value != "" && category.value != "" && newPro.count < 100) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }

    localStorage.setItem("prducts", JSON.stringify(dataPro))
    console.log(newPro);

    showData();
};
// clear inputs from data
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// read
// shoeData
function showData() {
    getTotal();
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                   <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <td><button onclick="deleteAll()">Delete All ( ${dataPro.length})</button></td>
        `
    } else {
        btnDelete.innerHTML = "";
    }

}

showData();
// Delete item
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.prducts = JSON.stringify(dataPro);
    showData();
}
// Delete All
function deleteAll() {
    dataPro.splice(0);    // delete all items from 0 to end
    localStorage.clear(); // clear products from llocalstorage
    showData();
}
// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
    getTotal();

}
// search
let searchMood = "title";
function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "serchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.placeholder = "Search by " + searchMood;
    search.focus();
    search.value = "";
    showData();

}
// searchData
function searhData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(value.toLocaleLowerCase())) {
                table += `
                <tr>
                     <td>${i}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick="updateData(${i})" id="update">Update</button></td>
                     <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                 </tr>`
            }
            // search by category
        } else {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].category.includes(value.toLocaleLowerCase())) {
                    table += `
                <tr>
                     <td>${i}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick="updateData(${i})" id="update">Update</button></td>
                     <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                 </tr>`
                }
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;

}
// clean Data(validation)

