/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'guy',
  }
})

router.post('/signup', [UsersController, 'signup'])

router.post('/login', [UsersController, 'login'])
