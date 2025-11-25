# Project Valkyrie API - Bruno Collection

Esta é a coleção de requisições da API do Project Valkyrie para uso com o [Bruno API Client](https://www.usebruno.com/).

## 📦 Instalação do Bruno

### Linux

```bash
# Snap
sudo snap install bruno

# AppImage
wget https://github.com/usebruno/bruno/releases/latest/download/bruno_linux_x86_64.AppImage
chmod +x bruno_linux_x86_64.AppImage
./bruno_linux_x86_64.AppImage
```

### macOS

```bash
brew install bruno
```

### Windows

Baixe o instalador em: https://www.usebruno.com/downloads

## 🚀 Como Usar

1. **Abra o Bruno** e clique em "Open Collection"
2. **Selecione a pasta** `/home/notnilton/Workspace/project-valkyrie/api-client`
3. **Selecione o ambiente** "Local" no canto superior direito
4. **Execute as requisições** na ordem sugerida

## 📁 Estrutura da Coleção

```
api-client/
├── bruno.json              # Configuração da coleção
├── environments/
│   └── Local.bru          # Variáveis de ambiente local
├── Health Check/
│   ├── Get Hello.bru      # Health check básico
│   └── Get User Example.bru # Exemplo de UserDTO
├── Auth/
│   ├── Register.bru       # Registrar novo usuário
│   └── Login.bru          # Login (salva token automaticamente)
└── Users/
    ├── Create User.bru    # Criar usuário
    ├── Get All Users.bru  # Listar todos
    ├── Get User by ID.bru # Buscar por ID
    ├── Update User.bru    # Atualizar usuário
    └── Delete User.bru    # Deletar usuário
```

## 🔧 Variáveis de Ambiente

O ambiente **Local** possui as seguintes variáveis:

- `baseUrl`: URL base da API (padrão: `http://localhost:3050`)
- `authToken`: Token de autenticação (preenchido automaticamente após login)
- `userId`: ID do usuário (preenchido automaticamente após criar/login)

## 📝 Fluxo de Teste Recomendado

### 1. Health Check

```
Health Check → Get Hello
Health Check → Get User Example
```

### 2. Autenticação

```
Auth → Register (cria uma conta)
Auth → Login (autentica e salva o token)
```

### 3. Gerenciamento de Usuários

```
Users → Create User (cria um usuário e salva o ID)
Users → Get All Users (lista todos)
Users → Get User by ID (busca o usuário criado)
Users → Update User (atualiza dados)
Users → Delete User (remove o usuário)
```

## 🎯 Scripts Automáticos

Algumas requisições possuem scripts que executam automaticamente após a resposta:

### Login.bru

```javascript
// Salva automaticamente o token e userId
if (res.body.token) {
  bru.setEnvVar('authToken', res.body.token);
}
if (res.body.userId) {
  bru.setEnvVar('userId', res.body.userId);
}
```

### Create User.bru

```javascript
// Salva automaticamente o userId do usuário criado
if (res.body.id) {
  bru.setEnvVar('userId', res.body.id);
}
```

## 🔐 Autenticação

Atualmente, os endpoints não requerem autenticação (desenvolvimento).

Quando a autenticação for implementada:

1. Execute `Auth → Login` primeiro
2. O token será salvo automaticamente em `authToken`
3. As requisições subsequentes usarão o token automaticamente

## 🐛 Troubleshooting

### Servidor não está respondendo

```bash
# Verifique se o backend está rodando
cd apps/backend
pnpm start:dev
```

### Porta diferente

Se o backend estiver rodando em outra porta, atualize a variável `baseUrl` no ambiente Local.

### Variável userId não definida

Execute primeiro uma das requisições:

- `Auth → Register`
- `Auth → Login`
- `Users → Create User`

Essas requisições salvam automaticamente o `userId` nas variáveis de ambiente.

## 📚 Documentação

Cada requisição possui documentação detalhada na aba "Docs" do Bruno, incluindo:

- Descrição do endpoint
- Campos obrigatórios e opcionais
- Validações aplicadas
- Notas importantes

## 🤝 Contribuindo

Ao adicionar novos endpoints:

1. Crie um arquivo `.bru` na pasta apropriada
2. Use as variáveis de ambiente (`{{baseUrl}}`, `{{authToken}}`, etc.)
3. Adicione documentação na seção `docs`
4. Se necessário, adicione scripts para salvar variáveis automaticamente

## 📄 Licença

Este projeto faz parte do Project Valkyrie.
