# Diretrizes de interface: Hericles Nutri

## Objetivo
Criar páginas fluidas, leves e fáceis de ler. Elementos visuais existem para esclarecer, orientar ou estabelecer confiança; não apenas decorar.

## Princípios de produto
- Preservar cores e personalidade da marca. Verde de destaque: #b9e801. Usar em títulos pontuais, links e CTAs, não em todos os componentes.
- Página inicial: apresentar o serviço e facilitar a decisão. Páginas de serviços: explicar a modalidade e orientar o próximo passo. Artigos: priorizar leitura sem interrupções.
- Preferir uma ideia principal por seção e um CTA prioritário. Evitar repetir blocos com a mesma mensagem.
- Nas páginas editoriais, corpo de texto próximo de 16px, line-height 1.75–1.85 e largura por volta de 65–70 caracteres.
- Imagens reais do profissional devem reforçar o contexto: atendimento, consultoria ou autoria. Evitar repetição excessiva. Não usar imagens decorativas com texto.
- Manter boa visibilidade em telas pequenas. Testar o menu, a altura do viewport, os botões e a proporção das fotografias.

## 10 cuidados finos do material de referência
1. Raios concêntricos: ao criar um elemento arredondado com preenchimento interno, ajustar o raio do conteúdo para o raio externo menos o padding. Não aplicar se não houver elemento interno destacado.
2. Bordas translúcidas: em tema escuro, usar preferencialmente `rgb(255 255 255 / .12)`; no claro, `rgb(0 0 0 / .12)`.
3. OKLCH: usar para construir paletas com várias cores equivalentes. Não substituir a cor institucional sem necessidade; a identidade deve permanecer consistente.
4. Degradês OKLCH: optar pela interpolação perceptual quando houver duas cores distantes e um degradê realmente necessário; incluir fallback. Não introduzir degradês como ornamento.
5. Ícones: harmonizar peso visual com a tipografia. Evitar misturar estilos de ícones sem critério.
6. Máscara horizontal: aplicar somente a carrosséis com rolagem lateral, com controles externos à máscara. Não criar carrosséis desnecessários.
7. Troca de ícones: usar transições sutis e respeitar `prefers-reduced-motion`; não animar só para chamar atenção.
8. Profundidade no escuro: fundo, card e menu com superfícies discretamente progressivas; priorizar cor e borda em vez de sombra preta forte.
9. Altura mobile: preferir `dvh`/`svh` com fallback `vh`, preservando menus e botões visíveis junto à barra do navegador.
10. Blend multiply: só para fotos de produtos em fundo branco sobre superfícies claras. Nunca aplicar a retratos profissionais em fundo escuro.

## Checagem antes de concluir
- Ler um artigo em 375px, 768px e 1366px: sem linha longa demais, texto miúdo, link invisível ou cortes indevidos.
- Usar o site com teclado: foco visível, links descritivos e perguntas acessíveis.
- Com movimento reduzido, não manter animações pulsantes.
- Evitar que fotos recortem rostos ou equipamentos de forma inadequada.
- Comprovar build e ausência de regressão de SEO (URLs, conteúdo HTML, dados estruturados e sitemap).
- Deixar explícito quais itens foram aplicados e quais não eram pertinentes.
