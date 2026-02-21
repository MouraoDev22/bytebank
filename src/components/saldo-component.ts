import { formatarMoeda } from "../utils/formatters.js";
import { SaldoComponent } from "../types/SaldoComponent.js";
import Conta from "../types/Conta.js"; 

const elementoSaldo: HTMLElement | null = document.querySelector<HTMLElement>('.saldo-valor .valor');
if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());

const SaldoComponent: SaldoComponent = {
    atualizar(): void {
        renderizarSaldo()
    }
};

renderizarSaldo();

export function renderizarSaldo(): void {    
    if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
};

export default SaldoComponent;