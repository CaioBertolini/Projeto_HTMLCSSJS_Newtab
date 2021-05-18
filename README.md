# Projeto Newtab HTML_CSS_JS

## O que sua aplicação faz

- Inclui transações de compra ou venda de mercadoria.
- Cria um extrato das transações incluídas. As transações são mostradas na ordem em que foram incluídas.
- Mostra o saldo final e destaca se houve lucro ou prejuízo.
- A aplicação é responsiva.
- Persistir as transações no Local Storage.
- Tem a opção de salvar os dados em um servidor.

## Outros requisitos
### HTML:

- As opções do campo “Tipo de transação” são: Compra e Venda.
- Caso não exista nenhuma transação cadastrada, adicione a mensagem “Nenhuma transação cadastrada.” na lista do Extrato.

### CSS:

- Testar em smartphones, tablets (modos portrait e landscape) e monitores a partir de 1024px até 1900px. (Através do inspecionar elemento no navegador)
- A fonte utilizada é a Lato.
- A largura máxima do conteúdo é 1100px.

### Javascript:

- Validar o formulário para que todos os campos sejam preenchidos.
- Adicionar uma máscara no campo “Valor” para que apenas números sejam preenchidos e com a formatação correta. (Padrão: 10,90)
- Ao adicionar uma nova transação, persistir no Local Storage e já atualizar a lista com o extrato. Atualizar também o cálculo apresentado.
- Ao clicar no link “Limpar dados”, apresentar uma mensagem de confirmação e em seguida apagar as informações, atualizando a lista.
- Ao clicar no link “Salvar no servidor”, você deve realizar uma chamada para a API do Airtable
