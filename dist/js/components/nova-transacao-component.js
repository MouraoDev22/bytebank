import { TipoTransacao } from "../types/TipoTransacao.js";
import { getSaldo, atualizarSaldo } from "./saldo-component.js";
const elementoFormulario = document.querySelector('.block-nova-transacao form');
if (!elementoFormulario)
    throw new Error('Elemento formulário não encontrado');
elementoFormulario.addEventListener('submit', event => {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert('Por favor, preencha todos os campos da transação corretamente.');
        return;
    }
    ;
    const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
    if (!inputTipoTransacao)
        throw new Error('Elemento tipo de transação não encontrado');
    const inputValor = elementoFormulario.querySelector('#valor');
    if (!inputValor)
        throw new Error('Elemento valor não encontrado');
    const inputData = elementoFormulario.querySelector('#data');
    if (!inputData)
        throw new Error('Elemento data não encontrado');
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    if (isNaN(valor) || valor <= 0) {
        alert('Valor inválido');
        return;
    }
    ;
    let data = new Date(inputData.value);
    if (isNaN(data.getTime())) {
        alert('Data inválida');
        return;
    }
    ;
    let saldo = getSaldo();
    if (tipoTransacao === TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao === TipoTransacao.TRANSFERENCIA || tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert('Tipo de transação inválido!');
        return;
    }
    ;
    atualizarSaldo(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
