# Rodando a aplicação

## Comandos

(Dentro de `frontend` folder)

- Utilize o `yarn install` para instalar as dependências da aplicação.
- Utilize o `yarn start` para iniciar a aplicação em desenvolvimento.
- Utilize o `yarn test` para rodar os testes da aplicação.
- Utilize o `yarn build` para rodar o build da aplicação.
- Utilize o `yarn eject` para "ejetar" a ferramenta de compilação da aplicação.

### Variáveis de ambiente
- `REACT_APP_API_URL` (Caso não haja api, não é necessário setar em ambiente de desenvolvimento. Padrão configurado para "http://localhost:3000").

## Servidor Mockado

A aplicação utiliza o [Miragejs](https://miragejs.com/) para simular a api do back end. Atualmente todas as chamadas estão configuradas para um delay de 2 segundos, você pode alterar isso em `src/mocks/Server/index.tsx`.

OBS: É importante destacar que o **Miragejs** não armazena os dados cadastrados, e quando houver um reload na página, os dados serão perdidos. Foi adicionado um ouvinte no JavaScript para avisar ao usuário que os dados dele serão perdidos caso ele continue com o refresh.

## Código

### Contexts
Atualmente os dados globais do estado do usuário são gerenciados pelo **Redux**, porém, há um **UserContext** criado para exemplo de uso, mas não configurado e usado na aplicação.

### Layout
Atualmente a aplicação dá suporte para dispositivos de até **320** sem quebra de layout.

OBS: É importante destacar que de laptops acima foi seguido o layout do [Link do Figma](https://www.figma.com/file/kJIvTRUJtKin3PFthaGXnj/Desafio-Full-Stack-Intmed-%E2%80%A2-2020?node-id=0%3A1), porém, para dispositivos menores foram realizadas algumas mudanças de layout.
