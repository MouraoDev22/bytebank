export function ValidarDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;

    descriptor.value = function (valorDebito: number) {
        if (valorDebito <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        } else if (valorDebito > (this as any).saldo) {
            throw new Error('Saldo insuficiente!');
        };

        originalMethod.apply(this, [valorDebito]);
    };

    return descriptor;
};

export function ValidarDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;

    descriptor.value = function (valorDeposito: number) {
        if (valorDeposito <= 0) {
            throw new Error('O valor a ser depositado deve ser maior que zero!');
        }

        originalMethod.apply(this, [valorDeposito]);
    };

    return descriptor;
};