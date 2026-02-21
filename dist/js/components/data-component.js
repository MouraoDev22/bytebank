import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (!elementoDataAcesso)
    throw new Error('Elemento data de acesso não encontrado');
elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
const DataComponent = {
    atualizar() {
        renderizarData();
    }
};
renderizarData();
export function renderizarData() {
    if (!elementoDataAcesso)
        throw new Error('Elemento data de acesso não encontrado');
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
;
export default DataComponent;
