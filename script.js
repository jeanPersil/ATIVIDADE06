import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import {
  get,
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCELZUB4BzaezA4rZiYMERuQ6DF40ULL_A",
  authDomain: "ledwoki.firebaseapp.com",
  databaseURL: "https://ledwoki-default-rtdb.firebaseio.com",
  projectId: "ledwoki",
  storageBucket: "ledwoki.firebasestorage.app",
  messagingSenderId: "272504469517",
  appId: "1:272504469517:web:f2091f23bf7c564cbdbd44",
  measurementId: "G-S8GBZ6SDZ1",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const ledRef = ref(database, "botao/state");
const statusDoBotao = document.querySelector("[statusBotao]");

const fraseBotaoPressionado = "Status do botão: PRESSIONADO";
const frateBotaoNaoPressionado = "Status do botão: NÃO ALARMANTE";

function verificarStatus(snapshot) {
  try {
    if (snapshot.exists) {
      const estadoDoBotao = snapshot.val();
      statusDoBotao.textContent =
        estadoDoBotao === 0 ? frateBotaoNaoPressionado : fraseBotaoPressionado;
    }
  } catch (e) {
    alert("Erro ao acessar dados do firebase", e);
  }
}

onValue(ledRef, (snapshot) => {
  verificarStatus(snapshot);
});
