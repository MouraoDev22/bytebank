"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (!elementoSaldo)
    throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(saldo);
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (!elementoDataAcesso)
    throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = formatarData(new Date(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
