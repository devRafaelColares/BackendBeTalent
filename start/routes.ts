/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const CustomersController = () => import('#controllers/customers_controller')
const ProductController = () => import('#controllers/products_controller')
const SaleController = () => import('#controllers/sales_controller')
import router from '@adonisjs/core/services/router'
import Auth from '#middleware/auth'

const auth = new Auth().handle

router.get('/', async () => {
  return {
    hello: 'guy',
  }
})

router.post('/signup', [UsersController, 'signup'])
router.post('/login', [UsersController, 'login'])

router
  .group(() => {
    router.get('/products', [ProductController, 'index'])
    router.get('/products/:id', [ProductController, 'show'])

    router.get('/customers', [CustomersController, 'index'])

    router.get('/customers/:id', [CustomersController, 'show'])

    router.post('/customers', [CustomersController, 'store'])

    router.put('/customers/:id', [CustomersController, 'update'])

    router.delete('/customers/:id', [CustomersController, 'delete'])

    router.post('/sales', [SaleController, 'store'])

    router.post('/products', [ProductController, 'store'])
    router.put('/products/:id', [ProductController, 'update'])
    router.delete('/products/:id', [ProductController, 'delete'])
  })
  .use(auth)
