// Component modal functions
const createComponentModal = (type, existingComponent = null) => {
  const config = COMPONENT_CONFIGS[type];
  if (!config) return null;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${existingComponent ? 'Editar' : 'Adicionar'} ${config.name}</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="component-form">
          <div class="form-group">
            <label for="title">Título do campo</label>
            <input type="text" id="title" name="title" required value="${existingComponent?.title || ''}">
          </div>
          <div class="form-group">
            <label for="description">Descrição (opcional)</label>
            <textarea id="description" name="description">${existingComponent?.description || ''}</textarea>
          </div>
          <div class="form-group">
            <label for="required">Campo obrigatório</label>
            <div class="checkbox-wrapper">
              <input type="checkbox" id="required" name="required" ${existingComponent?.required ? 'checked' : ''}>
              <label for="required">Sim</label>
            </div>
          </div>
          ${config.modalFields.map(field => {
            const value = existingComponent?.config?.[field.name] ?? '';
            switch (field.type) {
              case 'text':
                return `
                  <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <input type="text" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''} value="${value}">
                  </div>
                `;
              case 'number':
                return `
                  <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <input type="number" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''} value="${value}">
                  </div>
                `;
              case 'textarea':
                return `
                  <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <textarea id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>${value}</textarea>
                  </div>
                `;
              case 'checkbox':
                return `
                  <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <div class="checkbox-wrapper">
                      <input type="checkbox" id="${field.name}" name="${field.name}" ${value ? 'checked' : ''}>
                      <label for="${field.name}">Sim</label>
                    </div>
                  </div>
                `;
              case 'select':
                return `
                  <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                      ${field.options.map(opt => `
                        <option value="${opt.value}" ${value === opt.value ? 'selected' : ''}>${opt.label}</option>
                      `).join('')}
                    </select>
                  </div>
                `;
              default:
                return '';
            }
          }).join('')}
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary close-modal">Cancelar</button>
        <button class="btn btn-primary save-component">Salvar</button>
      </div>
    </div>
  `;

  // Add event listeners
  const closeButtons = modal.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.remove();
    });
  });

  const saveButton = modal.querySelector('.save-component');
  saveButton.addEventListener('click', () => {
    const form = modal.querySelector('#component-form');
    const formData = new FormData(form);
    
    const component = {
      id: existingComponent?.id || generateId(),
      type,
      title: formData.get('title'),
      description: formData.get('description'),
      required: formData.get('required') === 'on',
      config: {}
    };

    // Process config fields
    config.modalFields.forEach(field => {
      const value = formData.get(field.name);
      if (field.type === 'checkbox') {
        component.config[field.name] = value === 'on';
      } else if (field.type === 'number' && value) {
        component.config[field.name] = Number(value);
      } else if (value) {
        component.config[field.name] = value;
      }
    });

    // Dispatch save event
    const event = new CustomEvent('componentSave', {
      detail: { component }
    });
    document.dispatchEvent(event);

    modal.remove();
  });

  return modal;
};

// Helper function to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 