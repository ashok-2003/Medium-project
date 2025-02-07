import { Hono } from 'hono'
import RouteApp from './Route'; // improting all my routes to use in the this file

const app = new Hono()
app.route('/api/v1' , RouteApp);

app.get('/', (c) => {
  return c.text('Hello Hono! without any route')
})

export default app
