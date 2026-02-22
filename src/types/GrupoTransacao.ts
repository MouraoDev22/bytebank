import { Transacao } from "../types/Transacao.js";

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
};