// Component types and their configurations
const COMPONENT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  SELECT: 'select',
  MULTI_SELECT: 'multi_select',
  FILE: 'file',
  ACCEPT: 'accept',
  OBSERVATION: 'observation',
  CONDITIONAL: 'conditional',
  CPF: 'cpf',
  EMAIL: 'email',
  ENDERECO: 'endereco'
};

// Component configurations
const COMPONENT_CONFIGS = {
  [COMPONENT_TYPES.TEXT]: {
    name: 'Texto simples',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para entrada de texto simples',
    modalFields: [
      { type: 'text', name: 'maxLength', label: 'Tamanho máximo de caracteres', required: false },
      { type: 'text', name: 'pattern', label: 'Padrão de validação (regex)', required: false },
      { type: 'text', name: 'placeholder', label: 'Texto de exemplo', required: false }
    ]
  },
  [COMPONENT_TYPES.NUMBER]: {
    name: 'Número',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para entrada de números',
    modalFields: [
      { type: 'number', name: 'min', label: 'Valor mínimo', required: false },
      { type: 'number', name: 'max', label: 'Valor máximo', required: false },
      { type: 'number', name: 'step', label: 'Incremento', required: false },
      { type: 'checkbox', name: 'allowDecimals', label: 'Permitir decimais', required: false }
    ]
  },
  [COMPONENT_TYPES.DATE]: {
    name: 'Data',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M26.6667 15.3333H13.3333C12.2288 15.3333 11.3333 16.2288 11.3333 17.3333V26.6667C11.3333 27.7712 12.2288 28.6667 13.3333 28.6667H26.6667C27.7712 28.6667 28.6667 27.7712 28.6667 26.6667V17.3333C28.6667 16.2288 27.7712 15.3333 26.6667 15.3333Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.3333 13.3333V11.3333M16.6667 13.3333V11.3333M11.3333 19.3333H28.6667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para seleção de data',
    modalFields: [
      { type: 'date', name: 'minDate', label: 'Data mínima', required: false },
      { type: 'date', name: 'maxDate', label: 'Data máxima', required: false },
      { type: 'checkbox', name: 'allowFuture', label: 'Permitir datas futuras', required: false },
      { type: 'checkbox', name: 'allowPast', label: 'Permitir datas passadas', required: false }
    ]
  },
  [COMPONENT_TYPES.SELECT]: {
    name: 'Seleção única',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para seleção única (dropdown)',
    modalFields: [
      { type: 'textarea', name: 'options', label: 'Opções (uma por linha)', required: true },
      { type: 'checkbox', name: 'searchable', label: 'Permitir busca rápida', required: false },
      { type: 'text', name: 'placeholder', label: 'Texto de exemplo', required: false },
      { type: 'checkbox', name: 'clearable', label: 'Permitir limpar seleção', required: false }
    ]
  },
  [COMPONENT_TYPES.MULTI_SELECT]: {
    name: 'Seleção múltipla',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para seleção múltipla (checkbox)',
    modalFields: [
      { type: 'textarea', name: 'options', label: 'Opções (uma por linha)', required: true },
      { type: 'number', name: 'maxSelections', label: 'Número máximo de seleções', required: false },
      { type: 'number', name: 'minSelections', label: 'Número mínimo de seleções', required: false },
      { type: 'checkbox', name: 'searchable', label: 'Permitir busca rápida', required: false }
    ]
  },
  [COMPONENT_TYPES.FILE]: {
    name: 'Upload de arquivo',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M20 13.3333H16.6667C15.9594 13.3333 15.3333 13.9594 15.3333 14.6667V25.3333C15.3333 26.0406 15.9594 26.6667 16.6667 26.6667H23.3333C24.0406 26.6667 24.6667 26.0406 24.6667 25.3333V18M20 13.3333L24.6667 18M20 13.3333V18H24.6667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para upload de arquivos',
    modalFields: [
      { type: 'text', name: 'allowedTypes', label: 'Formatos permitidos (ex: JPG, PNG, PDF)', required: true },
      { type: 'number', name: 'maxSize', label: 'Tamanho máximo do arquivo (MB)', required: true },
      { type: 'number', name: 'minFiles', label: 'Número mínimo de arquivos', required: false },
      { type: 'number', name: 'maxFiles', label: 'Número máximo de arquivos', required: false },
      { type: 'checkbox', name: 'multiple', label: 'Permitir múltiplos arquivos', required: false }
    ]
  },
  [COMPONENT_TYPES.ACCEPT]: {
    name: 'Aceite',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para aceite de termos',
    modalFields: [
      { type: 'textarea', name: 'acceptText', label: 'Texto do termo de aceite', required: true },
      { type: 'checkbox', name: 'requireScroll', label: 'Exigir rolagem completa', required: false },
      { type: 'number', name: 'scrollTime', label: 'Tempo mínimo de leitura (segundos)', required: false }
    ]
  },
  [COMPONENT_TYPES.OBSERVATION]: {
    name: 'Observação',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para observações',
    modalFields: [
      { type: 'textarea', name: 'observationText', label: 'Texto informativo', required: true },
      { type: 'select', name: 'style', label: 'Estilo de exibição', required: false, options: [
        { value: 'info', label: 'Informação' },
        { value: 'warning', label: 'Aviso' },
        { value: 'error', label: 'Erro' }
      ] }
    ]
  },
  [COMPONENT_TYPES.CONDITIONAL]: {
    name: 'Pergunta condicional',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667M13.3333 20H26.6667M13.3333 26.6667H20" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo que depende de outra pergunta',
    modalFields: [
      { type: 'select', name: 'parentQuestion', label: 'Pergunta que ativa esta', required: true },
      { type: 'text', name: 'triggerValue', label: 'Valor que ativa esta pergunta', required: true },
      { type: 'select', name: 'triggerOperator', label: 'Operador de comparação', required: true, options: [
        { value: 'equals', label: 'Igual a' },
        { value: 'notEquals', label: 'Diferente de' },
        { value: 'contains', label: 'Contém' },
        { value: 'greaterThan', label: 'Maior que' },
        { value: 'lessThan', label: 'Menor que' }
      ] }
    ]
  },
  [COMPONENT_TYPES.CPF]: {
    name: 'CPF',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M15.3333 16.6667H24.6667M15.3333 20H24.6667M15.3333 23.3333H20M13.3333 26.6667H26.6667C27.7712 26.6667 28.6667 25.7712 28.6667 24.6667V15.3333C28.6667 14.2288 27.7712 13.3333 26.6667 13.3333H13.3333C12.2288 13.3333 11.3333 14.2288 11.3333 15.3333V24.6667C11.3333 25.7712 12.2288 26.6667 13.3333 26.6667Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para CPF com validação',
    modalFields: [
      { type: 'checkbox', name: 'masked', label: 'Aplicar máscara', required: false },
      { type: 'checkbox', name: 'validate', label: 'Validar CPF', required: false },
      { type: 'text', name: 'placeholder', label: 'Texto de exemplo', required: false }
    ]
  },
  [COMPONENT_TYPES.EMAIL]: {
    name: 'Email',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M13.3333 13.3333H26.6667C27.5833 13.3333 28.3333 14.0833 28.3333 15V25C28.3333 25.9167 27.5833 26.6667 26.6667 26.6667H13.3333C12.4167 26.6667 11.6667 25.9167 11.6667 25V15C11.6667 14.0833 12.4167 13.3333 13.3333 13.3333Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M28.3333 15L20 20.8333L11.6667 15" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para email com validação',
    modalFields: [
      { type: 'checkbox', name: 'validate', label: 'Validar formato do email', required: false },
      { type: 'checkbox', name: 'checkDomain', label: 'Verificar domínio do email', required: false },
      { type: 'text', name: 'placeholder', label: 'Texto de exemplo', required: false }
    ]
  },
  [COMPONENT_TYPES.ENDERECO]: {
    name: 'Endereço cagado',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="4" fill="#F3F4F6"/>
      <path d="M20 21.6667C21.8409 21.6667 23.3333 20.1743 23.3333 18.3333C23.3333 16.4924 21.8409 15 20 15C18.159 15 16.6667 16.4924 16.6667 18.3333C16.6667 20.1743 18.159 21.6667 20 21.6667Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26.6667 18.3333C26.6667 24.1667 20 28.3333 20 28.3333C20 28.3333 13.3333 24.1667 13.3333 18.3333C13.3333 16.5652 14.0357 14.8695 15.2859 13.6193C16.5361 12.369 18.2319 11.6667 20 11.6667C21.7681 11.6667 23.4638 12.369 24.714 13.6193C25.9643 14.8695 26.6667 16.5652 26.6667 18.3333Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    description: 'Campo para endereço completo com CEP',
    modalFields: [
      { type: 'checkbox', name: 'autoComplete', label: 'Autopreenchimento por CEP', required: false },
      { type: 'checkbox', name: 'validateCep', label: 'Validar CEP', required: false },
      { type: 'checkbox', name: 'requireState', label: 'Exigir estado', required: false },
      { type: 'checkbox', name: 'requireCity', label: 'Exigir cidade', required: false },
      { type: 'checkbox', name: 'requireStreet', label: 'Exigir rua', required: false },
      { type: 'checkbox', name: 'requireNumber', label: 'Exigir número', required: false }
    ]
  }
};

// Function to create the edit modal for a component
function createComponentEditModal(componentType) {
  const config = COMPONENT_CONFIGS[componentType];
  if (!config) return null;

  // Common fields for all components
  const commonFields = [
    { type: 'text', name: 'name', label: 'Nome do componente', required: true },
    { type: 'textarea', name: 'question', label: 'Texto da pergunta', required: true },
    { type: 'text', name: 'help', label: 'Texto de ajuda', required: false },
    { type: 'checkbox', name: 'required', label: 'Obrigatório', required: false },
    { type: 'number', name: 'order', label: 'Ordem de exibição', required: true },
    { type: 'select', name: 'dependency', label: 'Dependência de outra pergunta', required: false }
  ];

  // Combine common fields with component-specific fields
  const allFields = [...commonFields, ...config.modalFields];

  // Create modal HTML
  const modalHtml = `
    <div class="modal fade" id="modalEdit${componentType}" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar ${config.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="formEdit${componentType}">
              ${allFields.map(field => `
                <div class="mb-3">
                  <label for="${field.name}" class="form-label">${field.label}</label>
                  ${field.type === 'textarea' ? `
                    <textarea class="form-control" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}></textarea>
                  ` : field.type === 'checkbox' ? `
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="${field.name}" name="${field.name}">
                      <label class="form-check-label" for="${field.name}">Sim</label>
                    </div>
                  ` : `
                    <input type="${field.type}" class="form-control" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                  `}
                </div>
              `).join('')}
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="saveComponentEdit('${componentType}')">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  return modalHtml;
}

// Function to save component edit
function saveComponentEdit(componentType) {
  const form = document.getElementById(`formEdit${componentType}`);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Handle checkbox values
  data.required = formData.get('required') === 'on';
  
  // TODO: Save the component data
  console.log('Saving component data:', data);
  
  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById(`modalEdit${componentType}`));
  modal.hide();
}

// Export the necessary objects and functions
window.COMPONENT_TYPES = COMPONENT_TYPES;
window.COMPONENT_CONFIGS = COMPONENT_CONFIGS;
window.createComponentEditModal = createComponentEditModal;
window.saveComponentEdit = saveComponentEdit; 