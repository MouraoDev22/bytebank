import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
try {
    const elementoFormulario = document.querySelector('.block-nova-transacao form');
    if (!elementoFormulario)
        throw new Error('Elemento formulário não encontrado');
    elementoFormulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            throw new Error('Por favor, preencha todos os campos da transação corretamente.');
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
            throw new Error('Valor inválido');
        }
        ;
        let data = new Date(inputData.value);
        if (isNaN(data.getTime())) {
            throw new Error('Data inválida');
        }
        ;
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        elementoFormulario.reset();
    });
}
catch (error) {
    alert(error.message);
}
;
