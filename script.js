const espIP = "http://192.168.0.13";
const estado = document.getElementById("estado");

let debounce = 80;
let lastSend = 0;

function enviar(url){
    const now = Date.now();
    if(now - lastSend < debounce) return;
    lastSend = now;

    estado.innerText = "Enviando comando...";
    estado.style.color = "orange";

    fetch(url)
    .then(()=>{
        estado.innerText = "Movimiento ejecutado";
        estado.style.color = "lime";
    })
    .catch(()=>{
        estado.innerText = "Error conexión";
        estado.style.color = "red";
    });
}

// === STEPERS ===
base.oninput = ()=>{
    baseVal.innerText = base.value;
    let pasos = Math.floor(base.value / 1.8);
    enviar(`${espIP}/base?pos=${pasos}&speed=${speedBase.value}`);
};

speedBase.oninput = ()=>{
    speedBaseVal.innerText = speedBase.value;
};

wrist.oninput = ()=>{
    wristVal.innerText = wrist.value;
    let pasos = Math.floor(wrist.value / 1.8);
    enviar(`${espIP}/wrist?pos=${pasos}&speed=${speedWrist.value}`);
};

speedWrist.oninput = ()=>{
    speedWristVal.innerText = speedWrist.value;
};

// === SERVOS ===
function actualizarServos(){
    s1Val.innerText = s1.value;
    s2Val.innerText = s2.value;
    s3Val.innerText = s3.value;
    s4Val.innerText = s4.value;

    enviar(`${espIP}/servos?s1=${s1.value}&s2=${s2.value}&s3=${s3.value}&s4=${s4.value}`);
}

s1.oninput = actualizarServos;
s2.oninput = actualizarServos;
s3.oninput = actualizarServos;
s4.oninput = actualizarServos;

// === HOME ===
homeBtn.onclick = ()=>{
    estado.innerText = "Regresando a HOME...";
    estado.style.color = "cyan";

    fetch(`${espIP}/home`)
    .then(()=>{
        estado.innerText = "Posición HOME alcanzada";
        estado.style.color = "lime";
    })
    .catch(()=>{
        estado.innerText = "Error conexión";
        estado.style.color = "red";
    });
};