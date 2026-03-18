import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacoes.js";
import { Armazenador } from "./Armazenador.js";
import { ValidarDebito, ValidarDeposito } from "./Decorators.js";

export class Conta {
    protected nome: string;
    protected saldo: number = Armazenador.obter<number>('saldo') || 0;
    protected transacoes: Transacao[] = Armazenador.obter<Transacao[]>(('transacoes'), (key: string, value: any) => {
        if (key === 'data') {
            return new Date(value);
        };

        return value;
    }) || [];

    constructor(nome: string) {
        this.nome = nome;
    };

    public getTitular(): string {
        return this.nome;
    };
    
    public getSaldo(): number {
        return this.saldo;
    };
    
    public getDataAcesso(): Date {
        return new Date();
    };
    
    protected getGrupoTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((a: Transacao, b: Transacao) => b.data.getTime() - a.data.getTime());
        let labalAtualGrupoTransacao: string = '';
    
    
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
                
            if (labelGrupoTransacao !== labalAtualGrupoTransacao) {
                labalAtualGrupoTransacao = labelGrupoTransacao;
                    
                gruposTransacoes.push({
                        label: labelGrupoTransacao,
                        transacoes: []
                });
            };
                
            gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
        };
        return gruposTransacoes;
        };
    
    protected registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor)
            novaTransacao.valor *= -1;
        } else {
            throw new Error('Tipo de transação inválido!');
        };
    
        this.transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes));
        return;
    };
    
    protected resumirTransacoes(): void {
        if (localStorage.getItem('resumoTransacoes')) {
                localStorage.removeItem('resumoTransacoes');
        };
            
        const resumoTransacoes: ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };
    
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const grupoDeposito: Transacao[] = listaTransacoes.filter((transacao: Transacao) => transacao.tipoTransacao === TipoTransacao.DEPOSITO);
        const grupoTransferencia: Transacao[] = listaTransacoes.filter((transacao: Transacao) => transacao.tipoTransacao === TipoTransacao.TRANSFERENCIA);
        const grupoPagamentoBoleto: Transacao[] = listaTransacoes.filter((transacao: Transacao) => transacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO);
            
        for (const transacao of grupoDeposito) {
            resumoTransacoes.totalDepositos += transacao.valor;
        };
    
        for (const transacao of grupoTransferencia) {
            resumoTransacoes.totalTransferencias += transacao.valor;
        };
    
        for (const transacao of grupoPagamentoBoleto) {
            resumoTransacoes.totalPagamentosBoleto += transacao.valor;
        };
    
        Armazenador.salvar('resumoTransacoes', JSON.stringify(resumoTransacoes));
        return;
    };
    
    @ValidarDeposito
    protected depositar(valor: number): void {
        this.saldo += valor;
        Armazenador.salvar('saldo', JSON.stringify(this.saldo));
        return;
    };
    
    @ValidarDebito
    protected debitar(valor: number): void {
        this.saldo -= valor;
        Armazenador.salvar('saldo', JSON.stringify(this.saldo));
        return;
    };
};

export class ContaPremium extends Conta {
    protected registrarTransacao(transacao: Transacao): void {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log("ganhou um bônus de 0.50 centavos");
            transacao.valor += 0.5
        };
        super.registrarTransacao(transacao)
    };
};

const conta = new Conta('Pedro Victor Braga Mourão');
const contaPremium = new ContaPremium('Pedro Victor Braga Mourão');

export default conta;