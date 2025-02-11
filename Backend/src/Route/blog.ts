import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string   // did this so that my prisma cliet will stop compalining 
        JWT_SECRET: string
    },
    Variables: {
        UserId: any // giving email varialbe string to use so that in middle ware we can set the string 
    }
}>();


// so now here we have to authinticate our application also 
// so the way to use the authincation in hono to use the app.use
app.use('/*', async (c, next) => {
    try {
        const header = c.req.header("Authorization") || "";

        // Extract the token from the header
        const token = header.split(" ")[1];

        // If no token is provided, throw an error
        if (!token) {
            throw new Error("Authorization token is missing");
        }

        // Verify the token
        const response = await verify(token, c.env.JWT_SECRET);

        // If the token is invalid or doesn't contain an ID, throw an error
        if (!response.id) {
            throw new Error("Invalid token: ID is not defined");
        }

        // Set the user ID in the context
        c.set("UserId", response.id);

        // Proceed to the next middleware or route handler
        await next();
    } catch (err) {
        // Handle the error and return a response
        return c.json({
            message: "Token expired or invalid user",
            error: err 
        }, 500); 
    }
});


app.post('/', async (c) => {
    // so posting the blog require the userid as the authorId foregin key 
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json(); //contain the title and contents

        if (!body.title || !body.content) {
            return c.json({
                message: "not valid input"
            }, 403)
        }
        const authorId = c.get("UserId")
        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        });
        // so now here returing the response
        await prisma.$disconnect();

        return c.json({
            id: response.id,
            message: "blog posted succesfully"
        }, 201)
    }
    catch (err) {
        return c.json({
            message: "something went wrong or title already exits",
            error: err
        }, 500)
    }
});

// this should be before the /:id request other wise request will go to 
// the /:id then 
app.get('/Bulk', async (c) => {
    try {
        // so we have to fetch the all user here 
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const response = await prisma.post.findMany({
            select: {
                id: true,
                time: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        await prisma.$disconnect();

        return c.json(response, 200);
    }
    catch (err) {
        return c.json({
            message: "something went wrong",
            error: err
        }, 500)
    }
});

app.get('/:id', async (c) => {
    try {
        const querry = c.req.param("id");
        if (!querry) {
            return c.json({
                message: "please give the id"
            }, 403)
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const response = await prisma.post.findUniqueOrThrow({
            where: {
                id: Number(querry)
            },
            select: {
                id: true,
                time: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        await prisma.$disconnect();

        return c.json({
            id:response.id,
            title: response.title,
            time: response.time,
            content: response.content,
            author : {
                name : response.author.name
            }
        }, 200)
    }
    catch (err) {
        return c.json({
            message: "something went wrong please provide correct input",
            error: err
        }, 500)
    }
});


app.put('/blog', async (c) => {
    try {
        const body = await c.req.json();
        if (!body.id || !body.title || !body.content) {
            return c.json({
                message: "send the valid inputs"
            }, 403)
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const response = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        await prisma.$disconnect();

        return c.json({
            message: "updated succesfully",
            id: response.id,
            title: response.title
        }, 201)

    }
    catch (err) {
        return c.json({
            message: "something went wrong",
            error: err
        }, 500)
    }
});

app.delete('/', async (c) => {
    try {
        // so this will expect the id email and password also in the input so now here 
        const body = await c.req.json();
        if (!body.password || !body.email || !body.id) {
            return c.json({
                message: "inputs are missing"
            }, 403);
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const response = await prisma.post.delete({
            where: {
                id: body.id,
                author: {
                    email: body.email,
                    password: body.password
                }
            }
        });

        await prisma.$disconnect();
        return c.json({
            message: "post deleted succefully",
            id: response.id
        }, 200)

    }
    catch (err) {
        return c.json({
            message: "something went wrong",
            error: err
        }, 500);
    }
})
export default app;