# Akuma no Mi Builder v7 - OP RPG 2.0

Ferramenta completa para criação de Akuma no Mi seguindo as regras do livro OP RPG 2.0.

## 🆕 Mudanças na v7

### Correções de regras (conferidas com o Livro do Jogador 2.0, Cap. 6 e 10)
- **MPs criadas**: reduções agora SOMAM Pontos Virtuais ao pool (base 6, teto de 12 no consumo), como no exemplo da pág. 208; modificador **Passiva corrigido para -3 PV**; removido o requisito "Ação" (não existe na tabela do livro); efeitos proibidos em MPs (Técnica Rápida/Demorada, Dano Adicional/Contínuo) não aparecem mais; cálculos dinâmicos de MP usam regras de técnica de 2º grau
- **Cap de reduções**: Técnicas de Combate limitadas ao grau; Auxiliares a -6 PP (custo mínimo 1 PP)
- **Técnicas Auxiliares**: máx 10 PP (15 PP com usuário desperto)
- **Técnica Rápida**: bloqueada acima do 4º grau
- **Condição/Efeito em Área**: grátis em técnicas de 1º grau
- **Aumentar Área**: 1 PP por 3m (Cone/Esfera/Cilindro); Linha 2 PP por 1,5m de largura

### Zoan
- **Zoan Mítica** agora tem acesso à seção de Points (pode trocar a Técnica do nível por um Point, inclusive 16º/20º quando desperta)
- **Mítica Desperto**: +1 Traço Específico OU Ancestral extra
- **Criar Point customizado**: Traço Realçado (pontos virtuais, máx —/4/6/8/10) + Técnica (PP máx 2/4/6/8/10), com desconto ao mesclar traço+técnica (tabela "Criação de Points", pág. 220)
- **Estágio Desperto** completo exibido na aba Zoan e na ficha (Comum/Ancestral, Mítica e Logia/Paramecia)
- **Tipos de Despertar** (Aprimorador/Transmutador/Holista) selecionáveis para Logia/Paramecia despertas

### Exportação
- **PDF corrigido**: quebra de página não corta mais técnicas/blocos no meio (`pagebreak: avoid-all`), tratamento de erro com fallback e botão dedicado **Imprimir / Salvar como PDF** (vetorial, texto selecionável)
- **Importar JSON** de akumas exportadas

## Mudanças na v6

### Melhorias de Interface
- **Contraste melhorado** em todos os selects e dropdowns
- **Propriedades como cards clicáveis** ao invés de select múltiplo
- **Fontes unificadas** (Pirata One, Cinzel, Crimson Pro)

### Sistema de Criação de MPs
- MPs Especiais pré-definidas
- MPs Criadas usando **Pontos Virtuais** (base 6, máx 12)
- Mesmos efeitos das técnicas disponíveis
- Modificadores por requisito de ativação (Passiva -2, Ação Bônus +2, etc.)

### Sistema de Criação de Técnicas
- **Dano FIXO pelo grau** (automático)
- **Efeitos via dropdown** (não checkboxes)
- Sub-seleções quando necessário (ex: condições)
- Calculadora automática de PP (Base + Efeitos - Reduções)
- Efeitos podem ser adicionados múltiplas vezes (quando permitido)

### Formatação de Técnicas
- **Layout igual ao livro** (imagem de referência)
- Grau na lateral esquerda
- Nome no topo com fundo escuro
- Tabela de stats (Duração, Alcance, Requisito, Dano)
- Ataque Combinado no rodapé

### Exportação de PDF
- **Cores personalizáveis** (primária e secundária)
- **Opção de mostrar/esconder efeitos** na ficha
- Formatação profissional

## 📁 Estrutura

```
akuma-builder/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js    (dados do sistema)
│   └── app.js     (lógica da aplicação)
└── README.md
```

## 🎮 Como Usar

1. Extraia o ZIP
2. Abra `index.html` no navegador
3. Preencha as informações básicas
4. Adicione MPs (Especiais ou Criadas)
5. Crie Técnicas usando os dropdowns de efeitos
6. Visualize e exporte no Resumo

## 📋 Abas

| Aba | Conteúdo |
|-----|----------|
| **Básico** | Nome, Tipo, Categoria, Usuário, Propriedades |
| **Manifestações** | MPs Especiais ou Criadas com Pontos Virtuais |
| **Técnicas** | Técnicas de Combate e Auxiliares |
| **Zoan** | Traços e Points (só para Zoan) |
| **Resumo** | Preview + Exportar PDF/JSON |
| **Salvas** | Gerenciar Akumas salvas |

## ⚡ Sistema de Efeitos

### Aumentam PP (Custo)
- **Controle**: Condições, Empurrão, Vantagem/Desvantagem, Área
- **Ofensivo**: Acerto Auto, Crítico, Dano Adicional
- **Suporte**: Cura, PV Temp, Voo, CR, Movimento

### Reduzem PP (Reduções)
- Concentração, Efeito Colateral, Reduzir Área
- Requisito Limitador, Técnica Debilitante
- Técnica Exaustiva, Técnica Não Ofensiva

## 🎨 Personalização do PDF

No Resumo você pode:
- Mudar a cor primária (cabeçalhos)
- Mudar a cor secundária (detalhes)
- Mostrar/esconder lista de efeitos

---

Desenvolvido para OP RPG 2.0 Playtest
