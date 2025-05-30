// Função para inicializar o construtor de etapas
document.addEventListener('DOMContentLoaded', function() {
  // Referências aos elementos
  const filtroComponentes = document.getElementById('filtroComponentes');
  const componentesList = document.querySelectorAll('.list-group-item[data-tipo-componente]');
  const colunaDeEtapas = document.querySelector('.coluna-de-etapas');
  
  // Carregar o template de etapa-card
  let etapaCardTemplate = `
<div class="card card-de-etapa mb-3 shadow-sm">
  <div class="card-body">
    <div class="cabecalho d-flex justify-content-between align-items-center">
      <div class="esquerda d-flex align-items-center gap-3">
        <div class="drag-handle">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="16" fill="none"/>
            <path d="M2.25 13.75H3.75V12.25H2.25V13.75ZM2.25 15C1.53125 15 1 14.4688 1 13.75V12.25C1 11.5625 1.53125 11 2.25 11H3.75C4.4375 11 5 11.5625 5 12.25V13.75C5 14.4688 4.4375 15 3.75 15H2.25ZM8.25 13.75H9.75V12.25H8.25V13.75ZM8.25 15C7.53125 15 7 14.4688 7 13.75V12.25C7 11.5625 7.53125 11 8.25 11H9.75C10.4375 11 11 11.5625 11 12.25V13.75C11 14.4688 10.4375 15 9.75 15H8.25ZM2.25 7.25V8.75H3.75V7.25H2.25ZM1 8.75V7.25C1 6.5625 1.53125 6 2.25 6H3.75C4.4375 6 5 6.5625 5 7.25V8.75C5 9.46875 4.4375 10 3.75 10H2.25C1.53125 10 1 9.46875 1 8.75ZM8.25 8.75H9.75V7.25H8.25V8.75ZM8.25 10C7.53125 10 7 9.46875 7 8.75V7.25C7 6.5625 7.53125 6 8.25 6H9.75C10.4375 6 11 6.5625 11 7.25V8.75C11 9.46875 10.4375 10 9.75 10H8.25ZM2.25 2.25V3.75H3.75V2.25H2.25ZM1 3.75V2.25C1 1.5625 1.53125 1 2.25 1H3.75C4.4375 1 5 1.5625 5 2.25V3.75C5 4.46875 4.4375 5 3.75 5H2.25C1.53125 5 1 4.46875 1 3.75ZM8.25 3.75H9.75V2.25H8.25V3.75ZM8.25 5C7.53125 5 7 4.46875 7 3.75V2.25C7 1.5625 7.53125 1 8.25 1H9.75C10.4375 1 11 1.5625 11 2.25V3.75C11 4.46875 10.4375 5 9.75 5H8.25Z" fill="#9CA3AF"/>
          </svg>
        </div>
        <div class="nome fw-bold fs-5">\${nome}</div>
      </div>
      <div class="direita d-flex align-items-center gap-3">
        \${datas}
        <div class="acoes d-flex gap-2">
          <button type="button" class="criar-filho btn btn-outline-primary p-0" style="width: 38px; height: 38px;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.9375 5.8125V12.0625H20.1875C20.6953 12.0625 21.125 12.4922 21.125 13C21.125 13.5469 20.6953 13.9375 20.1875 13.9375H13.9375V20.1875C13.9375 20.7344 13.5078 21.125 13 21.125C12.4531 21.125 12.0625 20.7344 12.0625 20.1875V13.9375H5.8125C5.26562 13.9375 4.875 13.5469 4.875 13C4.875 12.4922 5.26562 12.0625 5.8125 12.0625H12.0625V5.8125C12.0625 5.30469 12.4531 4.875 13 4.875C13.5078 4.875 13.9375 5.30469 13.9375 5.8125Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="excluir btn btn-outline-primary p-0 btn-excluir-etapa" style="width: 38px; height: 38px;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1641 4.875C11.0469 4.875 10.9688 4.95312 10.8906 5.03125L10.1484 6.125H15.8125L15.0703 5.03125C15.0312 4.95312 14.9141 4.875 14.7969 4.875H11.1641ZM18.0781 6.125H18.5859H20.5H20.8125C21.3203 6.125 21.75 6.55469 21.75 7.0625C21.75 7.60938 21.3203 8 20.8125 8H20.3438L19.4062 20.6953C19.2891 22.0234 18.2344 23 16.9062 23H9.05469C7.72656 23 6.67188 22.0234 6.55469 20.6953L5.61719 8H5.1875C4.64062 8 4.25 7.60938 4.25 7.0625C4.25 6.55469 4.64062 6.125 5.1875 6.125H5.5H7.375H7.88281L9.32812 3.97656C9.71875 3.39062 10.4219 3 11.1641 3H14.7969C15.5391 3 16.2422 3.39062 16.6328 3.97656L18.0781 6.125ZM18.4688 8H7.49219L8.42969 20.5781C8.46875 20.8906 8.74219 21.125 9.05469 21.125H16.9062C17.2188 21.125 17.4922 20.8906 17.5312 20.5781L18.4688 8Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="editar btn btn-outline-primary p-0" style="width: 38px; height: 38px;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.40625 17.1016C4.52344 16.7109 4.71875 16.3203 4.95312 16.0078V15.9688H4.99219C5.07031 15.8516 5.1875 15.7344 5.26562 15.6562L17.1406 3.78125C18.1172 2.80469 19.7188 2.80469 20.6953 3.78125L22.2188 5.30469C22.3359 5.42188 22.4531 5.57812 22.5312 5.69531C23.1953 6.67188 23.0781 8 22.2188 8.85938L10.3438 20.7344C10.3047 20.7734 10.2266 20.8125 10.1875 20.8906C10.1484 20.9297 10.0703 20.9688 10.0312 21.0078V21.0469H9.99219C9.67969 21.2812 9.28906 21.4766 8.89844 21.5938L5.85156 22.4922L4.17188 23C3.85938 23.0781 3.50781 23 3.27344 22.7266C3 22.4922 2.92188 22.1406 3.03906 21.8281L3.50781 20.1484L4.40625 17.1016ZM17.9609 10.4609L15.5391 8.03906L8.27344 15.3047L8.74219 17.2578L10.6953 17.7266L17.9609 10.4609ZM6.78906 17.0234L6.32031 17.3359C6.28125 17.4141 6.24219 17.5312 6.20312 17.6484L5.92969 18.5469L5.30469 20.6953L7.45312 20.0703L8.35156 19.7969C8.46875 19.7578 8.58594 19.7188 8.66406 19.6797L8.97656 19.25L7.76562 18.9375C7.41406 18.8594 7.14062 18.5859 7.0625 18.2344L6.78906 17.0234ZM15.3047 11.5547L11.5547 15.3047C11.3203 15.5391 10.8906 15.5391 10.6562 15.3047C10.4219 15.0703 10.4219 14.6797 10.6562 14.4453L14.4062 10.6953C14.6406 10.4219 15.0703 10.4219 15.3047 10.6953C15.5391 10.9297 15.5391 11.3203 15.3047 11.5547Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="children"></div>
  </div>
</div>`;
  
  // Configurar o botão Salvar do modal de etapas
  const btnSalvarEtapa = document.querySelector('#modalEtapas .modal-footer .btn-primary');
  if (btnSalvarEtapa) {
    btnSalvarEtapa.addEventListener('click', function() {
      // Obter os valores do formulário
      const nomeEtapa = document.getElementById('nomeEtapa').value;
      const dataInicio = document.getElementById('dataInicio').value;
      const dataFim = document.getElementById('dataFim').value;
      
      // Formatar as datas para exibição (DD/MM/AAAA HH:mm)
      const dataInicioFormatada = dataInicio ? formatarData(dataInicio) : 'DD/MM/AAAA HH:mm';
      const dataFimFormatada = dataFim ? formatarData(dataFim) : 'DD/MM/AAAA HH:mm';
      
      // Adicionar nova etapa com os dados do formulário
      adicionarNovaEtapa(null, nomeEtapa || 'Nova etapa', null, dataInicioFormatada, dataFimFormatada);
      
      // Limpar o formulário
      document.getElementById('nomeEtapa').value = '';
      document.getElementById('dataInicio').value = '';
      document.getElementById('dataFim').value = '';
      
      // Fechar o modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalEtapas'));
      modal.hide();
    });
  }
  
  // Função para formatar data no formato DD/MM/AAAA HH:mm
  function formatarData(dataString) {
    if (!dataString) return 'DD/MM/AAAA HH:mm';
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }
  
  // Inicializar Sortable para permitir arrastar e soltar os cards
  let sortableInstance;
  if (colunaDeEtapas && typeof Sortable !== 'undefined') {
    sortableInstance = Sortable.create(colunaDeEtapas, {
      animation: 150,
      handle: '.drag-handle',
      ghostClass: 'card-de-etapa-ghost',
      chosenClass: 'card-de-etapa-chosen',
      dragClass: 'card-de-etapa-drag',
      forceFallback: false,
      fallbackTolerance: 3,
      scrollSpeed: 40,
      scrollSensitivity: 80,
      onStart: function(evt) {
        document.body.classList.add('dragging-card');
      },
      onEnd: function(evt) {
        document.body.classList.remove('dragging-card');
        console.log('Nova ordem estabelecida');
        
        const item = evt.item;
        item.classList.add('highlight-card');
        setTimeout(() => {
          item.classList.remove('highlight-card');
        }, 800);
      }
    });
  }
  
  // Filtrar componentes
  if (filtroComponentes) {
    filtroComponentes.addEventListener('input', function() {
      const termo = this.value.toLowerCase().trim();
      
      componentesList.forEach(item => {
        const titulo = item.querySelector('.fw-bold').textContent.toLowerCase();
        const descricao = item.querySelector('.text-muted').textContent.toLowerCase();
        
        if (titulo.includes(termo) || descricao.includes(termo)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  
  // Adicionar evento de clique aos componentes
  componentesList.forEach(componente => {
    componente.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obter o tipo de componente
      const tipoComponente = this.getAttribute('data-tipo-componente');
      
      // Criar e mostrar o modal de edição do componente
      const modalHtml = createComponentEditModal(tipoComponente);
      if (modalHtml) {
        // Remover modal existente se houver
        const existingModal = document.getElementById(`modalEdit${tipoComponente}`);
        if (existingModal) {
          existingModal.remove();
        }
        
        // Adicionar novo modal ao DOM
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Mostrar o modal
        const modal = new bootstrap.Modal(document.getElementById(`modalEdit${tipoComponente}`));
        modal.show();
        
        // Adicionar evento para salvar
        const form = document.getElementById(`formEdit${tipoComponente}`);
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          saveComponentEdit(tipoComponente);
        });
      }
    });
  });
  
  // Função para adicionar nova etapa
  function adicionarNovaEtapa(tipo, nome, parentElement = null, dataInicio = 'DD/MM/AAAA HH:mm', dataFim = 'DD/MM/AAAA HH:mm') {
    // Formatar as datas para exibição
    const datas = !parentElement ? `
      <div class="datas opacity-75">
        <span class="data-ini">${dataInicio}</span>
        <span class="mx-1 opacity-50">-</span>
        <span class="data-fim">${dataFim}</span>
      </div>
    ` : '';
    
    // Determinar qual template usar baseado no tipo
    let novaEtapaHTML;
    if (tipo === 'logica') {
      novaEtapaHTML = createLogicTemplate(nome);
    } else {
      novaEtapaHTML = createInputTemplate(nome, datas);
    }
    
    // Determinar onde adicionar a nova etapa
    if (parentElement) {
      // Adicionar como filho de outro card
      parentElement.insertAdjacentHTML('beforeend', novaEtapaHTML);
      
      // Obter o card recém-adicionado
      const novoCard = parentElement.lastElementChild;
      
      // Adicionar o conteúdo específico do componente após criar o card
      if (tipo) {
        const childrenDiv = novoCard.querySelector('.children');
        childrenDiv.innerHTML = `<div class="componente-${tipo}"></div>`;
      }
      
      // Adicionar evento para excluir etapa
      configurarEventosCard(novoCard);
      
      // Inicializar Sortable para os filhos, se ainda não estiver inicializado
      inicializarSortableFilhos(parentElement);
    } else {
      // Adicionar a nova etapa à coluna principal
      colunaDeEtapas.insertAdjacentHTML('beforeend', novaEtapaHTML);
      
      // Obter o card recém-adicionado
      const novoCard = colunaDeEtapas.lastElementChild;
      
      // Adicionar o conteúdo específico do componente após criar o card
      if (tipo) {
        const childrenDiv = novoCard.querySelector('.children');
        childrenDiv.innerHTML = `<div class="componente-${tipo}"></div>`;
      }
      
      // Adicionar evento para excluir etapa
      configurarEventosCard(novoCard);
      
      // Atualizar o Sortable para incluir o novo elemento
      if (sortableInstance) {
        sortableInstance.option("animation", 150);
      }
    }
  }
  
  // Função para configurar eventos em um card
  function configurarEventosCard(card) {
    // Configurar botão de excluir
    const btnExcluir = card.querySelector('.btn-excluir-etapa');
    if (btnExcluir) {
      btnExcluir.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja excluir esta etapa?')) {
          this.closest('.card-de-etapa').remove();
        }
      });
    }
    
    // Configurar botão de criar filho
    const btnCriarFilho = card.querySelector('.criar-filho');
    if (btnCriarFilho) {
      btnCriarFilho.addEventListener('click', function() {
        // Remove active class from all create-child buttons
        document.querySelectorAll('.criar-filho').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Armazenar referência ao card pai para uso posterior - guardando em uma variável mais segura
        const cardPai = this.closest('.card-de-etapa');
        const childrenContainer = cardPai.querySelector('.children');
        
        // Remover eventos anteriores e adicionar novos com função simplificada
        document.querySelectorAll('.list-group-item[data-tipo-componente]').forEach(item => {
          // Limpar eventos anteriores
          const clone = item.cloneNode(true);
          
          // Adicionar evento de clique diretamente com referência ao container específico
          clone.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter tipo do componente
            const tipoComponente = this.getAttribute('data-tipo-componente');
            console.log('Componente selecionado:', tipoComponente);
            
            // Fechar o modal de componentes
            const modalComponentes = bootstrap.Modal.getInstance(document.getElementById('modalComponentes'));
            modalComponentes.hide();
            
            // Criar e mostrar o modal de edição do componente
            const modalHtml = createComponentEditModal(tipoComponente);
            if (modalHtml) {
              // Remover modal existente se houver
              const existingModal = document.getElementById(`modalEdit${tipoComponente}`);
              if (existingModal) {
                existingModal.remove();
              }
              
              // Adicionar novo modal ao DOM
              document.body.insertAdjacentHTML('beforeend', modalHtml);
              
              // Obter referências ao modal e ao formulário
              const modalEdit = document.getElementById(`modalEdit${tipoComponente}`);
              const form = document.getElementById(`formEdit${tipoComponente}`);
              
              // Configurar o botão de salvar para submeter o formulário
              const btnSalvar = modalEdit.querySelector('.modal-footer .btn-primary');
              if (btnSalvar) {
                btnSalvar.addEventListener('click', function() {
                  form.dispatchEvent(new Event('submit'));
                });
              }
              
              // Adicionar evento de submit ao formulário
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obter os dados do formulário
                const formData = new FormData(form);
                const nomeComponente = formData.get('name') || `Componente ${tipoComponente}`;
                
                // Processar os dados do componente
                saveComponentEdit(tipoComponente);
                
                // Adicionar o componente à etapa usando a referência local
                console.log('Adicionando componente após edição:', tipoComponente, nomeComponente);
                adicionarNovaEtapa(tipoComponente, nomeComponente, childrenContainer);
                
                // Fechar o modal de edição
                const bsModalEdit = bootstrap.Modal.getInstance(modalEdit);
                bsModalEdit.hide();
              });
              
              // Mostrar o modal de edição
              const bsModalEdit = new bootstrap.Modal(modalEdit);
              bsModalEdit.show();
            } else {
              // Fallback - se não conseguir criar o modal, adiciona o componente direto
              console.log('Adicionando componente filho direto (fallback):', tipoComponente);
              adicionarNovaEtapa(tipoComponente, `Componente ${tipoComponente}`, childrenContainer);
            }
          });
          
          // Substituir o elemento original
          item.parentNode.replaceChild(clone, item);
        });
        
        // Abrir o modal de componentes
        const modalComponentes = new bootstrap.Modal(document.getElementById('modalComponentes'));
        modalComponentes.show();
      });
    }
    
    // Configurar botão de editar
    const btnEditar = card.querySelector('.editar');
    if (btnEditar) {
      btnEditar.addEventListener('click', function() {
        // Obter o tipo do componente a partir da div children
        const childrenDiv = this.closest('.card-de-etapa').querySelector('.children');
        const componenteDiv = childrenDiv.firstElementChild;
        if (componenteDiv) {
          // Extrair o tipo do componente da classe (ex: componente-texto -> texto)
          const tipoComponente = componenteDiv.className.replace('componente-', '');
          console.log('Editando componente do tipo:', tipoComponente);
          
          // Criar e mostrar o modal de edição
          const modalHtml = createComponentEditModal(tipoComponente);
          if (modalHtml) {
            // Remover modal existente se houver
            const existingModal = document.getElementById(`modalEdit${tipoComponente}`);
            if (existingModal) {
              existingModal.remove();
            }
            
            // Adicionar novo modal ao DOM
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Obter referências ao modal e ao formulário
            const modalEdit = document.getElementById(`modalEdit${tipoComponente}`);
            const form = document.getElementById(`formEdit${tipoComponente}`);
            
            // Preencher o formulário com os dados atuais do componente
            const nomeComponente = this.closest('.card-de-etapa').querySelector('.nome').textContent;
            form.querySelector('[name="name"]').value = nomeComponente;
            
            // Configurar o botão de salvar para submeter o formulário
            const btnSalvar = modalEdit.querySelector('.modal-footer .btn-primary');
            if (btnSalvar) {
              btnSalvar.addEventListener('click', function() {
                form.dispatchEvent(new Event('submit'));
              });
            }
            
            // Adicionar evento de submit ao formulário
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              
              // Obter os dados do formulário
              const formData = new FormData(form);
              const novoNome = formData.get('name') || nomeComponente;
              
              // Processar os dados do componente
              saveComponentEdit(tipoComponente);
              
              // Atualizar o nome do componente na interface
              this.closest('.card-de-etapa').querySelector('.nome').textContent = novoNome;
              
              // Fechar o modal
              const bsModalEdit = bootstrap.Modal.getInstance(modalEdit);
              bsModalEdit.hide();
            });
            
            // Mostrar o modal
            const bsModalEdit = new bootstrap.Modal(modalEdit);
            bsModalEdit.show();
          }
        }
      });
    }
  }
  
  // Função para inicializar Sortable nos filhos
  function inicializarSortableFilhos(childrenContainer) {
    if (typeof Sortable !== 'undefined') {
      Sortable.create(childrenContainer, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'card-de-etapa-ghost',
        chosenClass: 'card-de-etapa-chosen',
        dragClass: 'card-de-etapa-drag',
        group: 'nested',
        onStart: function(evt) {
          document.body.classList.add('dragging-card');
        },
        onEnd: function(evt) {
          document.body.classList.remove('dragging-card');
          
          const item = evt.item;
          item.classList.add('highlight-card');
          setTimeout(() => {
            item.classList.remove('highlight-card');
          }, 800);
        }
      });
    }
  }
  
  // Configurar eventos para os cards existentes na inicialização
  document.querySelectorAll('.card-de-etapa').forEach(card => {
    configurarEventosCard(card);
    
    // Inicializar Sortable para os filhos existentes
    const childrenContainer = card.querySelector('.children');
    if (childrenContainer) {
      inicializarSortableFilhos(childrenContainer);
    }
  });
});

// Template para etapa de input
function createInputTemplate(nome, datas = '') {
  return `
<div class="card card-de-etapa mb-3 shadow-sm">
  <div class="card-body">
    <div class="cabecalho d-flex justify-content-between align-items-center">
      <div class="esquerda d-flex align-items-center gap-3">
        <div class="drag-handle">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="16" fill="none"/>
            <path d="M2.25 13.75H3.75V12.25H2.25V13.75ZM2.25 15C1.53125 15 1 14.4688 1 13.75V12.25C1 11.5625 1.53125 11 2.25 11H3.75C4.4375 11 5 11.5625 5 12.25V13.75C5 14.4688 4.4375 15 3.75 15H2.25ZM8.25 13.75H9.75V12.25H8.25V13.75ZM8.25 15C7.53125 15 7 14.4688 7 13.75V12.25C7 11.5625 7.53125 11 8.25 11H9.75C10.4375 11 11 11.5625 11 12.25V13.75C11 14.4688 10.4375 15 9.75 15H8.25ZM2.25 7.25V8.75H3.75V7.25H2.25ZM1 8.75V7.25C1 6.5625 1.53125 6 2.25 6H3.75C4.4375 6 5 6.5625 5 7.25V8.75C5 9.46875 4.4375 10 3.75 10H2.25C1.53125 10 1 9.46875 1 8.75ZM8.25 8.75H9.75V7.25H8.25V8.75ZM8.25 10C7.53125 10 7 9.46875 7 8.75V7.25C7 6.5625 7.53125 6 8.25 6H9.75C10.4375 6 11 6.5625 11 7.25V8.75C11 9.46875 10.4375 10 9.75 10H8.25ZM2.25 2.25V3.75H3.75V2.25H2.25ZM1 3.75V2.25C1 1.5625 1.53125 1 2.25 1H3.75C4.4375 1 5 1.5625 5 2.25V3.75C5 4.46875 4.4375 5 3.75 5H2.25C1.53125 5 1 4.46875 1 3.75ZM8.25 3.75H9.75V2.25H8.25V3.75ZM8.25 5C7.53125 5 7 4.46875 7 3.75V2.25C7 1.5625 7.53125 1 8.25 1H9.75C10.4375 1 11 1.5625 11 2.25V3.75C11 4.46875 10.4375 5 9.75 5H8.25Z" fill="#9CA3AF"/>
          </svg>
        </div>
        <div class="nome fw-bold fs-5">${nome}</div>
      </div>
      <div class="direita d-flex align-items-center gap-3">
        ${datas}
        <div class="acoes d-flex gap-2">
          <button type="button" class="criar-filho btn btn-outline-primary p-0" style="width: 38px; height: 38px;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.9375 5.8125V12.0625H20.1875C20.6953 12.0625 21.125 12.4922 21.125 13C21.125 13.5469 20.6953 13.9375 20.1875 13.9375H13.9375V20.1875C13.9375 20.7344 13.5078 21.125 13 21.125C12.4531 21.125 12.0625 20.7344 12.0625 20.1875V13.9375H5.8125C5.26562 13.9375 4.875 13.5469 4.875 13C4.875 12.4922 5.26562 12.0625 5.8125 12.0625H12.0625V5.8125C12.0625 5.30469 12.4531 4.875 13 4.875C13.5078 4.875 13.9375 5.30469 13.9375 5.8125Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="excluir btn btn-outline-primary p-0 btn-excluir-etapa" style="width: 38px; height: 38px;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1641 4.875C11.0469 4.875 10.9688 4.95312 10.8906 5.03125L10.1484 6.125H15.8125L15.0703 5.03125C15.0312 4.95312 14.9141 4.875 14.7969 4.875H11.1641ZM18.0781 6.125H18.5859H20.5H20.8125C21.3203 6.125 21.75 6.55469 21.75 7.0625C21.75 7.60938 21.3203 8 20.8125 8H20.3438L19.4062 20.6953C19.2891 22.0234 18.2344 23 16.9062 23H9.05469C7.72656 23 6.67188 22.0234 6.55469 20.6953L5.61719 8H5.1875C4.64062 8 4.25 7.60938 4.25 7.0625C4.25 6.55469 4.64062 6.125 5.1875 6.125H5.5H7.375H7.88281L9.32812 3.97656C9.71875 3.39062 10.4219 3 11.1641 3H14.7969C15.5391 3 16.2422 3.39062 16.6328 3.97656L18.0781 6.125ZM18.4688 8H7.49219L8.42969 20.5781C8.46875 20.8906 8.74219 21.125 9.05469 21.125H16.9062C17.2188 21.125 17.4922 20.8906 17.5312 20.5781L18.4688 8Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="editar btn btn-outline-primary p-0" style="width: 38px; height: 38px;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.40625 17.1016C4.52344 16.7109 4.71875 16.3203 4.95312 16.0078V15.9688H4.99219C5.07031 15.8516 5.1875 15.7344 5.26562 15.6562L17.1406 3.78125C18.1172 2.80469 19.7188 2.80469 20.6953 3.78125L22.2188 5.30469C22.3359 5.42188 22.4531 5.57812 22.5312 5.69531C23.1953 6.67188 23.0781 8 22.2188 8.85938L10.3438 20.7344C10.3047 20.7734 10.2266 20.8125 10.1875 20.8906C10.1484 20.9297 10.0703 20.9688 10.0312 21.0078V21.0469H9.99219C9.67969 21.2812 9.28906 21.4766 8.89844 21.5938L5.85156 22.4922L4.17188 23C3.85938 23.0781 3.50781 23 3.27344 22.7266C3 22.4922 2.92188 22.1406 3.03906 21.8281L3.50781 20.1484L4.40625 17.1016ZM17.9609 10.4609L15.5391 8.03906L8.27344 15.3047L8.74219 17.2578L10.6953 17.7266L17.9609 10.4609ZM6.78906 17.0234L6.32031 17.3359C6.28125 17.4141 6.24219 17.5312 6.20312 17.6484L5.92969 18.5469L5.30469 20.6953L7.45312 20.0703L8.35156 19.7969C8.46875 19.7578 8.58594 19.7188 8.66406 19.6797L8.97656 19.25L7.76562 18.9375C7.41406 18.8594 7.14062 18.5859 7.0625 18.2344L6.78906 17.0234ZM15.3047 11.5547L11.5547 15.3047C11.3203 15.5391 10.8906 15.5391 10.6562 15.3047C10.4219 15.0703 10.4219 14.6797 10.6562 14.4453L14.4062 10.6953C14.6406 10.4219 15.0703 10.4219 15.3047 10.6953C15.5391 10.9297 15.5391 11.3203 15.3047 11.5547Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="children"></div>
  </div>
</div>`;
}

// Template para etapa de lógica
function createLogicTemplate(nome) {
  return `
<div class="card card-de-etapa card-de-logica mb-3 shadow-sm" style="background-color: #E8DCF4; border-color: #C8AEEA;">
  <div class="card-body">
    <div class="cabecalho d-flex justify-content-between align-items-center">
      <div class="esquerda d-flex align-items-center gap-3">
        <div class="drag-handle">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="16" fill="none"/>
            <path d="M2.25 13.75H3.75V12.25H2.25V13.75ZM2.25 15C1.53125 15 1 14.4688 1 13.75V12.25C1 11.5625 1.53125 11 2.25 11H3.75C4.4375 11 5 11.5625 5 12.25V13.75C5 14.4688 4.4375 15 3.75 15H2.25ZM8.25 13.75H9.75V12.25H8.25V13.75ZM8.25 15C7.53125 15 7 14.4688 7 13.75V12.25C7 11.5625 7.53125 11 8.25 11H9.75C10.4375 11 11 11.5625 11 12.25V13.75C11 14.4688 10.4375 15 9.75 15H8.25ZM2.25 7.25V8.75H3.75V7.25H2.25ZM1 8.75V7.25C1 6.5625 1.53125 6 2.25 6H3.75C4.4375 6 5 6.5625 5 7.25V8.75C5 9.46875 4.4375 10 3.75 10H2.25C1.53125 10 1 9.46875 1 8.75ZM8.25 8.75H9.75V7.25H8.25V8.75ZM8.25 10C7.53125 10 7 9.46875 7 8.75V7.25C7 6.5625 7.53125 6 8.25 6H9.75C10.4375 6 11 6.5625 11 7.25V8.75C11 9.46875 10.4375 10 9.75 10H8.25ZM2.25 2.25V3.75H3.75V2.25H2.25ZM1 3.75V2.25C1 1.5625 1.53125 1 2.25 1H3.75C4.4375 1 5 1.5625 5 2.25V3.75C5 4.46875 4.4375 5 3.75 5H2.25C1.53125 5 1 4.46875 1 3.75ZM8.25 3.75H9.75V2.25H8.25V3.75ZM8.25 5C7.53125 5 7 4.46875 7 3.75V2.25C7 1.5625 7.53125 1 8.25 1H9.75C10.4375 1 11 1.5625 11 2.25V3.75C11 4.46875 10.4375 5 9.75 5H8.25Z" fill="#5811B4"/>
          </svg>
        </div>
        <div class="nome fw-bold fs-5" style="color: #5811B4;">${nome}</div>
      </div>
      <div class="direita d-flex align-items-center gap-3">
        <div class="acoes d-flex gap-2">
          <button type="button" class="criar-filho btn btn-outline-primary p-0" style="width: 38px; height: 38px; color: #5811B4; border-color: #5811B4;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.9375 5.8125V12.0625H20.1875C20.6953 12.0625 21.125 12.4922 21.125 13C21.125 13.5469 20.6953 13.9375 20.1875 13.9375H13.9375V20.1875C13.9375 20.7344 13.5078 21.125 13 21.125C12.4531 21.125 12.0625 20.7344 12.0625 20.1875V13.9375H5.8125C5.26562 13.9375 4.875 13.5469 4.875 13C4.875 12.4922 5.26562 12.0625 5.8125 12.0625H12.0625V5.8125C12.0625 5.30469 12.4531 4.875 13 4.875C13.5078 4.875 13.9375 5.30469 13.9375 5.8125Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="excluir btn btn-outline-primary p-0" style="width: 38px; height: 38px; color: #5811B4; border-color: #5811B4;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1641 4.875C11.0469 4.875 10.9688 4.95312 10.8906 5.03125L10.1484 6.125H15.8125L15.0703 5.03125C15.0312 4.95312 14.9141 4.875 14.7969 4.875H11.1641ZM18.0781 6.125H18.5859H20.5H20.8125C21.3203 6.125 21.75 6.55469 21.75 7.0625C21.75 7.60938 21.3203 8 20.8125 8H20.3438L19.4062 20.6953C19.2891 22.0234 18.2344 23 16.9062 23H9.05469C7.72656 23 6.67188 22.0234 6.55469 20.6953L5.61719 8H5.1875C4.64062 8 4.25 7.60938 4.25 7.0625C4.25 6.55469 4.64062 6.125 5.1875 6.125H5.5H7.375H7.88281L9.32812 3.97656C9.71875 3.39062 10.4219 3 11.1641 3H14.7969C15.5391 3 16.2422 3.39062 16.6328 3.97656L18.0781 6.125ZM18.4688 8H7.49219L8.42969 20.5781C8.46875 20.8906 8.74219 21.125 9.05469 21.125H16.9062C17.2188 21.125 17.4922 20.8906 17.5312 20.5781L18.4688 8Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="editar btn btn-outline-primary p-0" style="width: 38px; height: 38px; color: #5811B4; border-color: #5811B4;">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.40625 17.1016C4.52344 16.7109 4.71875 16.3203 4.95312 16.0078V15.9688H4.99219C5.07031 15.8516 5.1875 15.7344 5.26562 15.6562L17.1406 3.78125C18.1172 2.80469 19.7188 2.80469 20.6953 3.78125L22.2188 5.30469C22.3359 5.42188 22.4531 5.57812 22.5312 5.69531C23.1953 6.67188 23.0781 8 22.2188 8.85938L10.3438 20.7344C10.3047 20.7734 10.2266 20.8125 10.1875 20.8906C10.1484 20.9297 10.0703 20.9688 10.0312 21.0078V21.0469H9.99219C9.67969 21.2812 9.28906 21.4766 8.89844 21.5938L5.85156 22.4922L4.17188 23C3.85938 23.0781 3.50781 23 3.27344 22.7266C3 22.4922 2.92188 22.1406 3.03906 21.8281L3.50781 20.1484L4.40625 17.1016ZM17.9609 10.4609L15.5391 8.03906L8.27344 15.3047L8.74219 17.2578L10.6953 17.7266L17.9609 10.4609ZM6.78906 17.0234L6.32031 17.3359C6.28125 17.4141 6.24219 17.5312 6.20312 17.6484L5.92969 18.5469L5.30469 20.6953L7.45312 20.0703L8.35156 19.7969C8.46875 19.7578 8.58594 19.7188 8.66406 19.6797L8.97656 19.25L7.76562 18.9375C7.41406 18.8594 7.14062 18.5859 7.0625 18.2344L6.78906 17.0234ZM15.3047 11.5547L11.5547 15.3047C11.3203 15.5391 10.8906 15.5391 10.6562 15.3047C10.4219 15.0703 10.4219 14.6797 10.6562 14.4453L14.4062 10.6953C14.6406 10.4219 15.0703 10.4219 15.3047 10.6953C15.5391 10.9297 15.5391 11.3203 15.3047 11.5547Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="children"></div>
  </div>
</div>`;
} 