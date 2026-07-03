// ===== OP RPG 2.0 - AKUMA BUILDER v6 - APP =====

const App = {
    akuma: {
        nome: '',
        tipo: '',
        subtipo: '',
        classificacao: '',
        categoria: '',
        usuario: '',
        propriedades: [],
        aspectoInato: '',
        aspectoAlternativo: false,
        tipoDespertar: '',
        mps: [],
        tecnicas: [],
        tracos: { comuns: [], especificos: [], ancestrais: [] },
        points: []
    },
    
    // Configurações de exportação
    exportConfig: {
        corPrimaria: '#8B0000',
        corSecundaria: '#D4AF37',
        mostrarEfeitos: true,
        fonte: 'Crimson Pro'
    },
    
    // Técnica/MP em edição
    editando: {
        tipo: null, // 'tecnica' ou 'mp'
        dados: null,
        efeitos: []
    },

    init() {
        this.carregarSalvas();
        this.renderBasico();
        this.renderMPs();
        this.renderTecnicas();
        this.renderZoan();
        this.renderResumo();
        this.renderSalvas();
        this.setupEventos();
    },

    setupEventos() {
        // Navegação de abas
        document.querySelectorAll('.aba-btn').forEach(btn => {
            btn.addEventListener('click', () => this.mudarAba(btn.dataset.aba));
        });
        
        // Fechar modal ao clicar fora
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') this.fecharModal();
        });
    },

    mudarAba(aba) {
        document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.aba-content').forEach(c => c.classList.remove('active'));
        document.querySelector(`[data-aba="${aba}"]`).classList.add('active');
        document.getElementById(`aba-${aba}`).classList.add('active');
        
        // Atualizar conteúdo
        if (aba === 'resumo') this.renderResumo();
        if (aba === 'salvas') this.renderSalvas();
    },

    // ==================== ABA BÁSICO ====================
    renderBasico() {
        const container = document.getElementById('aba-basico');
        const isZoan = this.akuma.tipo === 'zoan';
        const usuarios = this.getUsuariosDisponiveis();
        
        container.innerHTML = `
            <div class="form-section">
                <h3>📋 Informações Básicas</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Nome da Akuma no Mi</label>
                        <input type="text" id="inp-nome" value="${this.akuma.nome}" 
                               placeholder="Ex: Gomu-Gomu no Mi" onchange="App.setNome(this.value)">
                    </div>
                    <div class="form-group">
                        <label>Tipo</label>
                        <select id="inp-tipo" onchange="App.setTipo(this.value)">
                            <option value="">Selecione...</option>
                            ${SISTEMA.tipos.map(t => 
                                `<option value="${t.id}" ${this.akuma.tipo === t.id ? 'selected' : ''}>${t.nome}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                ${isZoan ? `
                <div class="form-row">
                    <div class="form-group">
                        <label>Subtipo Zoan</label>
                        <select id="inp-subtipo" onchange="App.setSubtipo(this.value)">
                            <option value="">Selecione...</option>
                            ${SISTEMA.subtiposZoan.map(s => 
                                `<option value="${s.id}" ${this.akuma.subtipo === s.id ? 'selected' : ''}>${s.nome}</option>`
                            ).join('')}
                        </select>
                    </div>
                    ${this.akuma.subtipo && this.akuma.subtipo !== 'mitica' ? `
                    <div class="form-group">
                        <label>Classificação</label>
                        <select id="inp-class" onchange="App.setClassificacao(this.value)">
                            <option value="">Selecione...</option>
                            ${SISTEMA.classificacaoZoan.map(c => 
                                `<option value="${c.id}" ${this.akuma.classificacao === c.id ? 'selected' : ''}>${c.nome}</option>`
                            ).join('')}
                        </select>
                    </div>
                    ` : ''}
                </div>
                ` : ''}
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Categoria</label>
                        <select id="inp-cat" onchange="App.setCategoria(this.value)">
                            <option value="">Selecione...</option>
                            ${SISTEMA.categorias.map(c => 
                                `<option value="${c.id}" ${this.akuma.categoria === c.id ? 'selected' : ''}>${c.nome} (${c.atributo})</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tipo de Usuário</label>
                        <select id="inp-usuario" onchange="App.setUsuario(this.value)">
                            <option value="">Selecione...</option>
                            ${usuarios.map(u => 
                                `<option value="${u.id}" ${this.akuma.usuario === u.id ? 'selected' : ''}>${u.nome}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Propriedades (clique para selecionar)</label>
                    <div class="props-grid">
                        ${SISTEMA.propriedades.map(p => `
                            <div class="prop-item ${this.akuma.propriedades.includes(p.id) ? 'selected' : ''}" 
                                 onclick="App.togglePropriedade('${p.id}')">
                                <span class="prop-nome">${p.nome}</span>
                                <span class="prop-atributos">${p.atributos}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${this.renderAspectoInato()}
            ${this.renderTipoDespertar()}
        `;

        this.atualizarAbaZoan();
    },

    renderTipoDespertar() {
        // Tipo de Despertar só se aplica a Logia/Paramecia com usuário desperto
        const tipo = this.akuma.tipo;
        const isDesperto = this.akuma.usuario?.includes('desperto');
        if (!isDesperto || (tipo !== 'logia' && tipo !== 'paramecia')) return '';

        const escolhido = TIPOS_DESPERTAR.find(t => t.id === this.akuma.tipoDespertar);
        return `
            <div class="form-section">
                <h3>🌟 Tipo de Despertar</h3>
                <p class="muted" style="font-size: 0.85rem; margin-bottom: 0.75rem;">Cada fruto tem um tipo de despertar predefinido pelo Narrador.</p>
                <div class="form-group">
                    <select onchange="App.akuma.tipoDespertar = this.value; App.renderBasico()">
                        <option value="">Selecione...</option>
                        ${TIPOS_DESPERTAR.map(t => `
                            <option value="${t.id}" ${this.akuma.tipoDespertar === t.id ? 'selected' : ''}>${t.nome}</option>
                        `).join('')}
                    </select>
                </div>
                ${escolhido ? `
                    <div class="info-box" style="font-size: 0.9rem; line-height: 1.5;">
                        <p>${escolhido.desc}</p>
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderAspectoInato() {
        const tipo = this.akuma.tipo;
        if (!tipo) return '';
        
        let aspecto = '';
        let podeAlternar = true;
        
        if (tipo === 'logia') {
            aspecto = `<strong>Corpo Elemental:</strong> Técnica Auxiliar Power Up no 1º nível + Intangibilidade permanente.`;
        } else if (tipo === 'paramecia') {
            aspecto = `<strong>Uso Alternativo:</strong> 1 técnica (duração Instantânea) grátis por descanso longo.`;
        } else if (tipo === 'zoan') {
            if (this.akuma.subtipo === 'mitica') {
                return `
                    <div class="form-section">
                        <h3>⭐ Aspecto Inato</h3>
                        <div class="aspecto-escolha">
                            <label>
                                <input type="radio" name="aspecto" value="vigor" 
                                       ${this.akuma.aspectoInato !== 'uso-alternativo' ? 'checked' : ''}
                                       onchange="App.setAspecto('vigor')">
                                <strong>Vigor Animalesco:</strong> Recupera 20 + nível de PV OU 1 Nível de Exaustão (1x/descanso longo).
                            </label>
                            <label>
                                <input type="radio" name="aspecto" value="uso-alternativo"
                                       ${this.akuma.aspectoInato === 'uso-alternativo' ? 'checked' : ''}
                                       onchange="App.setAspecto('uso-alternativo')">
                                <strong>Uso Alternativo:</strong> 1 técnica (duração Instantânea) grátis por descanso longo.
                            </label>
                        </div>
                        ${this.renderOpcaoAlternativa()}
                    </div>
                `;
            } else {
                aspecto = `<strong>Vigor Animalesco:</strong> Recupera 20 + nível de PV OU 1 Nível de Exaustão (1x/descanso longo).`;
            }
        }
        
        return `
            <div class="form-section">
                <h3>⭐ Aspecto Inato</h3>
                <div class="info-box">
                    <p>${aspecto}</p>
                </div>
                ${this.renderOpcaoAlternativa()}
            </div>
        `;
    },

    renderOpcaoAlternativa() {
        if (this.akuma.tipo === 'zoan' && this.akuma.subtipo !== 'mitica') return '';
        
        return `
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px dashed var(--borda);">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" ${this.akuma.aspectoAlternativo ? 'checked' : ''} 
                           onchange="App.toggleAspectoAlternativo(this.checked)">
                    <span><strong>Opção Alternativa:</strong> Trocar Aspecto Inato por +1 MP criada (não pode ser Especial)</span>
                </label>
            </div>
        `;
    },

    getUsuariosDisponiveis() {
        const tipo = this.akuma.tipo;
        if (!tipo) return [];

        if (tipo === 'zoan') {
            const subtipo = this.akuma.subtipo;
            if (subtipo === 'mitica') {
                return [
                    { id: 'mitica', nome: 'Mítica' },
                    { id: 'mitica-desperto', nome: 'Mítica Desperto' }
                ];
            }
            if (subtipo === 'ancestral') {
                return [
                    { id: 'ancestral', nome: 'Ancestral' },
                    { id: 'ancestral-desperto', nome: 'Ancestral Desperto' }
                ];
            }
            // Comum/Normal
            return [
                { id: 'normal', nome: 'Comum' },
                { id: 'normal-desperto', nome: 'Comum Desperto' }
            ];
        }

        return SISTEMA.usuarios[tipo] || [];
    },

    setNome(val) { this.akuma.nome = val; },
    
    setTipo(val) {
        this.akuma.tipo = val;
        this.akuma.subtipo = '';
        this.akuma.classificacao = '';
        this.akuma.usuario = '';
        this.akuma.mps = [];
        this.renderBasico();
        this.renderMPs();
        this.atualizarAbaZoan();
    },
    
    setSubtipo(val) {
        this.akuma.subtipo = val;
        this.akuma.classificacao = '';
        this.akuma.usuario = val === 'mitica' ? 'mitica' : (val || 'normal');
        this.renderBasico();
        this.renderMPs();
        this.atualizarAbaZoan();
    },
    
    setClassificacao(val) { this.akuma.classificacao = val; },
    setCategoria(val) { this.akuma.categoria = val; },
    setUsuario(val) { this.akuma.usuario = val; this.renderMPs(); },
    setAspecto(val) { this.akuma.aspectoInato = val; },
    
    togglePropriedade(id) {
        const idx = this.akuma.propriedades.indexOf(id);
        if (idx >= 0) this.akuma.propriedades.splice(idx, 1);
        else this.akuma.propriedades.push(id);
        this.renderBasico();
    },
    
    toggleAspectoAlternativo(checked) {
        this.akuma.aspectoAlternativo = checked;
        this.renderMPs();
    },
    
    atualizarAbaZoan() {
        const btnZoan = document.querySelector('[data-aba="zoan"]');
        btnZoan.style.display = this.akuma.tipo === 'zoan' ? '' : 'none';
        if (this.akuma.tipo === 'zoan') this.renderZoan();
    },

    // ==================== ABA MANIFESTAÇÕES ====================
    renderMPs() {
        const container = document.getElementById('aba-mps');
        const qtdMPs = this.getQtdMPs();
        const temMPs = qtdMPs > 0;
        
        if (!temMPs) {
            container.innerHTML = `
                <div class="form-section">
                    <h3>🔮 Manifestações de Poder</h3>
                    <div class="empty">
                        <p>Zoan Normal e Ancestral não possuem Manifestações de Poder.</p>
                        <p class="muted">Apenas Zoan Mítica, Logia e Paramecia recebem MPs.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="form-section">
                <div class="section-header">
                    <h3>🔮 Manifestações de Poder (${this.akuma.mps.length}/${qtdMPs})</h3>
                    <div class="btns">
                        <button class="btn btn-primary btn-small" onclick="App.abrirModalMPEspecial()" 
                                ${this.akuma.mps.length >= qtdMPs ? 'disabled' : ''}>
                            + MP Especial
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="App.abrirModalMPCriada()"
                                ${this.akuma.mps.length >= qtdMPs ? 'disabled' : ''}>
                            + Criar MP
                        </button>
                    </div>
                </div>
                
                <div class="info-box" style="margin-bottom: 1rem;">
                    <p><strong>MPs disponíveis:</strong> ${qtdMPs} | <strong>Usadas:</strong> ${this.akuma.mps.length}</p>
                    <p class="muted" style="font-size: 0.9rem;">MPs Especiais são pré-definidas. MPs Criadas usam Pontos Virtuais (base 6, máx 12).</p>
                </div>
                
                <div class="lista-items">
                    ${this.akuma.mps.length === 0 ? '<p class="empty">Nenhuma manifestação adicionada.</p>' : ''}
                    ${this.akuma.mps.map((mp, i) => this.renderMPCard(mp, i)).join('')}
                </div>
            </div>
        `;
    },

    renderMPCard(mp, index) {
        const isEspecial = mp.especial;
        return `
            <div class="item-card">
                <div class="item-header">
                    <span class="item-nome">${mp.nome}</span>
                    <span class="item-tag ${isEspecial ? 'especial' : 'criada'}">${isEspecial ? 'Especial' : 'Criada'}</span>
                    <div class="btns" style="margin-left: auto; gap: 0.25rem;">
                        ${!isEspecial ? `<button class="btn btn-small btn-secondary" onclick="App.editarMP(${index})" style="font-size: 0.75rem; padding: 2px 8px;">Editar</button>` : ''}
                        <button class="btn-remove" onclick="App.removerMP(${index})">×</button>
                    </div>
                </div>
                <p class="item-desc">${mp.desc}</p>
                ${!isEspecial && mp.requisito ? `<p class="item-req">Ativação: ${MODIFICADORES_PV.find(m => m.id === mp.requisito)?.nome || mp.requisito}</p>` : ''}
                ${mp.restricao ? `<p class="item-req">Restrição: ${mp.restricao}</p>` : ''}
                ${mp.efeitos && mp.efeitos.length > 0 ? `
                    <p class="item-efeitos">Efeitos: ${mp.efeitos.map(e => e.nome + (e.detalhe ? ' (' + e.detalhe + ')' : '') + ' [' + (e.custo >= 0 ? '+' : '') + e.custo + ' PV]').join(', ')}</p>
                ` : ''}
            </div>
        `;
    },

    getQtdMPs() {
        const tipo = this.akuma.tipo;
        const usuario = this.akuma.usuario;
        
        if (tipo === 'zoan' && this.akuma.subtipo !== 'mitica') return 0;
        
        let base = 0;
        if (tipo === 'logia' || tipo === 'paramecia') {
            const usr = SISTEMA.usuarios[tipo]?.find(u => u.id === usuario);
            base = usr?.mps || 0;
        } else if (tipo === 'zoan' && this.akuma.subtipo === 'mitica') {
            base = usuario === 'mitica-desperto' ? 2 : 1;
        }
        
        // +1 se usar opção alternativa
        if (this.akuma.aspectoAlternativo) base++;
        
        return base;
    },

    abrirModalMPEspecial() {
        const mpsDisponiveis = this.getMPsEspeciaisDisponiveis();
        
        this.abrirModal('Escolher MP Especial', `
            <div class="mps-lista">
                ${mpsDisponiveis.map(mp => `
                    <div class="mp-opcao" onclick="App.adicionarMPEspecial('${mp.id}')">
                        <div class="mp-nome">${mp.nome}</div>
                        <div class="mp-desc">${mp.desc}</div>
                        ${mp.restricao ? `<span class="mp-restricao">${mp.restricao}</span>` : ''}
                    </div>
                `).join('')}
            </div>
        `);
    },

    getMPsEspeciaisDisponiveis() {
        const tipo = this.akuma.tipo;
        const categoria = this.akuma.categoria;
        const usuario = this.akuma.usuario;
        const jaUsadas = this.akuma.mps.filter(m => m.especial).map(m => m.id);
        
        return MPS_ESPECIAIS.filter(mp => {
            if (jaUsadas.includes(mp.id)) return false;
            if (mp.restricao === 'Apenas Logia' && tipo !== 'logia') return false;
            if (mp.restricao === 'Apenas Logia ou MP Desperta' && tipo !== 'logia' && !usuario?.includes('desperto')) return false;
            if (mp.restricao === 'Categoria A ou S' && !['A', 'S'].includes(categoria)) return false;
            return true;
        });
    },

    adicionarMPEspecial(id) {
        const mp = MPS_ESPECIAIS.find(m => m.id === id);
        if (mp) {
            this.akuma.mps.push({
                id: mp.id,
                nome: mp.nome,
                desc: mp.desc,
                restricao: mp.restricao,
                especial: true
            });
            this.fecharModal();
            this.renderMPs();
        }
    },

    abrirModalMPCriada() {
        this.editando = {
            tipo: 'mp',
            dados: { nome: '', desc: '', requisito: 'inacao', pvBase: 6 },
            efeitos: []
        };
        this.renderModalCriacao();
    },

    // ==================== ABA TÉCNICAS ====================
    renderTecnicas() {
        const container = document.getElementById('aba-tecnicas');
        const grauMax = this.getGrauMaximo();
        
        container.innerHTML = `
            <div class="form-section">
                <div class="section-header">
                    <h3>⚔️ Técnicas de Combate</h3>
                    <button class="btn btn-primary btn-small" onclick="App.abrirModalTecnica('combate')">
                        + Nova Técnica
                    </button>
                </div>
                
                ${grauMax > 0 ? `<p class="muted" style="margin-bottom: 1rem;">Grau máximo: ${grauMax}º | PP máx por grau: ${SISTEMA.graus.map(g => g.grau <= grauMax ? g.grau + 'º=' + g.ppMax + 'PP' : '').filter(Boolean).join(', ')}</p>` : '<p class="muted" style="margin-bottom: 1rem;">Selecione um tipo de usuário com acesso a técnicas.</p>'}
                
                <div class="lista-items">
                    ${this.akuma.tecnicas.filter(t => t.tipo === 'combate').length === 0 ? 
                        '<p class="empty">Nenhuma técnica de combate criada.</p>' : ''}
                    ${this.akuma.tecnicas.filter(t => t.tipo === 'combate').map((t, i) => this.renderTecnicaCard(t, i)).join('')}
                </div>
            </div>
            
            <div class="form-section">
                <div class="section-header">
                    <h3>🛡️ Técnicas Auxiliares</h3>
                    <button class="btn btn-primary btn-small" onclick="App.abrirModalTecnica('auxiliar')">
                        + Nova Auxiliar
                    </button>
                </div>
                
                <div class="lista-items">
                    ${this.akuma.tecnicas.filter(t => t.tipo === 'auxiliar').length === 0 ? 
                        '<p class="empty">Nenhuma técnica auxiliar criada.</p>' : ''}
                    ${this.akuma.tecnicas.filter(t => t.tipo === 'auxiliar').map((t, i) => this.renderTecnicaCard(t, i)).join('')}
                </div>
            </div>
        `;
    },

    renderTecnicaCard(tec, index) {
        return `
            <div class="tecnica-box">
                <div class="tecnica-header-row">
                    <div class="tecnica-grau-cell">
                        <span class="grau-num">${tec.grau}º</span>
                        <span class="grau-label">Grau</span>
                    </div>
                    <div class="tecnica-nome-cell">${tec.nome || 'Sem Nome'}</div>
                </div>
                <div class="tecnica-body">
                    <div class="tecnica-grau-lateral">
                        <span class="pp-num">${tec.pp}</span>
                        <span class="pp-label">Pontos de Poder</span>
                    </div>
                    <div class="tecnica-content">
                        <div class="tecnica-desc">${tec.desc || ''}</div>
                        <table class="tecnica-stats-table">
                            <tr>
                                <td class="stat-label">Duração</td>
                                <td class="stat-value">${tec.duracao || '-'}</td>
                            </tr>
                            <tr>
                                <td class="stat-label">Alcance</td>
                                <td class="stat-value">${tec.alcance || '-'}</td>
                            </tr>
                            <tr>
                                <td class="stat-label">Requisito</td>
                                <td class="stat-value">${tec.requisitos || this.akuma.nome + ', Ação Poderosa'}</td>
                            </tr>
                            <tr>
                                <td class="stat-label">Dano</td>
                                <td class="stat-value">${tec.dano || 'Nenhum'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="tecnica-footer">
                    <span>Ataque Combinado ${tec.ataqueCombinado ? 'Possível' : 'Impossível'}</span>
                    <div class="btns">
                        <button class="btn btn-small btn-secondary" onclick="App.editarTecnica(${index})">Editar</button>
                        <button class="btn btn-small btn-danger" onclick="App.removerTecnica(${index})">Remover</button>
                    </div>
                </div>
            </div>
        `;
    },

    getGrauMaximo() {
        const usuario = this.akuma.usuario;
        const tipo = this.akuma.tipo;
        
        if (tipo === 'zoan' && this.akuma.subtipo !== 'mitica') return 0;
        
        const usr = SISTEMA.usuarios[tipo]?.find(u => u.id === usuario);
        return usr?.grauMax || 3;
    },

    abrirModalTecnica(tipoTec) {
        const grauMax = this.getGrauMaximo();
        this.editando = {
            tipo: 'tecnica',
            tipoTec: tipoTec,
            dados: {
                nome: '',
                desc: '',
                grau: 1,
                duracao: 'instantaneo',
                alcanceTipo: 'linha',
                alcanceValor: '',
                requisito: 'acao-poderosa',
                ataqueCombinado: true,
                danoCustom: '',
                tipoDano: ''
            },
            efeitos: []
        };
        this.renderModalCriacao();
    },

    editarTecnica(index) {
        const tec = this.akuma.tecnicas[index];
        if (!tec) return;

        // Extrair dados da técnica para o formulário de edição
        const duracaoId = SISTEMA.duracoes.find(d => d.nome === tec.duracao)?.id || 'instantaneo';
        let alcanceTipo = 'linha';
        let alcanceValor = '';
        if (tec.alcance === 'Pessoal') {
            alcanceTipo = 'pessoal';
        } else if (tec.alcance === 'Toque') {
            alcanceTipo = 'toque';
        } else if (tec.alcance) {
            const match = tec.alcance.match(/Até (\S+) metros?, (\w+)/);
            if (match) {
                alcanceValor = match[1];
                alcanceTipo = match[2].toLowerCase();
            }
        }

        // Extrair dano custom
        let danoCustom = '';
        let tipoDano = '';
        if (tec.dano && tec.dano !== 'Nenhum') {
            const partsDano = tec.dano.split(' ');
            danoCustom = partsDano[0] || '';
            tipoDano = partsDano.slice(1).join(' ') || '';
        }

        this.editando = {
            tipo: 'tecnica',
            tipoTec: tec.tipo,
            editIndex: index,
            dados: {
                nome: tec.nome,
                desc: tec.desc || '',
                grau: tec.grau || 1,
                duracao: duracaoId,
                alcanceTipo: alcanceTipo,
                alcanceValor: alcanceValor,
                requisito: 'acao-poderosa',
                ataqueCombinado: tec.ataqueCombinado,
                danoCustom: danoCustom,
                tipoDano: tipoDano
            },
            efeitos: tec.efeitos ? [...tec.efeitos] : []
        };
        this.renderModalCriacao();
    },

    editarMP(index) {
        const mp = this.akuma.mps[index];
        if (!mp) return;
        if (mp.especial) {
            alert('MPs Especiais não podem ser editadas, apenas removidas.');
            return;
        }

        this.editando = {
            tipo: 'mp',
            editIndex: index,
            dados: {
                nome: mp.nome,
                desc: mp.desc || '',
                requisito: mp.requisito || 'inacao',
                pvBase: 6
            },
            efeitos: mp.efeitos ? [...mp.efeitos] : []
        };
        this.renderModalCriacao();
    },

    // ==================== MODAL DE CRIAÇÃO (MP/TÉCNICA) ====================
    renderModalCriacao() {
        const isMP = this.editando.tipo === 'mp';
        const isTecnica = this.editando.tipo === 'tecnica';
        const titulo = isMP ? 'Criar Manifestação de Poder' : `Criar Técnica ${this.editando.tipoTec === 'combate' ? 'de Combate' : 'Auxiliar'}`;
        
        let conteudo = '';
        
        if (isMP) {
            conteudo = this.renderFormMP();
        } else {
            conteudo = this.renderFormTecnica();
        }
        
        this.abrirModal(titulo, conteudo, true);
    },

    renderFormMP() {
        const dados = this.editando.dados;
        // Requisito legado 'acao' (removido — não existe na tabela do livro)
        if (!MODIFICADORES_PV.find(m => m.id === dados.requisito)) dados.requisito = 'inacao';
        const modReqInfo = MODIFICADORES_PV.find(m => m.id === dados.requisito);
        const modReq = modReqInfo?.ajuste || 0;
        // Pág. 208: reduções e o requisito de ativação SOMAM Pontos Virtuais ao pool
        // (base 6), mas o consumo em efeitos nunca pode ultrapassar 12 PV.
        const custoEfeitos = this.calcularCustoEfeitos();
        const reducaoEfeitos = this.calcularReducaoEfeitos();
        const pvPool = MP_REGRAS.pvBase + modReq + reducaoEfeitos;
        const pvDisponivel = Math.min(MP_REGRAS.pvTeto, pvPool);
        const pvRestante = pvDisponivel - custoEfeitos;

        return `
            <div class="form-group">
                <label>Nome da MP</label>
                <input type="text" value="${dados.nome}" onchange="App.editando.dados.nome = this.value">
            </div>

            <div class="form-group">
                <label>Requisito de Ativação</label>
                <select onchange="App.editando.dados.requisito = this.value; App.atualizarModalCriacao()">
                    ${MODIFICADORES_PV.map(m => `
                        <option value="${m.id}" ${dados.requisito === m.id ? 'selected' : ''}>
                            ${m.nome} (${m.ajuste >= 0 ? '+' : ''}${m.ajuste} PV) - ${m.desc}
                        </option>
                    `).join('')}
                </select>
            </div>

            <div class="calc-box">
                <div class="calc-row">
                    <span class="calc-label">PV Base</span>
                    <span class="calc-value">${MP_REGRAS.pvBase}</span>
                </div>
                <div class="calc-row">
                    <span class="calc-label">Requisito (${modReqInfo?.nome || '-'})</span>
                    <span class="calc-value">${modReq >= 0 ? '+' : ''}${modReq}</span>
                </div>
                <div class="calc-row">
                    <span class="calc-label">Reduções (+PV)</span>
                    <span class="calc-value" style="color: var(--sucesso);">+${reducaoEfeitos}</span>
                </div>
                ${pvPool > MP_REGRAS.pvTeto ? `
                <div class="calc-row">
                    <span class="calc-label">Teto de consumo (máx ${MP_REGRAS.pvTeto} PV)</span>
                    <span class="calc-value" style="color: var(--erro);">${pvPool} → ${MP_REGRAS.pvTeto}</span>
                </div>
                ` : ''}
                <div class="calc-row">
                    <span class="calc-label">Efeitos Usados</span>
                    <span class="calc-value" style="color: var(--erro);">-${custoEfeitos}</span>
                </div>
                <div class="calc-row total">
                    <span>PV Disponível</span>
                    <span style="color: ${pvRestante < 0 ? 'var(--erro)' : 'var(--sucesso)'}">${pvRestante} / ${pvDisponivel}</span>
                </div>
            </div>

            <div class="info-box" style="margin: 1rem 0; font-size: 0.85rem;">
                <strong>Regras de criação de MP (livro, pág. 208):</strong>
                <ul style="margin: 0.4rem 0 0 1.2rem; line-height: 1.5;">
                    ${MP_REGRAS.restricoes.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>

            ${this.renderEfeitosSection('mp')}
            
            <div class="form-group">
                <label>Descrição</label>
                <textarea onchange="App.editando.dados.desc = this.value">${dados.desc}</textarea>
            </div>
            
            <div class="btns btns-center" style="margin-top: 1.5rem;">
                <button class="btn btn-secondary" onclick="App.fecharModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="App.salvarMP()" ${pvRestante < 0 ? 'disabled' : ''}>
                    ${this.editando.editIndex !== undefined ? 'Atualizar MP' : 'Salvar MP'}
                </button>
            </div>
        `;
    },

    renderFormTecnica() {
        const dados = this.editando.dados;
        const isCombate = this.editando.tipoTec === 'combate';
        const isAuxiliar = this.editando.tipoTec === 'auxiliar';
        const grauMax = this.getGrauMaximo();
        const grauInfo = SISTEMA.graus.find(g => g.grau === parseInt(dados.grau)) || SISTEMA.graus[0];

        const custoBase = isCombate ? parseInt(dados.grau) * 2 : 0;
        const custoEfeitos = this.calcularCustoEfeitos();
        const reducaoBruta = this.calcularReducaoEfeitos();
        // Livro: máximo de redução em Técnica de Combate = grau; Auxiliares: máx 6 PP.
        const reducaoMax = isCombate ? parseInt(dados.grau) : 6;
        const reducaoEfeitos = Math.min(reducaoBruta, reducaoMax);
        const ppTotal = Math.max(1, custoBase + custoEfeitos - reducaoEfeitos);
        // Auxiliares: máx 10 PP (15 PP quando o usuário é desperto)
        const isDesperto = this.akuma.usuario?.includes('desperto');
        const ppMax = isCombate ? grauInfo.ppMax : (isDesperto ? 15 : 10);

        // Tipos de dano disponíveis
        const tiposDano = ['Contundente', 'Cortante', 'Perfurante', 'Fogo', 'Frio', 'Elétrico', 'Trovejante', 'Ácido', 'Veneno', 'Necrótico', 'Radiante', 'Psíquico', 'Verdadeiro'];

        return `
            <div class="form-row">
                <div class="form-group">
                    <label>Nome da Técnica</label>
                    <input type="text" value="${dados.nome}" onchange="App.editando.dados.nome = this.value">
                </div>
                ${isCombate ? `
                <div class="form-group">
                    <label>Grau</label>
                    <select onchange="App.editando.dados.grau = this.value; App.atualizarModalCriacao()">
                        ${SISTEMA.graus.filter(g => g.grau <= grauMax).map(g => `
                            <option value="${g.grau}" ${dados.grau == g.grau ? 'selected' : ''}>
                                ${g.grau}º Grau (máx ${g.ppMax} PP)
                            </option>
                        `).join('')}
                    </select>
                </div>
                ` : ''}
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Duração</label>
                    <select onchange="App.editando.dados.duracao = this.value">
                        ${SISTEMA.duracoes.map(d => `
                            <option value="${d.id}" ${dados.duracao === d.id ? 'selected' : ''}>${d.nome}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Alcance</label>
                    <select onchange="App.editando.dados.alcanceTipo = this.value; App.atualizarModalCriacao()">
                        ${SISTEMA.alcances.map(a => `
                            <option value="${a.id}" ${dados.alcanceTipo === a.id ? 'selected' : ''}>${a.nome}</option>
                        `).join('')}
                    </select>
                </div>
            </div>

            ${['linha', 'cone', 'esfera', 'cilindro', 'emanacao'].includes(dados.alcanceTipo) ? `
            <div class="form-group">
                <label>Valor do Alcance (metros)</label>
                <input type="number" value="${dados.alcanceValor || grauInfo['alcance' + dados.alcanceTipo.charAt(0).toUpperCase() + dados.alcanceTipo.slice(1)] || ''}"
                       onchange="App.editando.dados.alcanceValor = this.value"
                       placeholder="Máx: ${grauInfo['alcance' + dados.alcanceTipo.charAt(0).toUpperCase() + dados.alcanceTipo.slice(1)] || '?'}m">
            </div>
            ` : ''}

            <!-- SEÇÃO DE DANO -->
            <div class="info-box" style="margin: 1rem 0;">
                <h4>Dano</h4>
                ${isCombate ? `
                    <p style="margin-bottom: 0.5rem;">Dano base do ${dados.grau}º Grau — Alvo Único: <strong>${grauInfo.danoUnico}</strong> | Área: <strong>${grauInfo.danoArea}</strong></p>
                    <p class="muted" style="font-size: 0.85rem; margin-bottom: 0.75rem;">1 PP adicional = +1d10 (único) ou +1d6 (área). Use o efeito "Dano Adicional" para adicionar dados extras.</p>
                ` : ''}
                <div class="form-row">
                    <div class="form-group">
                        <label>Dano da Técnica</label>
                        <input type="text" value="${dados.danoCustom || (isCombate ? '' : '')}"
                               onchange="App.editando.dados.danoCustom = this.value"
                               placeholder="${isCombate ? 'Ex: 2d10, 4d6 (vazio = dano base do grau)' : 'Ex: 2d10 ou vazio para Nenhum'}">
                    </div>
                    <div class="form-group">
                        <label>Tipo de Dano</label>
                        <select onchange="App.editando.dados.tipoDano = this.value">
                            <option value="" ${!dados.tipoDano ? 'selected' : ''}>Nenhum / Livre</option>
                            ${tiposDano.map(t => `
                                <option value="${t}" ${dados.tipoDano === t ? 'selected' : ''}>${t}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                ${isAuxiliar ? `<p class="muted" style="font-size: 0.85rem; color: var(--erro);">Técnicas Auxiliares normalmente não causam dano. Deixe vazio se não for ofensiva.</p>` : ''}
            </div>

            <div class="calc-box">
                <div class="calc-row">
                    <span class="calc-label">Custo Base${isCombate ? ' (' + dados.grau + 'º Grau × 2)' : ' (Auxiliar)'}</span>
                    <span class="calc-value">${custoBase} PP</span>
                </div>
                <div class="calc-row">
                    <span class="calc-label">Efeitos (+)</span>
                    <span class="calc-value" style="color: var(--erro);">+${custoEfeitos} PP</span>
                </div>
                <div class="calc-row">
                    <span class="calc-label">Reduções (-) ${reducaoBruta > reducaoMax ? `<span style="color: var(--erro); font-size: 0.8rem;">(${reducaoBruta} PP excede o máximo de ${reducaoMax} — limitado)</span>` : `<span class="muted" style="font-size: 0.8rem;">(máx ${reducaoMax} PP)</span>`}</span>
                    <span class="calc-value" style="color: var(--sucesso);">-${reducaoEfeitos} PP</span>
                </div>
                <div class="calc-row total">
                    <span>Total</span>
                    <span style="color: ${ppTotal > ppMax ? 'var(--erro)' : 'var(--sucesso)'}">
                        ${ppTotal} PP ${ppTotal > ppMax ? '(Excede máximo de ' + ppMax + '!)' : ''}
                    </span>
                </div>
            </div>

            ${this.renderEfeitosSection('tecnica')}

            <div class="form-row">
                <div class="form-group large">
                    <label>Descrição</label>
                    <textarea onchange="App.editando.dados.desc = this.value">${dados.desc}</textarea>
                </div>
            </div>

            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" ${dados.ataqueCombinado ? 'checked' : ''}
                           onchange="App.editando.dados.ataqueCombinado = this.checked">
                    Ataque Combinado Possível
                </label>
            </div>

            <div class="btns btns-center" style="margin-top: 1.5rem;">
                <button class="btn btn-secondary" onclick="App.fecharModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="App.salvarTecnica()" ${ppTotal > ppMax ? 'disabled' : ''}>
                    ${this.editando.editIndex !== undefined ? 'Atualizar Técnica' : 'Salvar Técnica'}
                </button>
            </div>
        `;
    },

    renderEfeitosSection(tipo) {
        const efeitos = this.editando.efeitos;
        const grau = parseInt(this.editando.dados?.grau) || 1;
        const isMP = tipo === 'mp';
        const filtrarMP = lista => isMP ? lista.filter(e => !MP_REGRAS.efeitosProibidos.includes(e.id)) : lista;

        const renderEfeitoOpcao = (e, cat, subcat) => {
            let custoDisplay;
            if (cat === 'aumento') {
                if (e.custoCalc) {
                    custoDisplay = '+' + this.calcularCustoDinamico(e) + ' PP';
                } else if (e.custoPorOpcao || e.tipo === 'number') {
                    custoDisplay = 'variável';
                } else {
                    custoDisplay = '+' + (e.custo || '?') + ' PP';
                }
            } else {
                if (e.reducaoCalc || e.custoCalcTipo) {
                    custoDisplay = '-' + this.calcularReducaoDinamica(e) + ' PP';
                } else if (e.opcoes === 'condicoes-reducao') {
                    custoDisplay = 'variável';
                } else {
                    custoDisplay = '-' + (e.reducao || '?') + ' PP';
                }
            }
            return `
                <div class="efeito-opcao ${cat === 'reducao' ? 'reducao' : ''}" onclick="App.selecionarEfeito('${cat}', '${subcat}', '${e.id}')" title="${e.desc}">
                    <div>
                        <span class="efeito-opt-nome">${e.nome}</span>
                        <p class="efeito-opt-desc" style="font-size: 0.75rem; color: #999; margin: 2px 0 0; line-height: 1.3;">${e.desc.substring(0, 120)}${e.desc.length > 120 ? '...' : ''}</p>
                    </div>
                    <span class="efeito-opt-custo">${custoDisplay}</span>
                </div>
            `;
        };

        return `
            <div class="efeitos-container">
                <h4 style="color: var(--secundaria); font-family: 'Cinzel'; margin-bottom: 1rem;">Efeitos</h4>

                <div class="efeitos-categorias">
                    <div class="efeito-categoria">
                        <div class="cat-header" onclick="App.toggleCategoria('controle')">
                            <span>⚙️ Controle</span>
                            <span class="cat-arrow" id="arrow-controle">▼</span>
                        </div>
                        <div class="cat-body" id="cat-controle">
                            ${filtrarMP(EFEITOS_AUMENTO.controle).map(e => renderEfeitoOpcao(e, 'aumento', 'controle')).join('')}
                        </div>
                    </div>

                    <div class="efeito-categoria">
                        <div class="cat-header" onclick="App.toggleCategoria('ofensivo')">
                            <span>⚔️ Ofensivo</span>
                            <span class="cat-arrow" id="arrow-ofensivo">▼</span>
                        </div>
                        <div class="cat-body" id="cat-ofensivo">
                            ${filtrarMP(EFEITOS_AUMENTO.ofensivo).map(e => renderEfeitoOpcao(e, 'aumento', 'ofensivo')).join('')}
                        </div>
                    </div>

                    <div class="efeito-categoria">
                        <div class="cat-header" onclick="App.toggleCategoria('suporte')">
                            <span>🛡️ Suporte</span>
                            <span class="cat-arrow" id="arrow-suporte">▼</span>
                        </div>
                        <div class="cat-body" id="cat-suporte">
                            ${filtrarMP(EFEITOS_AUMENTO.suporte).map(e => renderEfeitoOpcao(e, 'aumento', 'suporte')).join('')}
                        </div>
                    </div>

                    <div class="efeito-categoria reducao">
                        <div class="cat-header" onclick="App.toggleCategoria('reducao')">
                            <span>📉 Reduções</span>
                            <span class="cat-arrow" id="arrow-reducao">▼</span>
                        </div>
                        <div class="cat-body" id="cat-reducao">
                            ${filtrarMP(EFEITOS_REDUCAO.geral).map(e => renderEfeitoOpcao(e, 'reducao', 'geral')).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="efeitos-adicionados">
                    <h5 style="color: var(--texto-sec); margin: 1rem 0 0.5rem;">Efeitos Adicionados:</h5>
                    ${efeitos.length === 0 ? '<p class="muted" style="text-align: center; font-style: italic;">Nenhum efeito adicionado. Clique acima para adicionar.</p>' : ''}
                    <div class="efeitos-lista">
                        ${efeitos.map((ef, i) => `
                            <div class="efeito-card">
                                <div class="efeito-info">
                                    <span class="efeito-nome">${ef.nome}</span>
                                    ${ef.detalhe ? `<span class="efeito-detalhe"> - ${ef.detalhe}</span>` : ''}
                                </div>
                                <span class="efeito-custo ${ef.custo >= 0 ? 'positivo' : 'negativo'}">
                                    ${ef.custo >= 0 ? '+' : ''}${ef.custo} PP
                                </span>
                                <button class="btn-remove" onclick="App.removerEfeito(${i})">×</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    toggleCategoria(cat) {
        const body = document.getElementById('cat-' + cat);
        const arrow = document.getElementById('arrow-' + cat);
        if (body.style.display === 'none') {
            body.style.display = 'block';
            arrow.textContent = '▼';
        } else {
            body.style.display = 'none';
            arrow.textContent = '▶';
        }
    },

    // Calcula o custo dinâmico de um efeito baseado no custoCalc
    // (MPs seguem as regras de Técnicas de 2º grau — pág. 208 do livro)
    calcularCustoDinamico(efeito, dados) {
        const grau = parseInt(this.editando.dados?.grau) || (this.editando.tipo === 'mp' ? 2 : 1);
        const isAuxiliar = this.editando.tipoTec === 'auxiliar';

        if (!efeito.custoCalc) return efeito.custo || 0;

        switch (efeito.custoCalc) {
            case 'metade-grau-cima':
                if (isAuxiliar && efeito.custoAuxiliar) return efeito.custoAuxiliar;
                // Condição/Efeito em Área é grátis em Técnicas de 1º grau (livro, Cap. 6)
                if (efeito.id === 'condicao-area' && grau === 1) return 0;
                return Math.ceil(grau / 2);
            case 'igual-grau':
                return grau;
            case '1+metade-grau+dados':
                // Dano Contínuo: 1 + ceil(grau/2) + dados (dados pedido depois)
                return 1 + Math.ceil(grau / 2);
            default:
                return efeito.custo || 0;
        }
    },

    // Calcula a redução dinâmica de um efeito
    // (MPs seguem as regras de Técnicas de 2º grau — pág. 208 do livro)
    calcularReducaoDinamica(efeito) {
        const grau = parseInt(this.editando.dados?.grau) || (this.editando.tipo === 'mp' ? 2 : 1);
        const isAuxiliar = this.editando.tipoTec === 'auxiliar';

        if (efeito.reducaoCalc) {
            switch (efeito.reducaoCalc) {
                case 'igual-grau':
                    return grau;
                case 'metade-pp-requisito':
                    return 0; // calculado por input
                default:
                    return efeito.reducao || 0;
            }
        }

        // Técnica Não Ofensiva - redução depende do tipo
        if (efeito.custoCalcTipo === 'nao-ofensiva') {
            return isAuxiliar ? (efeito.reducaoAuxiliar || 1) : (efeito.reducaoCombate || 2);
        }

        return efeito.reducao || 0;
    },

    selecionarEfeito(categoria, subcategoria, id) {
        let efeito;
        if (categoria === 'aumento') {
            efeito = EFEITOS_AUMENTO[subcategoria]?.find(e => e.id === id);
        } else {
            efeito = EFEITOS_REDUCAO[subcategoria]?.find(e => e.id === id);
        }

        if (!efeito) return;

        // Técnica Rápida só pode ser usada em Técnicas de até 4º grau (livro)
        if (efeito.id === 'tecnica-rapida') {
            const grauAtual = parseInt(this.editando.dados?.grau) || 1;
            if (grauAtual > 4) {
                alert('Técnica Rápida só pode ser aplicada em Técnicas de até 4º grau.');
                return;
            }
        }

        // Se tem opções, abrir sub-seleção
        if (efeito.opcoes && efeito.opcoes !== 'condicoes' && efeito.opcoes !== 'condicoes-reducao') {
            this.mostrarSubOpcoes(efeito, categoria);
        } else if (efeito.opcoes === 'condicoes') {
            this.mostrarCondicoes(efeito, 'aumento');
        } else if (efeito.opcoes === 'condicoes-reducao') {
            this.mostrarCondicoes(efeito, 'reducao');
        } else if (efeito.tipo === 'number' && (efeito.id === 'adicionar-cura' || efeito.id === 'adicionar-pv-temp' || efeito.id === 'dano-adicional' || efeito.id === 'dano-continuo' || efeito.id === 'contencao-coletiva' || efeito.id === 'contencao-individual')) {
            this.mostrarInputNumerico(efeito, categoria);
        } else if (efeito.custoCalc || efeito.reducaoCalc || efeito.custoCalcTipo) {
            // Efeitos com custo dinâmico - calcular automaticamente
            let custo;
            if (categoria === 'reducao') {
                custo = -this.calcularReducaoDinamica(efeito);
            } else {
                custo = this.calcularCustoDinamico(efeito);
            }
            this.editando.efeitos.push({
                id: efeito.id,
                nome: efeito.nome,
                custo: custo,
                categoria: categoria,
                dinamico: true
            });
            this.atualizarModalCriacao();
        } else {
            // Adicionar diretamente com custo fixo
            const custo = categoria === 'reducao' ? -(efeito.reducao || 0) : (efeito.custo || 0);
            this.editando.efeitos.push({
                id: efeito.id,
                nome: efeito.nome,
                custo: custo,
                categoria: categoria
            });
            this.atualizarModalCriacao();
        }
    },

    mostrarInputNumerico(efeito, categoria) {
        const grau = parseInt(this.editando.dados?.grau) || 1;
        const isAuxiliar = this.editando.tipoTec === 'auxiliar';
        let descExtra = '';
        let maxVal = efeito.max || 10;
        let custoPorUnidade = efeito.custo || 1;

        if (efeito.id === 'adicionar-cura') {
            descExtra = 'Cada 1 PP = 1d10 (alvo único) ou 1d6 (área). Não pode ser 1º grau.';
            custoPorUnidade = 1;
        } else if (efeito.id === 'adicionar-pv-temp') {
            descExtra = 'Cada 1 PP = 1d10 (alvo único) ou 1d4 (área).';
            custoPorUnidade = 1;
        } else if (efeito.id === 'dano-adicional') {
            descExtra = 'Adiciona dados de dano extras (1 PP por dado).';
            custoPorUnidade = 1;
            maxVal = 5;
        } else if (efeito.id === 'dano-continuo') {
            descExtra = `Custo base: ${1 + Math.ceil(grau / 2)} PP + 1 PP por dado de dano. Máx dados = grau (${grau}).`;
            maxVal = grau;
        } else if (efeito.id === 'contencao-coletiva') {
            descExtra = '1 PP por 1d8 de redução (máx 15d8). Requer Reação.';
            maxVal = 15;
        } else if (efeito.id === 'contencao-individual') {
            descExtra = '1 PP por 2d8 de redução (máx 30d8). Requer Reação.';
            custoPorUnidade = 0.5;
            maxVal = 15; // 15 PP = 30d8
        }

        const container = document.createElement('div');
        container.className = 'sub-opcoes-popup';
        container.innerHTML = `
            <div class="sub-opcoes-box">
                <h4>${efeito.nome}</h4>
                <p class="muted">${efeito.desc}</p>
                <p class="muted" style="color: var(--secundaria); font-size: 0.85rem;">${descExtra}</p>
                <div class="form-group" style="margin: 1rem 0;">
                    <label>Quantidade (máx ${maxVal}):</label>
                    <input type="number" id="input-efeito-qtd" min="1" max="${maxVal}" value="1" style="width: 80px;">
                </div>
                <div class="btns">
                    <button class="btn btn-small btn-secondary" onclick="this.closest('.sub-opcoes-popup').remove()">Cancelar</button>
                    <button class="btn btn-small btn-primary" onclick="App.adicionarEfeitoNumerico('${efeito.id}', '${efeito.nome}', ${custoPorUnidade}, '${categoria}', ${efeito.id === 'dano-continuo' ? 1 + Math.ceil(grau / 2) : 0})">Confirmar</button>
                </div>
            </div>
        `;
        document.querySelector('.modal-body').appendChild(container);
    },

    adicionarEfeitoNumerico(efeitoId, efeitoNome, custoPorUnidade, categoria, custoBase) {
        const qtd = parseInt(document.getElementById('input-efeito-qtd')?.value) || 1;
        const custoTotal = custoBase + Math.ceil(qtd * custoPorUnidade);
        const custo = categoria === 'reducao' ? -custoTotal : custoTotal;

        this.editando.efeitos.push({
            id: efeitoId,
            nome: efeitoNome,
            detalhe: `${qtd}x`,
            custo: custo,
            categoria: categoria,
            quantidade: qtd
        });
        document.querySelector('.sub-opcoes-popup')?.remove();
        this.atualizarModalCriacao();
    },

    mostrarSubOpcoes(efeito, categoria) {
        const opcoes = efeito.opcoes;
        const container = document.createElement('div');
        container.className = 'sub-opcoes-popup';
        container.innerHTML = `
            <div class="sub-opcoes-box">
                <h4>${efeito.nome}</h4>
                <p class="muted">${efeito.desc}</p>
                <div class="sub-opcoes-lista">
                    ${opcoes.map(op => `
                        <div class="sub-opcao" onclick="App.adicionarEfeitoComOpcao('${efeito.id}', '${efeito.nome}', '${op.valor}', ${op.custo || op.reducao || 0}, '${categoria}', '${op.nome.replace(/'/g, "\\'")}')">
                            <span>${op.nome}</span>
                            <span class="${categoria === 'aumento' ? 'positivo' : 'negativo'}">${categoria === 'aumento' ? '+' : '-'}${op.custo || op.reducao || 0} PP</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-small btn-secondary" onclick="this.parentElement.parentElement.remove()">Cancelar</button>
            </div>
        `;
        document.querySelector('.modal-body').appendChild(container);
    },

    mostrarCondicoes(efeito, modo) {
        const isReducao = modo === 'reducao';
        const container = document.createElement('div');
        container.className = 'sub-opcoes-popup';
        container.innerHTML = `
            <div class="sub-opcoes-box">
                <h4>${isReducao ? 'Escolher Condição (Efeito Negativo no Usuário)' : 'Escolher Condição'}</h4>
                <p class="muted">${efeito.desc}</p>
                <div class="sub-opcoes-lista" style="max-height: 40vh; overflow-y: auto;">
                    ${SISTEMA.condicoes.map(c => `
                        <div class="sub-opcao" onclick="App.adicionarEfeitoComOpcao('${efeito.id}', '${efeito.nome}', '${c.id}', ${c.pp}, '${isReducao ? 'reducao' : 'aumento'}', '${c.nome}')">
                            <span>${c.nome}</span>
                            <span class="${isReducao ? 'negativo' : 'positivo'}">${isReducao ? '-' : '+'}${c.pp} PP</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-small btn-secondary" onclick="this.parentElement.parentElement.remove()">Cancelar</button>
            </div>
        `;
        document.querySelector('.modal-body').appendChild(container);
    },

    adicionarEfeitoComOpcao(efeitoId, efeitoNome, opcaoValor, custo, categoria, detalhe) {
        // Limitar Efeito Colateral negativo a -4 PP
        if (efeitoId === 'efeito-colateral-negativo' && custo > 4) {
            custo = 4;
        }
        this.editando.efeitos.push({
            id: efeitoId,
            nome: efeitoNome,
            detalhe: detalhe,
            custo: categoria === 'aumento' ? custo : -custo,
            categoria: categoria
        });
        // Remover popup
        document.querySelector('.sub-opcoes-popup')?.remove();
        this.atualizarModalCriacao();
    },

    adicionarEfeitoSelecionado() {
        // Mantido para compatibilidade mas não mais usado
    },

    getNomeEfeito(id, categoria) {
        if (categoria === 'aumento') {
            for (const cat of Object.values(EFEITOS_AUMENTO)) {
                const ef = cat.find(e => e.id === id);
                if (ef) return ef.nome;
            }
        } else {
            for (const cat of Object.values(EFEITOS_REDUCAO)) {
                const ef = cat.find(e => e.id === id);
                if (ef) return ef.nome;
            }
        }
        return id;
    },

    calcularCustoEfeitos() {
        return this.editando.efeitos
            .filter(e => e.custo > 0)
            .reduce((sum, e) => sum + e.custo, 0);
    },

    calcularReducaoEfeitos() {
        return Math.abs(this.editando.efeitos
            .filter(e => e.custo < 0)
            .reduce((sum, e) => sum + e.custo, 0));
    },

    removerEfeito(index) {
        this.editando.efeitos.splice(index, 1);
        this.atualizarModalCriacao();
    },

    atualizarModalCriacao() {
        // Recalcular custos dinâmicos quando grau muda
        const grau = parseInt(this.editando.dados?.grau) || 1;
        this.editando.efeitos.forEach(ef => {
            if (ef.dinamico) {
                // Buscar efeito original
                let efeitoOriginal = null;
                for (const cat of Object.values(EFEITOS_AUMENTO)) {
                    efeitoOriginal = cat.find(e => e.id === ef.id);
                    if (efeitoOriginal) break;
                }
                if (!efeitoOriginal) {
                    for (const cat of Object.values(EFEITOS_REDUCAO)) {
                        efeitoOriginal = cat.find(e => e.id === ef.id);
                        if (efeitoOriginal) break;
                    }
                }
                if (efeitoOriginal) {
                    if (ef.categoria === 'reducao') {
                        ef.custo = -this.calcularReducaoDinamica(efeitoOriginal);
                    } else {
                        ef.custo = this.calcularCustoDinamico(efeitoOriginal);
                    }
                }
            }
        });
        this.renderModalCriacao();
    },

    salvarMP() {
        const dados = this.editando.dados;
        const mp = {
            id: 'mp-' + Date.now(),
            nome: dados.nome || 'MP Sem Nome',
            desc: dados.desc,
            requisito: dados.requisito,
            efeitos: [...this.editando.efeitos],
            especial: false
        };

        if (this.editando.editIndex !== undefined) {
            mp.id = this.akuma.mps[this.editando.editIndex].id;
            this.akuma.mps[this.editando.editIndex] = mp;
        } else {
            this.akuma.mps.push(mp);
        }
        this.fecharModal();
        this.renderMPs();
    },

    salvarTecnica() {
        const dados = this.editando.dados;
        const isCombate = this.editando.tipoTec === 'combate';
        const isAuxiliar = this.editando.tipoTec === 'auxiliar';
        const grauInfo = SISTEMA.graus.find(g => g.grau === parseInt(dados.grau)) || SISTEMA.graus[0];
        const duracao = SISTEMA.duracoes.find(d => d.id === dados.duracao)?.nome || dados.duracao;

        let alcance = dados.alcanceTipo;
        if (['linha', 'cone', 'esfera', 'cilindro', 'emanacao'].includes(dados.alcanceTipo)) {
            alcance = `Até ${dados.alcanceValor || '?'} metros, ${dados.alcanceTipo.charAt(0).toUpperCase() + dados.alcanceTipo.slice(1)}`;
        } else if (dados.alcanceTipo === 'pessoal') {
            alcance = 'Pessoal';
        } else if (dados.alcanceTipo === 'toque') {
            alcance = 'Toque';
        }

        const custoBase = isCombate ? parseInt(dados.grau) * 2 : 0;
        // Aplica o mesmo cap de redução do livro (combate = grau; auxiliar = 6 PP)
        const reducaoMax = isCombate ? (parseInt(dados.grau) || 1) : 6;
        const reducaoEfetiva = Math.min(this.calcularReducaoEfeitos(), reducaoMax);
        const ppTotal = Math.max(1, custoBase + this.calcularCustoEfeitos() - reducaoEfetiva);

        // Dano: usar customizado se preenchido, senão usar base do grau (combate) ou Nenhum (auxiliar)
        let dano = 'Nenhum';
        if (dados.danoCustom && dados.danoCustom.trim()) {
            dano = dados.danoCustom.trim();
            if (dados.tipoDano) dano += ' ' + dados.tipoDano;
        } else if (isCombate && grauInfo) {
            const isArea = ['cone', 'esfera', 'cilindro', 'emanacao'].includes(dados.alcanceTipo);
            dano = isArea ? grauInfo.danoArea : grauInfo.danoUnico;
            if (dados.tipoDano) dano += ' ' + dados.tipoDano;
        }

        const tecnica = {
            id: 'tec-' + Date.now(),
            tipo: this.editando.tipoTec,
            nome: dados.nome || 'Técnica Sem Nome',
            desc: dados.desc,
            grau: parseInt(dados.grau) || 1,
            pp: ppTotal,
            duracao: duracao,
            alcance: alcance,
            dano: dano,
            requisitos: `${this.akuma.nome || 'Akuma'}, ${dados.requisito ? SISTEMA.requisitos.find(r => r.id === dados.requisito)?.nome || 'Ação Poderosa' : 'Ação Poderosa'}`,
            ataqueCombinado: dados.ataqueCombinado,
            efeitos: [...this.editando.efeitos]
        };

        // Se editando uma técnica existente, substituir
        if (this.editando.editIndex !== undefined) {
            this.akuma.tecnicas[this.editando.editIndex] = tecnica;
        } else {
            this.akuma.tecnicas.push(tecnica);
        }
        this.fecharModal();
        this.renderTecnicas();
    },

    removerMP(index) {
        this.akuma.mps.splice(index, 1);
        this.renderMPs();
    },

    removerTecnica(index) {
        const tecnicas = this.akuma.tecnicas;
        tecnicas.splice(index, 1);
        this.renderTecnicas();
    },

    // ==================== ABA ZOAN ====================
    renderZoan() {
        const container = document.getElementById('aba-zoan');
        if (this.akuma.tipo !== 'zoan') {
            container.innerHTML = '';
            return;
        }
        
        const subtipo = this.akuma.subtipo;
        const classificacao = this.akuma.classificacao;
        const isCarnivoro = classificacao === 'carnivoro';
        const isAncestral = subtipo === 'ancestral';
        const isMitica = subtipo === 'mitica';
        const isMiticaDesperto = isMitica && this.akuma.usuario === 'mitica-desperto';

        // Calcular limites de traços
        const maxComuns = isMitica ? 2 : 3;
        let maxEspecificos = isMitica ? 2 : (isCarnivoro ? 3 : 5);
        let maxAncestrais = isAncestral ? 4 : (isMitica ? 1 : 0); // Ancestral: 1 obrigatório + até 3 trocas
        // Mítica Desperto: +1 Traço Específico OU Ancestral extra (um só, em qualquer das listas)
        if (isMiticaDesperto) {
            const extraNoAncestral = this.akuma.tracos.ancestrais.length > 1;
            const extraNoEspecifico = this.akuma.tracos.especificos.length > 2;
            maxEspecificos = 2 + (extraNoAncestral ? 0 : 1);
            maxAncestrais = 1 + (extraNoEspecifico ? 0 : 1);
        }
        
        // Obter regras do tipo de usuário
        let regrasUsuario;
        if (isMitica) {
            regrasUsuario = this.akuma.usuario === 'mitica-desperto' ? REGRAS_ZOAN.miticaDesperto : REGRAS_ZOAN.mitica;
        } else if (isAncestral) {
            regrasUsuario = this.akuma.usuario === 'ancestral-desperto' ? REGRAS_ZOAN.ancestralDesperto : REGRAS_ZOAN.ancestral;
        } else {
            regrasUsuario = this.akuma.usuario === 'normal-desperto' ? REGRAS_ZOAN.comumDesperto : REGRAS_ZOAN.comum;
        }
        const isDesperto = this.akuma.usuario?.includes('desperto');
        
        container.innerHTML = `
            <div class="form-section">
                <h3>📋 Características do Usuário ${regrasUsuario.nome}</h3>
                <div class="info-box" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <table style="width: 100%; font-size: 0.9rem;">
                        <tr><td>Aspecto Inato:</td><td><strong>1</strong> (Vigor Animalesco)</td></tr>
                        <tr><td>Traços Comuns:</td><td><strong>Até ${maxComuns}</strong></td></tr>
                        ${isCarnivoro ? `
                            <tr><td>Traço Predador:</td><td><strong>Sim</strong> (automático)</td></tr>
                            <tr><td>Traços Específicos:</td><td><strong>${maxEspecificos}</strong> (carnívoro)</td></tr>
                        ` : `
                            <tr><td>Traços Específicos:</td><td><strong>${maxEspecificos}</strong> (herbívoro)</td></tr>
                        `}
                        ${isAncestral ? `
                            <tr><td>Traços Ancestrais:</td><td><strong>1 obrigatório</strong> + pode trocar até 3 específicos</td></tr>
                        ` : ''}
                        ${isMitica ? `
                            <tr><td>Traços Ancestrais:</td><td><strong>1</strong></td></tr>
                            ${isMiticaDesperto ? `<tr><td>Traço Extra:</td><td><strong>1</strong> Específico OU Ancestral adicional</td></tr>` : ''}
                            <tr><td>MPs:</td><td><strong>${isMiticaDesperto ? 2 : 1}</strong> (2ª MP apenas durante o Estágio Desperto)</td></tr>
                            <tr><td>Técnicas/Points:</td><td>A cada nível de grau (1º/3º/6º/9º/12º${isMiticaDesperto ? '/16º/20º' : ''}), escolha <strong>Técnica OU Point</strong></td></tr>
                            <tr><td>Téc. Auxiliares:</td><td>No <strong>6º e 12º</strong> nível</td></tr>
                        ` : ''}
                    </table>
                </div>
            </div>
            
            <div class="form-section">
                <h3>🐾 Traços Zoan</h3>
                
                ${isCarnivoro ? `
                <div class="traco-predador" style="margin-bottom: 1.5rem; padding: 1rem; background: linear-gradient(135deg, rgba(139,0,0,0.3), rgba(50,0,0,0.3)); border: 2px solid #8B0000; border-radius: 8px;">
                    <h4 style="color: #FF6B6B; margin-bottom: 0.5rem;">🦁 Traço Predador (Automático)</h4>
                    <p style="font-size: 0.9rem; line-height: 1.5;">${TRACOS_ZOAN.predador.desc}</p>
                </div>
                ` : ''}
                
                <h4 style="color: var(--secundaria); margin: 1rem 0 0.5rem;">Traços Comuns (escolha até ${maxComuns}) — Selecionados: ${this.akuma.tracos.comuns.length}</h4>
                <div class="tracos-grid-expandable">
                    ${TRACOS_ZOAN.comuns.map(t => `
                        <div class="traco-item ${this.akuma.tracos.comuns.includes(t.id) ? 'selected' : ''}"
                             onclick="App.toggleTraco('comuns', '${t.id}', ${maxComuns})">
                            <div class="traco-header">
                                <span class="traco-nome">${t.nome}</span>
                                ${t.multiplo ? `<span class="traco-multiplo">(${t.multiplo}x)</span>` : ''}
                            </div>
                            <p class="traco-desc">${t.desc}</p>
                        </div>
                    `).join('')}
                </div>
                
                <h4 style="color: var(--secundaria); margin: 1.5rem 0 0.5rem;">Traços Específicos (escolha ${maxEspecificos}) — Selecionados: ${this.akuma.tracos.especificos.length}</h4>
                
                ${Object.entries(TRACOS_ZOAN.especificos).map(([grupo, dados]) => `
                    <div class="grupo-tracos" style="margin-bottom: 1rem;">
                        <h5 style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--borda); padding-bottom: 0.3rem;">
                            ${dados.nome}
                        </h5>
                        <div class="tracos-grid-expandable">
                            ${dados.tracos.map(t => `
                                <div class="traco-item ${this.akuma.tracos.especificos.includes(t.id) ? 'selected' : ''}"
                                     onclick="App.toggleTraco('especificos', '${t.id}', ${maxEspecificos})">
                                    <div class="traco-header">
                                        <span class="traco-nome">${t.nome}</span>
                                        ${t.multiplo ? `<span class="traco-multiplo">(${t.multiplo}x)</span>` : ''}
                                    </div>
                                    <p class="traco-desc">${t.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                
                ${isAncestral || isMitica ? `
                <h4 style="color: var(--cat-s); margin: 1.5rem 0 0.5rem;">Traços Ancestrais ${isAncestral ? '(1 obrigatório + até 3 trocas)' : '(escolha 1)'} — Selecionados: ${this.akuma.tracos.ancestrais.length}</h4>
                <div class="tracos-grid-expandable">
                    ${TRACOS_ZOAN.ancestrais.map(t => `
                        <div class="traco-item ancestral ${this.akuma.tracos.ancestrais.includes(t.id) ? 'selected' : ''}"
                             onclick="App.toggleTraco('ancestrais', '${t.id}', ${maxAncestrais})">
                            <div class="traco-header">
                                <span class="traco-nome">${t.nome}</span>
                            </div>
                            <p class="traco-desc">${t.desc}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
            
            ${this.renderPointsZoan(isMitica)}

            ${isDesperto ? this.renderEstagioDesperto(isMitica ? 'mitica' : 'zoan') : ''}
        `;
    },

    renderEstagioDesperto(tipo) {
        const info = ESTAGIO_DESPERTO[tipo];
        if (!info) return '';
        return `
            <div class="form-section">
                <h3>🌟 ${info.titulo}</h3>
                <div class="info-box" style="padding: 1rem; background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(50,50,0,0.3)); border: 1px solid var(--secundaria); border-radius: 8px;">
                    <p style="font-size: 0.85rem; margin-bottom: 0.75rem;"><strong>Requisitos:</strong> ${info.requisito}</p>
                    <ul style="margin: 0 0 0 1.2rem; font-size: 0.9rem; line-height: 1.6;">
                        ${info.caracteristicas.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    },

    renderPointsZoan(isMitica = false) {
        return `
            <div class="form-section">
                <div class="section-header">
                    <h3>📍 Points</h3>
                    <div class="btns">
                        <button class="btn btn-primary btn-small" onclick="App.abrirModalPoint()">+ Point Modelo</button>
                        <button class="btn btn-secondary btn-small" onclick="App.abrirModalPointCustom()">+ Criar Point</button>
                    </div>
                </div>

                <div class="info-box" style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; font-size: 0.85rem;">
                    ${isMitica ? `
                        <strong>Zoan Mítica:</strong> em cada nível de grau (1º/3º/6º/9º/12º — e 16º/20º se desperta), você pode escolher <strong>não receber a Técnica</strong> daquele nível para criar ou receber qualquer Point das Zoan Comuns/Ancestrais, dentro das mesmas regras.
                    ` : `
                        <strong>Progressão de Points:</strong> 1º nível (1º Point), 3º nível (2º Point), 6º nível (3º Point), 9º nível (4º Point), 12º nível (5º Point)
                    `}
                    <br><strong>Criação de Points:</strong> Traço Realçado usa pontos virtuais (regras de MP) com máximo por Point (—/4/6/8/10 PP); Técnica com PP máximo por Point (2/4/6/8/10 PP). Ao mesclar traço + técnica no mesmo Point, os pontos do traço são descontados do máximo da técnica.
                </div>
                
                <div class="lista-items">
                    ${this.akuma.points.length === 0 ? '<p class="empty">Nenhum Point adicionado.</p>' : ''}
                    ${this.akuma.points.map((p, i) => `
                        <div class="point-card">
                            <div class="point-header">
                                <span class="point-nome">${p.nome}</span>
                                <span class="item-tag ${p.predefinido ? 'especial' : 'criada'}">${p.predefinido ? 'Pré-definido' : 'Criado'}</span>
                                <button class="btn-remove" onclick="App.removerPoint(${i})">×</button>
                            </div>
                            ${p.desc ? `<p class="point-desc">${p.desc}</p>` : ''}
                            ${p.tracoRealcado ? `
                                <div class="point-traco">
                                    <strong>Traço Realçado - ${p.tracoRealcado.nome}:</strong> ${p.tracoRealcado.desc}
                                </div>
                            ` : ''}
                            ${p.tecnica ? `
                                <div class="point-tecnica">
                                    <strong>Técnica - ${p.tecnica.nome}:</strong> ${p.tecnica.desc}
                                    <div class="tecnica-stats">
                                        <span>Grau: ${p.tecnica.grau}º</span>
                                        <span>PP: ${p.tecnica.pp}</span>
                                        <span>Dano: ${p.tecnica.dano}</span>
                                        <span>Duração: ${p.tecnica.duracao}</span>
                                        <span>Alcance: ${p.tecnica.alcance}</span>
                                    </div>
                                </div>
                            ` : ''}
                            <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--borda);">
                                <label style="font-size: 0.8rem; color: var(--texto-sec);">Descrição do ataque/uso (editável):</label>
                                <textarea style="width: 100%; min-height: 40px; margin-top: 0.25rem; font-size: 0.85rem; background: rgba(0,0,0,0.2); border: 1px solid var(--borda); color: var(--texto); padding: 0.5rem; border-radius: 4px;"
                                          onchange="App.akuma.points[${i}].descCustom = this.value"
                                          placeholder="Descreva como seu personagem usa este Point...">${p.descCustom || ''}</textarea>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    toggleTraco(categoria, id, max) {
        const lista = this.akuma.tracos[categoria];
        const idx = lista.indexOf(id);
        if (idx >= 0) {
            lista.splice(idx, 1);
        } else if (lista.length < max) {
            lista.push(id);
        }
        this.renderZoan();
    },

    abrirModalPoint() {
        this.abrirModal('Adicionar Point', `
            <h4 style="color: var(--secundaria); margin-bottom: 1rem;">Points Pré-definidos</h4>
            <div class="mps-lista" style="max-height: 60vh; overflow-y: auto;">
                ${POINTS_ZOAN.map(p => `
                    <div class="mp-opcao" onclick="App.adicionarPoint('${p.id}')" style="cursor: pointer;">
                        <div class="mp-nome">${p.nome}</div>
                        <div class="mp-desc" style="font-size: 0.85rem; color: #aaa;">${p.desc}</div>
                        ${p.tracoRealcado ? `<div style="font-size: 0.8rem; color: #D4AF37; margin-top: 0.3rem;">Traço: ${p.tracoRealcado.nome}</div>` : ''}
                        ${p.tecnica ? `<div style="font-size: 0.8rem; color: #6B8E23; margin-top: 0.2rem;">Técnica: ${p.tecnica.nome} (${p.tecnica.grau}º Grau)</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `);
    },

    adicionarPoint(id) {
        const point = POINTS_ZOAN.find(p => p.id === id);
        if (point) {
            this.akuma.points.push({
                id: point.id,
                nome: point.nome,
                desc: point.desc,
                tracoRealcado: point.tracoRealcado,
                tecnica: point.tecnica,
                predefinido: true
            });
            this.fecharModal();
            this.renderZoan();
        }
    },

    removerPoint(index) {
        this.akuma.points.splice(index, 1);
        this.renderZoan();
    },

    // ==================== CRIAÇÃO DE POINT CUSTOMIZADO ====================
    abrirModalPointCustom() {
        this.pointCustom = {
            nome: '',
            pointNum: 2,
            desc: '',
            usarTraco: false,
            tracoNome: '',
            tracoDesc: '',
            tracoPV: 0,
            usarTecnica: true,
            tecNome: '',
            tecGrau: 1,
            tecPP: 2,
            tecDano: '',
            tecDuracao: 'Instantâneo',
            tecAlcance: 'Toque',
            tecDesc: ''
        };
        this.renderModalPointCustom();
    },

    renderModalPointCustom() {
        const pc = this.pointCustom;
        const info = CRIACAO_POINTS.find(p => p.point === parseInt(pc.pointNum)) || CRIACAO_POINTS[1];
        const podeTraco = info.maxPPTraco > 0;
        const pvTraco = pc.usarTraco && podeTraco ? (parseInt(pc.tracoPV) || 0) : 0;
        // Mesclando traço + técnica: PV do traço descontam do máximo de PP da técnica
        const maxPPTecnica = Math.max(0, info.maxPPTecnica - pvTraco);
        const erros = [];
        if (pc.usarTraco && !podeTraco) erros.push('O 1º Point não permite Traço Realçado (apenas Técnica de até 2 PP).');
        if (pc.usarTraco && podeTraco && pvTraco > info.maxPPTraco) erros.push(`Traço Realçado excede o máximo de ${info.maxPPTraco} pontos virtuais do ${info.nome}.`);
        if (pc.usarTecnica && (parseInt(pc.tecPP) || 0) > maxPPTecnica) erros.push(`A Técnica excede o máximo de ${maxPPTecnica} PP ${pvTraco > 0 ? `(${info.maxPPTecnica} do ${info.nome} - ${pvTraco} PV do traço)` : `do ${info.nome}`}.`);
        if (!pc.usarTraco && !pc.usarTecnica) erros.push('O Point precisa de um Traço Realçado e/ou uma Técnica.');

        this.abrirModal('Criar Point', `
            <div class="form-row">
                <div class="form-group">
                    <label>Nome do Point</label>
                    <input type="text" value="${pc.nome}" onchange="App.pointCustom.nome = this.value" placeholder="Ex: Fang Point">
                </div>
                <div class="form-group">
                    <label>Point (nível recebido)</label>
                    <select onchange="App.pointCustom.pointNum = this.value; App.renderModalPointCustom()">
                        ${CRIACAO_POINTS.map(p => `
                            <option value="${p.point}" ${parseInt(pc.pointNum) === p.point ? 'selected' : ''}>
                                ${p.nome} (${p.nivel}º nível) — Traço máx ${p.maxPPTraco || '—'} PV | Técnica máx ${p.maxPPTecnica} PP
                            </option>
                        `).join('')}
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Descrição do Point</label>
                <textarea onchange="App.pointCustom.desc = this.value" placeholder="Como é a transformação...">${pc.desc}</textarea>
            </div>

            <div class="form-group" style="padding: 0.75rem; background: rgba(0,0,0,0.15); border-radius: 8px;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" ${pc.usarTraco ? 'checked' : ''} ${!podeTraco ? 'disabled' : ''}
                           onchange="App.pointCustom.usarTraco = this.checked; App.renderModalPointCustom()">
                    <strong>Traço Realçado</strong> ${podeTraco ? `(máx ${info.maxPPTraco} pontos virtuais — segue as regras de criação de MP)` : '(indisponível no 1º Point)'}
                </label>
                ${pc.usarTraco && podeTraco ? `
                    <div class="form-row" style="margin-top: 0.5rem;">
                        <div class="form-group">
                            <label>Nome do Traço</label>
                            <input type="text" value="${pc.tracoNome}" onchange="App.pointCustom.tracoNome = this.value">
                        </div>
                        <div class="form-group">
                            <label>Pontos virtuais usados (máx ${info.maxPPTraco})</label>
                            <input type="number" min="1" max="${info.maxPPTraco}" value="${pc.tracoPV || 1}"
                                   onchange="App.pointCustom.tracoPV = this.value; App.renderModalPointCustom()">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Descrição do Traço</label>
                        <textarea onchange="App.pointCustom.tracoDesc = this.value">${pc.tracoDesc}</textarea>
                    </div>
                ` : ''}
            </div>

            <div class="form-group" style="padding: 0.75rem; background: rgba(0,0,0,0.15); border-radius: 8px;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" ${pc.usarTecnica ? 'checked' : ''}
                           onchange="App.pointCustom.usarTecnica = this.checked; App.renderModalPointCustom()">
                    <strong>Técnica</strong> (máx ${maxPPTecnica} PP${pvTraco > 0 ? ` — ${info.maxPPTecnica} do ${info.nome} menos ${pvTraco} PV do traço` : ''})
                </label>
                ${pc.usarTecnica ? `
                    <div class="form-row" style="margin-top: 0.5rem;">
                        <div class="form-group">
                            <label>Nome da Técnica</label>
                            <input type="text" value="${pc.tecNome}" onchange="App.pointCustom.tecNome = this.value">
                        </div>
                        <div class="form-group">
                            <label>Grau</label>
                            <select onchange="App.pointCustom.tecGrau = this.value">
                                ${SISTEMA.graus.filter(g => g.grau <= parseInt(pc.pointNum)).map(g => `
                                    <option value="${g.grau}" ${parseInt(pc.tecGrau) === g.grau ? 'selected' : ''}>${g.grau}º Grau</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>PP (máx ${maxPPTecnica})</label>
                            <input type="number" min="1" max="${maxPPTecnica}" value="${pc.tecPP}"
                                   onchange="App.pointCustom.tecPP = this.value; App.renderModalPointCustom()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Dano (vazio = Nenhum)</label>
                            <input type="text" value="${pc.tecDano}" onchange="App.pointCustom.tecDano = this.value" placeholder="Ex: 4d10 Cortante">
                        </div>
                        <div class="form-group">
                            <label>Duração</label>
                            <input type="text" value="${pc.tecDuracao}" onchange="App.pointCustom.tecDuracao = this.value">
                        </div>
                        <div class="form-group">
                            <label>Alcance</label>
                            <input type="text" value="${pc.tecAlcance}" onchange="App.pointCustom.tecAlcance = this.value">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Descrição da Técnica</label>
                        <textarea onchange="App.pointCustom.tecDesc = this.value">${pc.tecDesc}</textarea>
                    </div>
                ` : ''}
            </div>

            ${erros.length > 0 ? `
                <div class="info-box" style="border: 1px solid var(--erro); background: rgba(139,0,0,0.15); padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem;">
                    ${erros.map(e => `<p style="color: var(--erro); font-size: 0.85rem;">⚠️ ${e}</p>`).join('')}
                </div>
            ` : ''}

            <div class="btns btns-center">
                <button class="btn btn-secondary" onclick="App.fecharModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="App.salvarPointCustom()" ${erros.length > 0 ? 'disabled' : ''}>Salvar Point</button>
            </div>
        `, true);
    },

    salvarPointCustom() {
        const pc = this.pointCustom;
        const info = CRIACAO_POINTS.find(p => p.point === parseInt(pc.pointNum)) || CRIACAO_POINTS[1];
        const point = {
            id: 'point-' + Date.now(),
            nome: pc.nome || 'Point Sem Nome',
            pointNum: parseInt(pc.pointNum),
            desc: pc.desc ? `${info.nome} — ${pc.desc}` : info.nome,
            tracoRealcado: pc.usarTraco && info.maxPPTraco > 0 ? {
                nome: pc.tracoNome || 'Traço Realçado',
                desc: `${pc.tracoDesc || ''} (${pc.tracoPV || 1} pontos virtuais)`
            } : null,
            tecnica: pc.usarTecnica ? {
                nome: pc.tecNome || 'Técnica Sem Nome',
                grau: parseInt(pc.tecGrau) || 1,
                pp: parseInt(pc.tecPP) || 1,
                desc: pc.tecDesc || '',
                dano: pc.tecDano || 'Nenhum',
                duracao: pc.tecDuracao || 'Instantâneo',
                alcance: pc.tecAlcance || 'Toque',
                requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
                ataqueCombinado: false,
                nivelMinimo: info.nivel
            } : null,
            predefinido: false
        };
        this.akuma.points.push(point);
        this.fecharModal();
        this.renderZoan();
    },

    // ==================== ABA RESUMO ====================
    renderResumo() {
        const container = document.getElementById('aba-resumo');
        
        container.innerHTML = `
            <div class="form-section">
                <h3>📄 Visualização da Ficha</h3>
                
                <div class="pdf-options">
                    <div class="pdf-option">
                        <label>Cor Primária:</label>
                        <input type="color" value="${this.exportConfig.corPrimaria}" 
                               onchange="App.exportConfig.corPrimaria = this.value; App.renderResumo()">
                    </div>
                    <div class="pdf-option">
                        <label>Cor Secundária:</label>
                        <input type="color" value="${this.exportConfig.corSecundaria}"
                               onchange="App.exportConfig.corSecundaria = this.value; App.renderResumo()">
                    </div>
                    <div class="pdf-option">
                        <input type="checkbox" ${this.exportConfig.mostrarEfeitos ? 'checked' : ''}
                               onchange="App.exportConfig.mostrarEfeitos = this.checked; App.renderResumo()">
                        <label>Mostrar lista de efeitos</label>
                    </div>
                </div>
                
                <div class="pdf-preview" id="pdf-content">
                    ${this.gerarHTML()}
                </div>
                
                <div class="btns btns-center">
                    <button class="btn btn-secondary" onclick="App.salvarAkuma()">💾 Salvar</button>
                    <button class="btn btn-secondary" onclick="App.exportarJSON()">📋 Exportar JSON</button>
                    <button class="btn btn-secondary" onclick="App.importarJSON()">📂 Importar JSON</button>
                    <button class="btn btn-primary btn-pdf" onclick="App.baixarPDF()">📥 Baixar PDF</button>
                    <button class="btn btn-secondary" onclick="App.imprimirFicha()">🖨️ Imprimir / Salvar como PDF</button>
                </div>
            </div>
        `;
    },

    gerarHTML() {
        const a = this.akuma;
        const cor1 = this.exportConfig.corPrimaria;
        const cor2 = this.exportConfig.corSecundaria;
        
        const tipo = SISTEMA.tipos.find(t => t.id === a.tipo)?.nome || '-';
        const categoria = SISTEMA.categorias.find(c => c.id === a.categoria)?.nome || '-';
        const props = a.propriedades.map(p => SISTEMA.propriedades.find(pr => pr.id === p)?.nome).filter(Boolean).join('\n') || '-';
        let usuario = '-';
        if (a.tipo === 'zoan') {
            usuario = this.getUsuariosDisponiveis().find(u => u.id === a.usuario)?.nome || '-';
        } else {
            usuario = SISTEMA.usuarios[a.tipo]?.find(u => u.id === a.usuario)?.nome || '-';
        }
        
        // Preparar dados da tabela de técnicas
        const grauMax = this.getGrauMaximo() || 5;
        const tecCombate = a.tecnicas.filter(t => t.tipo === 'combate');
        const tecAuxiliar = a.tecnicas.filter(t => t.tipo === 'auxiliar');
        
        const niveisGraus = [
            { nivel: '1º', grau: '1º Grau' },
            { nivel: '3º', grau: '2º Grau' },
            { nivel: '6º', grau: '3º Grau' },
            { nivel: '9º', grau: '4º Grau' },
            { nivel: '12º', grau: '5º Grau' },
            { nivel: '16º', grau: '6º Grau' },
            { nivel: '20º', grau: '7º Grau' }
        ];
        
        let html = `
            <div style="font-family: 'Crimson Pro', serif; color: #333;">
                <h1 style="text-align: center; color: ${cor1}; font-family: 'Pirata One', cursive; border-bottom: 3px solid ${cor2}; padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    ${a.nome || 'AKUMA NO MI'}
                </h1>
                
                <!-- TABELA DE TÉCNICAS -->
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 0.85rem;">
                    <thead>
                        <tr style="background: ${cor1}; color: #fff;">
                            <th style="padding: 0.4rem; border: 1px solid #666;">Nível</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">Grau</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">Técnicas de Combate</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">PP</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">Dano</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">Técnicas Auxiliares</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">PP</th>
                            <th style="padding: 0.4rem; border: 1px solid #666;">Propriedades</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${niveisGraus.slice(0, grauMax).map((ng, i) => {
                            const tecC = tecCombate.find(t => t.grau === (i + 1));
                            const tecA = tecAuxiliar[i];
                            const mostrarProps = i === Math.floor(grauMax / 2);
                            return `
                                <tr>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${ng.nivel}</td>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${ng.grau}</td>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${tecC?.nome || '-'}</td>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${tecC?.pp || '-'}</td>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${tecC?.dano || '-'}</td>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${tecA?.nome || '-'}</td>
                                    <td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center;">${tecA?.pp || '-'}</td>
                                    ${i === 0 ? `<td style="padding: 0.3rem; border: 1px solid #ccc; text-align: center; vertical-align: middle;" rowspan="${grauMax}">${props.replace(/\n/g, '<br>')}</td>` : ''}
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
                
                <p style="text-align: center; font-weight: bold; color: ${cor1}; margin-bottom: 1rem;">
                    Usuário ${tipo} ${usuario}
                </p>
                
                <!-- ASPECTO INATO -->
                <h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1rem; font-size: 1.1rem;">ASPECTO INATO</h2>
                ${a.tipo === 'logia' ? `<p><strong>Intangibilidade:</strong> Corpo se transforma no elemento. Antes do 6º nível: ativar como reação (usos = nível). Recebe Técnica Auxiliar de Power Up no 1º nível.</p>` : ''}
                ${a.tipo === 'paramecia' ? `<p><strong>Uso Alternativo:</strong> 1 técnica (duração Instantânea) grátis por descanso longo.</p>` : ''}
                ${a.tipo === 'zoan' ? `<p><strong>Vigor Animalesco:</strong> Recupera 20 + nível de PV OU 1 Nível de Exaustão (1x/descanso longo).</p>` : ''}
        `;
        
        // MPs
        if (a.mps.length > 0) {
            html += `<h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1rem; font-size: 1.1rem;">MANIFESTAÇÕES DE PODER</h2>`;
            a.mps.forEach(mp => {
                const ativacao = !mp.especial && mp.requisito ? MODIFICADORES_PV.find(m => m.id === mp.requisito)?.nome : '';
                html += `<p><strong>${mp.nome}${ativacao ? ' (' + ativacao + ')' : ''}:</strong> ${mp.desc}</p>`;
                if (this.exportConfig.mostrarEfeitos && mp.efeitos?.length > 0) {
                    html += `<p style="font-size: 0.85rem; color: #666; margin-left: 1rem;">Efeitos: ${mp.efeitos.map(e => e.nome + (e.detalhe ? ' (' + e.detalhe + ')' : '')).join(', ')}</p>`;
                }
            });
        }
        
        // Despertar
        if (a.usuario?.includes('desperto')) {
            let infoDesperto;
            if (a.tipo === 'zoan') {
                infoDesperto = a.subtipo === 'mitica' ? ESTAGIO_DESPERTO.mitica : ESTAGIO_DESPERTO.zoan;
            } else {
                infoDesperto = ESTAGIO_DESPERTO.logiaParamecia;
            }
            html += `<h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1rem; font-size: 1.1rem;">DESPERTAR</h2>`;
            html += `<p style="font-size: 0.85rem; color: #555;"><strong>Requisitos:</strong> ${infoDesperto.requisito}</p>`;
            html += `<p style="font-weight: bold; margin-top: 0.5rem;">${infoDesperto.titulo}:</p>`;
            html += `<ul style="margin: 0.25rem 0 0.5rem 1.2rem; font-size: 0.9rem;">${infoDesperto.caracteristicas.map(c => `<li>${c}</li>`).join('')}</ul>`;
            const tipoDesp = TIPOS_DESPERTAR.find(t => t.id === a.tipoDespertar);
            if (tipoDesp && (a.tipo === 'logia' || a.tipo === 'paramecia')) {
                html += `<p style="font-size: 0.9rem;"><strong>${tipoDesp.nome}:</strong> ${tipoDesp.desc}</p>`;
            }
        }

        // Traços Zoan
        if (a.tipo === 'zoan') {
            html += `<h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1rem; font-size: 1.1rem;">TRAÇOS</h2>`;
            
            // Traço Predador (carnívoros)
            if (a.classificacao === 'carnivoro') {
                html += `<p><strong>Predador:</strong> ${TRACOS_ZOAN.predador.desc}</p>`;
            }
            
            // Traços Comuns
            if (a.tracos.comuns.length > 0) {
                html += `<h3 style="color: ${cor1}; font-size: 0.95rem; margin-top: 0.75rem;">Traços Comuns</h3>`;
                a.tracos.comuns.forEach(id => {
                    const traco = TRACOS_ZOAN.comuns.find(t => t.id === id);
                    if (traco) {
                        html += `<p><strong>${traco.nome}:</strong> ${traco.desc}</p>`;
                    }
                });
            }
            
            // Traços Específicos
            if (a.tracos.especificos.length > 0) {
                html += `<h3 style="color: ${cor1}; font-size: 0.95rem; margin-top: 0.75rem;">Traços Específicos</h3>`;
                a.tracos.especificos.forEach(id => {
                    // Buscar em todos os grupos
                    let traco = null;
                    for (const grupo of Object.values(TRACOS_ZOAN.especificos)) {
                        traco = grupo.tracos.find(t => t.id === id);
                        if (traco) break;
                    }
                    if (traco) {
                        html += `<p><strong>${traco.nome}:</strong> ${traco.desc}</p>`;
                    }
                });
            }
            
            // Traços Ancestrais
            if (a.tracos.ancestrais.length > 0) {
                html += `<h3 style="color: ${cor1}; font-size: 0.95rem; margin-top: 0.75rem;">Traços Ancestrais</h3>`;
                a.tracos.ancestrais.forEach(id => {
                    const traco = TRACOS_ZOAN.ancestrais.find(t => t.id === id);
                    if (traco) {
                        html += `<p><strong>${traco.nome}:</strong> ${traco.desc}</p>`;
                    }
                });
            }
            
            // Points
            if (a.points.length > 0) {
                html += `<h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1rem; font-size: 1.1rem;">POINTS</h2>`;
                a.points.forEach(p => {
                    html += `<div class="no-quebra" style="margin-bottom: 1rem; padding: 0.5rem; background: #f5f5f5; border-left: 3px solid ${cor1}; break-inside: avoid; page-break-inside: avoid;">`;
                    html += `<p style="font-weight: bold; margin-bottom: 0.3rem;">${p.nome}</p>`;
                    if (p.descCustom) {
                        html += `<p style="font-size: 0.9rem; font-style: italic; color: #555;">${p.descCustom}</p>`;
                    }
                    if (p.tracoRealcado) {
                        html += `<p style="font-size: 0.9rem;"><strong>Traço Realçado - ${p.tracoRealcado.nome}:</strong> ${p.tracoRealcado.desc}</p>`;
                    }
                    if (p.tecnica) {
                        html += `<p style="font-size: 0.9rem;"><strong>Técnica - ${p.tecnica.nome} (${p.tecnica.grau}º Grau, ${p.tecnica.pp} PP):</strong> ${p.tecnica.desc}</p>`;
                        html += `<p style="font-size: 0.85rem; color: #666;">Dano: ${p.tecnica.dano} | Duração: ${p.tecnica.duracao} | Alcance: ${p.tecnica.alcance} | Requisito: ${p.tecnica.requisito}</p>`;
                    }
                    html += `</div>`;
                });
            }
        }
        
        // Técnicas de Combate detalhadas
        if (tecCombate.length > 0) {
            html += `<h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1.5rem; font-size: 1.1rem;">TÉCNICAS DE COMBATE</h2>`;
            tecCombate.forEach(t => {
                html += this.gerarHTMLTecnica(t, cor1);
            });
        }
        
        // Técnicas Auxiliares detalhadas
        if (tecAuxiliar.length > 0) {
            html += `<h2 style="color: ${cor1}; border-bottom: 2px solid ${cor2}; margin-top: 1.5rem; font-size: 1.1rem;">TÉCNICAS AUXILIARES</h2>`;
            tecAuxiliar.forEach(t => {
                html += this.gerarHTMLTecnica(t, cor1, true);
            });
        }
        
        html += `</div>`;
        return html;
    },

    gerarHTMLTecnica(tec, cor, isAuxiliar = false) {
        return `
            <div class="no-quebra" style="background: #f8f8f8; border: 1px solid #333; margin: 0.75rem 0; font-size: 0.9rem; break-inside: avoid; page-break-inside: avoid;">
                <!-- Header com grau e nome -->
                <div style="display: flex; background: #222;">
                    <div style="background: ${cor}; color: #fff; padding: 0.4rem 0.5rem; min-width: 40px; text-align: center; display: flex; flex-direction: column; justify-content: center; font-weight: bold; font-size: 0.8rem;">
                        <span>${isAuxiliar ? 'Aux' : tec.grau + 'º'}</span>
                        <span style="font-size: 0.7rem;">${isAuxiliar ? '' : 'Grau'}</span>
                    </div>
                    <div style="flex: 1; padding: 0.5rem 0.75rem; color: #fff; font-weight: bold; text-transform: uppercase; display: flex; align-items: center;">
                        ${tec.nome || 'SEM NOME'}
                    </div>
                </div>
                <!-- Corpo -->
                <div style="display: flex;">
                    <div style="background: ${cor}; min-width: 40px; color: #fff; text-align: center; padding: 0.5rem 0.3rem; font-size: 0.75rem; display: flex; flex-direction: column; justify-content: center;">
                        <span style="font-weight: bold; font-size: 1rem;">${tec.pp}</span>
                        <span>Pontos de</span>
                        <span>Poder</span>
                    </div>
                    <div style="flex: 1;">
                        <!-- Descrição -->
                        <div style="padding: 0.5rem 0.75rem; border-bottom: 1px solid #ddd; line-height: 1.4;">
                            ${tec.desc || ''}
                        </div>
                        <!-- Tabela de stats -->
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="background: ${cor}; color: #fff; padding: 0.25rem 0.5rem; width: 80px; font-weight: 600; border: 1px solid #ccc;">Duração</td>
                                <td style="padding: 0.25rem 0.5rem; border: 1px solid #ccc;">${tec.duracao || '-'}</td>
                            </tr>
                            <tr>
                                <td style="background: ${cor}; color: #fff; padding: 0.25rem 0.5rem; font-weight: 600; border: 1px solid #ccc;">Alcance</td>
                                <td style="padding: 0.25rem 0.5rem; border: 1px solid #ccc;">${tec.alcance || '-'}</td>
                            </tr>
                            <tr>
                                <td style="background: ${cor}; color: #fff; padding: 0.25rem 0.5rem; font-weight: 600; border: 1px solid #ccc;">Requisito</td>
                                <td style="padding: 0.25rem 0.5rem; border: 1px solid #ccc;">${tec.requisitos || '-'}</td>
                            </tr>
                            <tr>
                                <td style="background: ${cor}; color: #fff; padding: 0.25rem 0.5rem; font-weight: 600; border: 1px solid #ccc;">Dano</td>
                                <td style="padding: 0.25rem 0.5rem; border: 1px solid #ccc;">${tec.dano || 'Nenhum'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- Footer -->
                <div style="background: #222; color: #fff; padding: 0.3rem 0.75rem; text-align: right; font-size: 0.85rem;">
                    Ataque Combinado ${tec.ataqueCombinado ? 'Possível' : 'Impossível'}
                </div>
            </div>
        `;
    },

    // ==================== ABA SALVAS ====================
    renderSalvas() {
        const container = document.getElementById('aba-salvas');
        const salvas = JSON.parse(localStorage.getItem('akumas') || '[]');
        
        container.innerHTML = `
            <div class="form-section">
                <div class="section-header">
                    <h3>💾 Akumas Salvas</h3>
                    <button class="btn btn-secondary btn-small" onclick="App.novaAkuma()">+ Nova Akuma</button>
                </div>
                
                <div class="akumas-grid">
                    ${salvas.length === 0 ? '<p class="empty" style="grid-column: 1/-1;">Nenhuma Akuma salva.</p>' : ''}
                    ${salvas.map((ak, i) => `
                        <div class="akuma-card ${ak.tipo}">
                            <div class="akuma-header">
                                <span class="akuma-tipo">${ak.tipo}${ak.subtipo ? ' ' + ak.subtipo : ''}</span>
                                <span class="akuma-cat">${ak.categoria || '-'}</span>
                            </div>
                            <div class="akuma-nome">${ak.nome || 'Sem Nome'}</div>
                            <div class="akuma-info">${ak.mps?.length || 0} MPs, ${ak.tecnicas?.length || 0} Técnicas</div>
                            <div class="akuma-btns">
                                <button onclick="App.carregarAkuma(${i})">Editar</button>
                                <button class="danger" onclick="App.excluirAkuma(${i})">Excluir</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // ==================== FUNÇÕES AUXILIARES ====================
    abrirModal(titulo, conteudo, large = false) {
        const modal = document.getElementById('modal');
        modal.innerHTML = `
            <div class="modal-box ${large ? 'large' : ''}">
                <div class="modal-header">
                    <h3>${titulo}</h3>
                    <button class="modal-close" onclick="App.fecharModal()">×</button>
                </div>
                <div class="modal-body">${conteudo}</div>
            </div>
        `;
        modal.classList.add('active');
    },

    fecharModal() {
        document.getElementById('modal').classList.remove('active');
    },

    novaAkuma() {
        this.akuma = {
            nome: '', tipo: '', subtipo: '', classificacao: '', categoria: '', usuario: '',
            propriedades: [], aspectoInato: '', aspectoAlternativo: false, tipoDespertar: '',
            mps: [], tecnicas: [], tracos: { comuns: [], especificos: [], ancestrais: [] }, points: []
        };
        this.renderBasico();
        this.renderMPs();
        this.renderTecnicas();
        this.renderZoan();
        this.mudarAba('basico');
    },

    salvarAkuma() {
        const salvas = JSON.parse(localStorage.getItem('akumas') || '[]');
        const existente = salvas.findIndex(a => a.nome === this.akuma.nome);
        if (existente >= 0) {
            salvas[existente] = { ...this.akuma };
        } else {
            salvas.push({ ...this.akuma });
        }
        localStorage.setItem('akumas', JSON.stringify(salvas));
        alert('Akuma salva com sucesso!');
        this.renderSalvas();
    },

    carregarAkuma(index) {
        const salvas = JSON.parse(localStorage.getItem('akumas') || '[]');
        this.akuma = { ...salvas[index] };
        this.renderBasico();
        this.renderMPs();
        this.renderTecnicas();
        this.renderZoan();
        this.mudarAba('basico');
    },

    excluirAkuma(index) {
        if (confirm('Tem certeza que deseja excluir esta Akuma?')) {
            const salvas = JSON.parse(localStorage.getItem('akumas') || '[]');
            salvas.splice(index, 1);
            localStorage.setItem('akumas', JSON.stringify(salvas));
            this.renderSalvas();
        }
    },

    carregarSalvas() {
        // Carrega configurações salvas se houver
    },

    exportarJSON() {
        const json = JSON.stringify(this.akuma, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (this.akuma.nome || 'akuma') + '.json';
        a.click();
    },

    importarJSON() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
                try {
                    const dados = JSON.parse(ev.target.result);
                    this.akuma = Object.assign({
                        nome: '', tipo: '', subtipo: '', classificacao: '', categoria: '', usuario: '',
                        propriedades: [], aspectoInato: '', aspectoAlternativo: false, tipoDespertar: '',
                        mps: [], tecnicas: [], tracos: { comuns: [], especificos: [], ancestrais: [] }, points: []
                    }, dados);
                    if (!this.akuma.tracos) this.akuma.tracos = { comuns: [], especificos: [], ancestrais: [] };
                    this.renderBasico();
                    this.renderMPs();
                    this.renderTecnicas();
                    this.renderZoan();
                    this.renderResumo();
                    alert('Akuma importada com sucesso!');
                } catch (err) {
                    alert('Arquivo JSON inválido: ' + err.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    baixarPDF() {
        const original = document.getElementById('pdf-content');
        const btn = document.querySelector('.btn-pdf');
        if (btn) { btn.disabled = true; btn.textContent = 'Gerando PDF...'; }

        const restaurarBtn = () => {
            if (btn) { btn.disabled = false; btn.textContent = '📥 Baixar PDF'; }
        };

        if (typeof html2pdf === 'undefined') {
            restaurarBtn();
            alert('Biblioteca de PDF não carregou (sem internet?). Abrindo a janela de impressão — use "Salvar como PDF".');
            this.imprimirFicha();
            return;
        }

        // O html2canvas corta o conteúdo quando o elemento está centralizado ou a
        // página tem scroll. Renderiza a partir de um clone posicionado em (0,0),
        // no topo do documento, com largura fixa — captura sempre limpa.
        const LARGURA = 750; // ≈ largura útil de uma A4 com margens de 10mm
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `position: absolute; left: 0; top: 0; width: ${LARGURA}px; background: #fff; z-index: -1000; pointer-events: none;`;
        const clone = original.cloneNode(true);
        clone.style.width = '100%';
        clone.style.maxWidth = 'none';
        clone.style.margin = '0';
        // Folga à direita: o html2canvas desenha o texto um pouco mais largo que o
        // layout do navegador; sem essa folga a última palavra de cada linha é clipada
        clone.style.padding = '0 34px 0 0';
        clone.style.boxSizing = 'border-box';
        wrapper.appendChild(clone);
        document.body.prepend(wrapper);
        const scrollAntes = { x: window.scrollX, y: window.scrollY };
        window.scrollTo(0, 0);

        const opt = {
            margin: [10, 10, 12, 10],
            filename: (this.akuma.nome || 'akuma') + '.pdf',
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: LARGURA
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // Evita cortar técnicas/blocos no meio entre páginas
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        const limpar = () => {
            wrapper.remove();
            window.scrollTo(scrollAntes.x, scrollAntes.y);
            restaurarBtn();
        };

        html2pdf().set(opt).from(clone).save()
            .then(limpar)
            .catch(err => {
                console.error('Erro ao gerar PDF:', err);
                limpar();
                alert('Falha ao gerar o PDF diretamente. Abrindo a janela de impressão — use "Salvar como PDF".');
                this.imprimirFicha();
            });
    },

    // Alternativa vetorial: imprime a ficha (Ctrl+P → Salvar como PDF).
    // Gera texto selecionável e nunca corta blocos no meio.
    imprimirFicha() {
        const conteudo = document.getElementById('pdf-content');
        const win = window.open('', '_blank');
        if (!win) {
            alert('O navegador bloqueou a janela de impressão. Permita pop-ups para este site.');
            return;
        }
        win.document.write(`
            <html><head><title>${this.akuma.nome || 'Akuma'}</title>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Cinzel:wght@400;600;700&family=Crimson+Pro:wght@400;500;600&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Crimson Pro', serif; padding: 1.5rem; margin: 0; }
                .no-quebra { break-inside: avoid; page-break-inside: avoid; }
                table { break-inside: auto; }
                tr { break-inside: avoid; page-break-inside: avoid; }
                @page { size: A4 portrait; margin: 12mm; }
            </style>
            </head><body>${conteudo.innerHTML}</body></html>
        `);
        win.document.close();
        // Espera as fontes carregarem antes de abrir o diálogo de impressão
        win.onload = () => setTimeout(() => win.print(), 300);
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => App.init());
