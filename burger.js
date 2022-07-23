import { getRoute, prepareQueries } from "./helpers/methods"

export default function server(port, routes) {
    console.log(`Server is running on port ${port}`)
    // eslint-disable-next-line no-undef
    Bun.serve({
        fetch(request) {
            let route = getRoute(request, routes)

            // default 404
            if (typeof route !== "object") {
                return route
            }

            console.log(typeof request.body)

            request = prepareQueries(request)

            let res = route.handler(request)

            return new Response(typeof res === "string" ? res : JSON.stringify(res), {
                status: res.statusCode || 200
            })
        },

        // baseURI: "http://localhost:3000",

        // this is called when fetch() throws or rejects
        // error(err: Error) {
        //   return new Response("uh oh! :(\n" + err.toString(), { status: 500 });
        // },

        // this boolean enables bun's default error handler
        // eslint-disable-next-line no-undef
        development: process.env.NODE_ENV !== "production",
        // note: this isn't node, but for compatibility bun supports process.env + more stuff in process

        // SSL is enabled if these two are set
        // certFile: './cert.pem',
        // keyFile: './key.pem',

        port: port // number or string
    })
}
