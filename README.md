# Cafézin - Mini Aplicacao Next.js

Mini aplicacao web desenvolvida com **Next.js + TypeScript** simulando o cardapio digital de uma cafeteria moderna.
O objetivo do projeto e demonstrar na pratica conceitos fundamentais de **HTML, CSS, JavaScript, Node.js, React e Next.js**, aplicando diferentes estrategias de renderizacao e boas praticas de organizacao.

---

# Tecnologias Utilizadas

* Next.js (App Router)
* React
* TypeScript
* CSS Modules
* API Routes (Node.js runtime)
* ESLint + Prettier

---

# Arquitetura do Projeto

Estrutura organizada por responsabilidades:

```text
src/
 ├── app/
 │    ├── api/           → endpoints mock (backend simulado)
 │    ├── products/      → paginas dinamicas
 │    ├── profile/       → pagina CSR
 │    └── page.tsx       → Home (SSG)
 ├── components/         → componentes reutilizaveis
 ├── services/mock/      → dados simulados
 ├── types/              → tipagens TypeScript
 └── styles/             → estilos globais
```

Essa organizacao facilita manutencao, escalabilidade e separacao de responsabilidades.

---

# Estrategias de Renderizacao

## Home - Static Site Generation (SSG)

A pagina inicial utiliza **SSG** pois o cardapio da cafeteria e essencialmente estatico.

Vantagens:

* Melhor performance
* Carregamento rapido
* Menor custo de processamento

---

## Pagina Detalhe - Incremental Static Regeneration (ISR)

A pagina de produto utiliza **ISR**:

```ts
export const revalidate = 60
```

Motivo:

* Informacoes como preco ou descricao podem mudar ocasionalmente.
* Nao e necessario renderizar a cada requisicao.
* ISR permite atualizar o conteudo periodicamente mantendo alta performance.

---

## Perfil do Usuario - Client Side Rendering (CSR)

A pagina de perfil utiliza:

```ts
'use client'
```

Motivo:

* Conteudo personalizado.
* Simulacao de autenticacao leve.
* Edicao dinamica de dados do usuario via estado local.

---

# API Routes

Endpoints mock criados:

```text
GET /api/products
GET /api/products/[slug]
```

Objetivo:

* Simular backend.
* Separar camada de dados da interface.
* Facilitar integracao futura com API real.

---

# Estilizacao

Foi utilizado **CSS Modules**.

Motivos da escolha:

* Escopo local dos estilos.
* Melhor organizacao.
* Integracao nativa com Next.js.
* Evita conflitos globais.

Layout responsivo foi construido utilizando:

* CSS Grid → listagem de produtos.
* Flexbox → layouts internos e pagina detalhe.

---

# Acessibilidade

Boas praticas aplicadas:

* Uso de `alt` nas imagens.
* Labels e atributos semanticos em botoes e inputs.
* Estrutura HTML semantica.

---

# Funcionalidades Implementadas

* Listagem de produtos (minimo 5 itens)
* Rota dinamica via slug
* Pagina detalhe com ISR
* Pagina de perfil com CSR
* API Routes mockadas
* Layout responsivo
* Codigo em TypeScript
* ESLint e Prettier configurados

Extras implementados:

* Identidade visual premium inspirada em cafeterias modernas.
* Componentizacao reutilizavel.

---

# Como Rodar o Projeto

Instalar dependencias:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Build de producao:

```bash
npm run build
```

Executar build:

```bash
npm start
```

---

# Scripts Disponiveis

```text
npm run dev     → ambiente de desenvolvimento
npm run build   → build de producao
npm run start   → iniciar producao
npm run lint    → analise de codigo
```

---

# Decisoes Tecnicas

* SSG foi utilizado na Home para maximizar performance.
* ISR foi aplicado na pagina detalhe para balancear atualizacao e velocidade.
* CSR foi escolhido para o perfil por envolver dados personalizados.
* CSS Modules foi adotado pela simplicidade e isolamento de estilos.

---

# Autor

Projeto desenvolvido como exercicio pratico de aplicacao dos conceitos modernos de desenvolvimento web com Next.js.
