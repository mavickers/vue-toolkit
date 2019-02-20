# async-validator

This is a validator class for Vue components facilitating attachment of a validator to a Vue field which gets executed asynchronously.

## Use Case

Let's say you want to write a validator for a field which makes sure the value entered in the field is unique in a table in the database. You'd like that validation to occur in the background, allowing the user to go about filling in the rest of the form while waiting to get an answer on that validation from the server.


