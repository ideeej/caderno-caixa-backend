# Caderno Caixa - Controle de Progresso

## 🔧 Value Objects (src/utils)

### CPF

- [x] Validação de CPF
- [x] Formatação automática
- [ ] Testes unitários

### CNPJ

- [x] Validação de CNPJ
- [x] Formatação automática
- [ ] Testes unitários

### Email

- [x] Validação de email
- [x] Normalização (trim, lowercase)
- [ ] Testes unitários

### PhoneNumber

- [x] Validação de telefone
- [x] Formatação padrão
- [ ] Testes unitários

### Address

- [x] Estrutura completa de endereço
- [x] Validações básicas
- [ ] Testes unitários

### Payment

- [x] Tipos de pagamento definidos
- [x] Estrutura básica
- [x] Integração com Sale
- [ ] Testes unitários

## 📦 ERP (src/modules/ERP)

### Product

- [x] Estrutura básica
- [x] Factory implementado
- [x] Refatorar Product para usar as classes Money e Barcode
- [ ] Testes unitários
- [ ] Use Cases
- [ ] Registrar um produto
- [ ] criar testes para o caso de uso RegisterProduct
- [ ] Verificar unicidade do código de barras no usecase
- [ ] Repository

### Catalog

- [x] Estrutura básica
- [x] CRUD produtos
- [x] Factory implementado
- [x] Testes implementados
- [ ] Repository
- [ ] Use Cases

### Inventory

- [x] Estrutura básica
- [x] Movimentações (Entrada/Saída)
- [x] Factory implementado
- [x] Testes implementados
- [ ] Repository
- [ ] Use Cases

### Operator

- [x] Estrutura básica
- [x] Factory implementado
- [ ] Factory para testes
- [ ] Testes unitários

### Client

- [x] Estrutura básica
- [x] Validações (CPF, Email, Phone)
- [ ] Factory para testes
- [ ] Testes unitários
- [ ] Repository
- [ ] Use Cases

### Company

- [x] Estrutura básica
- [x] Validações (CNPJ, Email, Phone)
- [ ] Factory para testes
- [ ] Testes unitários
- [ ] Repository
- [ ] Use Cases

### Supplier

- [x] Estrutura básica
- [x] Validações (CNPJ, Email, Phone)
- [ ] Factory para testes
- [ ] Testes unitários
- [ ] Repository
- [ ] Use Cases

## 💰 PDV (src/modules/PDV)

### CashRegister

- [x] Estrutura básica
- [x] Abertura/Fechamento
- [x] Factory implementado
- [x] Testes implementados
- [x] Repository definido
- [x] Use Cases implementados (open, close, deposit, withdraw)
- [ ] Revisão

### Sale

- [x] Estrutura básica
- [x] Estados da venda
- [x] Adição/Remoção de itens
- [x] Cálculo de totais
- [x] Factory implementado
- [x] Testes implementados
- [x] Cálculo de troco
- [x] Customer vinculado à venda (Client ou Company ou null)
- [ ] Desconto por item
- [ ] Desconto total
- [ ] Repository
- [ ] Use Cases

## 🔄 Integrações Pendentes

### Venda → Estoque

- [ ] Baixa automática no estoque
- [ ] Validação de disponibilidade
- [ ] Estorno em cancelamento

### Venda → Cliente

- [x] Vincular cliente à venda
- [ ] Histórico de compras por cliente

## 📊 Relatórios

- [ ] Vendas do dia
- [ ] Vendas por período
- [ ] Produtos mais vendidos
- [ ] Estoque atual
- [ ] Produtos em baixa
- [ ] Movimentações de caixa
- [ ] Fechamento do dia

## 🔐 Autenticação (já implementado)

- [x] Módulo de autenticação
- [x] Guards JWT
- [x] Estratégias de autenticação
- [x] Casos de uso de signin/validate
- [x] Testes implementados

## 🗄️ Infraestrutura

- [x] Configuração Prisma
- [x] Módulo de database
- [ ] Schemas para novas entidades
- [ ] Mappers para novas entidades
- [WIP] Repositories para novas entidades
