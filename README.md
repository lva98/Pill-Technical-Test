## Teste técnico Pill

Esse é um projeto composto por dois sistemas `backend` e `frontend` que utilizam `http rest` para troca de mensagens. O `backend` é responsável por buscar um produto do banco de dados ou no site da drograria Drogasil. Já o `frontend` é composto por apenas uma página com as informações do produto desejado. O `backend` foi construído utilizando `Clean Architecture` baseado em alguns `Design Patters`, principalmente `Dependency Inversion`. Já o `frontend` busquei seguir as práticas que já seguia no `Vue`, segmentei os componentes de forma coerente e cliente `api rest` foi desaclopado da interface.

## Como executar

### Executar o projeto
1. `git clone https://github.com/lva98/Pill-Technical-Test`
2. `cd Pill-Technical-Test`
3. `docker-compose up`
2. Em um navegador acesse a página `localhost:5173?url=https://www.drogasil.com.br/sensodyne-creme-dental-medicinal-rapido-alivio-90g.html`. Caso deseje outro produto é só alterar o parâmetro `url`.
3. Ao acessar a página deverá informar as informações do produto `Sensodyne Creme Dental`. Caso algum erro aconteça será informado.

### Executar os testes
1. Os testes no `frontend` são executados pelo Cypress. Foram implementados 3 testes de integração: `Renders error when loaded withouth URL`, `Renders a valid product` e `Renders product not found`. Na página do projeto execute `pnpm cypress open`. No exemplo está sendo utilizado `pnpm` mas pode ser qualquer outro de sua preferencia.
2. No `backend` foram implementados 4 testes unitários todos relacionados com o caso de uso `find-a-product-by-url`, os testes são: `Should use cache instead scraping a new product`, `Should use scraping to find a pruduct and try to save`, `Should throws product not found exception when neither repository nor cache are returning an invalid product`, `Should throws invalid URL exception when URL is malformed`.  Como visto, os testes no `backend` foram focados na execução de regras de negócio, na página do projeto execute `pnpm jest`.

## Backend API

`GET /api/product?[url]`

```typescript
// Shape do objeto caso sucesso
interface  Product {
	name:  string,
	barcode:  string,
	pharmacyId:  number
	brand:  string,
	image:  string,
	price:  number,
	url:  string
}
```

```typescript
// Shape do objeto caso erro
interface  Erro {
	id:  string, // Identificador do erro
	type:  number, // Camada do backend que o erro foi disparado
	status:  number, // Http status code
	message:  string // Mensagem de erro
}
```

## Improvement list

- Backend better logging system
- Use sequelize migrations instead `.sync`
- When scraping check if the product is on a deal
- Improve scraping to be more fast when product not found
- 404 page
- .env for Backend and Frontend
- Frontend component tests
- Eslint
- Make scraping module with async worker queue