/**
 * Finds the route that matches the request.
 * @param {Request} request - the request object
 * @param {routes[]} routes - the array of routes
 * @returns {route | object} - the route that matches the request
 */
export function getRoute(request, routes) {
    let route = routes.find((route) => {
        return (
            route.path === new URL(request.url).pathname &&
            route.method.toLowerCase() === request.method.toLowerCase()
        )
    })

    // Find the 404 route
    if (typeof route === "undefined") {
        route = routes.find((route) => {
            return route.path === "/404"
        })

        if (typeof route === "undefined") {
            return new Response("404 not found", {
                status: 404
            })
        }
    }

    return route
}

/**
 * Takes in a request and returns a request object with the query parameters.
 * @param {Request} request - the request to parse
 * @returns {Request} - the request object with the query parameters
 */
export function prepareQueries(request) {
    let quires = {}
    for (let p of new URLSearchParams(new URL(request.url).search)) {
        quires[p[0]] = p[1]
    }
    request.quires = quires

    return request
}
