import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
let saldo = 10000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (!elementoSaldo)
    throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(saldo);
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (!elementoDataAcesso)
    throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = formatarData(new Date(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
atualizarSaldo(saldo);
export function getSaldo() {
    return saldo;
}
;
export function atualizarSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (!elementoSaldo)
        throw new Error('Elemento saldo não encontrado');
    elementoSaldo.textContent = formatarMoeda(saldo);
}
;
