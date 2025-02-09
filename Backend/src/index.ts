import { Hono } from 'hono'
import UserRoute from './Route/user'; // improting all my routes to use in the this file
import BlogRoute from './Route/blog';
import {cors} from'hono/cors'


const app = new Hono()

app.use('/*' , cors()); // cors 
app.route('/api/v1/user' , UserRoute); // routed all the api/v1/user calls to user.ts
app.route('/api/v1/blog' , BlogRoute); // routed all the api/v1/blog calls to the blog.ts

app.get('/', (c) => {
  return c.text('Hello Hono! without any route')
})

export default app
