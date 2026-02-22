import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem('saldo') || '0');
const transacoes = JSON.parse(localStorage.getItem('transacoes') || '[]', (key, value) => {
    if (key === 'data') {
        return new Date(value);
    }
    ;
    return value;
});
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGrupoTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes);
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
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Tipo de transação inválido!');
        }
        ;
        transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    }
};
function depositar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser depositado deve ser maior que zero!');
    }
    saldo += valor;
    localStorage.setItem('saldo', JSON.stringify(saldo));
}
;
function debitar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!');
    }
    else if (valor > saldo) {
        throw new Error('Saldo insuficiente!');
    }
    ;
    saldo -= valor;
    localStorage.setItem('saldo', JSON.stringify(saldo));
}
;
export default Conta;
