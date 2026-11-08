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

## 🛒 Fluxo de compra e conta

- **Carrinho:** o botão "Comprar" da página do produto exige tamanho e cor e leva ao carrinho. O ícone do cabeçalho mostra a quantidade e abre um mini carrinho (com "Esvaziar" e "Ver Carrinho").
- **Página do carrinho:** altera a quantidade, remove itens, aplica cupom e calcula o frete pelo CEP, com resumo de valores e parcelamento em 10x.
- **Finalizar compra:** formulários de dados pessoais, entrega e pagamento (cartão ou boleto), com máscaras de CPF, celular, CEP e cartão e validação dos campos.
- **Compra realizada:** mostra os dados do pedido e permite imprimir o recibo. O pedido passa a aparecer em "Meus Pedidos".
- **Conta:** cadastro em duas etapas, login, edição das informações e menu com a conta logada.

### Como testar

- **Login de exemplo:** `francisco@gmail.com` com qualquer senha, ou crie uma conta em `/cadastro`.
- **Cupom:** `DIGITAL10` aplica 10% de desconto.
- **Frete:** informe um CEP de 8 dígitos. Frete grátis em compras a partir de R$ 200,00; abaixo disso, R$ 19,90.

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
| `/produtos` e `/categorias` | Listagem de produtos (aceita `?filter=`) |
| `/produto/:id` | Visualização do produto |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Finalizar compra |
| `/sucesso` | Compra realizada |
| `/login` | Acesso à conta |
| `/cadastro` | Criação de conta (2 etapas) |
| `/meus-pedidos` | Meus pedidos (exige login) |
| `/minhas-informacoes` | Minhas informações, com edição (exige login) |

## 📁 Estrutura do projeto

```
projeto-digital-store/
├── assets/            # SVGs (logos, ícones, redes sociais)
├── doc/               # Layouts de referência do Figma
├── public/            # Imagens estáticas (slides, coleções, produtos) e favicon
├── src/
│   ├── components/    # Header, Footer, Logo, Section, ProductCard, ProductListing,
│   │                  # Gallery, FilterGroup, ProductOptions, BuyBox, MiniCart,
│   │                  # CartItem, formulários e demais componentes de apoio
│   ├── context/       # Estado global (carrinho, login e pedidos)
│   ├── data/          # products.js e mock.js (dados de exemplo)
│   ├── hooks/         # useForm
│   ├── pages/         # Layout, Home, Listagem, Produto, Carrinho, Checkout, Sucesso,
│   │                  # Login, Cadastro, Meus Pedidos, Minhas Informações e 404
│   ├── utils/         # formatPrice, masks (máscaras) e validators (validações)
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

- Não há back-end: produtos, carrinho, conta e pedidos usam dados de exemplo (`src/data`) e o `localStorage` do navegador, e o login é simulado (a senha não é verificada).
- Os botões de login com Gmail e Facebook e o link "Esqueci minha senha" apenas informam que o recurso ainda não está disponível.
- O breakpoint principal é o `lg` do PrimeFlex (992px): abaixo dele valem o menu lateral e o layout mobile.

## 🚧 Possíveis melhorias

- Consumo de uma API real para os produtos.
- Testes automatizados.

---

Desenvolvido por [@ramonjrx](https://github.com/ramonjrx).
