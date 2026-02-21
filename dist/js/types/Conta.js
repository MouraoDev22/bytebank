import { TipoTransacao } from "./TipoTransacao.js";
let saldo = 10000;
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
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Tipo de transação inválido!');
        }
        ;
        transacoes.push(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    }
};
function depositar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser depositado deve ser maior que zero!');
    }
    saldo += valor;
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
}
;
export default Conta;
