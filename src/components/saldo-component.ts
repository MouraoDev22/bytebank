import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js"; 

let saldo: number = 10000;

const elementoSaldo: HTMLElement | null = document.querySelector<HTMLElement>('.saldo-valor .valor');
if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(saldo);

const elementoDataAcesso: HTMLElement | null = document.querySelector<HTMLElement>('.block-saldo time');
if (!elementoDataAcesso) throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = formatarData(new Date(), FormatoData.DIA_SEMANA_DIA_MES_ANO);

atualizarSaldo(saldo);

export function getSaldo(): number {
    return saldo;
};

export function atualizarSaldo(novoSaldo: number): void {
    saldo = novoSaldo;
    
    if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
    elementoSaldo.textContent = formatarMoeda(saldo);
};