// types/next-auth.d.ts or src/types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
    interface User {
        username?: string;
        uid?: string | undefined | null;
    }

    interface Session {
        user: User;
    }
}
