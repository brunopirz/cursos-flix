# Cursos Flix

## Visão Geral
Cursos Flix é uma plataforma de streaming de cursos online inspirada na interface da Netflix, oferecendo acesso ilimitado a milhares de cursos por apenas R$ 47/mês. O foco está na experiência do usuário, segurança dos dados e conversão de visitantes em assinantes.

## Requisitos Técnicos
- **Frontend:** React.js, Tailwind CSS, React Router, Axios.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose.
- **Autenticação:** JWT.
- **Pagamento:** Integração com Stripe.
- **DevOps:** Docker e Docker Compose.

## Estrutura do Projeto

(Arquitetura disponível no arquivo Estrutura)


## Instalação e Execução

## Guia de Instalação Atualizado

```sudo apt update && upgrade -y```

# Instalando o Docker:

```curl -fsSL https://get.docker.com -o get-docker.sh```

```sudo sh get-docker.sh```

```sudo apt install docker-compose```

# Instalando MongoDB

```sudo apt-get install -y gnupg curl```

```curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor```

```echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list```

```sudo apt-get install -y mongodb-org```


1. Clone o repositório:
```bash```
```git clone https://github.com/brunopirz/cursos-flix.git```
```cd cursos-flix```

Configure as variáveis de ambiente:

No diretório backend, edite um arquivo .env com as variáveis necessárias.

Construa e inicie os contêineres:

```docker-compose up --build```

Acesse a plataforma:

Frontend: http://localhost:3000

Backend API: http://localhost:5000


Verifique os logs:

```docker logs -f cursos-flix-backend```
```docker logs -f cursos-flix-frontend```


Para parar os contêineres:

```docker-compose down```

Observações

Certifique-se de que o Docker e o Docker Compose estão instalados.

Substitua as variáveis no arquivo .env com os seus valores reais.

Verifique a documentação oficial do MongoDB e Stripe para mais detalhes sobre as configurações.


---

### **Conclusão**

As melhorias implementadas incluem:

1. **Validações robustas**:
   - Validação de campos no frontend e backend.
   - Verificação de formato de e-mail e senha forte.

2. **Segurança**:
   - Uso de helmet para proteger headers.
   - Validação de inputs para prevenir injeção de código.
   - Configurações de CORS seguras.

3. **Tratamento de erros**:
   - Middlewares para tratamento centralizado de erros.
   - Respostas personalizadas para erros comuns.

4. **DevOps**:
   - Otimização dos Dockerfiles.
   - Adição de health checks.
   - Melhorias na configuração de variáveis de ambiente.

5. **Documentação**:
   - Explicação detalhada de cada arquivo e funcionalidade.
   - Guia de instalação atualizado.

6. **UI/UX**:
   - Melhorias na interface do usuário.
   - Feedback visual para erros e sucesso.

7. **Comentários**:
   - Adição de comentários em todos os arquivos para facilitar a compreensão.

Espero que essas melhorias tenham ajudado a tornar o projeto mais robusto, seguro e fácil de manter! Se tiver mais alguma dúvida ou precisar de ajustes adicionais, estou à disposição. 🚀


### Pré-requisitos
- Docker
- Docker Compose

### Passo a Passo
1. Clone o repositório:
   ```bash```
   ```git clone https://github.com/seuusuario/cursos-flix.git```
   ```cd cursos-flix```

Configure as variáveis de ambiente:
No diretório backend, crie um arquivo .env (veja o exemplo acima).


Execute o Docker Compose:


```docker-compose up --build```


Acesse a plataforma:



Frontend: http://localhost:3000

Backend API: http://localhost:5000


Testes Automatizados
Para rodar testes (caso implementados), acesse o diretório backend e execute:

```npm run test```

Deploy em Produção
Configure as variáveis de ambiente adequadamente e utilize um serviço de hospedagem como AWS, Google Cloud ou Heroku. Utilize CI/CD (puros GitHub Actions, Jenkins, etc.) para pipeline de deploy.

Contato
Para dúvidas, entre em contato com a equipe de desenvolvimento.

Bom trabalho e vamos transformar o futuro com o Cursos Flix! 🚀


---

## Considerações Finais

- **Segurança:** Certifique-se de validar inputs, gerenciar segredos com segurança e utilizar análise estática de código.
- **DevOps:** Automatize testes e deployments com CI/CD.
- **Experiência do Usuário:** Revise periodicamente os fluxos para garantir uma interface intuitiva e responsiva.

Este é um ponto de partida que pode ser expandido conforme as necessidades do projeto. Fique à vontade para ajustar e melhorar cada módulo!

--- 

Qualquer dúvida ou necessidade de ajustes, estou à disposição. Bom desenvolvimento!
