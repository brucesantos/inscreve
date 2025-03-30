// Component renderer functions
const renderComponent = (component, container) => {
  const componentElement = document.createElement('div');
  componentElement.className = 'component';
  componentElement.dataset.type = component.type;
  componentElement.dataset.id = component.id;

  // Add component header
  const header = document.createElement('div');
  header.className = 'component-header';
  header.innerHTML = `
    <div class="component-icon">${COMPONENT_CONFIGS[component.type].icon}</div>
    <div class="component-info">
      <div class="component-title">${component.title}</div>
      <div class="component-description">${component.description || ''}</div>
    </div>
    <div class="component-actions">
      <button class="edit-component" title="Editar componente">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3333 2.66667C11.3333 2.66667 10.6667 2 10 2C9.33333 2 8.66667 2.66667 8.66667 2.66667M11.3333 2.66667L14 5.33333M11.3333 2.66667L4.66667 9.33333M14 5.33333L10.6667 8.66667M14 5.33333L14 12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.6667" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="delete-component" title="Remover componente">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3333 4H2.66667M5.33333 7.33333V11.3333M10.6667 7.33333V11.3333M6.66667 4V2.66667C6.66667 2.31305 6.80714 1.97391 7.05719 1.72386C7.30724 1.47381 7.64638 1.33333 8 1.33333H8C8.35362 1.33333 8.69276 1.47381 8.94281 1.72386C9.19286 1.97391 9.33333 2.31305 9.33333 2.66667V4M12 4V13.3333C12 13.687 11.8595 14.0261 11.6095 14.2761C11.3594 14.5262 11.0203 14.6667 10.6667 14.6667H5.33333C4.97971 14.6667 4.64057 14.5262 4.39052 14.2761C4.14048 14.0261 4 13.687 4 13.3333V4" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
  componentElement.appendChild(header);

  // Add component preview
  const preview = document.createElement('div');
  preview.className = 'component-preview';
  
  switch (component.type) {
    case COMPONENT_TYPES.TEXT:
      preview.innerHTML = `
        <input type="text" placeholder="${component.config.placeholder || 'Digite seu texto aqui...'}" disabled>
        ${component.config.maxLength ? `<div class="preview-hint">Máximo de ${component.config.maxLength} caracteres</div>` : ''}
      `;
      break;
      
    case COMPONENT_TYPES.NUMBER:
      preview.innerHTML = `
        <input type="number" 
          ${component.config.min !== undefined ? `min="${component.config.min}"` : ''}
          ${component.config.max !== undefined ? `max="${component.config.max}"` : ''}
          ${component.config.step !== undefined ? `step="${component.config.step}"` : ''}
          ${!component.config.allowDecimals ? 'step="1"' : ''}
          placeholder="Digite um número" disabled>
        ${component.config.min !== undefined || component.config.max !== undefined ? 
          `<div class="preview-hint">${component.config.min !== undefined ? `Mínimo: ${component.config.min}` : ''} ${component.config.max !== undefined ? `Máximo: ${component.config.max}` : ''}</div>` : ''}
      `;
      break;
      
    case COMPONENT_TYPES.DATE:
      preview.innerHTML = `
        <input type="date" disabled>
        ${component.config.allowFuture === false || component.config.allowPast === false ? 
          `<div class="preview-hint">${component.config.allowFuture === false ? 'Não permite datas futuras' : ''} ${component.config.allowPast === false ? 'Não permite datas passadas' : ''}</div>` : ''}
      `;
      break;
      
    case COMPONENT_TYPES.SELECT:
      preview.innerHTML = `
        <select disabled>
          <option value="">${component.config.placeholder || 'Selecione uma opção'}</option>
          ${component.config.options.split('\n').map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>
        ${component.config.searchable ? '<div class="preview-hint">Permite busca rápida</div>' : ''}
      `;
      break;
      
    case COMPONENT_TYPES.MULTI_SELECT:
      preview.innerHTML = `
        <div class="multi-select-preview">
          ${component.config.options.split('\n').map(opt => `
            <label class="checkbox-preview">
              <input type="checkbox" disabled>
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
        ${component.config.minSelections || component.config.maxSelections ? 
          `<div class="preview-hint">${component.config.minSelections ? `Mínimo: ${component.config.minSelections}` : ''} ${component.config.maxSelections ? `Máximo: ${component.config.maxSelections}` : ''} seleções</div>` : ''}
      `;
      break;
      
    case COMPONENT_TYPES.FILE:
      preview.innerHTML = `
        <div class="file-upload-preview">
          <input type="file" disabled>
          <div class="preview-hint">
            Formatos: ${component.config.allowedTypes}<br>
            Tamanho máximo: ${component.config.maxSize}MB
            ${component.config.multiple ? '<br>Permite múltiplos arquivos' : ''}
          </div>
        </div>
      `;
      break;
      
    case COMPONENT_TYPES.ACCEPT:
      preview.innerHTML = `
        <div class="accept-preview">
          <div class="accept-text">${component.config.acceptText}</div>
          ${component.config.requireScroll ? `<div class="preview-hint">Exige rolagem completa (${component.config.scrollTime}s)</div>` : ''}
        </div>
      `;
      break;
      
    case COMPONENT_TYPES.OBSERVATION:
      preview.innerHTML = `
        <div class="observation-preview ${component.config.style || 'info'}">
          ${component.config.observationText}
        </div>
      `;
      break;
      
    case COMPONENT_TYPES.CONDITIONAL:
      preview.innerHTML = `
        <div class="conditional-preview">
          <div class="preview-hint">
            Ativado quando "${component.config.parentQuestion}" ${component.config.triggerOperator} "${component.config.triggerValue}"
          </div>
        </div>
      `;
      break;
      
    case COMPONENT_TYPES.CPF:
      preview.innerHTML = `
        <input type="text" placeholder="${component.config.placeholder || 'Digite seu CPF'}" disabled>
        ${component.config.masked ? '<div class="preview-hint">Com máscara</div>' : ''}
        ${component.config.validate ? '<div class="preview-hint">Com validação</div>' : ''}
      `;
      break;
      
    case COMPONENT_TYPES.EMAIL:
      preview.innerHTML = `
        <input type="email" placeholder="${component.config.placeholder || 'Digite seu email'}" disabled>
        ${component.config.validate ? '<div class="preview-hint">Com validação de formato</div>' : ''}
        ${component.config.checkDomain ? '<div class="preview-hint">Com verificação de domínio</div>' : ''}
      `;
      break;
      
    case COMPONENT_TYPES.ENDERECO:
      preview.innerHTML = `
        <div class="endereco-preview">
          <input type="text" placeholder="CEP" disabled>
          <input type="text" placeholder="Estado" disabled>
          <input type="text" placeholder="Cidade" disabled>
          <input type="text" placeholder="Rua" disabled>
          <input type="text" placeholder="Número" disabled>
          ${component.config.autoComplete ? '<div class="preview-hint">Com autopreenchimento por CEP</div>' : ''}
          ${component.config.validateCep ? '<div class="preview-hint">Com validação de CEP</div>' : ''}
        </div>
      `;
      break;
  }
  
  componentElement.appendChild(preview);
  container.appendChild(componentElement);
}; 