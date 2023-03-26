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

// ------------------------Добавление нового User'а------------------------------------
fetch('/api/roles').then(
    res => {
        res.json().then(
            roles => {
                let temp = "";
                roles.forEach(r => {
                    temp += "<option>" + r.role + "</option>";
                })
                document.getElementById("new-roles").innerHTML = temp;
            }
        )
    }
);

$('#addUserBtn').click(function () {
    let newUser = {
        name: "",
        username: "",
        password: "",
        roles: []
    };
    newUser.name = document.getElementById("new-name").value;
    newUser.username = document.getElementById("new-email").value;
    newUser.password = document.getElementById("new-password").value;
    newUser.roles = [];
    [].slice.call(document.getElementById("new-roles")).forEach(op => {
        if (op.selected) {
            allRoles.forEach(r => {
                if (r.role == op.text) {
                    newUser.roles.push(r);
                }
            })
        }
    })
    console.log(newUser);
    fetch('/api/admin', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {'Content-Type': 'application/json'}
    }).then(res1 => {
        if (res1.ok) {
            res1.json().then(u => {
                allUsers.push(u);
                createTable(allUsers);
            })
            document.getElementById("new-name").value = "";
            document.getElementById("new-email").value = "";
            document.getElementById("new-password").value = "";
            document.getElementById("new-roles").selectedIndex = -1;
        } else {
            alert("Не удалось добавить: " + res1.status);
        }
    })

})

// -------------------Удаление юзера----------------------------
function getUserById(id) {
    let t = null;
    allUsers.forEach(u => {
        if (u.id == id) {
            t = u;
        }
    })
    return t;
}

$('#delUserBtn').click(function () {
    let id = document.getElementById("idDelModal").value;
    $('#deleteModal').modal('hide');

    fetch('/api/admin/' + id, {method: 'DELETE'})
        .then(res => {
            if (res.ok) {
                document.getElementById(id).remove();
                let u = getUserById(id);
                let i = allUsers.indexOf(u);
                delete allUsers[i];
            }
        });
})

function fDel(el) {
    let idStr = el.id;
    let id = idStr.slice(9);
    allUsers.forEach(u => {
        if (u.id == id) {
            document.getElementById("idDelModal").value = u.id;
            document.getElementById("nameDelModal").value = u.name;
            document.getElementById("emailDelModal").value = u.username;
            document.getElementById("passwordDelModal").value = u.password;
            document.getElementById("rolesDelModal").size = u.roles.length.toString();
            let temp = "";
            u.roles.forEach(r => {
                temp += "<option>" + r.role.replaceAll("ROLE_", "") + "</option>";
            })
            document.getElementById("rolesDelModal").innerHTML = temp;
        }
    });
    $('#deleteModal').modal('show');
}

// ---------Редактирование юзера----------------------
$('#editUserBtn').click(function () {
    let edit = {
        id: -1,
        name: "",
        username: "",
        password: "",
        roles: []
    };
    $('#editModal').modal('hide');
    edit.id = document.getElementById("idEditModal").value;
    edit.name = document.getElementById("nameEditModal").value;
    edit.username = document.getElementById("emailEditModal").value;
    edit.password = document.getElementById("passwordEditModal").value;
    edit.roles = [];
    [].slice.call(document.getElementById("rolesEditModal")).forEach(op => {
        if (op.selected) {
            allRoles.forEach(r => {
                if (r.role == op.text) {
                    edit.roles.push(r);
                }
            })
        }
    })

    console.log(edit)
    fetch('/api/admin', {
        method: 'PUT',
        body: JSON.stringify(edit),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => {
            if (res.ok) {
                allUsers.forEach(u => {
                    if (u.id == edit.id) {
                        u.name = edit.name;
                        u.username = edit.username;
                        if (edit.password !== "") {
                            u.password = edit.password;
                        }
                        u.roles = edit.roles;
                    }
                })
                createTable(allUsers);
            }
        });
})

function fEdit(el) {
    let idStr = el.id;
    let id = idStr.slice(7);
    allUsers.forEach(u => {
        if (u.id == id) {
            console.log(u);
            document.getElementById("idEditModal").value = u.id;
            document.getElementById("nameEditModal").value = u.name;
            document.getElementById("emailEditModal").value = u.username;
            document.getElementById("passwordEditModal").value = u.password;
            document.getElementById("rolesEditModal").size = allRoles.length;
            let temp = "";
            allRoles.forEach(r => {
                let select = "";
                u.roles.forEach(rUser => {
                    if (rUser.id == r.id) {
                        select = " selected";
                    }
                })
                temp += "<option" + select + ">" + r.role + "</option>";
            })
            document.getElementById("rolesEditModal").innerHTML = temp;
        }
    });
    $('#editModal').modal('show');
}





