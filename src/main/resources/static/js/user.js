// заполнение страницы User

fetch('http://localhost:8080/api/user')
    .then((rez) => rez.json())
    .then((u) => {
        let temp = '';
        temp += `<tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.username}</td>
                <td>${u.roles.map(role => role.role.replaceAll("ROLE_", "")).join(', ')}</td>
            </tr>`;
//--------------Заполнение таблицы страницы User-------------------
        document.getElementById('user-table-body').innerHTML = temp;
//--------------Заполнение заголовка страницы----------------------
        document.getElementById('user-panel')
            .innerHTML = `<h5> ${u.username} with roles: ${u.roles.map(role => role.role.replaceAll("ROLE_", ""))
            .join(', ')} </h5>`;
    })
