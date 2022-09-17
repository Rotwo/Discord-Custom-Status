// Dark mode

document.getElementById('switchMode').addEventListener('click', switchMode)

if(localStorage.getItem('color') == "dark"){
    document.getElementById('switchMode').checked = true;

    switchMode();
}else{
    document.getElementById('switchMode').checked = false;

    switchMode();
}

  function switchMode() {

        if (document.getElementById('switchMode').checked) {

        localStorage.setItem('color', "dark");

        document.getElementById('body').className = 'body_darkMode';

        document.getElementById('mainAppTitle').className = 'appTitle text-light'

        document.getElementById('valuesText').className = 'h3 mb-3 fw-normal text-light'

        document.getElementById('rememberMeText').className = 'text-light';

        } else {

        localStorage.setItem('color', "light");

        document.getElementById('body').className = 'body_lightMode';

        document.getElementById('mainAppTitle').className = 'appTitle text-dark'

        document.getElementById('valuesText').className = 'h3 mb-3 fw-normal text-dark'

        document.getElementById('rememberMeText').className = 'text-dark';
    }
}


const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

var interval = null;

var setStatusBtn = document.getElementById('setState');

setStatusBtn.addEventListener('click', setActivity);

function setActivity(){

    try{
        clearInterval(interval); // stop the interval
    }catch{}

    var timeStamp = Date.now();

    var clientId = document.getElementById('clientId').value;
    var valueState = document.getElementById('state').value;

    if(valueState === ""){
        valueState = null;
    }

    var valueDetails = document.getElementById('details').value;

    if(valueDetails === ""){
        valueDetails = null;
    }

    // Large image
    var largeImageKey = document.getElementById('largeImageKey').value;
    var largeImageText = document.getElementById('largeImageText').value;

    // Small image
    var smallImageKey = document.getElementById('smallImageKey').value;
    var smallImageText = document.getElementById('smallImageText').value;

    DiscordRPC.register(clientId);

    var error = false;

    RPC.login({ clientId }).catch(error => {
        console.error(error);
        alert(error);
        return;
    });

    setTimeout(() => {

        mainDiscordLoop(valueState, valueDetails, largeImageKey, largeImageText, smallImageKey, smallImageText, timeStamp);
        alert('🍭 Done! 🍃', "");

    }, 3000);
}

async function rpcSetActivity(valueState, valueDetails, largeImageKey, largeImageText, smallImageKey, smallImageText, timeStamp){
    if(!RPC) return;

    // Check if there is any value that is empty();

    if(largeImageKey === ""){
        largeImageKey = "null";
    }

    if(largeImageText === ""){
        largeImageText = "💫 Discord Custom Status 💦";
    }

    ///////////////////////

    if(smallImageKey === ""){
        smallImageKey = "null";
    }

    if(smallImageText === ""){
        smallImageText = "💫 Discord Custom Status 💦";
    }

    RPC.setActivity({
        state: valueState,
        details: valueDetails,
        startTimestamp: timeStamp,
        // Large image
        largeImageKey: largeImageKey,
        largeImageText: largeImageText,
        // Small image
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
    });
}

function mainDiscordLoop(valueState, valueDetails, largeImageKey, largeImageText, smallImageKey, smallImageText, timeStamp){

    rpcSetActivity(valueState, valueDetails, largeImageKey, largeImageText, smallImageKey, smallImageText, timeStamp);

    interval = setInterval(() => {
        rpcSetActivity(valueState, valueDetails, largeImageKey, largeImageText, smallImageKey, smallImageText, timeStamp);
    }, 15 * 1000);
}