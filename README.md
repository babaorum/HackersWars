#Hackers Wars

An Ogame like with hackers !

# API usage

Post request data are explained in the post parameters section of this readme.

### Users

| HTTP verb | Route                             | Explanation                                    | Logged |
|:----------|:----------------------------------|:-----------------------------------------------|:------:|
| GET       | /api/users/login/google           | Log a user with is google account              | No     |
| GET       | /api/users/logout                 | Logout a user                                  | Yes    |
| GET       | /api/users/infos                  | Get all the info for the logged user           | Yes    |

###Building

| HTTP verb | Route                               | Explanation                                    | Logged |
|:----------|:------------------------------------|:-----------------------------------------------|:------:|
| POST      | /api/building                       | let a user buy a building                      | Yes    |
| GET       | /api/building                       | Get all building of a user                     | Yes    |
| GET       | /api/building/:id                   | Get a building infos                           | Yes    |
| PUT       | /api/building/:id                   | Upgrade a user's building                      | Yes    |

Post Building Parameters:
- `(array)` **building** *an array with all building parameters*
	- `(string)` **id_user** *a valid user ID*
	- `(string)` **type** *a valid building type*
	- `(int)` **quantity** *how many building of this type*
	- `(int)` **level** *level of the building*

Put Building Parameters:
- `(array)` **building** *an array with all building parameters*
	- `(string)` **id_user** *a valid user ID*
	- `(string)` **type** *a valid building type*
	- `(int)` **quantity** *how many building of this type*
	- `(int)` **level** *level of the building*

###Units

| HTTP verb | Route                               | Explanation                                    | Logged |
|:----------|:------------------------------------|:-----------------------------------------------|:------:|
| POST      | /api/units                          | let a user buy a unit                          | Yes    |
| GET       | /api/units                          | Get all units of a user                        | Yes    |
| GET       | /api/units/:id                      | Get a user's unit infos                        | Yes    |
| PUT       | /api/units/:id                      | Upgrade a user's unit                          | Yes    |

Post Units Parameters:
- `(array)` **units** *an array with all units parameters*
	- `(string)` **id_user** *a valid user ID*
	- `(string)` **type** *a valid unit type*
	- `(int)` **quantity** *how many units of this type*
	- `(int)` **level** *level of the unit*

Put Units Parameters:
- `(array)` **units** *an array with all units parameters*
	- `(string)` **id_user** *a valid user ID*
	- `(string)` **type** *a valid unit type*
	- `(int)` **quantity** *how many units of this type*
	- `(int)` **level** *level of the unit*
