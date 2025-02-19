let palavra;
//const palavras = ["elefante", "refrigerante", "maracanã", "saturno","liderança", 
//                "maracujá", "saxofone", "samambaia","celular", "programação" ];
const palavras = [];
carregaPalavras();

async function carregaPalavras() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/99/municipius";
  //const resposta = await fetch(url);
  //const municipios = await resposta.json();
  //municipios.forEach(item => palavras.push(item.nome));
  //--------------------------------------------------------------------------------------
  fetch(url)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro de HTTP ---> Status: ${resposta.status}`);
      } else {
        resposta.json()
      }
    })
    .then(municipios => municipios.forEach(item => palavras.push(item.nome)))
    .catch(console.error);
}

const chavear = elemento => {
  if (elemento.style.display === "none") {
    elemento.style.display = "inline";
  } else {
    elemento.style.display = "none";
  }
}

const jogar = () => {
  const indice = Math.floor(Math.random() * 10);
  palavra = palavras[indice];
  const embaralhada = document.getElementById("embaralhada");
  embaralhada.innerHTML = "\"" + embaralhar(palavra) + "\"";
  //-----------------------------------------------------------------------------
  chavear(document.getElementById("palpite"));
  chavear(document.getElementById("validar"));
};

const embaralhar = string => {
  let retorno;
  if (string && string.length > 0) {
    let letras = string.split("");
    letras.sort(() => Math.random() - 0.5);
    retorno = letras.join("");
  }
  return retorno;
};

const validar = () => {
  const palpite = document.getElementById("palpite");
  let resultado;
  if (palavra === palpite.value) {
    resultado = "CORRETO";
  } else {
    resultado = "ERRADO";
  }
  let mensagem = `A palavra é ${palavra} e seu palpite está ${resultado}.`;
  const embaralhada = document.getElementById("embaralhada");
  embaralhada.innerHTML = mensagem;
  //-----------------------------------------------------------------------------
  chavear(palpite);
  chavear(document.getElementById("validar"));
}
