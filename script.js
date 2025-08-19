function binarioParaHex() {
  let binarioInput = document.getElementById("binario");
  let hexadecimalInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let binario = binarioInput.value.trim();

  if (binario === "" || !/^[01.]+$/.test(binario) || (binario.split('.').length > 2)) {
    hexadecimalInput.value = "";
    resultado.innerHTML = "Digite um valor binário válido (0, 1 e no máximo um ponto).";
    passos.innerHTML = "";
    return;
  }

  let [parteInteira, parteFracionaria] = binario.split(".");
  parteFracionaria = parteFracionaria || "";

  let etapas = [];

  // ----- Parte inteira -----
  while (parteInteira.length % 4 !== 0) {
    parteInteira = "0" + parteInteira;
  }
  etapas.push(`Parte inteira ajustada: ${parteInteira}`);

  let hexInt = "";
  const hexChars = "0123456789ABCDEF";
  for (let i = 0; i < parteInteira.length; i += 4) {
    let grupo = parteInteira.substr(i, 4);
    let valorDecimal = parseInt(grupo, 2);
    let caractereHex = hexChars[valorDecimal];
    etapas.push(`${grupo} → ${valorDecimal} → '${caractereHex}'`);
    hexInt += caractereHex;
  }

  // Remover zeros à esquerda
  hexInt = hexInt.replace(/^0+/, "") || "0";

  // ----- Parte fracionária -----
  let hexFrac = "";
  if (parteFracionaria.length > 0) {
    while (parteFracionaria.length % 4 !== 0) {
      parteFracionaria = parteFracionaria + "0";
    }
    etapas.push(`Parte fracionária ajustada: ${parteFracionaria}`);

    for (let i = 0; i < parteFracionaria.length; i += 4) {
      let grupo = parteFracionaria.substr(i, 4);
      let valorDecimal = parseInt(grupo, 2);
      let caractereHex = hexChars[valorDecimal];
      etapas.push(`${grupo} → ${valorDecimal} → '${caractereHex}'`);
      hexFrac += caractereHex;
    }
  }

  let resultadoFinal = hexInt + (hexFrac ? "." + hexFrac : "");
  hexadecimalInput.value = resultadoFinal;

  resultado.innerHTML = `Binário: <strong>( ${binario} )₂</strong> → Hex: <strong>( ${resultadoFinal} )₁₆</strong>`;
  passos.innerHTML = "<strong>Passos da conversão Binário → Hex:</strong><br>" + etapas.join("<br>");
}

function hexParaBinario() {
  let binarioInput = document.getElementById("binario");
  let hexadecimalInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let hex = hexadecimalInput.value.trim().toUpperCase();

  if (hex === "" || !/^[0-9A-F.]+$/.test(hex) || (hex.split('.').length > 2)) {
    binarioInput.value = "";
    resultado.innerHTML = "Digite um valor hexadecimal válido (0-9, A-F e no máximo um ponto).";
    passos.innerHTML = "";
    return;
  }

  let [parteInteira, parteFracionaria] = hex.split(".");
  parteFracionaria = parteFracionaria || "";

  let etapas = [];
  let binInt = "";
  for (let i = 0; i < parteInteira.length; i++) {
    let caractere = parteInteira[i];
    let valorDecimal = parseInt(caractere, 16);
    let grupoBin = valorDecimal.toString(2).padStart(4, '0');
    etapas.push(`${caractere} → ${valorDecimal} → ${grupoBin}`);
    binInt += grupoBin;
  }

  // Remover zeros à esquerda da parte inteira
  binInt = binInt.replace(/^0+/, "") || "0";

  let binFrac = "";
  for (let i = 0; i < parteFracionaria.length; i++) {
    let caractere = parteFracionaria[i];
    let valorDecimal = parseInt(caractere, 16);
    let grupoBin = valorDecimal.toString(2).padStart(4, '0');
    etapas.push(`${caractere} → ${valorDecimal} → ${grupoBin}`);
    binFrac += grupoBin;
  }

  // Remover zeros à direita da parte fracionária
  binFrac = binFrac.replace(/0+$/, "");

  let resultadoFinal = binInt + (binFrac ? "." + binFrac : "");
  binarioInput.value = resultadoFinal;

  resultado.innerHTML = `Hex: <strong>( ${hex} )₁₆</strong> → Binário: <strong>( ${resultadoFinal} )₂</strong>`;
  passos.innerHTML = "<strong>Passos da conversão Hex → Binário:</strong><br>" + etapas.join("<br>");
}
