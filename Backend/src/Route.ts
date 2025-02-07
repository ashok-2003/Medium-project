// careting the all api that our application will use 
import { Hono } from "hono";
const app = new Hono().basePath('api/v1'); // stored the api call for version 1 of my application

app.post('/signin' , async(c) => {
    return c.json({
        message : "hello from signin"
    });
});


app.post('/sigup' , async(c) => {
    return c.json({
        message : "hello from sigup"
    });
});


app.post('/blog' , async(c) => {
    return c.json({
        message : "hello from post blog"
    });
});


app.put('/blog' , async(c) => {
    return c.json({
        message : "hello from put blog"
    });
});


app.get('/blog/:id' , async(c) => {
    return c.json({
        message : "hello from get:id"
    });
});

export default app;
