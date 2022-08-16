# Medicar
Desafio prático da [Intmed](https://intmed.com.br/) de uma aplicação front end de agendamento de consultas, utilizando ReactJS.

[Link do desafio](https://github.com/Intmed-Software/desafio/tree/master/frontend)

## Requisitos [(Fluxo)](https://github.com/Intmed-Software/desafio/tree/master/frontend#fluxo-na-marca%C3%A7%C3%A3o-de-consultas)
- [x] O paciente escolhe a especialidade desejada para a consulta (ex: Dermatologista);
- [x] Com isso, deverão aparecer todos os médicos da especialidade escolhida para que o paciente possa selecionar;
- [x] Uma vez escolhido o médico desejado, deverão aparecer os dias em que o médico está disponível para realizar uma consulta;
- [x] o selecionar um dia específico, deverão aparecer os horário disponíveis do médico para a data escolhida;
- [x] Ao final deste processo, o paciente poderá confirmar a marcação da consulta e voltar para a tela de listagem.

## Tecnologias 

### Principais tecnologias ultilizadas
- **React** (Biblioteca JavaScript utilizado para criar a **interface** da aplicação);
- **React Hook Form** (Utilizado para criar formulários com **componentes não controlados**);
- **Redux** (Utilizada para gerenciar o **estado** da aplicação);
- **Redux Toolkit** (Kit de ferramentas do **Redux**);
- **Testing Library** (Utilitário de **testes**);
- **Mirage JS** (Biblioteca de simulação de api utilizada para **simular o back end**);
- **Styled-Components** (Biblioteca de **estilização**);
- **Typescript** (Superset que adiciona **tipagem estática** no JavaScript);
- **Yup** (Construtor de esquema JavaScript utilizado para **análise e validação** de formulários).
 
### Possíveis melhorias
- [ ] Escrever testes E2E utilizando alguma biblioteca/framework (como o [Cypress](https://www.cypress.io/)).
- [ ] Adicionar gatilhos do Git para análise de código e execução de testes utilizando alguma biblioteca (como o [Husky](https://typicode.github.io/husky/#/)).
 
## Rodando a aplicação front end

[Instruções](https://github.com/randersonlessa/medicar/blob/master/frontend/README.md)