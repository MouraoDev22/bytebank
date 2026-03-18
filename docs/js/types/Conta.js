import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = JSON.parse(localStorage.getItem('saldo') || '0');
    transacoes = JSON.parse(localStorage.getItem('transacoes') || '[]', (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        ;
        return value;
    });
    constructor(nome) {
        this.nome = nome;
    }
    ;
    getTitular() {
        return this.nome;
    }
    ;
    getSaldo() {
        return this.saldo;
    }
    ;
    getDataAcesso() {
        return new Date();
    }
    ;
    getGrupoTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((a, b) => b.data.getTime() - a.data.getTime());
        let labalAtualGrupoTransacao = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
            if (labelGrupoTransacao !== labalAtualGrupoTransacao) {
                labalAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            ;
            gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
        }
        ;
        return gruposTransacoes;
    }
    ;
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Tipo de transação inválido!');
        }
        ;
        this.transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
        return;
    }
    ;
    resumirTransacoes() {
        if (localStorage.getItem('resumoTransacoes')) {
            localStorage.removeItem('resumoTransacoes');
        }
        ;
        const resumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };
        const listaTransacoes = structuredClone(this.transacoes);
        const grupoDeposito = listaTransacoes.filter((transacao) => transacao.tipoTransacao === TipoTransacao.DEPOSITO);
        const grupoTransferencia = listaTransacoes.filter((transacao) => transacao.tipoTransacao === TipoTransacao.TRANSFERENCIA);
        const grupoPagamentoBoleto = listaTransacoes.filter((transacao) => transacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO);
        for (const transacao of grupoDeposito) {
            resumoTransacoes.totalDepositos += transacao.valor;
        }
        ;
        for (const transacao of grupoTransferencia) {
            resumoTransacoes.totalTransferencias += transacao.valor;
        }
        ;
        for (const transacao of grupoPagamentoBoleto) {
            resumoTransacoes.totalPagamentosBoleto += transacao.valor;
        }
        ;
        localStorage.setItem('resumoTransacoes', JSON.stringify(resumoTransacoes));
        return;
    }
    ;
    depositar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a ser depositado deve ser maior que zero!');
        }
        this.saldo += valor;
        localStorage.setItem('saldo', JSON.stringify(this.saldo));
        return;
    }
    ;
    debitar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        else if (valor > this.saldo) {
            throw new Error('Saldo insuficiente!');
        }
        ;
        this.saldo -= valor;
        localStorage.setItem('saldo', JSON.stringify(this.saldo));
        return;
    }
    ;
}
;
const conta = new Conta('Pedro Victor Braga Mourão');
export default conta;
