let saldo: number = 3000;

const elementoSaldo: HTMLElement | null = document.querySelector<HTMLElement>('.saldo-valor .valor');
if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = formatarMoeda(saldo);

const elementoDataAcesso: HTMLElement | null = document.querySelector<HTMLElement>('.block-saldo time');
if (!elementoDataAcesso) throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = formatarData(new Date());