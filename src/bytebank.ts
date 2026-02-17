{
let saldo: number = 3000;

const elementoSaldo: HTMLElement | null = document.querySelector<HTMLElement>('.saldo-valor .valor');
if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = `R$ ${saldo.toFixed(2)}`;

const elementoFormulario: HTMLFormElement | null = document.querySelector<HTMLFormElement>('.block-nova-transacao form');
if (!elementoFormulario) throw new Error('Elemento formulário não encontrado');
elementoFormulario.addEventListener('submit', event => {
    event.preventDefault();

    if (!elementoFormulario.checkValidity()) {
        alert('Por favor, preencha todos os campos da transação corretamente.');
        return;
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
    alert('Valor inválido');
    return;
    };
    
    let data: Date = new Date(inputData.value);
    if (isNaN(data.getTime())) {
    alert('Data inválida');
    return;
    };

    if (tipoTransacao === 'Depósito') {
        saldo += valor;
    } else if (tipoTransacao === 'Transferência' || tipoTransacao === 'Pagamento de Boleto') {
        saldo -= valor;
    } else {
        alert('Tipo de transação inválido!');
        return;
    };

    elementoSaldo.textContent = `R$ ${saldo.toFixed(2)}`;

    const novaTransacao: Transacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };

    console.log(novaTransacao);

    elementoFormulario.reset();
});

type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
};

enum TipoTransacao {
    DEPOSITO = 'Depósito',
    TRANSFERENCIA = 'Transferência',
    PAGAMENTO_BOLETO = 'Pagamento de Boleto',
};
}