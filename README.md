# 🛍️ Digital Store

E-commerce front-end de calçados e vestuário esportivo, desenvolvido em **React** como projeto final de um treinamento prático em Desenvolvimento Web (Digital College). O foco foi a componentização, a responsividade (mobile first) e a fidelidade ao design do Figma, seguindo os requisitos da documentação oficial.

🔗 **Deploy:** https://projeto-final-frontdend.vercel.app/

## ✨ Funcionalidades

**Home**
- Galeria de imagens em carrossel, com setas de navegação e transição suave.
- Seção "Coleções em destaque" com três imagens.
- Seção "Produtos em alta" com os produtos em grid responsivo (2 colunas no mobile e até 4 no desktop) e link "Ver todos".

**Listagem de produtos**
- Busca pelo campo do cabeçalho: ao pesquisar, a página abre em `/produtos?filter=termo` e filtra por nome, marca e categoria (sem diferenciar acentos nem maiúsculas).
- Filtros por Marca, Categoria, Gênero (múltipla escolha) e Estado (escolha única), com botão "Limpar filtros".
- Ordenação por menor ou maior preço.
- Título com o total de resultados e mensagem quando nada é encontrado.
- No mobile, os filtros ficam em um painel lateral aberto por um botão.

**Visualização do produto**
- Galeria com miniaturas clicáveis e navegação por setas.
- Box de compra com nome, referência, nota, avaliações, preço (com preço antigo riscado quando há desconto) e descrição.
- Seleção de tamanho (opções quadradas) e de cor (opções circulares).
- Seção "Produtos recomendados" e tratamento de produto inexistente.

**Geral**
- Cabeçalho com logo, busca, links de cadastro e login, carrinho e navegação principal. A página ativa é destacada, e no mobile a navegação vira um menu lateral.
- Rodapé com informações, categorias, contato, redes sociais e ano atual gerado automaticamente.
- Selo de desconto (`% OFF`) calculado a partir do preço e do preço promocional.
- Preços formatados em reais (R$).

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [PrimeFlex](https://primeflex.org/) para layout e utilitários CSS
- [PrimeIcons](https://primereact.org/icons/) para ícones
- [PrimeReact](https://primereact.org/) (tema Lara Light Indigo)
- ESLint para padronização do código

## 🗺️ Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/produtos` | Listagem de produtos (aceita `?filter=`) |
| `/produto/:id` | Visualização do produto |

## 📁 Estrutura do projeto

```
projeto-digital-store/
├── assets/            # SVGs (logos, ícones, redes sociais)
├── doc/               # Layouts de referência do Figma
├── public/            # Imagens estáticas (slides, coleções, produtos) e favicon
├── src/
│   ├── components/    # Header, Footer, Logo, Section, ProductCard, ProductListing,
│   │                  # Gallery, FilterGroup, ProductOptions, BuyBox
│   ├── data/          # products.js (dados de exemplo)
│   ├── pages/         # Layout, HomePage, ProductListingPage, ProductViewPage
│   ├── utils/         # formatPrice.js
│   ├── App.jsx        # Rotas
│   ├── index.css      # Variáveis de cor e estilos globais
│   └── main.jsx
├── vercel.json        # Redireciona todas as rotas para o index.html (SPA)
└── package.json
```

## 🧩 Componentes

| Componente | Responsabilidade |
| --- | --- |
| `Header` / `Footer` | Cabeçalho e rodapé presentes em todas as páginas (via `Layout`) |
| `Logo` | Logo reutilizável, com tamanho e imagem configuráveis |
| `Section` | Bloco com título, alinhamento e link opcional |
| `ProductCard` | Cartão de produto com imagem, nome, preço e selo de desconto |
| `ProductListing` | Grid responsivo de `ProductCard` |
| `Gallery` | Carrossel de imagens com setas e miniaturas opcionais |
| `FilterGroup` | Grupo de filtros com `checkbox` ou `radio` |
| `ProductOptions` | Seleção de tamanho ou cor (quadrado ou circular) |
| `BuyBox` | Informações e ação de compra do produto |

## ⚙️ Como executar localmente

Pré-requisito: [Node.js](https://nodejs.org/) em uma versão LTS recente.

```bash
# 1. Clone o repositório
git clone https://github.com/ramonjrx/projeto-final-frontdend.git

# 2. Acesse a pasta do projeto
cd projeto-final-frontdend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra `http://localhost:5173` no navegador.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist` |
| `npm run preview` | Executa localmente a versão de produção |
| `npm run lint` | Verifica o código com o ESLint |

## 📝 Observações

- Os produtos vêm de dados de exemplo em `src/data/products.js`, sem API.
- Conforme a documentação, o carrinho é apenas ilustrativo e o botão "Comprar" não tem ação.
- O breakpoint principal é o `lg` do PrimeFlex (992px): abaixo dele valem o menu lateral e o layout mobile.

## 🚧 Possíveis melhorias

- Carrinho funcional com contador de itens.
- Consumo de uma API real para os produtos.
- Cadastro e login de usuários.
- Testes automatizados.

---

Desenvolvido por [@ramonjrx](https://github.com/ramonjrx).
