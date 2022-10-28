let messages = [] // array que guarda as mensagens do servidor

const apilink = "https://mock-api.driven.com.br/api/v6/uol"
// let user = {name:prompt("Digite seu nome de usuário")}
let connectionKeeper; // variável que armazena o número set interval do keepConection
let messagesUpdater; // variável para armazenar o número set interval a requisição contínua de mensagens
let user = { name: "Leonan" };

//LOGIN
//primeira requisição de login
const globalrpomise = axios.post(apilink + "/participants", user);
globalrpomise.then(userRegistered);
globalrpomise.catch(registerError);

// login bem sucedido
function userRegistered(sucess) {
    console.log(sucess);
    connectionKeeper = setInterval(keepConnection, 5000);
    searchMessages();
    messagesUpdater = setInterval(searchMessages, 3000);
}

// erro no login
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
//LOGIN


// MANTENDO CONEXÃO
function keepConnection() {
    const promise = axios.post(apilink + "/status", user);
    promise.then(connectionKept);
    promise.catch(connectionError);
}
//conexão mantida
function connectionKept(sucess) {
    console.log(sucess.status);
}
//erro de conexão
function connectionError(error) {
    console.log(error.response.status);
    alert("conexão perdida, recarregue a página e cadastre novamente");
}
// MANTENDO CONEXÃO

// BUSCANDO MENSAGENS
function searchMessages() {
    const promise = axios.get(apilink + "/messages")
    promise.then(updateMessages);
    promise.catch(updateMessagesError);
}
// caso não conseguir pegar as mensagens
function updateMessagesError(error) {
    console.log(error);
}
// BUSCANDO MENSAGENS


// RENDERIZANDO AS MENSAGENS
function updateMessages(alldata) {
    messages = alldata.data;
    renderMessages();
}


function renderMessages() {

    let ulMessages = document.querySelector("main>ul");
    ulMessages.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        if (message.type === "status") {
            ulMessages.innerHTML +=
                `
            <li class="access-alert">
                        <p><span class="timestamp">(${message.time}) </span> <strong class="user-access">${message.from} </strong>${message.text}</p>
                    </li>`

        }
        else if (message.type === "message") {
            ulMessages.innerHTML += `<li class="msg-all"><p><span class="timestamp">(${message.time}) </span> <strong class="sender">${message.from}</strong> para <strong class="receiver">${message.to}</strong>: ${message.text}</p></li>`

        }
        else if (message.type === "private_message") {
            if (message.from === user || message.to === user) {
                ulMessages.innerHTML += `<li class="msg-private"><p><span class="timestamp">(${message.time})</span> <strong class="sender">${message.from}</strong> para <strong class="receiver">${message.to}</strong>: ${message.text}</p></li>`

            }
        }
        const scrollView = document.querySelectorAll("main>ul li");
        scrollView[scrollView.length - 1].scrollIntoView();
    }
}