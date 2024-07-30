# Documentação da Aplicação

## Descrição da Aplicação

Esta aplicação é um sistema de gerenciamento de vendas e clientes, desenvolvido para gerenciar e monitorar informações sobre clientes, produtos e vendas. A aplicação foi projetada para fornecer uma interface backend robusta que permite a gestão e a análise de dados relacionados às vendas e clientes.

## Subindo a Aplicação com Docker Compose

Para rodar a aplicação, você precisa ter o Docker e o Docker Compose instalados em sua máquina. Certifique-se de ter o `docker-compose.yml` na raiz do projeto e siga os passos abaixo:

1. Abra um terminal na raiz do projeto onde o `docker-compose.yml` está localizado.
2. Execute o comando:

    ```bash
    docker compose up -d
    ```

3. Isso criará e iniciará os containers para a aplicação backend e o banco de dados MySQL em segundo plano.
4. Para parar os containers, use o comando:

    ```bash
    docker compose down
    ```

## Configuração do Ambiente

O arquivo `.env` deve estar configurado com as seguintes variáveis:

- `TZ=UTC`
- `PORT=3333`
- `HOST=localhost`
- `LOG_LEVEL=info`
- `APP_KEY=qv_Db_fOJQes7NRpBjDNPMxm4b6i2Jok`
- `NODE_ENV=development`
- `DB_HOST=172.17.0.2`
- `DB_PORT=3306`
- `DB_USER=root`
- `DB_PASSWORD=123456`
- `DB_DATABASE=sales_management`
- `JWT_SECRET=my_super_secret`

## Detalhamento das Rotas

A aplicação backend expõe as seguintes rotas:

### Rotas de Clientes

- **GET /customers** - Lista todos os clientes cadastrados.
- **GET /customers/:id** - Detalha um cliente específico e suas vendas.
- **POST /customers** - Adiciona um novo cliente.
- **PUT /customers/:id** - Edita um cliente existente.
- **DELETE /customers/:id** - Exclui logicamente um cliente e suas vendas.

### Rotas de Produtos

- **GET /products** - Lista todos os produtos cadastrados.
- **GET /products/:id** - Detalha um produto específico.
- **POST /products** - Adiciona um novo produto.
- **PUT /products/:id** - Edita um produto existente.
- **DELETE /products/:id** - Exclui logicamente um produto.

### Rotas de Vendas

- **GET /sales** - Lista todas as vendas.
- **GET /sales/:id** - Detalha uma venda específica.
- **POST /sales** - Adiciona uma nova venda.
- **PUT /sales/:id** - Edita uma venda existente.
- **DELETE /sales/:id** - Exclui logicamente uma venda.

## Considerações Finais

Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente e que o Docker Compose está funcionando conforme esperado. Caso encontre problemas, verifique os logs dos containers e consulte a documentação do Docker e Docker Compose para mais detalhes.
