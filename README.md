# :construction: Projeto Trybe Futebol Clube :construction:
O projeto Trybe Futebol Clube é um backend dockerizado desenvolvido como parte do módulo de backend do curso da Trybe. O objetivo principal é construir uma API utilizando modelagem de dados através do Sequelize, um ORM (Object-Relational Mapping), e garantir que ela respeite as regras de negócio fornecidas no projeto.

Aqui está uma visão geral do projeto e seus requisitos:

1. **ORM e Modelagem de Dados**:
   - Utilização do Sequelize para realizar operações em um banco de dados relacional.
   - Desenvolvimento de models e migrations para representar as tabelas do banco de dados, como times, pessoas usuárias e partidas.

2. **API Backend**:
   - Construção de uma API RESTful com endpoints para manipular os recursos do sistema, como times, partidas e autenticação de usuários.
   - Desenvolvimento de middleware para validação de tokens de autenticação.

3. **Docker e Docker Compose**:
   - Utilização de containers para isolar e executar as aplicações em diferentes ambientes.
   - Configuração do Docker Compose para gerenciar múltiplos containers e definir a comunicação entre eles.

4. **Testes (TDD)**:
   - Desenvolvimento de testes automatizados utilizando a técnica de Desenvolvimento Orientado a Testes (TDD) para garantir a qualidade e cobertura do código.
   - Cobertura mínima de testes para diferentes partes do projeto, incluindo endpoints, models e middleware.

5. **Segurança e Autenticação**:
   - Implementação de endpoints para autenticação de usuários, permitindo acesso seguro aos recursos da API.
   - Validação de dados de entrada para prevenir ataques de segurança, como SQL Injection e Cross-Site Scripting (XSS).

6. **Requisitos de Negócio**:
   - Desenvolvimento de funcionalidades conforme as regras de negócio estabelecidas, como listar times, realizar login de usuários, cadastrar partidas e gerar classificações dos times.

7. **Soft Skills**:
   - Aplicação de habilidades de resolução de problemas, comunicação e organização aliado ao gerenciamento de tempo.

