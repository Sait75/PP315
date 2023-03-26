//Таблица всех пользователей
let allUsers;
let allRoles;

fetch('/api/roles').then(
    res => {
        res.json().then(
            roles => {
                allRoles = roles;
            }
        )
    }
)

fetch('/api/admin').then(
    res => {
        res.json().then(
            data => {
                allUsers = data;
                createTable(allUsers);
            }
        )
    }
)

//--------------Заполнение таблицы страницы Users-------------------
function createTable(data) {
    let temp = "";
    data.forEach(u => {
        // console.log(u)
        temp += "<tr id=\"" + u.id + "\">";
        temp += "<td>" + u.id + "</td>";
        temp += "<td>" + u.name + "</td>";
        temp += "<td>" + u.username + "</td>";
        temp += "<td>" + u.roles.map(role => role.role.replaceAll("ROLE_", "")).join(', ') + "</td>";
        temp += "<td><button class=\"btn btn-info\" onclick=\"fEdit(this)\" id=\"editBtn" + u.id + "\">Edit</button></td>";
        temp += "<td><button class=\"btn btn-danger\" onclick=\"fDel(this)\" id=\"deleteBtn" + u.id + "\">Delete</button></td>" + "</tr>";
    })
    document.getElementById("all-user-table-body").innerHTML = temp;
}


// -----------------Страница USER и заголовок---------------------------------
fetch('/api/user').then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                let temp = "";
                temp += "<tr id=\"" + data.id + "\">";
                temp += "<td>" + data.id + "</td>";
                temp += "<td>" + data.name + "</td>";
                temp += "<td>" + data.username + "</td>";
                temp += "<td>" + data.roles.map(role => role.role.replaceAll("ROLE_", ""))
                    .join(', ') + "</td>" + "</tr>";
//--------------------------Заполнение таблицы страницы User-------------------
                document.getElementById("user-table-info").innerHTML = temp;
//------------------------- Заполнение заголовка страницы-------------------------------
                document.getElementById('admin-panel')
                    .innerHTML = `<h5> ${data.username} with roles: ${data.roles.map(role => role.role.replaceAll("ROLE_", ""))
                    .join(', ')} </h5>`;
            }
        )
    }
)




//
// const url = 'http://localhost:8080/api/admin';
// const renderTable = document.getElementById("all-user-table-body");
//
// const renderPosts = (users) => {
//     let temp = '';
//     users.forEach((u) => {
//         temp += `<tr>
//                                 <td>${u.id}</td>
//                                 <td id=${'name' + u.id}>${u.name}</td>
//                                 <td id=${'username' + u.id}>${u.username}</td>
//                                 <td id=${'role' + u.id}>${u.roles.map(role => role.role).join(' ')}</td>
//                                 <td>
//                                 <button class="btn btn-info" type="button"
//                                 data-bs-toggle="modal" data-bs-target="#modalEdit"
//                                 onclick="editModal(${u.id})">Edit</button></td>
//                                 <td>
//                                 <button class="btn btn-danger" type="button"
//                                 data-bs-toggle="modal" data-bs-target="#modalDelete"
//                                 onclick="deleteModal(${u.id})">Delete</button></td>
//                                 </tr>
//                                  `
//
//     })
//     renderTable.innerHTML = temp;
// }
//
// function getAllUsers() {
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             renderPosts(data)
//         })
// }
//
// getAllUsers();
//
// // -------------------Delete-------------------
// function deleteModal(id) {
//     fetch(url + '/' + id, {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     }).then(res => {
//         res.json().then(us => {
//             document.getElementById('idDeleteUser').value = us.id;
//             document.getElementById('deleteUserName').value = us.name;
//             document.getElementById('deleteUserEmail').value = us.username;
//         })
//     });
// }
//
// async function deleteUser() {
//     console.log(document.getElementById('idDeleteUser').value)
//     await fetch(url + '/' + document.getElementById('idDeleteUser').value, {
//         method: 'DELETE',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json;charset=UTF-8'
//         },
//         body: JSON.stringify(document.getElementById('idDeleteUser').value)
//     })
//
//     getAllUsers()
//     document.getElementById("deleteFormCloseButton").click();
// }
//


// const urlAuth = 'http://localhost:8080/api/user';
// const userTableBody = document.getElementById('user-table-info');
// const userHeader = document.getElementById('admin-panel');
//
//
// // заполнение таблицы User
// async function getUser() {
//
//     fetch(urlAuth)
//         .then((rez) => rez.json())
//         .then((uns) => {
//             let temp = '';
//             temp += `<tr>
//                 <td>${uns.id}</td>
//                 <td>${uns.name}</td>
//                 <td>${uns.username}</td>
//                 <td>${uns.roles.map(role => role.role).join(' ')}</td>
//             </tr>`;
// //--------------Заполнение таблицы страницы User-------------------
//             userTableBody.innerHTML = temp;
// //--------------Заполнение заголовка страницы----------------------
//             userHeader.innerHTML = `<h5> ${uns.username} with roles: ${uns.roles.map(role => role.role).join(' ')} </h5>`;
//
//         })
// }
//
// getUser();




