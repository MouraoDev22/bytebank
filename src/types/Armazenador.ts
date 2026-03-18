export class Armazenador {
    private constructor() {};

    public static salvar(chave: string, valor: any): void {
        const valorComoString: string = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    };

    public static obter<T>(chave: string, reviver?: (this: any, key: string, value: any) => any): T | null {
        const valor = localStorage.getItem(chave);

        if (!valor) {
            return null;
        } else if (reviver) {
            return JSON.parse(valor, reviver) as T;
        } else {
            return JSON.parse(valor) as T;
        };
    };
};