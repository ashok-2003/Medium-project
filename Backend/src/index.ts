import { Hono } from 'hono'
import UserRoute from './user'; // improting all my routes to use in the this file
import BlogRoute from './blog';


const app = new Hono()

app.route('/api/v1/user' , UserRoute); // routed all the api/v1/user calls to user.ts
app.route('/api/v1/blog' , BlogRoute); // routed all the api/v1/blog calls to the blog.ts

app.get('/', (c) => {
  return c.text('Hello Hono! without any route')
})

export default app
