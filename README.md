create CRUD routes for a SQL database

Favorites table (array to string)
- id (generated primary key)
- type (string)
- options (array stringified before being sent to db)

Model
Services
Controller

req.params.id for direct link
req.query.type ?type= to call type(s) by name