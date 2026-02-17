"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (!elementoSaldo)
    throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = `R$ ${saldo.toFixed(2)}`;
