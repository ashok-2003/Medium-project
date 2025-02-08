// careting the all api that our application will use 
import { Hono } from "hono";
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string   // did this so that my prisma cliet will stop compalining 
        JWT_SECRET : string
    }
}>(); // stored the api call for version 1 of my application

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'




app.post('/signin', async (c) => {
    try {
        // advoid gloabal variable in serverless articheture because function can run sepretatley also 
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();
        // pre checking 
        if(!body.email || !body.password){
            return c.json({
                message : "email and password required"
            },400);
        }
        const response = await prisma.user.findUniqueOrThrow({
            where : {
                email : body.email,
                password : body.password
            }
        });

        await prisma.$disconnect(); 
        // awaiting for disconnet to avaiod leak 

        // so giving the web token to them 
        const token = await sign({
            id : response.email
        } , c.env.JWT_SECRET) // it except first body as payload so that's why used this 

        // used thier email as the json web token colud use thier id if i want to but used this and we have to update 
        // thier json web token each time they signin or sing up or update thier passwrod 
        // if update their password re-direct then to the sign in page 

        
        // item can not be set on the server side you can set on the client side only 

        return c.json({
            message : "User found",
            user : response,
            token : token
        },200)
    }
    catch (err) {
        return c.json({
            message : "user not found",
            error : err
        },500)
    }

});


app.post('/signup', async (c) => {
    //wrapped all of this in the try cathc block
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();  // get all the body 
        if(!body.email || !body.name || !body.password){
            return c.json({
                message : "each field is required"
            }, 400);
        }

        const response = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password,
            }
        })

        // so giving the web token to them 
        const token = await sign({
            id : response.email
        } , c.env.JWT_SECRET) // it except first body as payload so that's why used this 


        await prisma.$disconnect(); 

        return c.json({
            message: "User created succesfully",
            user: response,
            token : token
        },201);
    }
    catch (err) {
        return c.json({
            message: "Error while singup",
            error: err,
        }, 500) // status code is send like that 
    }
});


// so now here we have to authinticate our application also 
// so the way to use the authincation in hono to use the app.use
app.use('/blog/*' , async(c , next) => {
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
