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

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar no controle de finanças pessoais.

---
