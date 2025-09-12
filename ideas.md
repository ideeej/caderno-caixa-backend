# Ideias - Caderno Caixa

---

## 📌 Para a Primeira versão (V1)

### 🏗️ Domínio
- **Inventário**
  - [ ] Fazer movimentações (Entrada, Saída, Consumo)
- **Cliente**
  - [ ] Implementar entidade básica
  - [ ] Criar factory e testes
- **Fornecedor**
  - [ ] Implementar entidade básica
  - [ ] Criar factory e testes
- **Vendas**
  - [ ] Adicionar sistema de pagamento
  - [ ] Integrar com inventário
- **Relatórios**
  - [ ] Relatório de vendas
  - [ ] Relatório de estoque
  - [ ] Relatório de caixa

### 🛠️ Infraestrutura
- **Database**
  - [ ] Schema Prisma para Cliente
  - [ ] Schema Prisma para Fornecedor
  - [ ] Schema Prisma para Vendas
  - [ ] Schema Prisma para Inventário
- **Repositories**
  - [ ] CatalogRepository
  - [ ] InventoryRepository
  - [ ] SaleRepository
  - [ ] ClientRepository
- **Mappers**
  - [ ] Implementar mappers para cada entidade

### 🌐 API
- **Controllers**
  - [ ] CatalogController
  - [ ] InventoryController
  - [ ] SaleController
  - [ ] ClientController
- **DTOs**
  - [ ] DTOs de entrada/saída para cada módulo
- **Validação**
  - [ ] Middleware de validação
  - [ ] Guards de autenticação
  - [ ] Guards de autorização

### 🧪 Testes
- **Unitários**
  - [ ] Testes para novas entidades
  - [ ] Testes para use cases
  - [ ] Testes para repositories
- **Integração**
  - [ ] Testes de repositories com Prisma
  - [ ] Testes de controllers
- **E2E**
  - [ ] Fluxo básico de venda
  - [ ] Fluxo de gestão de estoque
  - [ ] Fluxo de relatórios

## 🚀 Ideias de Longo Prazo

- **NotaFiscal**
  Acredito que vamos deixar notas fiscais pra um futuro não muito distante.

## 💡 Ideias Aleatórias / Brainstorming
