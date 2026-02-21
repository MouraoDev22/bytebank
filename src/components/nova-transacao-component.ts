import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";

const elementoFormulario: HTMLFormElement | null = document.querySelector<HTMLFormElement>('.block-nova-transacao form');
if (!elementoFormulario) throw new Error('Elemento formulário não encontrado');
elementoFormulario.addEventListener('submit', event => {
    try {    
        event.preventDefault();

        if (!elementoFormulario.checkValidity()) {
            throw new Error('Formulário não preenchido! Por favor, preencha todos os campos da transação corretamente.');
        };

        const inputTipoTransacao: HTMLSelectElement | null = elementoFormulario.querySelector<HTMLSelectElement>('#tipoTransacao');
        if (!inputTipoTransacao) throw new Error('Elemento tipo de transação não encontrado');
    
        const inputValor: HTMLInputElement | null = elementoFormulario.querySelector<HTMLInputElement>('#valor');
        if (!inputValor) throw new Error('Elemento valor não encontrado');

        const inputData: HTMLInputElement | null = elementoFormulario.querySelector<HTMLInputElement>('#data');
        if (!inputData) throw new Error('Elemento data não encontrado');

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
    
        let valor: number = inputValor.valueAsNumber;
        if (isNaN(valor) || valor <= 0) {
        throw new Error('Valor inválido');
        };
    
        let data: Date = new Date(inputData.value);
        if (isNaN(data.getTime())) {
        throw new Error('Data inválida');
        };

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };

        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        elementoFormulario.reset();
    } catch(error: any) {
        alert(error.message);
    };
});