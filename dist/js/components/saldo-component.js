import { formatarMoeda } from "../utils/formatters.js";
import Conta from "../types/Conta.js";
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (!elementoSaldo)
    throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
renderizarSaldo();
export function renderizarSaldo() {
    if (!elementoSaldo)
        throw new Error('Elemento saldo não encontrado');
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
}
;
export default SaldoComponent;
