import { prepareQueries, getRoute } from "./helpers/methods"

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
    }
]

export default {
    port: port,
    fetch(request) {
        let route = getRoute(request, routes)

        // default 404
        if (typeof route !== "object") {
            return route
        }

        request = prepareQueries(request)

        let res = route.handler(request)

        return new Response(typeof res === "string" ? res : JSON.stringify(res), {
            status: res.statusCode || 200
        })
    }
}
