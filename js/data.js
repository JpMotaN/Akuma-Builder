// ===== OP RPG 2.0 - AKUMA BUILDER v6 - DATA =====

const SISTEMA = {
    // TIPOS DE AKUMA
    tipos: [
        { id: 'logia', nome: 'Logia', cor: '#4169E1' },
        { id: 'paramecia', nome: 'Paramecia', cor: '#9932CC' },
        { id: 'zoan', nome: 'Zoan', cor: '#228B22' }
    ],

    // SUBTIPOS ZOAN
    subtiposZoan: [
        { id: 'normal', nome: 'Comum' },
        { id: 'ancestral', nome: 'Ancestral' },
        { id: 'mitica', nome: 'Mítica' }
    ],

    // CLASSIFICAÇÃO ZOAN
    classificacaoZoan: [
        { id: 'carnivoro', nome: 'Carnívoro' },
        { id: 'herbivoro', nome: 'Herbívoro' }
    ],

    // CATEGORIAS
    categorias: [
        { id: 'S', nome: 'Categoria S', atributo: '+3', cor: '#FFD700' },
        { id: 'A', nome: 'Categoria A', atributo: '+2', cor: '#FF4500' },
        { id: 'B', nome: 'Categoria B', atributo: '+1', cor: '#1E90FF' },
        { id: 'C', nome: 'Categoria C', atributo: '+0', cor: '#32CD32' }
    ],

    // PROPRIEDADES
    propriedades: [
        { id: 'corporal', nome: 'Corporal', atributos: 'Força / Constituição' },
        { id: 'criacao', nome: 'Criação', atributos: 'Presença / Sabedoria' },
        { id: 'espaco-temporal', nome: 'Espaço-Temporal', atributos: 'Sabedoria / Destreza' },
        { id: 'extracorporal', nome: 'Extracorporal', atributos: 'Vontade / Presença' },
        { id: 'manipulacao', nome: 'Manipulação', atributos: 'Destreza / Vontade' },
        { id: 'transformacao', nome: 'Transformação', atributos: 'Constituição / Força' }
    ],

    // TIPOS DE USUÁRIO (LOGIA/PARAMECIA)
    usuarios: {
        logia: [
            { id: 'simples', nome: 'Simples', mps: 1, grauMax: 3, desperto: false },
            { id: 'avancado', nome: 'Avançado', mps: 2, grauMax: 5, desperto: false },
            { id: 'simples-desperto', nome: 'Simples Desperto', mps: 1, grauMax: 7, desperto: true },
            { id: 'avancado-desperto', nome: 'Avançado Desperto', mps: 3, grauMax: 7, desperto: true }
        ],
        paramecia: [
            { id: 'simples', nome: 'Simples', mps: 1, grauMax: 3, desperto: false },
            { id: 'avancado', nome: 'Avançado', mps: 2, grauMax: 5, desperto: false },
            { id: 'simples-desperto', nome: 'Simples Desperto', mps: 1, grauMax: 7, desperto: true },
            { id: 'avancado-desperto', nome: 'Avançado Desperto', mps: 3, grauMax: 7, desperto: true }
        ],
        zoan: [
            { id: 'normal', nome: 'Comum', mps: 0, grauMax: 0, desperto: false },
            { id: 'normal-desperto', nome: 'Comum Desperto', mps: 0, grauMax: 0, desperto: true },
            { id: 'ancestral', nome: 'Ancestral', mps: 0, grauMax: 0, desperto: false },
            { id: 'ancestral-desperto', nome: 'Ancestral Desperto', mps: 0, grauMax: 0, desperto: true },
            { id: 'mitica', nome: 'Mítica', mps: 1, grauMax: 5, desperto: false },
            { id: 'mitica-desperto', nome: 'Mítica Desperto', mps: 2, grauMax: 7, desperto: true }
        ]
    },

    // GRAUS DE TÉCNICAS
    graus: [
        { grau: 1, nivel: 1, ppMax: 2, danoUnico: '2d10', danoArea: '2d6', alcanceLinha: 9, alcanceCone: 12, alcanceEsfera: 3 },
        { grau: 2, nivel: 3, ppMax: 4, danoUnico: '4d10', danoArea: '4d6', alcanceLinha: 15, alcanceCone: 15, alcanceEsfera: 4.5 },
        { grau: 3, nivel: 6, ppMax: 6, danoUnico: '6d10', danoArea: '6d6', alcanceLinha: 21, alcanceCone: 18, alcanceEsfera: 6 },
        { grau: 4, nivel: 9, ppMax: 8, danoUnico: '8d10', danoArea: '8d6', alcanceLinha: 27, alcanceCone: 21, alcanceEsfera: 7.5 },
        { grau: 5, nivel: 12, ppMax: 10, danoUnico: '10d10', danoArea: '10d6', alcanceLinha: 33, alcanceCone: 24, alcanceEsfera: 9 },
        { grau: 6, nivel: 16, ppMax: 12, danoUnico: '12d10', danoArea: '12d6', alcanceLinha: 39, alcanceCone: 27, alcanceEsfera: 10.5, desperto: true },
        { grau: 7, nivel: 20, ppMax: 14, danoUnico: '14d10', danoArea: '14d6', alcanceLinha: 45, alcanceCone: 30, alcanceEsfera: 12, desperto: true }
    ],

    // DURAÇÕES
    duracoes: [
        { id: 'instantaneo', nome: 'Instantâneo' },
        { id: 'turno', nome: 'Até o final do seu turno' },
        { id: 'proximo-turno', nome: 'Até o início do seu próximo turno' },
        { id: '1min', nome: 'Até 1 minuto' },
        { id: '1min-conc', nome: 'Até 1 minuto, Concentração' },
        { id: '10min', nome: 'Até 10 minutos' },
        { id: '1hora', nome: 'Até 1 hora' },
        { id: 'especial', nome: 'Especial' }
    ],

    // ALCANCES
    alcances: [
        { id: 'pessoal', nome: 'Pessoal' },
        { id: 'toque', nome: 'Toque' },
        { id: 'linha', nome: 'Linha (metros)' },
        { id: 'cone', nome: 'Cone (metros)' },
        { id: 'esfera', nome: 'Esfera (metros de raio)' },
        { id: 'cilindro', nome: 'Cilindro (metros de raio)' },
        { id: 'emanacao', nome: 'Emanação (metros de raio)' }
    ],

    // REQUISITOS BASE
    requisitos: [
        { id: 'acao-poderosa', nome: 'Ação Poderosa' },
        { id: 'acao-bonus', nome: 'Ação Bônus' },
        { id: 'reacao', nome: 'Reação' },
        { id: 'acao', nome: 'Ação' }
    ],

    // CONDIÇÕES (com custo em PP - valores do Capítulo 10 do livro)
    condicoes: [
        { id: 'agarrado', nome: 'Agarrado', pp: 1, desc: 'O deslocamento da criatura agarrada torna-se 0, e ela não pode se beneficiar de bônus em deslocamento. A condição termina caso a criatura que a agarrou fique incapacitada ou solte a criatura agarrada.' },
        { id: 'amedrontado', nome: 'Amedrontado', pp: 1, desc: 'A criatura amedrontada sofre desvantagem em Testes de Atributo e jogadas de ataque enquanto a fonte do medo estiver em seu campo de visão. A criatura não pode se mover voluntariamente para mais perto da fonte do medo.' },
        { id: 'atordoado', nome: 'Atordoado', pp: 6, desc: 'A criatura atordoada fica incapacitada, não pode se mover e fala de forma desconexa. A criatura falha automaticamente em Salvaguardas de Força e Destreza. Jogadas de ataque contra a criatura têm vantagem.' },
        { id: 'bebado', nome: 'Bêbado', pp: 1, desc: 'Uma criatura embriagada se comporta de maneira visivelmente diferente do normal. Ela sofre desvantagem em Salvaguardas, Testes de Atributo de Destreza e em qualquer outro teste que o Narrador julgar adequado.' },
        { id: 'caido', nome: 'Caído', pp: 1, desc: 'A única opção de deslocamento de uma criatura caída é rastejar, a menos que se levante. A criatura sofre desvantagem em jogadas de ataque. Uma jogada de ataque contra ela tem vantagem se o atacante estiver a até 1,5 metro.' },
        { id: 'cego', nome: 'Cego', pp: 1, desc: 'Uma criatura cega não consegue enxergar e falha automaticamente em qualquer teste que requer visão. Jogadas de ataque contra a criatura têm vantagem e as jogadas de ataque da criatura têm desvantagem.' },
        { id: 'empoderado', nome: 'Empoderado', pp: 3, desc: 'Os danos de jogadas de ataque (comum) corpo a corpo tornam-se 1d12 (prevalece o maior). Os PP de jogadas de ataque (Técnicas) malsucedidas não são descontados. O deslocamento não pode ser reduzido por terreno difícil.' },
        { id: 'enfeiticado', nome: 'Enfeitiçado', pp: 2, desc: 'Uma criatura enfeitiçada não pode atacar quem a enfeitiçou ou incluí-lo como alvo de habilidades ou efeitos prejudiciais. Quem a enfeitiçou tem vantagem em interações sociais com ela.' },
        { id: 'enfurecido', nome: 'Enfurecido', pp: 1, desc: 'A criatura enfurecida ataca a todo custo a fonte de sua fúria e sofre desvantagem em suas jogadas de ataque. Usa todo o deslocamento possível para se aproximar da fonte de sua fúria.' },
        { id: 'envenenado', nome: 'Envenenado', pp: 1, desc: 'Uma criatura envenenada sofre desvantagem em jogadas de ataque e Testes de Atributo.' },
        { id: 'estremecido', nome: 'Estremecido', pp: 2, desc: 'Uma criatura estremecida sofre desvantagem em jogadas de ataque e não pode realizar reações.' },
        { id: 'impedido', nome: 'Impedido', pp: 2, desc: 'O deslocamento da criatura impedida torna-se 0, e ela não pode se beneficiar de bônus em deslocamento.' },
        { id: 'incapacitado', nome: 'Incapacitado', pp: 4, desc: 'Uma criatura incapacitada não pode realizar ações, ações bônus ou reações.' },
        { id: 'inconsciente', nome: 'Inconsciente', pp: 8, desc: 'A criatura fica incapacitada, não pode se mover ou falar. A criatura não percebe seus arredores. A criatura solta qualquer coisa que esteja segurando e cai no chão. Jogadas de ataque contra a criatura têm vantagem. Qualquer ataque que atinja a criatura é um acerto crítico se o atacante estiver a até 1,5 metro.' },
        { id: 'invisivel', nome: 'Invisível', pp: 5, desc: 'Uma criatura invisível é impossível de se ver sem a ajuda de magia ou sentido especial. Jogadas de ataque contra a criatura sofrem desvantagem e as jogadas de ataque da criatura têm vantagem.' },
        { id: 'letargico', nome: 'Letárgico', pp: 2, desc: 'A criatura letárgica não pode usar Técnicas. A cada turno, deve escolher realizar apenas uma: ação, ação poderosa ou ação bônus. O dano causado pelos ataques é reduzido pela metade, exceto armas de fogo.' },
        { id: 'paralisado', nome: 'Paralisado', pp: 8, desc: 'A criatura fica incapacitada e não pode se mover ou falar. A criatura falha automaticamente em Salvaguardas de Força e Destreza. Jogadas de ataque contra a criatura têm vantagem. Qualquer ataque a até 1,5 metro é acerto crítico.' },
        { id: 'queimado', nome: 'Queimado', pp: 1, desc: 'Uma criatura queimada sofre dano contínuo de 1d6 de dano de Fogo na primeira vez que fizer uma jogada de ataque em um turno, enquanto não gastar uma ação para apagar o fogo. Não pode usar técnicas que exijam concentração.' },
        { id: 'sangramento', nome: 'Sangramento', pp: 1, desc: 'Uma criatura sangrando sofre dano contínuo de 1d6 de dano Cortante na primeira vez que se mover em um turno. O sangramento persiste até ser tratado com Teste de Sabedoria (Medicina) CD 10 ou cura.' },
        { id: 'sonolento', nome: 'Sonolento', pp: 1, desc: 'A criatura sonolenta não pode usar Reações. Não pode realizar mais de um ataque corpo a corpo em seu turno. Sofre desvantagem em Testes de Atributo de Destreza e Sabedoria.' },
        { id: 'sufocado', nome: 'Sufocado', pp: 1, desc: 'Uma criatura sufocada não consegue formular palavras inteligíveis. O sufocamento persiste enquanto a causa da falta de ar não for removida.' },
        { id: 'surdo', nome: 'Surdo', pp: 1, desc: 'Uma criatura surda não consegue ouvir e falha automaticamente em qualquer teste que requer audição.' }
    ],

    // SALVAGUARDAS
    salvaguardas: [
        { id: 'for', nome: 'Força' },
        { id: 'des', nome: 'Destreza' },
        { id: 'con', nome: 'Constituição' },
        { id: 'sab', nome: 'Sabedoria' },
        { id: 'von', nome: 'Vontade' },
        { id: 'pre', nome: 'Presença' }
    ]
};

// ===== EFEITOS DE AUMENTO (CUSTAM PP) =====
const EFEITOS_AUMENTO = {
    controle: [
        {
            id: 'adicionar-condicao',
            nome: 'Adicionar Condição',
            desc: 'Impõe uma condição a uma criatura (requer Salvaguarda)',
            tipo: 'select', // tipo de input: select, number, checkbox
            opcoes: 'condicoes', // referência para SISTEMA.condicoes
            custoPorOpcao: true, // custo vem da opção selecionada
            multiplo: true, // pode adicionar múltiplas vezes (até 3 condições)
            maxUsos: 3
        },
        {
            id: 'adicionar-empurrao',
            nome: 'Adicionar Empurrão',
            desc: 'Empurra criatura até Grande (Salvaguarda de Força)',
            tipo: 'select',
            opcoes: [
                { valor: 3, nome: '3 metros', custo: 1 },
                { valor: 6, nome: '6 metros', custo: 2 },
                { valor: 9, nome: '9 metros', custo: 3 }
            ],
            colisao: '+1d8 por PP (máx 3d8)',
            multiplo: false
        },
        {
            id: 'adicionar-vantagem',
            nome: 'Adicionar Vantagem/Desvantagem',
            desc: 'Atribui vantagem ou desvantagem em um tipo de jogada (ataque comum, Testes de Atributo ou Salvaguardas). Dura até o início do seu próximo turno ou até o final do próximo turno da criatura afetada.',
            tipo: 'select',
            opcoes: [
                { valor: 'vantagem', nome: 'Vantagem' },
                { valor: 'desvantagem', nome: 'Desvantagem' }
            ],
            custoCalc: 'metade-grau-cima',
            custoAuxiliar: 4,
            multiplo: false
        },
        {
            id: 'aumentar-alcance',
            nome: 'Aumentar Alcance',
            desc: 'Aumenta alcance de jogada de ataque à distância',
            tipo: 'number',
            unidade: 'metros',
            custoPor: 6, // 1 PP por 6 metros
            custo: 1,
            multiplo: true
        },
        {
            id: 'aumentar-area',
            nome: 'Aumentar Área',
            desc: 'Aumenta a área de efeito da técnica (1 PP por 3m adicionais; Linha: 2 PP por 1,5m de largura)',
            tipo: 'select',
            opcoes: [
                { valor: 3, nome: '+3m (Cone/Esfera/Cilindro)', custo: 1 },
                { valor: 6, nome: '+6m (Cone/Esfera/Cilindro)', custo: 2 },
                { valor: 9, nome: '+9m (Cone/Esfera/Cilindro)', custo: 3 },
                { valor: 1.5, nome: '+1,5m largura (Linha)', custo: 2 }
            ],
            multiplo: true
        },
        {
            id: 'condicao-area',
            nome: 'Condição/Efeito em Área',
            desc: 'Impõe mesma condição em todas criaturas da área',
            tipo: 'checkbox',
            custoCalc: 'metade-grau-cima',
            multiplo: false
        },
        {
            id: 'controle-cirurgico',
            nome: 'Controle Cirúrgico',
            desc: 'Escolhe criaturas aliadas para não serem afetadas',
            tipo: 'checkbox',
            custo: 1,
            multiplo: false
        },
        {
            id: 'power-up',
            nome: 'Power Up',
            desc: 'Transforma o corpo em forma de combate',
            tipo: 'multi-select',
            opcoes: [
                { id: 'desvantagem-salv', nome: 'Desvantagem em Salvaguardas', custo: 2 },
                { id: 'aumentar-tamanho', nome: 'Aumentar tamanho em 1', custo: 1 },
                { id: 'dados-dano', nome: '+5 dados de dano (limitado ao grau)', custo: 3 },
                { id: 'escudo-pv', nome: 'Escudo de PV (10×nível)', custo: 4 }
            ],
            custoBase: 3,
            multiplo: false
        },
        {
            id: 'tecnica-dominada',
            nome: 'Técnica Dominada',
            desc: 'Permite alterar custo de PP em cada uso',
            tipo: 'checkbox',
            custo: 1,
            multiplo: false
        },
        {
            id: 'criar-lacaio',
            nome: 'Criar Lacaio',
            desc: 'Cria criatura com características próprias',
            tipo: 'checkbox',
            custo: 7,
            custoMax: 15,
            multiplo: false
        },
        {
            id: 'tecnica-rapida',
            nome: 'Técnica Rápida',
            desc: 'Executa como Ação Bônus ou Reação',
            tipo: 'checkbox',
            custoCalc: 'igual-grau',
            restricao: 'Máximo 4º grau',
            multiplo: false
        }
    ],
    ofensivo: [
        {
            id: 'acerto-automatico',
            nome: 'Acerto Automático',
            desc: 'Acerta automaticamente (sem críticos)',
            tipo: 'checkbox',
            custoCalc: 'igual-grau',
            multiplo: false
        },
        {
            id: 'adicionar-critico',
            nome: 'Adicionar Crítico',
            desc: 'Aumenta margem de acerto crítico',
            tipo: 'select',
            opcoes: [
                { valor: '19-20', nome: '19-20', custo: 1 },
                { valor: '18-20', nome: '18-20', custo: 2 }
            ],
            multiplo: false
        },
        {
            id: 'ataque-cerco',
            nome: 'Ataque de Cerco',
            desc: 'Dobra dano em objetos e estruturas',
            tipo: 'checkbox',
            custo: 2,
            multiplo: false
        },
        {
            id: 'ataques-multiplos',
            nome: 'Ataques Múltiplos',
            desc: '+2 jogadas de ataque (comum) até o final do turno',
            tipo: 'checkbox',
            custo: 6,
            restricao: 'Requer Ação Bônus',
            multiplo: false
        },
        {
            id: 'aumentar-acerto',
            nome: 'Aumentar Acerto',
            desc: 'Bônus na jogada de ataque (Técnicas)',
            tipo: 'select',
            opcoes: [
                { valor: 1, nome: '+1 acerto', custo: 1 },
                { valor: 2, nome: '+2 acerto', custo: 2 },
                { valor: 3, nome: '+3 acerto', custo: 3 }
            ],
            multiplo: false
        },
        {
            id: 'aumentar-dano',
            nome: 'Aumentar Dano',
            desc: '+3 dano em ataques comuns por 1 minuto',
            tipo: 'checkbox',
            custo: 3,
            restricao: 'Requer Concentração e Ação Bônus',
            multiplo: false
        },
        {
            id: 'criar-arma',
            nome: 'Criar Arma',
            desc: 'Cria arma com dano próprio',
            tipo: 'select',
            opcoes: [
                { valor: '2d8', nome: '2d8', custo: 1 },
                { valor: '3d8', nome: '3d8', custo: 2 },
                { valor: '4d8', nome: '4d8', custo: 3 }
            ],
            custoManutencao: 2,
            restricao: 'Concentração, Ação Bônus, 2 PP/turno',
            multiplo: false
        },
        {
            id: 'dano-adicional',
            nome: 'Dano Adicional',
            desc: 'Adiciona dados de dano em outras técnicas',
            tipo: 'number',
            min: 1,
            max: 5,
            custo: 1,
            multiplo: false
        },
        {
            id: 'dano-continuo',
            nome: 'Dano Contínuo',
            desc: 'Dano a cada turno (máx dados = grau)',
            tipo: 'number',
            custoCalc: '1+metade-grau+dados',
            multiplo: false
        },
        {
            id: 'dano-insistente',
            nome: 'Dano Insistente',
            desc: 'Causa mínimo metade do dano mesmo com sucesso',
            tipo: 'checkbox',
            custoCalc: 'metade-grau-cima',
            multiplo: false
        }
    ],
    suporte: [
        {
            id: 'adicionar-cura',
            nome: 'Adicionar Cura',
            desc: 'Cura Pontos de Vida',
            tipo: 'number',
            custoUnico: 1, // 1 PP = 1d10 único
            custoArea: 1, // 1 PP = 1d6 área
            restricao: 'Não pode ser 1º grau',
            multiplo: false
        },
        {
            id: 'adicionar-pv-temp',
            nome: 'Adicionar PV Temporários',
            desc: 'Cria Pontos de Vida Temporários',
            tipo: 'number',
            custoUnico: 1, // 1 PP = 1d10 único
            custoArea: 1, // 1 PP = 1d4 área
            multiplo: false
        },
        {
            id: 'adicionar-voo',
            nome: 'Adicionar Voo',
            desc: 'Concede deslocamento de voo',
            tipo: 'select',
            opcoes: [
                { valor: 9, nome: '9 metros', custo: 2 },
                { valor: 12, nome: '12 metros', custo: 3 },
                { valor: 15, nome: '15 metros', custo: 4 }
            ],
            multiplo: false
        },
        {
            id: 'aumentar-cr',
            nome: 'Aumentar CR',
            desc: 'Aumenta Classe de Resistência',
            tipo: 'select',
            opcoes: [
                { valor: 1, nome: '+1 CR', custo: 1 },
                { valor: 2, nome: '+2 CR', custo: 2 },
                { valor: 3, nome: '+3 CR', custo: 3 }
            ],
            multiplo: false
        },
        {
            id: 'aumentar-movimento',
            nome: 'Aumentar Movimento',
            desc: 'Aumenta deslocamento',
            tipo: 'select',
            opcoes: [
                { valor: 3, nome: '+3 metros', custo: 1 },
                { valor: 6, nome: '+6 metros', custo: 2 }
            ],
            multiplo: false
        },
        {
            id: 'contencao-coletiva',
            nome: 'Contenção de Dano (Coletivo)',
            desc: 'Reduz dano em cone de 12m atrás de você',
            tipo: 'number',
            custo: 1, // 1 PP = 1d8 (máx 15d8)
            max: 15,
            restricao: 'Requer Reação',
            multiplo: false
        },
        {
            id: 'contencao-individual',
            nome: 'Contenção de Dano (Individual)',
            desc: 'Reduz dano de uma criatura',
            tipo: 'number',
            custo: 0.5, // 1 PP = 2d8 (máx 30d8)
            max: 30,
            restricao: 'Requer Reação',
            multiplo: false
        },
        {
            id: 'reducao-movimento',
            nome: 'Redução de Movimento',
            desc: 'Diminui deslocamento do alvo',
            tipo: 'select',
            opcoes: [
                { valor: 'metade', nome: 'Metade', custo: 1 },
                { valor: 'zero', nome: 'Zero', custo: 2 }
            ],
            multiplo: false
        }
    ]
};

// ===== EFEITOS DE REDUÇÃO (DIMINUEM PP) =====
const EFEITOS_REDUCAO = {
    geral: [
        {
            id: 'concentracao',
            nome: 'Concentração Crucial',
            desc: 'Técnica requer Concentração',
            tipo: 'checkbox',
            reducao: 2,
            reducaoExtra: 1, // por minuto adicional
            restricao: 'Duração 1 minuto ou mais',
            multiplo: false
        },
        {
            id: 'efeito-colateral',
            nome: 'Efeito Colateral',
            desc: 'Ao executar a técnica, causa dano ou efeito negativo ao próprio usuário. O dano/efeito afeta o usuário da mesma forma que afetaria um inimigo. A redução de dano e efeito negativo podem ser combinadas (máx -8 PP total).',
            tipo: 'select',
            opcoes: [
                { valor: '5dano', nome: '5 pontos de dano ao usuário', reducao: 1 },
                { valor: '10dano', nome: '10 pontos de dano ao usuário', reducao: 2 },
                { valor: '15dano', nome: '15 pontos de dano ao usuário', reducao: 3 },
                { valor: '20dano', nome: '20 pontos de dano ao usuário', reducao: 4 }
            ],
            tipoEspecial: 'efeito-colateral',
            maxReducao: 8,
            multiplo: true,
            maxUsos: 2
        },
        {
            id: 'efeito-colateral-negativo',
            nome: 'Efeito Colateral (Efeito Negativo)',
            desc: 'Ao executar a técnica, o usuário recebe um efeito negativo (condição). A redução é igual ao custo em PP da condição recebida (máx -4 PP). Pode ser combinado com Efeito Colateral de dano (máx -8 PP total).',
            tipo: 'select',
            opcoes: 'condicoes-reducao',
            tipoEspecial: 'efeito-colateral',
            maxReducao: 4,
            multiplo: false
        },
        {
            id: 'reduzir-area',
            nome: 'Reduzir Área',
            desc: 'Diminui alcance da técnica',
            tipo: 'select',
            opcoes: [
                { valor: 6, nome: '-6m raio ou -9m cone', reducao: 1 },
                { valor: 12, nome: '-12m raio ou -18m cone', reducao: 2 },
                { valor: 18, nome: '-18m raio ou -27m cone', reducao: 3 }
            ],
            multiplo: false
        },
        {
            id: 'requisito-limitador',
            nome: 'Requisito Limitador',
            desc: 'Adiciona requisito extra (noite, submerso, etc)',
            tipo: 'select',
            opcoes: [
                { valor: 'leve', nome: 'Leve', reducao: 1 },
                { valor: 'moderado', nome: 'Moderado', reducao: 2 },
                { valor: 'severo', nome: 'Severo', reducao: 3 },
                { valor: 'extremo', nome: 'Extremo', reducao: 4 },
                { valor: 'maximo', nome: 'Máximo', reducao: 5 }
            ],
            multiplo: false
        },
        {
            id: 'tecnica-debilitante',
            nome: 'Técnica Debilitante',
            desc: 'Impede uso de PP por tempo após usar',
            tipo: 'select',
            opcoes: [
                { valor: 1, nome: '1 minuto sem PP', reducao: 3 },
                { valor: 2, nome: '2 minutos sem PP', reducao: 6 }
            ],
            multiplo: false
        },
        {
            id: 'tecnica-demorada',
            nome: 'Técnica Demorada',
            desc: 'Requer Ação Poderosa (só Auxiliar)',
            tipo: 'checkbox',
            reducao: 3,
            restricao: 'Apenas Técnicas Auxiliares',
            multiplo: false
        },
        {
            id: 'tecnica-dependente',
            nome: 'Técnica Dependente',
            desc: 'Requer outra técnica/MP ativa',
            tipo: 'number',
            reducaoCalc: 'metade-pp-requisito',
            min: 1,
            max: 3,
            multiplo: false
        },
        {
            id: 'tecnica-devoradora',
            nome: 'Técnica Devoradora',
            desc: 'Impede uso de Haki por 10 minutos',
            tipo: 'checkbox',
            reducao: 3,
            restricao: 'Requer Haki como requisito',
            multiplo: false
        },
        {
            id: 'tecnica-exaustiva',
            nome: 'Técnica Exaustiva',
            desc: 'Causa Níveis de Exaustão ao final',
            tipo: 'select',
            opcoes: [
                { valor: 1, nome: '1 Nível de Exaustão', reducao: 4 },
                { valor: 2, nome: '2 Níveis de Exaustão', reducao: 8 }
            ],
            multiplo: false
        },
        {
            id: 'tecnica-indomavel',
            nome: 'Técnica Indomável',
            desc: 'Dano d8, sucesso = 0 dano',
            tipo: 'checkbox',
            reducaoCalc: 'igual-grau',
            restricao: 'Técnicas com Salvaguarda',
            multiplo: false
        },
        {
            id: 'tecnica-nao-ofensiva',
            nome: 'Técnica Não Ofensiva',
            desc: 'Faz com que a técnica não possa causar dano direta ou indiretamente. Nenhuma criatura pode sofrer dano e nem essa técnica pode auxiliar outros ataques ou técnicas a darem dano adicional.',
            tipo: 'checkbox',
            reducaoCombate: 2,
            reducaoAuxiliar: 1,
            custoCalcTipo: 'nao-ofensiva',
            multiplo: false
        }
    ]
};

// ===== MANIFESTAÇÕES ESPECIAIS =====
const MPS_ESPECIAIS = [
    {
        id: 'arauto-desastre',
        nome: 'Arauto do Desastre',
        desc: 'Redução de PP em técnicas de área igual ao grau (mín 1 PP). Não conta para redução máxima.',
        restricao: 'Apenas Logia'
    },
    {
        id: 'dano-extremo',
        nome: 'Dano Extremo',
        desc: 'Um tipo de dano escolhido ignora Resistências/Invulnerabilidades, não pode ser reduzido por Contenção, não transfere para PV temp, mínimo metade do valor total.',
        restricao: 'Apenas Logia'
    },
    {
        id: 'dano-implacavel',
        nome: 'Dano Implacável',
        desc: 'Dano dobrado em estruturas, ignora resistências, metade em invulnerabilidades.',
        restricao: 'Categoria A ou S'
    },
    {
        id: 'destruidor',
        nome: 'Destruidor',
        desc: '4x dano em estruturas, dobra alcance (exceto toque/pessoal).',
        restricao: 'Categoria A ou S'
    },
    {
        id: 'invulnerabilidade-parcial',
        nome: 'Invulnerabilidade Parcial',
        desc: 'Invulnerável a 1 tipo de dano OU Resistente a 3 tipos (exceto Haki, Kairoseki, inimigo natural).',
        restricao: null
    },
    {
        id: 'potencializador-ofensivo',
        nome: 'Potencializador Ofensivo',
        desc: '+1d10 dano extra 1x/rodada (Ação Bônus) OU 5x/descanso longo sem Ação Bônus.',
        restricao: null
    },
    {
        id: 'habilidade-refinada',
        nome: 'Habilidade Refinada',
        desc: 'Quando executar uma técnica que possua a Akuma no Mi como requisito, você pode escolher uma das seguintes características: Receber vantagem em sua jogada de ataque (Técnicas) executada diretamente pela técnica; OU Impor desvantagem em uma Salvaguarda qualquer do alvo contra a sua técnica; OU Você escolhe quais criaturas são afetadas dentro da área da técnica.',
        restricao: null
    },
    {
        id: 'potencializacao-elemental',
        nome: 'Potencialização Elemental',
        desc: 'Sempre que você usar uma técnica da Akuma no Mi, você pode usar uma ação bônus e escolher um dos seguintes efeitos: Caso a técnica cause dano, você pode impor uma condição (condizente com o elemento, que custe até 2 PP) em até 3 criaturas (à sua escolha) que não passem em uma Salvaguarda de Constituição, desde que tenham falhado numa primeira Salvaguarda ou sido atingidas por uma jogada de ataque (Técnicas); OU Caso a técnica possua área de efeito, pode aumentar: +6m cone, +3m esfera, +12m linha (não acumula com Aumentar Área); OU Caso a técnica cause dano, você pode adicionar +1 dado de dano ao dano da técnica.',
        restricao: 'Apenas Logia ou MP Desperta'
    },
    {
        id: 'orbes',
        nome: 'Orbes',
        desc: 'Ao tocar em uma estrutura ou objeto condizente com suas habilidades (ou criando esses objetos), você pode fazer com que orbite ao seu redor. Você pode manter simultaneamente uma quantidade de orbes igual ao seu modificador de Destreza. Formas de uso: Defensiva (Reação: reduz dano em 2d8 por orbe gasto); Ofensiva (Ação Bônus: +1 dado de dano da técnica por orbe gasto, mesmo tipo de dado da técnica); Espacial (Livre: move orbe até 9m para ocupar espaço desocupado); Estratégica (Livre: concede vantagem na próxima jogada de ataque/Salvaguarda contra criatura adjacente ao orbe, gastando o orbe).',
        restricao: null
    }
];

// ===== MODIFICADORES DE PONTO VIRTUAL (para MPs criadas) =====
// Tabela "Modificadores de Ponto Virtual" (pág. 208 do livro)
const MODIFICADORES_PV = [
    { id: 'passiva', nome: 'Passiva', ajuste: -3, desc: 'Sempre ativa, sem necessidade de ação' },
    { id: 'inacao', nome: 'Inação', ajuste: -1, desc: 'Ativa em conjunto com uma ação, ação poderosa, ação bônus ou reação' },
    { id: 'acao-bonus', nome: 'Ação Bônus', ajuste: 2, desc: 'Requer Ação Bônus' },
    { id: 'reacao', nome: 'Reação', ajuste: 2, desc: 'Requer Reação' },
    { id: 'acao-poderosa', nome: 'Ação Poderosa', ajuste: 3, desc: 'Requer Ação Poderosa' }
];

// Regras de criação de MP (pág. 208): pool base 6 PV; reduções e o requisito de
// ativação somam/subtraem PV; o consumo em efeitos nunca pode passar de 12 PV.
const MP_REGRAS = {
    pvBase: 6,
    pvTeto: 12,
    // Efeitos proibidos em MPs pelo livro (Técnica Rápida/Demorada por regra explícita;
    // Dano Adicional/Contínuo porque MP não pode causar nem aumentar dano)
    efeitosProibidos: ['tecnica-rapida', 'tecnica-demorada', 'dano-adicional', 'dano-continuo'],
    restricoes: [
        'Não pode causar dano diretamente em criaturas',
        'Não pode aumentar o dano de jogadas de ataque (comum ou Técnicas)',
        'Não pode recuperar Pontos de Vida sem limitação de uso',
        'Não pode recuperar Pontos de Poder de nenhuma forma',
        'Só pode aumentar a CR de uma criatura com o requisito "Ação Poderosa"',
        'Segue as regras gerais de Técnicas de 2º grau para alcance e cálculos de PP',
        'Os efeitos "Técnica Rápida" e "Técnica Demorada" não podem ser usados'
    ]
};

// ===== TRAÇOS ZOAN (DADOS EXATOS DO LIVRO) =====
const TRACOS_ZOAN = {
    comuns: [
        { 
            id: 'andar-gelo', 
            nome: 'Andar no Gelo', 
            desc: 'Quando na forma animal ou híbrida, você pode se mover e escalar superfícies congeladas sem precisar realizar um Teste de Atributo. Além disso, terreno difícil composto por gelo ou neve não custa deslocamento extra para você.' 
        },
        { 
            id: 'audicao-agucada', 
            nome: 'Audição Aguçada', 
            desc: 'Em qualquer forma, você tem vantagem em Testes de Vontade (Percepção) relacionados à audição.' 
        },
        { 
            id: 'camuflagem', 
            nome: 'Camuflagem', 
            desc: 'Quando na forma animal ou híbrida, você tem vantagem em Testes de Destreza (Furtividade), relacionados à sua pele ou pelugem, para se esconder, se ficar sem se mexer.' 
        },
        { 
            id: 'corpo-minusculo', 
            nome: 'Corpo Minúsculo', 
            desc: 'Quando na forma animal, você recebe vantagem nas Salvaguardas e Testes de Atributo de Destreza.' 
        },
        { 
            id: 'couro-farpado', 
            nome: 'Couro Farpado', 
            desc: 'Quando na forma animal ou híbrida, no começo de cada um dos seus turnos, você causa 1d10 de dano perfurante a qualquer criatura que esteja te agarrando.' 
        },
        { 
            id: 'cuspir-veneno', 
            nome: 'Cuspir Veneno', 
            desc: 'Quando na forma animal ou híbrida, você pode fazer uma jogada de ataque (comum) à distância com alcance de até 9 metros em Linha contra uma criatura. Caso acerte, essa criatura deve ser bem-sucedida em uma Salvaguarda de Constituição (CD igual ao das Técnicas) para não receber 3d8 de dano de Veneno.' 
        },
        { 
            id: 'deslocamento-animal', 
            nome: 'Deslocamento Animal', 
            desc: 'Quando na forma híbrida, seu deslocamento se torna 15 metros (prevalece o maior, caso tenha). Quando na forma animal, você recebe 18 metros de deslocamento (apenas para usuários de Akuma no Mi).' 
        },
        { 
            id: 'eco-localizacao', 
            nome: 'Eco Localização', 
            desc: 'Quando na forma animal ou híbrida, você pode perceber seus arredores sem depender de visão dentro de um raio de 9 metros. Você não pode se beneficiar desta característica enquanto estiver com a condição "Surdo".' 
        },
        { 
            id: 'escalada-aracnidea', 
            nome: 'Escalada Aracnídea', 
            desc: 'Quando na forma animal ou híbrida, você recebe deslocamento de escalada igual à metade do seu deslocamento normal e pode andar se prendendo em paredes e tetos, sem precisar realizar um Teste de Atributo.' 
        },
        { 
            id: 'escalador', 
            nome: 'Escalador', 
            desc: 'Quando na forma animal ou híbrida, você recebe deslocamento de escalada igual ao seu deslocamento normal, sem precisar realizar um Teste de Atributo.' 
        },
        { 
            id: 'escavador', 
            nome: 'Escavador', 
            desc: 'Quando na sua forma animal ou híbrida, usando uma ação, você pode escavar através de rocha sólida com metade do seu deslocamento e deixa um túnel de 1,5 metro de raio para trás.' 
        },
        { 
            id: 'especialidade-animal', 
            nome: 'Especialidade Animal', 
            desc: 'Quando na forma animal ou híbrida, você recebe o dobro do seu bônus de proficiência em uma perícia que você já seja proficiente. Escolha entre Acrobacia, Atletismo, Furtividade, Intimidação e Sobrevivência. Este traço pode ser escolhido até 2 vezes por personagem.',
            multiplo: 2
        },
        { 
            id: 'faro-agucado', 
            nome: 'Faro Aguçado', 
            desc: 'Em qualquer forma, você tem vantagem em Testes de Vontade (Percepção) relacionados ao olfato.' 
        },
        { 
            id: 'habilidade-animal', 
            nome: 'Habilidade Animal', 
            desc: 'Quando na forma animal ou híbrida, você recebe proficiência em uma Perícia. Você pode escolher entre Acrobacia, Atletismo, Furtividade, Intimidação e Sobrevivência.' 
        },
        { 
            id: 'inflar', 
            nome: 'Inflar', 
            desc: 'Quando na forma animal ou híbrida, com uma ação bônus, você consegue aumentar uma categoria de tamanho e todas as criaturas que estejam a até 1,5 metro de você devem fazer uma Salvaguarda de Força CD 14, sendo lançadas por 6 metros e recebendo o estado "Caído", se falharem no teste, ou empurradas por 3 metros, se passarem.' 
        },
        { 
            id: 'luz-propria', 
            nome: 'Luz Própria', 
            desc: 'Quando na forma animal ou híbrida, você consegue criar luz de uma parte do seu corpo, iluminando uma esfera com raio de 6 metros com luz plena e mais 3 metros como penumbra.' 
        },
        { 
            id: 'multiplos-membros', 
            nome: 'Múltiplos Membros (2 extras ou mais)', 
            desc: 'Quando na forma animal ou híbrida, com uma ação bônus, você consegue fazer uma única jogada de ataque (comum) — desde que nesse turno você não tenha usado ou use a ação "atacar", "Usar um Objeto" ou "Guardar e Sacar" uma quantidade de armas igual a quantidade de membros extras.' 
        },
        { 
            id: 'pele-escorregadia', 
            nome: 'Pele Escorregadia', 
            desc: 'Quando na forma animal ou híbrida, qualquer criatura que tente te agarrar recebe desvantagem.' 
        },
        { 
            id: 'percepcao-cegas', 
            nome: 'Percepção às Cegas', 
            desc: 'Quando na forma animal ou híbrida, você pode perceber seus arredores sem depender de visão dentro de um raio de 6 metros.' 
        },
        { 
            id: 'prender-respiracao', 
            nome: 'Prender a Respiração', 
            desc: 'Em qualquer forma, você consegue prender a respiração por até 1 hora, mantendo-a mesmo ao receber danos.' 
        },
        { 
            id: 'soltar-tinta', 
            nome: 'Soltar Tinta', 
            desc: 'Quando na forma animal ou híbrida, você pode usar uma ação para soltar sua tinta em um cone de 6 metros, toda criatura dentro da área, que utilize seus olhos para enxergar, deve fazer uma Salvaguarda de Destreza CD 14 para não receber a condição "Cega" até que use uma ação para limpar a tinta ou seja coberta com água corrente.' 
        },
        { 
            id: 'visao-agucada', 
            nome: 'Visão Aguçada', 
            desc: 'Em qualquer forma, você tem vantagem em Testes de Vontade (Percepção) relacionados à visão.' 
        },
        { 
            id: 'visao-noturna', 
            nome: 'Visão Noturna', 
            desc: 'Em qualquer forma, você pode ver na escuridão em um raio de 18 metros. Pode ver na penumbra como se estivesse sob luz plena e na escuridão como se estivesse na penumbra. Você não consegue discernir cores na escuridão, apenas tons de cinza.' 
        },
        { 
            id: 'voo', 
            nome: 'Voo', 
            desc: 'Quando na forma híbrida, você recebe 9 metros de voo e pode usar todo ou parte desse movimento para voar. Quando na forma animal, seu deslocamento de voo se torna 15 metros (apenas para usuários de Akuma no Mi).' 
        }
    ],
    
    // TRAÇOS ESPECÍFICOS - separados por grupo de animal
    especificos: {
        voadores: {
            nome: 'Animais Voadores',
            tracos: [
                { 
                    id: 'ataque-mergulho', 
                    nome: 'Ataque de Mergulho', 
                    desc: 'Quando na forma animal ou híbrida, se você estiver voando e mergulhar, pelo menos 6 metros, em linha reta e atingir um alvo com um ataque corpo a corpo, causa 3d6 de dano extra ao alvo.' 
                },
                { 
                    id: 'planar', 
                    nome: 'Planar', 
                    desc: 'Quando na forma animal ou híbrida, desde que não esteja com suas asas presas, você não recebe dano de queda.' 
                },
                { 
                    id: 'sobrevoo', 
                    nome: 'Sobrevoo', 
                    desc: 'Quando na forma animal ou híbrida, você não provoca uma reação ou a característica "Ataque de Oportunidade" quando realiza um voo para fora do alcance de um inimigo.' 
                }
            ]
        },
        quadrupedes: {
            nome: 'Animais Quadrúpedes',
            tracos: [
                { 
                    id: 'agarrar-cauda', 
                    nome: 'Agarrar com a Cauda', 
                    desc: 'Quando na forma híbrida, usando uma ação bônus, você pode usar sua cauda para tentar agarrar uma criatura com uma jogada de ataque (comum) corpo a corpo desarmado. Caso acerte, ao invés de causar dano, o alvo fica agarrado. Enquanto a criatura estiver agarrada, você tem vantagem nas suas jogadas de ataque (comum) corpo a corpo contra ela, não podendo usar esta característica em mais de uma criatura ao mesmo tempo.' 
                },
                { 
                    id: 'bote', 
                    nome: 'Bote', 
                    desc: 'Quando na forma animal, desde que tenha percorrido no mínimo 6 metros, você pode substituir o seu primeiro ataque normal desarmado corpo a corpo, para desferir uma mordida que causa 2d6 de dano Perfurante e o alvo deve ser bem-sucedido em uma Salvaguarda de Força para não ser derrubado.' 
                },
                { 
                    id: 'postura-animal', 
                    nome: 'Postura Animal', 
                    desc: 'Quando na forma animal, ao ter que fazer uma Salvaguarda para não receber a condição "Caído", você recebe vantagem na jogada.' 
                }
            ]
        },
        robustos: {
            nome: 'Animais Robustos',
            tracos: [
                { 
                    id: 'cabeca-dura', 
                    nome: 'Cabeça Dura', 
                    desc: 'Quando na forma animal ou híbrida, ao ter que fazer uma Salvaguarda para não receber a condição "Atordoado", você recebe vantagem na jogada.' 
                },
                { 
                    id: 'corpo-inerte', 
                    nome: 'Corpo Inerte', 
                    desc: 'Quando na forma animal ou híbrida, ao ter que fazer uma Salvaguarda para não ser empurrado, você recebe vantagem na jogada.' 
                },
                { 
                    id: 'duro-matar', 
                    nome: 'Duro de Matar', 
                    desc: 'Quando receber um dano que zeraria seus Pontos de Vida, ao final do turno do inimigo que infligiu o dano, você fica com 1 Ponto de Vida. Essa característica não poderá ser usada novamente até o término de um descanso longo. Ferimentos e dores são levados em consideração, normalmente.' 
                },
                { 
                    id: 'poder-tracao', 
                    nome: 'Poder de Tração', 
                    desc: 'Quando na forma animal, você recebe vantagem em Testes de Atributo e Salvaguardas de Força. Além disso, dobra o valor base da sua capacidade de carga.'
                },
                { 
                    id: 'casco-protetor', 
                    nome: 'Casco Protetor', 
                    desc: 'Quando na forma animal ou híbrida, você recebe +2 na CR normal enquanto mantém o casco e pode usar sua reação para entrar totalmente no casco e receber +5 na CR normal. Enquanto dentro do casco, você fica incapacitado e com deslocamento 0. Você só pode usar uma ação para sair do casco.' 
                },
                { 
                    id: 'chifre-garra', 
                    nome: 'Chifre/Garra', 
                    desc: 'Quando na forma animal ou híbrida, uma vez por turno, você pode usar uma ação bônus para trocar o tipo de dano de uma jogada de ataque (comum) corpo a corpo desarmado para "Perfurante" ou "Cortante" e adicionar 1d6 de dano extra ao ataque.' 
                }
            ]
        },
        outros: {
            nome: 'Outros Tipos',
            tracos: [
                { 
                    id: 'regeneracao', 
                    nome: 'Regeneração', 
                    desc: 'Em qualquer forma, você recupera 1d6 Pontos de Vida + seu modificador de Constituição, no início de cada um dos seus turnos, se estiver consciente e possuir, pelo menos, 1 Ponto de Vida. Sendo capaz de regenerar ossos, pedaços de órgãos e recuperar partes do corpo em alguns dias. Esta regeneração consegue recuperar um valor máximo de Pontos de Vida igual a 3 vezes o nível do seu "Estilo de Combate" + 10. Essa característica não poderá ser usada novamente até o término de um descanso longo. Por exemplo, um personagem no 7º nível pode recuperar no máximo 31 Pontos de Vida, até terminar um descanso longo.' 
                },
                { 
                    id: 'corpo-resistente', 
                    nome: 'Corpo Resistente', 
                    desc: 'Quando na forma animal ou híbrida, você recebe resistência a um tipo de dano, por exemplo veneno, fogo, frio, cortante etc. Este traço pode ser escolhido até 2 vezes por personagem.',
                    multiplo: 2
                },
                { 
                    id: 'sanguinario', 
                    nome: 'Sanguinário', 
                    desc: 'Em qualquer forma, você pode usar uma ação bônus para impor sobre você mesmo a condição "Enfurecido", escolhendo um alvo que tenha te ferido ou te ofendido de alguma forma, no último minuto. Essa característica não poderá ser usada novamente até o término de um descanso longo.' 
                },
                { 
                    id: 'saude-animal', 
                    nome: 'Saúde Animal', 
                    desc: 'Em qualquer forma, você pode escolher recuperar todos os Dados de Vida ao terminar um descanso longo. Essa característica não poderá ser usada novamente até o término de 1+1d4 descansos longos.' 
                },
                { 
                    id: 'surto-adrenalina', 
                    nome: 'Surto de Adrenalina', 
                    desc: 'Em qualquer forma, uma vez durante um encontro, você pode se concentrar por 1 turno, sem usar sua ação, ação poderosa ou deslocamento e recuperar 2d6 Pontos de Poder, que são perdidos ao final da batalha, caso não usados. Essa característica pode ser usada até 3 vezes e você recupera todos os seus usos ao término de um descanso longo.' 
                },
                { 
                    id: 'resistencia-animal', 
                    nome: 'Resistência Animal', 
                    desc: 'Quando na forma animal ou híbrida, você recebe proficiência em um tipo de Salvaguarda. Você pode escolher entre Força, Destreza ou Constituição.' 
                }
            ]
        }
    },
    
    // TRAÇO PREDADOR (especial para carnívoros)
    predador: {
        id: 'predador',
        nome: 'Predador',
        desc: 'Quando na forma animal ou híbrida, uma vez por turno, você pode recuperar a mesma quantidade do dano causado em Pontos de Vida e 1 Ponto de Poder. O máximo de PV recuperado com essa característica é igual à 5 vezes o seu nível de personagem e o máximo de PP recuperado é igual ao seu nível de personagem. Essa característica não poderá ser usada novamente até o término de um descanso longo.'
    },
    
    // TRAÇOS ANCESTRAIS
    ancestrais: [
        { 
            id: 'animal-grande', 
            nome: 'Animal Grande', 
            desc: 'Quando na forma animal, a sua categoria de tamanho se torna Grande, seu alcance aumenta em 1,5 metro e você recebe desvantagem em Testes de Atributo de Destreza (Furtividade).' 
        },
        { 
            id: 'criatura-robusta', 
            nome: 'Criatura Robusta', 
            desc: 'Em qualquer forma, o seu valor máximo de Pontos de Vida aumenta em 20.' 
        },
        { 
            id: 'investida-atropeladora', 
            nome: 'Investida Atropeladora', 
            desc: 'Quando na forma animal ou híbrida, se você correr, pelo menos, 6 metros em linha reta até uma criatura e então atingi-la com um ataque corpo a corpo, o alvo deve ser bem-sucedido em uma Salvaguarda de Força, ou cairá no chão. Se o alvo for derrubado, você pode realizar outro ataque corpo a corpo, como parte do deslocamento.' 
        },
        { 
            id: 'monstro-cerco', 
            nome: 'Monstro de Cerco', 
            desc: 'Quando na forma animal, suas jogadas de ataque (comum) corpo a corpo causam o dobro do dano a objetos e estruturas.' 
        },
        { 
            id: 'pele-resistente', 
            nome: 'Pele Resistente', 
            desc: 'Quando na forma animal ou híbrida, você recebe resistência em um tipo de dano à sua escolha entre Contundente, Cortante ou Perfurante.' 
        },
        { 
            id: 'recuperacao-acelerada', 
            nome: 'Recuperação Acelerada', 
            desc: 'Em qualquer forma, quando você cair a 0 Pontos de Vida e não morrer, após 30 minutos, você pode recobrar a consciência usando todos os seus Dados de Vida disponíveis e mais 3 adicionais, para recuperar seus Pontos de Vida.' 
        }
    ]
};

// ===== REGRAS DE ZOAN POR TIPO DE USUÁRIO =====
const REGRAS_ZOAN = {
    comum: {
        nome: 'Zoan Comum/Normal',
        aspectoInato: 1,
        tracosComuns: 3,
        tracosEspecificos: {
            carnivoro: { predador: true, quantidade: 3 },
            herbivoro: { predador: false, quantidade: 5 }
        },
        tracosAncestrais: 0,
        points: [
            { nivel: 1, point: '1º Point', ppTracos: null, ppTecnicas: 2 },
            { nivel: 3, point: '2º Point', ppTracos: 4, ppTecnicas: 4 },
            { nivel: 6, point: '3º Point', ppTracos: 6, ppTecnicas: 6 },
            { nivel: 9, point: '4º Point', ppTracos: 8, ppTecnicas: 8 },
            { nivel: 12, point: '5º Point', ppTracos: 10, ppTecnicas: 10 }
        ]
    },
    ancestral: {
        nome: 'Zoan Ancestral',
        aspectoInato: 1,
        tracosComuns: 3,
        tracosEspecificos: {
            carnivoro: { predador: true, quantidade: 3 },
            herbivoro: { predador: false, quantidade: 5 }
        },
        tracosAncestrais: 1, // +1 obrigatório, pode trocar até 3 específicos por ancestrais
        trocaAncestrais: 3,
        points: [
            { nivel: 1, point: '1º Point', ppTracos: null, ppTecnicas: 2 },
            { nivel: 3, point: '2º Point', ppTracos: 4, ppTecnicas: 4 },
            { nivel: 6, point: '3º Point', ppTracos: 6, ppTecnicas: 6 },
            { nivel: 9, point: '4º Point', ppTracos: 8, ppTecnicas: 8 },
            { nivel: 12, point: '5º Point', ppTracos: 10, ppTecnicas: 10 }
        ]
    },
    mitica: {
        nome: 'Zoan Mítica',
        aspectoInato: 1,
        mps: 1,
        tracosComuns: 2,
        tracosEspecificos: 2,
        tracosAncestrais: 1,
        tecnicasOuPoints: [
            { nivel: 1, opcao: 'Técnica 1º Grau OU 1º Point' },
            { nivel: 3, opcao: 'Técnica 2º Grau OU 2º Point' },
            { nivel: 6, opcao: 'Técnica 3º Grau OU 3º Point + Auxiliar' },
            { nivel: 9, opcao: 'Técnica 4º Grau OU 4º Point' },
            { nivel: 12, opcao: 'Técnica 5º Grau OU 5º Point + Auxiliar' }
        ]
    },
    miticaDesperto: {
        nome: 'Zoan Mítica Desperto',
        aspectoInato: 1,
        mps: 2,
        tracosComuns: 2,
        tracosEspecificos: 2,
        tracosAncestrais: 1,
        tracoExtra: 1,
        tecnicasOuPoints: [
            { nivel: 1, opcao: 'Técnica 1º Grau OU 1º Point' },
            { nivel: 3, opcao: 'Técnica 2º Grau OU 2º Point' },
            { nivel: 6, opcao: 'Técnica 3º Grau OU 3º Point + Auxiliar' },
            { nivel: 9, opcao: 'Técnica 4º Grau OU 4º Point' },
            { nivel: 12, opcao: 'Técnica 5º Grau OU 5º Point + Auxiliar' },
            { nivel: 16, opcao: 'Técnica 6º Grau OU Point Qualquer' },
            { nivel: 20, opcao: 'Técnica 7º Grau OU Point Qualquer' }
        ]
    },
    comumDesperto: {
        nome: 'Zoan Comum Desperto',
        aspectoInato: 1,
        tracosComuns: 3,
        tracosEspecificos: {
            carnivoro: { predador: true, quantidade: 3 },
            herbivoro: { predador: false, quantidade: 5 }
        },
        tracosAncestrais: 0,
        desperto: true,
        despertarDesc: 'O despertar de uma Zoan Comum requer que o atributo ligado à Propriedade da fruta atinja o valor mínimo da Categoria. Ao despertar, o usuário recebe o benefício "Despertar da Mente e do Corpo", definido pelo Narrador.',
        points: [
            { nivel: 1, point: '1º Point', ppTracos: null, ppTecnicas: 2 },
            { nivel: 3, point: '2º Point', ppTracos: 4, ppTecnicas: 4 },
            { nivel: 6, point: '3º Point', ppTracos: 6, ppTecnicas: 6 },
            { nivel: 9, point: '4º Point', ppTracos: 8, ppTecnicas: 8 },
            { nivel: 12, point: '5º Point', ppTracos: 10, ppTecnicas: 10 }
        ]
    },
    ancestralDesperto: {
        nome: 'Zoan Ancestral Desperto',
        aspectoInato: 1,
        tracosComuns: 3,
        tracosEspecificos: {
            carnivoro: { predador: true, quantidade: 3 },
            herbivoro: { predador: false, quantidade: 5 }
        },
        tracosAncestrais: 1,
        trocaAncestrais: 3,
        desperto: true,
        despertarDesc: 'O despertar de uma Zoan Ancestral requer que o atributo ligado à Propriedade da fruta atinja o valor mínimo da Categoria. Ao despertar, o usuário recebe o benefício "Despertar da Mente e do Corpo", definido pelo Narrador.',
        points: [
            { nivel: 1, point: '1º Point', ppTracos: null, ppTecnicas: 2 },
            { nivel: 3, point: '2º Point', ppTracos: 4, ppTecnicas: 4 },
            { nivel: 6, point: '3º Point', ppTracos: 6, ppTecnicas: 6 },
            { nivel: 9, point: '4º Point', ppTracos: 8, ppTecnicas: 8 },
            { nivel: 12, point: '5º Point', ppTracos: 10, ppTecnicas: 10 }
        ]
    }
};

// ===== CRIAÇÃO DE POINTS (tabela "Criação de Points", pág. 220) =====
// Traços Realçados seguem as regras de MP (pontos virtuais). Ao mesclar traço + técnica
// no mesmo Point, os pontos virtuais do traço são descontados do máximo de PP da técnica.
const CRIACAO_POINTS = [
    { point: 1, nivel: 1, nome: '1º Point', maxPPTraco: 0, maxPPTecnica: 2 },
    { point: 2, nivel: 3, nome: '2º Point', maxPPTraco: 4, maxPPTecnica: 4 },
    { point: 3, nivel: 6, nome: '3º Point', maxPPTraco: 6, maxPPTecnica: 6 },
    { point: 4, nivel: 9, nome: '4º Point', maxPPTraco: 8, maxPPTecnica: 8 },
    { point: 5, nivel: 12, nome: '5º Point', maxPPTraco: 10, maxPPTecnica: 10 }
];

// ===== ESTÁGIO DESPERTO (resumos para exibição na ficha) =====
const ESTAGIO_DESPERTO = {
    zoan: {
        titulo: 'Estágio Desperto (Zoan Comum e Ancestral)',
        requisito: 'A partir do 16º nível. Ao despertar, Salvaguarda de Presença ou Vontade CD 23 para manter a consciência (resultado 1 natural ou 3 falhas = besta irracional controlada pelo Narrador).',
        caracteristicas: [
            'Liberação Cansativa: consome 1 PP ao final de cada turno; a 0 PP o estágio encerra.',
            'Explosão de Poder: pode recuperar 10 PP (1x/descanso longo).',
            'Ímpeto Desperto: ao usar Técnica de Combate com Ação Poderosa que cause dano direto, pode fazer uma jogada de ataque (comum) contra o alvo como parte da ação (3 usos/descanso longo).',
            'Força Bestial: ataque corpo a corpo desarmado se torna 3d6 Contundente.',
            'Auge Físico: Força, Destreza e Constituição passam a valer 30; beneficia-se de características de forma animal e híbrida.',
            'Recuperação Monstruosa: ao cair a 0 PV sem morrer, 1d20 ≥ 10 recupera metade dos PV totais (cada sucesso: +1 na CD e +1 PP na Liberação Cansativa).'
        ]
    },
    mitica: {
        titulo: 'Estágio Desperto (Zoan Mítica)',
        requisito: 'Mesmos requisitos das Zoan Comuns e Ancestrais (16º nível; Salvaguarda de Presença ou Vontade CD 23 para manter a consciência).',
        caracteristicas: [
            'Liberação Cansativa: consome 1 PP ao final de cada turno; a 0 PP o estágio encerra.',
            'Manifestação de Poder Extra: beneficia-se de uma 2ª MP criada pelo jogador durante o estágio.',
            'Ímpeto Desperto: ao usar Técnica de Combate com Ação Poderosa que cause dano direto, pode fazer uma jogada de ataque (comum) contra o alvo como parte da ação (3 usos/descanso longo).',
            'Auge Físico: Força, Destreza e Constituição passam a valer 30; beneficia-se de características de forma animal e híbrida.',
            'Recuperação Monstruosa: ao cair a 0 PV sem morrer, 1d20 ≥ 10 recupera 1/3 dos PV totais (cada sucesso: +1 na CD e +1 PP na Liberação Cansativa).',
            'Efeito Variável: escolhe um efeito do Despertar Aprimorador ou Transmutador (troca em descanso curto/longo).',
            'Novo Patamar: Técnicas de 6º/7º grau (ou Points quaisquer) no 16º/20º nível + 1 Traço Específico ou Ancestral extra.'
        ]
    },
    logiaParamecia: {
        titulo: 'Estágio Desperto (Logia e Paramecia)',
        requisito: 'A partir do 16º nível: Despertar da Mente e do Corpo (definido pelo Narrador) + Alinhamento Sobrenatural (atributo da Propriedade no valor mínimo da Categoria: S=20, A=19, B=18, C=17).',
        caracteristicas: [
            'Liberação Cansativa: consome 1 PP ao final de cada turno; a 0 PP o estágio encerra.',
            'Novo Patamar: Técnicas de Combate de 6º grau (16º nível) e 7º grau (20º nível) + 2 Técnicas Auxiliares correspondentes.',
            'Explosão de Poder: pode recuperar 10 PP (1x/descanso longo).',
            'Ímpeto Desperto: ao usar Técnica de Combate com Ação Poderosa que cause dano direto, pode fazer uma jogada de ataque (comum) contra o alvo como parte da ação (3 usos/descanso longo).'
        ]
    }
};

// Tipos de despertar (Logia e Paramecia) — definido pelo Narrador para cada fruto
const TIPOS_DESPERTAR = [
    {
        id: 'aprimorador',
        nome: 'Despertar Aprimorador',
        desc: 'Corpo Aprimorado: +10 PP máximos, +50 PV máximos e +1 CR durante o estágio. Transformação Sustentável: Técnicas de Combate do fruto (sem requisito "Estágio Desperto") reduzem o custo em metade do grau (arred. p/ baixo, custo mínimo 1 PP).'
    },
    {
        id: 'transmutador',
        nome: 'Despertar Transmutador',
        desc: 'Técnicas Abrangentes: vantagem na jogada de ataque (Técnicas) OU desvantagem em uma Salvaguarda imposta. Área Afetada: transforma esfera de até 9m ao seu redor (móvel); ao usar qualquer Técnica pode aplicar Execução Espacial, Transformação Ofensiva (Salvaguarda ou 5d8), Defensiva (+3 CR) ou Variada (condição ≤3 PP). Usos = Bônus de Proficiência por descanso longo.'
    },
    {
        id: 'holista',
        nome: 'Despertar Holista',
        desc: 'Controle Supremo: um atributo fixo passa a valer 30 durante o estágio. Efeito Variável: ao entrar no estágio, escolhe um efeito do Despertar Aprimorador ou Transmutador (pode trocar após descanso curto/longo).'
    }
];

// ===== POINTS ZOAN PRÉ-DEFINIDOS (COM DADOS DO LIVRO) =====
const POINTS_ZOAN = [
    { 
        id: 'arm', 
        nome: 'Arm Point', 
        desc: 'Uma transformação possível para qualquer usuário de Zoan. Altera a forma dos membros superiores ou inferiores, aumentando seus músculos e dando a eles maior força física.',
        tracoRealcado: {
            nome: 'Força Animal',
            desc: 'Quando na forma híbrida, sua força cresce e seus ataques corpo a corpo desarmados são substituídos: 1º-5º nível = 1d6, 6º-10º = 1d8, 11º-15º = 1d10, 16º-20º = 1d12. O dano pode ser Contundente, Cortante ou Perfurante.'
        },
        tecnica: {
            nome: 'Arm Point: Heavy Gong',
            grau: 1,
            pp: 2,
            desc: 'Você aumenta a força dos seus braços para realizar uma poderosa jogada de ataque (Técnicas) corpo a corpo contra uma criatura.',
            dano: '2d10 Contundente',
            duracao: 'Instantâneo',
            alcance: 'Toque',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: true
        }
    },
    { 
        id: 'brain', 
        nome: 'Brain Point', 
        desc: 'Exclusivo para animais com grande inteligência, altera a forma física para melhorar a capacidade cognitiva e conseguir deduzir as melhores formas de enfrentar seus inimigos.',
        tracoRealcado: null,
        tecnica: {
            nome: 'Brain Point: Scope',
            grau: 4,
            pp: 7,
            desc: 'Analisando uma criatura inimiga, você consegue perceber seus pontos fracos e pode explorar o máximo deles. Enquanto a técnica durar, todas as suas jogadas de ataque (comum), contra uma criatura escolhida, recebem vantagem e margem de acerto crítico 18-20. Alternativamente: Ao usar esta técnica, você pode dar vantagem na jogada de ataque (comum) e aumentar a margem de acerto crítico para 18-20 de apenas uma técnica, gastando apenas metade dos Pontos de Poder.',
            dano: 'Nenhum',
            duracao: 'Até 1 minuto',
            alcance: 'Pessoal',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: true,
            nivelMinimo: 9
        }
    },
    { 
        id: 'claw', 
        nome: 'Claw Point', 
        desc: 'Exclusivo para animais que possuem garra ou algo semelhante, altera sua forma física para o melhor proveito de um ataque com a garra, alterando seu formato e características.',
        tracoRealcado: {
            nome: 'Climbing Spikes',
            desc: 'Quando na forma híbrida, você recebe movimento de escalada igual ao seu deslocamento normal, podendo se manter preso à parede sem precisar de nenhuma ação e recebe vantagem em Salvaguardas para se manter preso a uma parede.'
        },
        tecnica: {
            nome: 'Claw Point: Savage Attack',
            grau: 5,
            pp: 10,
            desc: 'Você realiza uma jogada de ataque (Técnicas) corpo a corpo feroz contra uma criatura, rasgando seu corpo. A criatura atingida deve ser bem-sucedida em uma Salvaguarda de Constituição ou receberá a condição "Sangramento".',
            dano: '9d10 Cortante',
            duracao: 'Instantâneo',
            alcance: 'Toque',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: false,
            nivelMinimo: 12
        }
    },
    { 
        id: 'guard', 
        nome: 'Guard Point', 
        desc: 'Exclusivo para animais com pelugem, altera sua forma física, aumentando em grande quantidade e tamanho seus pelos, para garantir mais proteção.',
        tracoRealcado: null,
        tecnica: {
            nome: 'Guard Point: Heavy Guard',
            grau: 2,
            pp: 4,
            desc: 'Em qualquer forma, ao receber um ataque, você pode usar sua reação para aumentar sua Classe de Resistência em +1 e diminuir o dano sofrido até o fim da duração da técnica em 4d8. <Heavy Defense> No 12º nível, usando sua reação, você pode usar essa técnica como uma técnica de 5º Grau, para aumentar sua Classe de Resistência em +3 e diminuir o dano sofrido até o fim da duração da técnica em 8d8 e custa 10 PP.',
            dano: 'Nenhum',
            duracao: 'Até o início do seu próximo turno',
            alcance: 'Pessoal',
            requisito: 'Akuma no Mi (Zoan), Reação',
            ataqueCombinado: false,
            nivelMinimo: 3
        }
    },
    { 
        id: 'heavy', 
        nome: 'Heavy Point', 
        desc: 'Exclusivo para animais de médio e grande porte, apresenta um grande crescimento da massa corporal, estatura e peso, que aumenta a força e a resistência do usuário.',
        tracoRealcado: {
            nome: 'Físico Animalesco',
            desc: 'Em qualquer forma, o usuário modifica seu corpo permanentemente, ganhando músculos mais resistentes e uma constituição acima de qualquer humano comum. Seus Pontos de Vida ganhos pelo "Estilo de Combate" são alterados e substituídos: 1º=42, 2º=64, 3º=86, 4º=103, 5º=120, 6º=142, 7º=164, 8º=186, 9º=203, 10º=220, 11º=242, 12º=264, 13º=286, 14º=303, 15º=320, 16º=342, 17º=364, 18º=386, 19º=408, 20º=430.'
        },
        tecnica: null
    },
    { 
        id: 'horn', 
        nome: 'Horn Point', 
        desc: 'Exclusivo para animais que possuem chifre ou algo semelhante, altera sua forma física para o melhor proveito de um ataque com o chifre, alterando seu formato e características.',
        tracoRealcado: {
            nome: 'Colonnade',
            desc: 'Quando na forma híbrida, ao usar seus chifres para atacar, o alcance de sua jogada de ataque (comum) corpo a corpo desarmado aumenta em 1,5 metro.'
        },
        tecnica: {
            nome: 'Horn Point: Big Horn',
            grau: 4,
            pp: 8,
            desc: 'Você usa seus poderosos chifres, que aumentam de tamanho, para realizar uma jogada de ataque (Técnicas) corpo a corpo contra uma criatura. A criatura atingida deve ser bem-sucedida em uma Salvaguarda de Força ou receberá a condição "Caído".',
            dano: '7d10 Perfurante',
            duracao: 'Instantâneo',
            alcance: 'Toque',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: false,
            nivelMinimo: 9
        }
    },
    { 
        id: 'jump', 
        nome: 'Jump Point', 
        desc: 'Exclusivo para animais que possuem grande poder nas pernas e nos saltos, altera sua forma física para aumentar seu salto exponencialmente, aumentando a quantidade de músculos na perna.',
        tracoRealcado: {
            nome: 'Speed Jump',
            desc: 'Quando na forma híbrida, você se torna capaz de saltar até 9 metros em distância e 6 metros de altura, sem sofrer dano de queda por essa altura (caso não esteja incapacitado ou preso de alguma forma).'
        },
        tecnica: {
            nome: 'Jump Point: Strong Leg',
            grau: 1,
            pp: 2,
            desc: 'Enquanto a técnica durar, o usuário não recebe redução de deslocamento por nenhum motivo.',
            dano: 'Nenhum',
            duracao: 'Até o início do seu próximo turno',
            alcance: 'Pessoal',
            requisito: 'Akuma no Mi (Zoan), Ação Bônus',
            ataqueCombinado: false,
            nivelMinimo: 1
        }
    },
    { 
        id: 'kung-fu', 
        nome: 'Kung Fu Point', 
        desc: 'Uma transformação possível para qualquer usuário de Zoan. Altera sua forma para uma criatura com movimentos ágeis e coordenados, perfeitos para serem usados em artes marciais.',
        tracoRealcado: {
            nome: 'Três Estilos',
            desc: 'Passo da Garça: Seu movimento não provoca reações de nenhum tipo. Golpe do Tigre: Se você não possuir um ataque corpo a corpo desarmado ele se torna 1d8. Estilo da Cobra: Durante um combate e apenas uma vez por rodada, você pode escolher usar uma ação adicional para "Atacar" (um ataque corpo a corpo desarmado, apenas), "Disparada" ou "Esquivar". Pode ser usada até 3 vezes por descanso longo.'
        },
        tecnica: null
    },
    { 
        id: 'light', 
        nome: 'Light Point', 
        desc: 'Exclusivo para animais de pequeno porte, apresenta uma redução no tamanho do usuário ou transforma o seu corpo para que seja muito mais fácil se mover.',
        tracoRealcado: {
            nome: 'Agilidade e Reflexos',
            desc: 'Agilidade Animal: Em qualquer forma, desde que você não esteja "Agarrado" ou "Impedido" sua CR recebe um bônus de +1 (8º nível +2, 14º nível +3, máximo 21 CR). Reflexos Animalescos: Em qualquer forma, você recebe vantagem em Salvaguardas de Destreza.'
        },
        tecnica: null
    },
    { 
        id: 'poison', 
        nome: 'Poison Point', 
        desc: 'Exclusivo para animais que expelem, injetam ou usam veneno de alguma forma, potencializando sua capacidade de produção do veneno e adquirindo uma resistência ainda maior.',
        tracoRealcado: {
            nome: 'Corpo Imune',
            desc: 'Quando na forma híbrida, você recebe Invulnerabilidade a dano de Veneno e à condição "Envenenado".'
        },
        tecnica: {
            nome: 'Poison Point: Poison Sting',
            grau: 3,
            pp: 6,
            desc: 'Realiza uma jogada de ataque (Técnicas) corpo a corpo que causa a condição "Envenenado", reduzindo o movimento da criatura atingida pela metade e causando desvantagem em todas as jogadas de ataque (comum) da criatura, enquanto a técnica durar. No final de cada um de seus turnos, a criatura afetada pode fazer uma Salvaguarda de Constituição para encerrar todos os efeitos.',
            dano: 'Nenhum',
            duracao: 'Até 1 minuto',
            alcance: 'Toque',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: false,
            nivelMinimo: 6
        }
    },
    { 
        id: 'scale', 
        nome: 'Scale Point', 
        desc: 'Exclusivo para animais que possuem escama ou algo semelhante. Altera sua forma física para o melhor proveito de um ataque ou defesa com a escama, alterando seu formato e características.',
        tracoRealcado: {
            nome: 'Dragon Lance',
            desc: 'Quando na forma híbrida, com uma ação bônus, você consegue fazer uma única jogada de ataque (comum) à distância com escamas que saem do seu corpo como projéteis. Essa jogada de ataque tem um alvo único, causa 1d12 + seu modificador de Destreza de dano Perfurante e tem um alcance de até 15 metros em linha.'
        },
        tecnica: {
            nome: 'Scale Point: Dragon Armor',
            grau: 4,
            pp: 8,
            desc: 'Fazendo com que suas escamas cresçam, você consegue envolver o próprio corpo e criar uma armadura de escamas. Enquanto a técnica durar, você recebe resistência contra todos os tipos de dano, com exceção de dano Trovejante, Psíquico e Verdadeiro.',
            dano: 'Nenhum',
            duracao: 'Até 1 minuto',
            alcance: 'Pessoal',
            requisito: 'Akuma no Mi (Zoan), Ação Bônus',
            ataqueCombinado: false,
            nivelMinimo: 6
        }
    },
    { 
        id: 'tail', 
        nome: 'Tail Point', 
        desc: 'Exclusivo para animais que possuem uma cauda ou algo semelhante. Altera sua forma física para o melhor proveito de um ataque com cauda, alterando seu formato e características.',
        tracoRealcado: {
            nome: 'Cauda Selvagem',
            desc: 'Quando na forma híbrida, com uma ação bônus, você consegue fazer uma única jogada de ataque (comum) corpo a corpo desarmado com sua cauda. Todos que estiverem a 1,5 metro de você recebem o mesmo ataque, mas sofrem apenas o dano desarmado, sem o modificador de atributo, sem sofrer qualquer efeito ou dados de dano adicionais, mesmo de acertos críticos.'
        },
        tecnica: {
            nome: 'Tail Point: Tail Whip',
            grau: 3,
            pp: 6,
            desc: 'Com um movimento rápido da sua cauda, você executa um golpe com grande força em uma jogada de ataque (Técnicas) corpo a corpo contra uma criatura. O impacto empurra a criatura Grande ou menor para um espaço desocupado a até 9 metros de distância dela, caso ela não passe em uma Salvaguarda de Força. Durante o empurrão, se a criatura bater em um objeto ou estrutura com mais de 1,5 metro de raio, ela receberá 3d8 de dano extra.',
            dano: '3d10 Contundente',
            duracao: 'Instantâneo',
            alcance: 'Toque',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: true,
            nivelMinimo: 6
        }
    },
    { 
        id: 'wing', 
        nome: 'Wing Point', 
        desc: 'Exclusivo para animais que possuem asas ou algo semelhante. Altera sua forma física para o melhor proveito de um ataque com asas, alterando seu formato e características.',
        tracoRealcado: {
            nome: 'Controle Alado',
            desc: 'Quando na forma híbrida, o usuário consegue manter todos os seus braços ao mesmo tempo que cria e usa suas asas perfeitamente. Você recebe vantagem na sua primeira jogada de ataque (comum) em cada turno, desde que esteja voando.'
        },
        tecnica: {
            nome: 'Wing Point: Razor Wind',
            grau: 2,
            pp: 4,
            desc: 'Você balança suas asas contra seus inimigos e cria uma poderosa onda de vento cortante contra eles. Toda a criatura dentro da área da técnica deve fazer uma Salvaguarda de Destreza. Sofrendo todo o dano se falhar ou metade desse dano se obtiver sucesso.',
            dano: '4d6 Cortante',
            duracao: 'Instantâneo',
            alcance: 'Até 15 metros, Cone',
            requisito: 'Akuma no Mi (Zoan), Ação Poderosa',
            ataqueCombinado: true,
            nivelMinimo: 3
        }
    }
];
