"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (!elementoSaldo)
    throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (!elementoDataAcesso)
    throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
