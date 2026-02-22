import Conta from "../types/Conta.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
const elementoRegistroTransacoesExtrato = document.querySelector('.extrato .registro-transacoes');
if (!elementoRegistroTransacoesExtrato)
    throw new Error('Elemento registro de transações do extrato não encontrado');
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
renderizarExtrato();
function renderizarExtrato() {
    const grupoTransacoes = Conta.getGrupoTransacoes();
    if (!elementoRegistroTransacoesExtrato)
        throw new Error('Elemento registro de transações do extrato não encontrado');
    elementoRegistroTransacoesExtrato.innerHTML = '';
    let htmlRegistroTransacoes = '';
    for (let grupoTransacao of grupoTransacoes) {
        let htmlTransacaoItem = '';
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
            <div class="transacao-item">
                <div class="transacao-info">
                    <span class="tipo">${transacao.tipoTransacao}</span>
                    <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                </div>
                <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
             </div>
            `;
        }
        ;
        htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div>
        `;
    }
    ;
    if (!htmlRegistroTransacoes) {
        htmlRegistroTransacoes = '<div>Não há transações registradas.</div>';
    }
    ;
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
;
export default ExtratoComponent;
