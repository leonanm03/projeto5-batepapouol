

const apilink = "https://mock-api.driven.com.br/api/v6/uol"
// let user = {name:prompt("Digite seu nome de usuário")}
let connectionKeeper;

let user = { name: "Leonan" };

const globalrpomise = axios.post(apilink + "/participants", user);
globalrpomise.then(userRegistered);
globalrpomise.catch(registerError);

function userRegistered(sucess) {
    alert("deu certo");
    console.log(sucess);
    connectionKeeper = setInterval(keepConnection, 5000);
}

function registerError(error) {
    console.log(error.response.status);
    if (error.response.status === 400) {
        user = { name: prompt("Este nome já existe, tente outro") }
        const promise = axios.post(apilink + "/participants", user);
        promise.then(userRegistered);
        promise.catch(registerError);
    }
    else {
        alert("erro desconhecido, tente novamente mais tarde");
    }
}

function keepConnection() {
    const promise = axios.post(apilink + "/status", user);
    promise.then(connectionKept);
    promise.catch(connectionError);
}

function connectionKept(sucess) {
    console.log(sucess.status);
}
function connectionError(error) {
    console.log(error.response.status);
    alert("conexão perdida, recarregue a página e cadastre novamente");
}

