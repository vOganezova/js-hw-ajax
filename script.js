
//users HML
const usersWrapper = document.querySelector(".users");
const list = document.querySelector(".userList");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let totalPages;
let current = 1;



function getUsers(pageNum){
    let request = new XMLHttpRequest();
    request.addEventListener('load', ()=>{
        let response = request.responseText;
        let parsedRes = JSON.parse(response);
        const fragment = new DocumentFragment();
        parsedRes.data.forEach(user => {
            let li = document.createElement('li');
            li.innerText = `${user.first_name} ${user.last_name}`;
            fragment.appendChild(li);

        });
        list.innerHTML = " ";
        list.appendChild(fragment);
        totalPages = parsedRes.total_pages;
        
    });

    request.addEventListener('error', ()=>{
        let p = document.createElement('p');
        p.innerText = "Oops! There has been an error...";
        usersWrapper.appendChild(p);
    });

    request.open('get', 'https://reqres.in/api/users?page=' + pageNum);
    request.send();
}

getUsers(current);



prev.addEventListener('click', ()=>{
    if(current === 1){
        return;
    }

    current--;
    getUsers(current);
});

next.addEventListener('click', ()=>{
    if(current === totalPages){
        return;
    }

    current++;
    getUsers(current);
});

//employees fetch

const employeesWrapper = document.querySelector(".employees");
const empList = document.querySelector(".employeeList");

function getEmployees(){
    fetch("https://reqres.in/api/unknown", {method:"GET"},)
    .then(res=>{
       if(res.status !== 200){
        throw new Error();
       }
       return res.json();
    })
    .then(res=>{
        const fragment = document.createDocumentFragment();
        res.data.forEach(item=>{
            const li = document.createElement('li');
            li.innerText = `${item.name} joined our team in ${item.year}`;
            fragment.appendChild(li);
        });

        empList.appendChild(fragment);
    })
    .catch(err=>{
        const p = document.createElement('p');
        p.innerText = err.message;
        employeesWrapper.appendChild(p);
    })
}

getEmployees();






