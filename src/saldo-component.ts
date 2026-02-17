let saldo: number = 3000;

const elementoSaldo: HTMLElement | null = document.querySelector<HTMLElement>('.saldo-valor .valor');
if (!elementoSaldo) throw new Error('Elemento saldo não encontrado');
elementoSaldo.textContent = `R$ ${saldo.toFixed(2)}`;