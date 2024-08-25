import {H3Event} from "h3"
import {DEFINITIONS} from "~/server/constants/urls"
import {
    ErrorBody
} from "~/server/helpers/errorHelpers"

/**
 * /definitions
 * Method: GET
 * Получение списка справочников
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    try {
        return await $fetch(DEFINITIONS, {
            method: 'GET'
        })
    } catch (exception) {
        return {
            error: true,
            message: exception.message
        } as ErrorBody
    }
})