<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentação da Aplicação</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2 {
            color: #333;
        }
        pre {
            background-color: #f4f4f4;
            border-left: 3px solid #333;
            padding: 10px;
        }
        ul {
            list-style-type: none;
            padding-left: 0;
        }
        li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>Documentação da Aplicação</h1>

    <h2>Descrição da Aplicação</h2>
    <p>Esta aplicação é um sistema de gerenciamento de vendas e clientes, desenvolvido para gerenciar e monitorar informações sobre clientes, produtos e vendas. A aplicação foi projetada para fornecer uma interface backend robusta que permite a gestão e a análise de dados relacionados às vendas e clientes.</p>
    
    <h2>Subindo a Aplicação com Docker Compose</h2>
    <p>Para rodar a aplicação, você precisa ter o Docker e o Docker Compose instalados em sua máquina. Certifique-se de ter o <code>docker-compose.yml</code> na raiz do projeto e siga os passos abaixo:</p>

    <ol>
        <li>Abra um terminal na raiz do projeto onde o <code>docker-compose.yml</code> está localizado.</li>
        <li>Execute o comando:</li>
        <pre><code>docker compose up -d</code></pre>
        <li>Isso criará e iniciará os containers para a aplicação backend e o banco de dados MySQL em segundo plano.</li>
        <li>Para parar os containers, use o comando:</li>
        <pre><code>docker compose down</code></pre>
    </ol>

    <h2>Configuração do Ambiente</h2>
    <p>O <code>.env</code> deve estar configurado com as seguintes variáveis:</p>
    <ul>
        <li><code>TZ=UTC</code></li>
        <li><code>PORT=3333</code></li>
        <li><code>HOST=localhost</code></li>
        <li><code>LOG_LEVEL=info</code></li>
        <li><code>APP_KEY=qv_Db_fOJQes7NRpBjDNPMxm4b6i2Jok</code></li>
        <li><code>NODE_ENV=development</code></li>
        <li><code>DB_HOST=172.17.0.2</code></li>
        <li><code>DB_PORT=3306</code></li>
        <li><code>DB_USER=root</code></li>
        <li><code>DB_PASSWORD=123456</code></li>
        <li><code>DB_DATABASE=sales_management</code></li>
        <li><code>JWT_SECRET=my_super_secret</code></li>
    </ul>

    <h2>Detalhamento das Rotas</h2>
    <p>A aplicação backend expõe as seguintes rotas:</p>

    <h3>Rotas de Clientes</h3>
    <ul>
        <li><strong>GET /customers</strong> - Lista todos os clientes cadastrados.</li>
        <li><strong>GET /customers/:id</strong> - Detalha um cliente específico e suas vendas.</li>
        <li><strong>POST /customers</strong> - Adiciona um novo cliente.</li>
        <li><strong>PUT /customers/:id</strong> - Edita um cliente existente.</li>
        <li><strong>DELETE /customers/:id</strong> - Exclui logicamente um cliente e suas vendas.</li>
    </ul>

    <h3>Rotas de Produtos</h3>
    <ul>
        <li><strong>GET /products</strong> - Lista todos os produtos cadastrados.</li>
        <li><strong>GET /products/:id</strong> - Detalha um produto específico.</li>
        <li><strong>POST /products</strong> - Adiciona um novo produto.</li>
        <li><strong>PUT /products/:id</strong> - Edita um produto existente.</li>
        <li><strong>DELETE /products/:id</strong> - Exclui logicamente um produto.</li>
    </ul>

    <h3>Rotas de Vendas</h3>
    <ul>
        <li><strong>GET /sales</strong> - Lista todas as vendas.</li>
        <li><strong>GET /sales/:id</strong> - Detalha uma venda específica.</li>
        <li><strong>POST /sales</strong> - Adiciona uma nova venda.</li>
        <li><strong>PUT /sales/:id</strong> - Edita uma venda existente.</li>
        <li><strong>DELETE /sales/:id</strong> - Exclui logicamente uma venda.</li>
    </ul>

    <h2>Considerações Finais</h2>
    <p>Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente e que o Docker Compose está funcionando conforme esperado. Caso encontre problemas, verifique os logs dos containers e consulte a documentação do Docker e Docker Compose para mais detalhes.</p>
</body>
</html>
