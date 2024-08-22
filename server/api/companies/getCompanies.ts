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
    try {
        if(params?.specializations && params?.industries && params?.search){
            return await $fetch(`${COMPANIES}?specializations=${params.specializations}&industries=${params.industries}&search=${params.search}`, {
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