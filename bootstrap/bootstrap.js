const tablebody = document.getElementById('tablebody');
const form = document.getElementById('form-1');
const url = "https://mock-api-template-rh6s.onrender.com/users";
const paginationContainer = document.getElementById('pagination');
const darkModeToggle = document.getElementById('darkModeToggle');

let currentPage = 1;
const itemsPerPage = 10;
let data = [];
window.addEventListener("load", () => {
    fetchdata();
});

function fetchdata() {
    fetch(url)
        .then((res) => res.json())
        .then((responseData) => {
            data = responseData;
            initPagination();
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function initPagination() {
    renderTable();
    renderPaginationButtons();
}
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    tablebody.innerHTML = "";
    itemsToDisplay.forEach(element => {
        const newRow = document.createElement("tr");

        const cellUserid = document.createElement("td");
        const cellid = document.createElement("td");
        const celltitle = document.createElement("td");
        const cellcompleted = document.createElement("td");
        const cellDelete = document.createElement("td");
        const btnDelete = document.createElement("button")
        btnDelete.innerText = "delete"
        cellDelete.append(btnDelete)
        const cellEdit = document.createElement("td");
        btnDelete.style.backgroundColor = "grey"
        const btnEdit = document.createElement("button")
        btnEdit.innerText = "Update"
        btnEdit.style.backgroundColor = "lightgreen"; 
        cellEdit.append(btnEdit)

        cellUserid.textContent = element.userid;
        cellid.textContent = element.id;
        celltitle.textContent = element.title;
        cellcompleted.textContent = element.completed;
    

        // cellDelete.textContent = "Delete";
        cellDelete.addEventListener("click", async () => {
            let deletedata = confirm("Do you want to delete this element?");
            if (deletedata === true) {

                try {
                    let res = await fetch(url + "/" + element.id, {
                        method: "DELETE"
                    });
                    console.log(res);
                    fetchdata();
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        });
        // cellEdit.textContent = "Update";
        cellEdit.addEventListener("click", () => {
            populateForm(element.id, element.userid, element.title, element.completed);
        });

        newRow.append(cellUserid, cellid, celltitle, cellcompleted, cellDelete, cellEdit);
        tablebody.appendChild(newRow);
    });
}
function renderPaginationButtons() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("btn", "btn-info"); 
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderTable();
            updatePaginationButtons();
        });
        paginationContainer.appendChild(pageButton);
    }
}
function updatePaginationButtons() {
    const pageButtons = paginationContainer.querySelectorAll("button");
    pageButtons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            // button.classList.add("active");
        } else {
            // button.classList.remove("active");
        }
    });
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const userid = document.getElementById("userid").value;
    const id = document.getElementById("pass").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;
    const dataId = form.getAttribute("data-id", 123);

    let obj = {
        userid: userid,
        id: id,
        title: title,
        completed: completed
    };

    if (dataId) {
        fetch(url + "/" + dataId, {
            method: 'PUT',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchdata();
                alert("Data updated successfully");
                form.removeAttribute("data-id");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });

    } else {
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchdata();
                alert("Created successfully");
            })
            .catch((error) => {
                console.error("Error creating data:", error);
            });
    }
    form.reset();
});
function populateForm(id, userid, title, completed) {
    document.getElementById("userid").value = userid;
    document.getElementById("pass").value = id;
    document.getElementById("title").value = title;
    document.getElementById("completed").checked = completed;
    form.setAttribute("data-id", id);
}
// const darkModeToggle = document.getElementById('darkModeToggle');
// const table=document.getElementById("table")

// darkModeToggle.addEventListener('change', () => {
//   document.body.classList.toggle('dark-mode', darkModeToggle.checked);
//   document.table.classList.toggle('dark-mode',darkModeToggle.checked);
// });
document.addEventListener("DOMContentLoaded", function () {
    let table=document.getElementById("datatable")
    let thead=document.getElementById("thead")
    let paginationContainer = document.getElementById("pagination");
    var themeToggle = document.getElementById("theme-toggle");
    var body = document.body;
    var iconLight = document.getElementById("icon-light");
    var iconDark = document.getElementById("icon-dark");
    iconDark.classList.add("d-none");
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-theme");
 
        if (body.classList.contains("dark-theme")) {
            iconLight.classList.remove("d-none");
            iconDark.classList.add("d-none");
            body.style.backgroundColor="black"
            // paginationContainer.style.backgroundColor = "blue";
            // paginationContainer.style.color = "white";
            document.querySelector("#input-container").style.backgroundColor="gray";
            document.querySelector("#form-1").style.color="white";
            table.className="table table-info table-striped table-primary"
            document.querySelector("#tag").style.color="white"
            thead.className="table-info"
        } else {
            iconLight.classList.add("d-none");
            iconDark.classList.remove("d-none");
            body.style.backgroundColor="white"
            document.querySelector("#input-container").style.backgroundColor="rgb(99, 128, 148)";
            document.querySelector("#form-1").style.color="black";
            table.className="table table-secondary  table-striped-columns table-hover  table-bordered caption-top"
            document.querySelector("#tag").style.color="black"
            thead.className="table-dark"
            // paginationContainer.style.backgroundColor = "red";
            // paginationContainer.style.color = "black";

        }
    });
 });


