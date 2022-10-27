

const apilink = "https://mock-api.driven.com.br/api/v6/uol/participants"
// const user = {name:prompt("Digite seu nome de usuário")}

let user = { name: "Leonan" };



const promise = axios.post(apilink, user);
promise.then(userRegistered);
promise.catch(registerError);

function userRegistered(sucess) {
    alert("deu certo");
    console.log(sucess);
}

function registerError(error) {
    console.log(error.response.status);
    if (error.response.status === 400) {
        user = { name: prompt("Este nome já existe, tente outro") }
        const tryagain = axios.post(apilink, user);
        tryagain.then(userRegistered);
        tryagain.catch(registerError);
    }
    else {
        alert("erro desconhecido, tente novamente mais tarde");
    }
}
