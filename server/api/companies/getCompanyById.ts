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
    const params = getQuery(event)
    const companyId: string = params.companyId

    try {
        if (companyId) {
            return await $fetch(`${COMPANIES}info?id=${companyId}`, {
                method: 'GET'
            })
        }
    } catch (exception) {
        return {
            error: true,
            message: exception.message
        } as ErrorBody
    }
})