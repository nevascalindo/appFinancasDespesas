# 💰 App Finanças Pessoais

Aplicativo mobile de controle de finanças pessoais desenvolvido com React Native, Expo e Supabase.

## 📋 Funcionalidades

- ✅ Sistema de autenticação (Login e Cadastro)
- ✅ Dashboard com resumo financeiro
- ✅ Gráficos de receitas e despesas
- ✅ Cadastro de receitas e despesas
- ✅ Anexar comprovantes
- ✅ Gerenciamento de categorias personalizadas
- ✅ Listagem e filtros de transações
- ✅ Design responsivo e moderno

## 🚀 Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **Supabase** - Backend as a Service (autenticação e banco de dados)
- **Victory Native** - Biblioteca para gráficos
- **React Navigation** - Navegação entre telas
- **date-fns** - Manipulação de datas

## 📦 Instalação

### 1. Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Conta no Supabase (gratuita)

### 2. Clone e instale as dependências

```bash
# Já está no diretório do projeto
cd C:\Users\lucas.flores\Documents\appFinancasDespesas

# Instalar dependências
npm install
```

### 3. Configurar o Supabase

#### 3.1. Criar projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta (se não tiver)
3. Clique em "New Project"
4. Preencha os dados:
   - **Name**: app-financas (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima
5. Aguarde a criação do projeto (pode levar alguns minutos)

#### 3.2. Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor SQL
5. Clique em **Run** (ou pressione Ctrl+Enter)
6. Aguarde a execução (deve aparecer "Success")

#### 3.3. Configurar as credenciais no app

1. No painel do Supabase, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL** (algo como: https://xxxxx.supabase.co)
   - **anon public** key (uma chave longa)

3. Abra o arquivo `src/config/supabase.js`
4. Substitua as variáveis:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Cole sua URL aqui
const SUPABASE_ANON_KEY = 'sua-anon-key-aqui'; // Cole sua chave aqui
```

### 4. Executar o aplicativo

```bash
# Iniciar o Expo
npm start

# Ou para plataformas específicas:
npm run android  # Para Android
npm run ios      # Para iOS (apenas no macOS)
```

### 5. Testar no dispositivo

1. Instale o app **Expo Go** no seu celular:
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Escaneie o QR Code que aparece no terminal ou navegador

3. O app será carregado no seu dispositivo!

## 📱 Como usar

### Primeiro acesso

1. **Criar conta**: Na tela inicial, clique em "Cadastre-se"
2. Preencha seus dados (nome, email e senha)
3. Clique em "Criar conta"
4. Faça login com suas credenciais

### Adicionar transação

1. No Dashboard, clique no botão **+** (flutuante)
2. Escolha o tipo: **Despesa** ou **Receita**
3. Preencha:
   - Valor
   - Descrição
   - Categoria (ou crie uma nova)
   - Data
   - Observações (opcional)
   - Comprovante (opcional)
4. Clique em **Salvar**

### Gerenciar categorias

1. Vá na aba **Categorias**
2. Clique no **+** para criar nova categoria
3. Preencha:
   - Nome
   - Escolha um ícone
   - Escolha uma cor
   - Defina o tipo (Despesa, Receita ou Ambos)
4. Clique em **Salvar**

### Visualizar transações

1. Vá na aba **Transações**
2. Use os filtros: **Todas**, **Receitas** ou **Despesas**
3. Clique em uma transação para ver detalhes

## 🎨 Estrutura do Projeto

```
appFinancasDespesas/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   ├── BalanceCard.js
│   │   ├── TransactionCard.js
│   │   └── CategoryCard.js
│   ├── config/              # Configurações
│   │   └── supabase.js      # Configuração do Supabase
│   ├── constants/           # Constantes e temas
│   │   └── theme.js         # Cores, tamanhos, etc.
│   ├── contexts/            # Contextos React
│   │   └── AuthContext.js   # Contexto de autenticação
│   ├── navigation/          # Navegação
│   │   └── AppNavigator.js  # Configuração de rotas
│   ├── screens/             # Telas do app
│   │   ├── auth/            # Telas de autenticação
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   └── main/            # Telas principais
│   │       ├── DashboardScreen.js
│   │       ├── TransactionsScreen.js
│   │       ├── AddTransactionScreen.js
│   │       └── CategoriesScreen.js
│   └── services/            # Serviços de API
│       ├── categoryService.js
│       └── transactionService.js
├── assets/                  # Imagens e ícones
├── App.js                   # Componente raiz
├── package.json             # Dependências
├── supabase-schema.sql      # Schema do banco de dados
└── README.md                # Este arquivo
```

## 🔧 Troubleshooting

### Erro ao conectar com Supabase

- Verifique se as credenciais em `src/config/supabase.js` estão corretas
- Certifique-se de que executou o schema SQL no Supabase
- Verifique sua conexão com a internet

### Erro ao instalar dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm cache clean --force
npm install
```

### App não carrega no Expo Go

- Certifique-se de que o celular e o computador estão na mesma rede Wi-Fi
- Tente usar o modo Tunnel: `expo start --tunnel`

### Gráficos não aparecem

- Verifique se tem transações cadastradas no mês atual
- Tente fazer pull-to-refresh na tela do Dashboard

## 📝 Próximas melhorias

- [ ] Filtros avançados por data
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Metas financeiras
- [ ] Notificações de lembretes
- [ ] Modo escuro
- [ ] Múltiplas contas/carteiras
- [ ] Sincronização com bancos

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar no controle de finanças pessoais.

---
