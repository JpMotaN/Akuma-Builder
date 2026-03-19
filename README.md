# Akuma no Mi Builder v6 - OP RPG 2.0

Ferramenta completa para criação de Akuma no Mi seguindo as regras do livro OP RPG 2.0.

## 🆕 Mudanças na v6

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
