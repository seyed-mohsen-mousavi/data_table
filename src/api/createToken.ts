type LoginPayload = {
    username: string;
    password: string;
};

type TokenResponse = {
    accessToken: string;
    refreshToken: string;
    role: "admin" | "user";
};

const fakeUsers = [
    {
        username: "admin",
        password: "admin123",
        role: "admin" as const,
    },
    {
        username: "user",
        password: "user123",
        role: "user" as const,
    },
];

export async function createToken(username: string, password: string, payload: LoginPayload): Promise<TokenResponse> {
    const user = fakeUsers.find(
        (u) => u.username === payload.username && u.password === payload.password
    );

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user) {
                resolve({
                    accessToken: btoa(`${user.username}-access-token`),
                    refreshToken: btoa(`${user.username}-refresh-token`),
                    role: user.role,
                });
            } else {
                reject(new Error("نام کاربری یا رمز عبور اشتباه است"));
            }
        }, 1000);
    });
}
