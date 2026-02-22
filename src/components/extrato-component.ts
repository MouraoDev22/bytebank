import Conta from "../types/Conta.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";

const elementoRegistroTransacoesExtrato: HTMLElement | null = document.querySelector<HTMLElement>('.extrato .registro-transacoes');
if (!elementoRegistroTransacoesExtrato) throw new Error('Elemento registro de transações do extrato não encontrado');

const ExtratoComponent: any = {
    atualizar(): void {
        renderizarExtrato()
    }
};

renderizarExtrato();

function renderizarExtrato(): void {
    const grupoTransacoes: GrupoTransacao[] = Conta.getGrupoTransacoes();
    
    if (!elementoRegistroTransacoesExtrato) throw new Error('Elemento registro de transações do extrato não encontrado');
    elementoRegistroTransacoesExtrato.innerHTML = '';

    let htmlRegistroTransacoes: string = '';
    
    for (let grupoTransacao of grupoTransacoes) {
        let htmlTransacaoItem: string = '';

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
        };

        htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div>
        `;
    };

    if (!htmlRegistroTransacoes) {
        htmlRegistroTransacoes = '<div>Não há transações registradas.</div>';
    };
    
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
};

export default ExtratoComponent;