import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import { DataComponent } from "../types/DataComponent.js";
import Conta from "../types/Conta.js"; 

const elementoDataAcesso: HTMLElement | null = document.querySelector<HTMLElement>('.block-saldo time');
if (!elementoDataAcesso) throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);

const DataComponent: DataComponent = {
    atualizar(): void {
        renderizarData()
    }
};

renderizarData();

export function renderizarData(): void {    
    if (!elementoDataAcesso) throw new Error('Elemento data de acesso não encontrado');
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
};

export default DataComponent;