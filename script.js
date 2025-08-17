function binarioParaHex() {
  let binarioInput = document.getElementById("binario");
  let hexadecimalInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let binario = binarioInput.value.trim();

  if (binario === "" || !/^[01]+$/.test(binario)) {
    hexadecimalInput.value = "";
    resultado.innerHTML = "Digite um valor binário válido (apenas 0 e 1).";
    passos.innerHTML = "";
    return;
  }

  let binOriginal = binario;
  let etapas = [];

  // Preencher com zeros à esquerda para múltiplos de 4
  while (binario.length % 4 !== 0) {
    binario = "0" + binario;
  }

  etapas.push(`Ajustando binário para múltiplos de 4 bits: ${binario}`);

  let hex = "";
  const hexChars = "0123456789ABCDEF";

  for (let i = 0; i < binario.length; i += 4) {
    let grupo = binario.substr(i, 4);
    let valorDecimal = parseInt(grupo, 2);
    let caractereHex = hexChars[valorDecimal];
    etapas.push(`${grupo} → ${valorDecimal} (decimal) → '${caractereHex}' (hex)`);
    hex += caractereHex;
  }

  hexadecimalInput.value = hex;
  resultado.innerHTML = `Binário: <strong>( ${binOriginal} )₂</strong> → Hex: <strong>( ${hex} )₁₆</strong>`;

  etapas.push(`<br><strong>Resultado final: ( ${binOriginal} )₂ → ( ${hex} )₁₆</strong>`);

  passos.innerHTML = "<strong>Passos da conversão Binário → Hex:</strong><br>" +
    etapas.join("<br>");
}

function hexParaBinario() {
  let binarioInput = document.getElementById("binario");
  let hexadecimalInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let hex = hexadecimalInput.value.trim().toUpperCase();

  if (hex === "" || !/^[0-9A-F]+$/.test(hex)) {
    binarioInput.value = "";
    resultado.innerHTML = "Digite um valor hex válido.";
    passos.innerHTML = "";
    return;
  }

  let etapas = [];
  let binario = "";

  for (let i = 0; i < hex.length; i++) {
    let caractere = hex[i];
    let valorDecimal = parseInt(caractere, 16);
    let grupoBin = valorDecimal.toString(2).padStart(4, '0');
    etapas.push(`${caractere} (hex) → ${valorDecimal} (decimal) → ${grupoBin} (binário)`);
    binario += grupoBin;
  }

  binarioInput.value = binario;
  resultado.innerHTML = `Hex: <strong>( ${hex} )₁₆</strong> → Binário: <strong>( ${binario} )₂</strong>`;

  etapas.push(`<br><strong>Resultado final: ( ${hex} )₁₆ → ( ${binario} )₂</strong>`);

  passos.innerHTML = "<strong>Passos da conversão Hex → Binário:</strong><br>" +
    etapas.join("<br>");
}
