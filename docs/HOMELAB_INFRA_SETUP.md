# Guia de Preparação da Infraestrutura (Homelab NilByte)

Este documento detalha como configurar o servidor (Host) para suportar o pipeline de CI/CD que definimos para o projeto.

## 1. Estrutura de Diretórios

No seu servidor, crie uma pasta dedicada para a infraestrutura de CI/CD (ex: `/opt/nilbyte-infra`).

```bash
mkdir -p /opt/nilbyte-infra
cd /opt/nilbyte-infra
```

## 2. Docker Compose da Infraestrutura

Crie um arquivo `docker-compose.yml` nesta pasta. Este arquivo irá subir o **Registry Local** e o **GitHub Runner**.

**Arquivo:** `/opt/nilbyte-infra/docker-compose.yml`

```yaml
services:
  # 1. Registry Local (Armazena as imagens Docker)
  registry:
    image: registry:2
    container_name: nilbyte_registry
    restart: always
    ports:
      - '5000:5000'
    volumes:
      - ./registry-data:/var/lib/registry

  # 2. Interface Web para o Registry (Para visualizar/limpar imagens)
  registry-ui:
    image: joxit/docker-registry-ui:static
    container_name: nilbyte_registry_ui
    restart: always
    ports:
      - '8081:80'
    environment:
      - REGISTRY_URL=http://registry:5000
      - DELETE_IMAGES=true
    depends_on:
      - registry

  # 3. GitHub Actions Runner (Executa os jobs de deploy)
  runner:
    # Imagem popular de runner (ou use a oficial se preferir configurar manualmente)
    image: myoung34/github-runner:latest
    container_name: nilbyte_builder
    restart: always
    # CRÍTICO: network_mode host permite que o runner acesse 'localhost:5000'
    # e se comunique com o Docker do host sem problemas de DNS.
    network_mode: host
    environment:
      # Configure estas variáveis com seus dados
      - REPO_URL=https://github.com/SEU_USUARIO/SEU_REPOSITORIO
      - ACCESS_TOKEN=SEU_TOKEN_GITHUB_AQUI
      # Labels obrigatórias para bater com nosso workflow
      - RUNNER_NAME=local-builder
      - LABELS=self-hosted,local-builder
      - RUNNER_WORKDIR=/tmp/runner-work
    volumes:
      # CRÍTICO: Permite que o runner comande o Docker do Host
      - /var/run/docker.sock:/var/run/docker.sock
      # Persistência do workspace
      - ./runner-data:/tmp/runner-work
```

## 3. Passo a Passo de Configuração

1.  **Obter Token do GitHub**:
    - Vá no seu repositório GitHub.
    - `Settings` -> `Actions` -> `Runners` -> `New self-hosted runner`.
    - Copie o token gerado (não o comando inteiro, só o token).

2.  **Configurar o Compose**:
    - Edite o `docker-compose.yml` acima.
    - Substitua `SEU_USUARIO/SEU_REPOSITORIO` pelo caminho do seu repo.
    - Substitua `SEU_TOKEN_GITHUB_AQUI` pelo token copiado.

3.  **Subir a Infraestrutura**:

    ```bash
    docker compose up -d
    ```

4.  **Verificar**:
    - **Registry**: Acesse `http://IP-DO-SERVIDOR:8081`. Você deve ver a interface do registry (vazia inicialmente).
    - **Runner**: Vá no GitHub em `Settings` -> `Actions` -> `Runners`. O runner `local-builder` deve aparecer como "Idle" (Verde).

## 4. Detalhes Importantes para o Sucesso

- **Network Mode Host**: Note que usamos `network_mode: host` no runner. Isso é essencial para que, quando o script de deploy rodar `docker push localhost:5000/...`, ele consiga encontrar a porta 5000 que o container `registry` abriu no host. Sem isso, o runner tentaria conectar no localhost _dele mesmo_ e falharia.
- **Permissões do Socket**: O volume `/var/run/docker.sock:/var/run/docker.sock` dá poderes de root ao runner sobre o Docker. Isso é necessário para ele fazer `docker build` e `docker compose up`.
- **Limpeza de Disco**: Como estamos gerando muitas imagens (SHA do commit), monitore o espaço em disco. Use a interface na porta 8081 para apagar tags antigas periodicamente.

## 5. Testando o Deploy

Após subir essa infraestrutura:

1.  Faça uma alteração no código do projeto (ex: `guaripe`).
2.  Faça commit e push para a `main`.
3.  Observe a aba "Actions" no GitHub.
4.  O job deve ser pego pelo `local-builder`, construir as imagens, enviar para o registry local e atualizar os containers no servidor.
