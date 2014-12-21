#Hackers Wars

An Ogame like with hackers !

# API usage

Post request data are explained in the post parameters section of this readme.

### Users

| HTTP verb | Route                             | Explanation                                    | Logged |
|:----------|:----------------------------------|:-----------------------------------------------|:------:|
| POST      | /users/team                       | Post the team of the logged user               | Yes    |
| POST      | /users/bitcoins                   | Post the bitcoins amount of the logged user    | Yes    |
| GET       | /api/users/login/google           | Log a user with is google account              | No     |
| GET       | /api/users/logout                 | Logout a user                                  | Yes    |
| GET       | /api/users/infos                  | Get all the info for the logged user           | Yes    |

###Building

| HTTP verb | Route                               | Explanation                                    | Logged |
|:----------|:------------------------------------|:-----------------------------------------------|:------:|
| POST      | /api/building/:id/upgrade           | Upgrade a user's building                      | Yes    |
| POST      | /api/building/:id/units             | Add a unit to a user's building                | Yes    |
| GET       | /api/building                       | Get all building of a user                     | Yes    |
| GET       | /api/building/:id                   | Get a building infos                           | Yes    |
| PUT       | /api/building/:id                   | modify a user's building                       | Yes    |

Put Building Parameters:
- `(array)` **building** *an array with all building parameters*
	- `(string)` **id_user** *a valid user ID*
	- `(string)` **type** *a valid building type*
	- `(int)` **level** *level of the building*
	- `(int)` **units** *number of units*
