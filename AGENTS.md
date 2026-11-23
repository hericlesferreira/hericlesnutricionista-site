# Diretrizes visuais | Hericles Nutri

## Direção visual oficial
Interface editorial clean, inspirada nos princípios de clareza e hierarquia de grandes sites de tecnologia, sem copiar marcas, layouts, imagens ou componentes proprietários.

- **Fundo predominante:** branco `#ffffff`, com seções alternadas em cinza claro `#f5f5f7`.
- **Tipografia:** texto em cinza quase preto `#1d1d1f`, títulos grandes, poucos estilos e contraste adequado.
- **Destaque:** verde institucional `#b9e801`, aplicado com parcimônia: botões principais e detalhes que orientam a ação. Não pintar palavras e cartões inteiros de verde sem necessidade.
- **Navegação:** curta, calma, responsiva; menu e links previsíveis.
- **Fotografia:** fotos profissionais reais, enquadradas sem cortes ruins. Priorizar apenas imagens que explicam atendimento, profissional ou artigo.
- **Leitura:** em artigos usar largura aproximada de 65-70 caracteres, texto 16-17px, espaçamento generoso, subtítulos que separam ideias e links visíveis.
- **Seções:** uma mensagem principal e no máximo um CTA prioritário por bloco. Evitar duplicação de benefícios e chamadas.
- **SEO:** jamais remover títulos, canonical, JSON-LD, textos centrais, links internos, FAQs e sitemap sem plano de substituição.

## Critérios de implementação
1. Raios concêntricos: raio interno = raio externo - padding quando houver container aninhado.
2. Bordas translúcidas em superfícies claras: `rgb(0 0 0 / .09)`. Nunca excesso de contornos.
3. Manter verde da marca; para paletas auxiliares, usar OKLCH quando for necessário igualar luminosidade percebida.
4. Degradês não são padrão. Se absolutamente necessários, usar fallback e interpolação em OKLCH quando apropriado.
5. Ícones discretos e consistentes; evitar emoji em lugar de iconografia de interface.
6. Carrossel só quando tiver utilidade clara; mascarar extremidades apenas se existir rolagem horizontal.
7. Movimento suave e funcional; desabilitar para `prefers-reduced-motion`.
8. Profundidade por superfícies e espaços em branco, não sombras fortes.
9. Mobile: `dvh`/`svh` quando cabível com fallback; conferir barra de navegação e safe areas.
10. `mix-blend-mode:multiply` apenas para produtos sobre fundos claros, nunca nas fotos do nutricionista.

## Checklist de entrega
- Conferir homepage, quatro serviços, perfil, artigo de medicações, biblioteca e três artigos.
- Responsividade em 375px, 768px e 1366px, incluindo links, fotos, navegação e CTAs.
- Alt das imagens, foco de teclado, contraste e redução de movimentos.
- Build Vercel e validador automático de 11 URLs, JSON-LD e sitemap.
- Não publicar alterações que destruam informação clínica ou a identidade do nutricionista.
