const elementoRoot: HTMLElement | null = document.documentElement;
if (!elementoRoot) throw new Error('Elemento root não encontrado');

const DarkModeComponent: any = {
    ativarModoEscuro(): void {
        elementoRoot.style.setProperty('--cor-quaternaria', '#1F2A1F');
        elementoRoot.style.setProperty('--cor-fundo-component', '#121212');
        
        console.log('Modo escuro ativado');
    },

    ativarModoClaro(): void {
        elementoRoot.style.setProperty('--cor-fundo', '#FFFFFF');
        elementoRoot.style.setProperty('--cor-texto', '#000000');
        
        console.log('Modo claro ativado');
    }
};

export default DarkModeComponent;