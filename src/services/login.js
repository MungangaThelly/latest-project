export const login = async (username, password) => {
    try {
        const response = await fetch("https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        });

        return response;
    } catch(e) {
        throw new Error(e);
    }
}
