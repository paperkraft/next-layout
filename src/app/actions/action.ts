"use server"
import { LANGUAGE_COOKIE } from "@/i18n/settings";
import { renderPug } from "@/lib/pug";
import { cookies } from "next/headers";

export async function switchLocaleAction(value: string) {
    cookies().set(LANGUAGE_COOKIE, value);
    return true
}

export const serverResponse = async () => {

    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
    }

    const html = renderPug(
        {
            templatePath: 'test.pug',
            options: {
                ...user,
            },
        }
    );
    return html
}