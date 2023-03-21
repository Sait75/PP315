const url = 'http://localhost:8080/api/user';
const userTableBody = document.getElementById('user-table-body');
const userHeader = document.getElementById('user-panel');


// заполнение таблицы User
async function getResponse() {

    fetch(url)
        .then((rez) => rez.json())
        .then((uns) => {
            let temp = '';
            temp += `<tr>
                <td>${uns.id}</td>
                <td>${uns.name}</td>
                <td>${uns.username}</td>
                <td>${uns.roles.map(role => role.role)}</td>
            </tr>`;

            userTableBody.innerHTML = temp;
            userHeader.innerHTML = `<h5> ${uns.username} with roles: ${uns.roles.map(role => role.role)} </h5>`;

        })
}

getResponse();

    // let roles = "";
    // for (let role in user.roles) {
    //     roles += `${user.roles[role].role} `;
    // }

//     const row = document.createElement('tr');
//     row.innerHTML = `
//         <td>${user.id}</td>
//         <td>${user.name}</td>
//         <td>${user.username}</td>
//         <td>${roles}</td>
//       `
//     userTableBody.appendChild(row);
// }





// const data = document.getElementById("data-user");
// const url = 'http://localhost:8080/api/users/authentication';
// const panel = document.getElementById("user-panel1");
//
// function userAuthInfo() {
//     fetch(url)
//         .then((res) => res.json())
//         .then((u) => {
//             let temp = '';
//             temp += `<tr>
//             <td>${u.id}</td>
//             <td>${u.name}</td>
//             <td>${u.last_name}</td>
//             <td>${u.username}</td>
//             <td>${u.roles.map(role => role.name).join(' ')}</td>
//             </tr>`;
//             data.innerHTML = temp;
//             panel.innerHTML = `<h5>${u.username} with roles: ${u.roles.map(role => role.name).join(' ')}</h5>`
//         });
// }
//
// userAuthInfo()