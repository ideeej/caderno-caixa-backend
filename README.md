# 📓 Caderno Caixa - Backend

O `caderno-caixa-backend` é o servidor de aplicação do projeto **Caderno Caixa**. Ele fornece a **API RESTful** que gerencia toda a lógica de negócio, persistência de dados e regras específicas do PDV/ERP, focado em **microempreendedores (MEI) e pequenos negócios**.

Desenvolvido a partir de uma vivência prática no varejo, este backend prioriza a **flexibilidade** e a **resolução de casos de uso reais** do dia a dia.

---

## ⚙️ Stack Tecnológica

| Categoria | Tecnologia | Badge |
| :--- | :--- | :--- |
| **Runtime** | **Node.js** | ![NodeJS](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) |
| **Framework** | **NestJS** | ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) |
| **Linguagem** | **TypeScript** | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Database** | **PostgreSQL** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) |
| **ORM** | **Prisma** | ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) |
| **Container** | **Docker** | ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) |
| **Testes** | **Jest** | ![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white) |

---

## Casos de Uso e Soluções em Destaque

O diferencial do backend é sua capacidade de gerenciar o estado da aplicação e suportar funcionalidades essenciais para um pequeno negócio:

1.  **Múltiplas Vendas Abertas:** Gerencia sessões de vendas simultâneas, permitindo que o operador atenda vários clientes sem cancelar pedidos.
2.  **Edição Privilegiada:** Lógica de validação para permitir que operadores com permissão editem dados básicos de **Catálogo e Preços** diretamente no PDV.
3.  **Vendas Auditáveis:** Permite a **edição de vendas já fechadas** por operadores com privilégios, gerando registros de auditoria e corrigindo o estoque/caixa de forma controlada (solucionando casos de trocas ou erros).
4.  **Modo "Pedidos":** Implementação do ciclo de vida de **Pedidos** (comuns em lanchonetes/restaurantes) que se integram ao fluxo de caixa apenas no momento do pagamento.

---

## 🚀 Como Executar o Backend

Recomendamos usar o Docker para configurar o ambiente e o banco de dados rapidamente.

1.  **Clone o repositório:**
    ```bash
    git clone [https://www.youtube.com/watch?v=X49Wz3icO3E](https://www.youtube.com/watch?v=X49Wz3icO3E)
    cd caderno-caixa-backend
    ```

2.  **Configure o Ambiente (Docker):**
    * Crie o arquivo `.env` baseado no modelo `.env.example`.
    * Suba o container do PostgreSQL:
        ```bash
        docker-compose up -d postgres
        ```

3.  **Instale Dependências e Popule o DB:**
    ```bash
    npm install
    npx prisma migrate dev --name init # Cria o schema do BD
    ```

4.  **Execute o Servidor:**
    ```bash
    npm run start:dev
    ```

A API estará disponível em `http://localhost:3000` (ou a porta configurada no `.env`).

---

## 🧪 Testes

Execute os testes unitários e de integração com:

```bash
npm run test
