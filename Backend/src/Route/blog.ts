import { Hono } from "hono";
import { verify } from "hono/jwt";
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string   // did this so that my prisma cliet will stop compalining 
        JWT_SECRET : string
    },
    Variables : {
        email : string // giving email varialbe string to use so that in middle ware we can set the string 
    }
}>();


// so now here we have to authinticate our application also 
// so the way to use the authincation in hono to use the app.use
app.use('/*' , async(c , next) => {
    // so now veryfying the logic here 
    try{
        const header = c.req.header("Authorization") || "";
        // as the header will be with bearer and then the actual token so for that 
        const token = header.split(" ")[1]; 

        const respone = await verify(token , c.env.JWT_SECRET);
        // so now we assing them with the id 
        if(!respone.id){
            return c.json({
                message : "id is not defined"
            },403)
        }
        c.set("email", respone.id);
        await next(); // next call

    }
    catch(err){
        return c.json({
            message : "token experid or invalid user",
            error : err
        },500)
    }
})


app.post('/blog', async (c) => {
    return c.json({
        message: "hello from post blog"
    });
});


app.put('/blog', async (c) => {
    return c.json({
        message: "hello from put blog"
    });
});


app.get('/blog/:id', async (c) => {
    return c.json({
        message: "hello from get:id"
    });
});

export default app;