// careting the all api that our application will use 
import { Hono } from "hono";
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string   // did this so that my prisma cliet will stop compalining 
    }
}>().basePath('api/v1'); // stored the api call for version 1 of my application

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



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

        return c.json({
            message : "User found",
            user : response
        },200)
    }
    catch (err) {
        return c.json({
            message : "user not found",
            error : err
        },500)
    }

});


app.post('/sigup', async (c) => {
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

        await prisma.$disconnect(); 

        return c.json({
            message: "User created succesfully",
            user: response
        },201);
    }
    catch (err) {
        return c.json({
            message: "Error while singup",
            error: err
        }, 500) // status code is send like that 
    }
});


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
