import server from "./burger"

let port = 3000
let routes = [
    {
        method: "GET",
        path: "/",
        handler: (request) => {
            return {
                statusCode: 200,
                message: "hello world",
                quires: request.quires
            }
        }
    },
    {
        method: "POST",
        path: "/",
        handler: (request) => {
            return {
                statusCode: 200,
                message: "hello world post",
                quires: request.quires
            }
        }
    }
]

server(port, routes)
