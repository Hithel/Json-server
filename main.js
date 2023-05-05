let myForm = document.querySelector("#myFrom");

myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let opc = e.submitter.dataset.accion;
    switch (opc) {
        case "GET":
            getUserAll();
            break;
        case "POST":
            postUserAll(data);
        case "PUT":
            putUserAll(data);  
        case "DELETE":
            deleteUserAll(data);
        case "SEARCH":
            searchUserAll(data);
        default:
            break;
    }
})

let config = {
    headers:new Headers({
        "Content-Type": "application/json"
    }), 
};

const getUserAll = async()=>{
    config.method = "GET";
    let data = await ( await fetch("http://localhost:4005/usuarios",config)).json();
    console.log(data);
}

const postUserAll = async(data)=>{
    config.method = "POST";
    config.body = JSON.stringify(data);
    let res = await ( await fetch("http://localhost:4005/usuarios",config)).json();
    console.log(res)
}

const putUserAll = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let act = await(await fetch(`http://localhost:4005/usuarios/${data.id}`,config)).json();
    console.log(act)
}

const deleteUserAll = async(data)=>{
    config.method = "DELETE";
    config.body = JSON.stringify(data);
    let del = await(await fetch(`http://localhost:4005/usuarios/${data.id}`,config)).json();
    console.log(del)
}

const searchUserAll = async(data)=>{
    config.method = "GET";
    let sea = await ( await fetch(`http://localhost:4005/usuarios?q=${Object.values(data).join("")}`,config)).json();
    console.log(sea)
}
