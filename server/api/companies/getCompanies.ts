import {H3Event} from "h3"
import {COMPANIES} from "~/server/constants/urls"
import {
    ErrorBody
} from "~/server/helpers/errorHelpers"

/**
 * /companies
 * Method: GET
 * Получение списка компаний
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const searchParams = new URLSearchParams(params);

    try {
        return await $fetch(`${COMPANIES}?per_page=5&${searchParams}`, {
            method: 'GET'
        })
    } catch (exception) {
        return {
            error: true,
            message: exception.message
        } as ErrorBody
    }
})