import {H3Event} from "h3"
import {COMPANIES} from "~/server/constants/urls"
import {
    ErrorBody
} from "~/server/helpers/errorHelpers"

/**
 * /companies/info
 * Method: GET
 * Получение информация о компании
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    try {
        return await $fetch(COMPANIES, {
            method: 'GET'
        })
    } catch (exception) {
        return {
            error: true,
            message: exception.message
        } as ErrorBody
    }
})