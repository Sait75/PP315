// заполнение страницы User

fetch('http://localhost:8080/api/user')
    .then((rez) => rez.json())
    .then((uns) => {
        let temp = '';
        temp += `<tr>
                <td>${uns.id}</td>
                <td>${uns.name}</td>
                <td>${uns.username}</td>
                <td>${uns.roles.map(role => role.role.replaceAll("ROLE_", "")).join(', ')}</td>
            </tr>`;
//--------------Заполнение таблицы страницы User-------------------
        document.getElementById('user-table-body').innerHTML = temp;
//--------------Заполнение заголовка страницы----------------------
        document.getElementById('user-panel')
            .innerHTML = `<h5> ${uns.username} with roles: ${uns.roles.map(role => role.role.replaceAll("ROLE_", ""))
            .join(', ')} </h5>`;
    })
