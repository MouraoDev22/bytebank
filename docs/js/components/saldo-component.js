import { formatarMoeda } from "../utils/formatters.js";
import conta from "../types/Conta.js";
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (!elementoSaldo)
    throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
        return;
    }
};
renderizarSaldo();
export function renderizarSaldo() {
    if (!elementoSaldo)
        throw new Error('Elemento saldo não encontrado');
    elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
    return;
}
;
export default SaldoComponent;
