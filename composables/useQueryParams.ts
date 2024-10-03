import {useRoute} from 'vue-router'

export function useUrlParams() {
    const route = useRoute()

    function getQueryParams() {
        let params = {}
        if (!route?.query) return params

        if (route.query?.specialization) {
            params = {
                specialization: route.query?.specialization
            }
            //specialization = route.query?.specialization
        }
        if (route.query?.industry) {
            params = {
                ...params,
                industry: route.query?.industry
            }
            //this.industry = this.$route.query?.industry
        }
        if (route.query?.search) {
            params = {
                ...params,
                search: route.query?.search
            }
            //this.search.value = this.$route.query?.search
        }
        if (route.query?.page) {
            params = {
                ...params,
                page: route.query?.page
            }
        }
        return params
    }

    return {
        getQueryParams
    }
}