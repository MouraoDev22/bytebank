import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacoes.js";

let saldo: number = JSON.parse(localStorage.getItem('saldo') || '0');
const transacoes: Transacao[] = JSON.parse(localStorage.getItem('transacoes') || '[]', (key: string, value: any) => {
    if (key === 'data') {
        return new Date(value);
    };

    return value;
});

const Conta: any = {    
    getSaldo(): number {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    getGrupoTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((a: Transacao, b: Transacao) => b.data.getTime() - a.data.getTime());
        let labalAtualGrupoTransacao: string = '';


        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
            
            if (labelGrupoTransacao !== labalAtualGrupoTransacao) {
                labalAtualGrupoTransacao = labelGrupoTransacao;
                
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            };
            
            gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
        };
        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error('Tipo de transação inválido!');
        };

        transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    },

    resumirTransacoes(): void {
        if (localStorage.getItem('resumoTransacoes')) {
            localStorage.removeItem('resumoTransacoes');
        };
        
        const resumoTransacoes: ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };

        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const grupoDeposito: Transacao[] = listaTransacoes.filter((transacao: Transacao) => transacao.tipoTransacao === TipoTransacao.DEPOSITO);
        const grupoTransferencia: Transacao[] = listaTransacoes.filter((transacao: Transacao) => transacao.tipoTransacao === TipoTransacao.TRANSFERENCIA);
        const grupoPagamentoBoleto: Transacao[] = listaTransacoes.filter((transacao: Transacao) => transacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO);
        
        for (const transacao of grupoDeposito) {
            resumoTransacoes.totalDepositos += transacao.valor;
        };

        for (const transacao of grupoTransferencia) {
            resumoTransacoes.totalTransferencias += transacao.valor;
        };

        for (const transacao of grupoPagamentoBoleto) {
            resumoTransacoes.totalPagamentosBoleto += transacao.valor;
        };

        localStorage.setItem('resumoTransacoes', JSON.stringify(resumoTransacoes));
    }
};

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error('O valor a ser depositado deve ser maior que zero!');
    }

    saldo += valor;
    localStorage.setItem('saldo', JSON.stringify(saldo));
};

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!');
    } else if (valor > saldo) {
        throw new Error('Saldo insuficiente!');
    };

    saldo -= valor;
    localStorage.setItem('saldo', JSON.stringify(saldo));
};

export default Conta;