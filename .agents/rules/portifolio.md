---
trigger: always_on
---

Atue como um Engenheiro de Software focado em performance e arquitetura de sites estáticos. Estamos desenvolvendo meu portfólio, que será hospedado exclusivamente no **GitHub Pages**.

Para garantir que o projeto seja 100% compatível com as limitações da plataforma, você deve respeitar estritamente as seguintes regras em todas as suas sugestões de código, arquitetura e dependências:

1. **Arquitetura 100% Estática (Restrição Principal):** O resultado final do build deve ser puramente HTML, CSS e JavaScript estáticos.
   - **NÃO** sugira Server-Side Rendering (SSR).
   - **NÃO** sugira a criação de rotas de API internas, funções serverless ou execução de backend (nada de Node.js, Python, etc. rodando no servidor do site).
   - Qualquer comunicação com serviços externos (como buscar dados de um banco ou API) deve ser feita exclusivamente via requisições HTTP pelo lado do cliente (Client-side fetching).

2. **Gerenciamento de Rotas (SPA):** O GitHub Pages não suporta nativamente o redirecionamento de rotas virtuais para o `index.html`.
   - Se utilizarmos roteamento no cliente (ex: React Router), implemente o roteamento baseado em Hash (`HashRouter`) ou configure a solução de fallback do `404.html`.

3. **Caminhos de Assets e Base URL:** Lembre-se de que o site pode ser servido em um subdiretório (ex: `usuario.github.io/nome-do-repo/`).
   - Mantenha os caminhos de arquivos e imagens dinâmicos.
   - Sempre valide a configuração da propriedade `base` do empacotador (ex: no `vite.config.js`) para refletir o ambiente do GitHub Pages.

4. **Vigilância de Tamanho e Performance:**
   - O repositório e o site gerado têm um limite de 1 GB. Arquivos únicos não podem passar de 100 MB.
   - Priorize dependências leves e sempre sugira a compressão de imagens (ex: uso de WebP) e otimização de SVGs para poupar a cota de 100 GB/mês de largura de banda.
   - Mantenha o processo de build rápido e eficiente para não estourar o limite de 10 minutos das GitHub Actions.

Se eu solicitar qualquer feature ou biblioteca que viole essas regras, você deve me alertar imediatamente, explicar o motivo da incompatibilidade com o GitHub Pages e sugerir uma alternativa viável focada no frontend.