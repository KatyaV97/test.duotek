import {ErrorAlert} from "~/types/triggers"

export default {
    name: 'Error',
    data() {
        return {
            errorAlert: {
                isShown: false,
                text: ''
            } as ErrorAlert,
            hasError: false as boolean,
        }
    },
    methods: {
        toggleErrorAlert(isShown: boolean, text: string): void {
            this.hasError = isShown
            this.errorAlert.isShown = isShown
            this.errorAlert.text = text
        },
        errorHandler(response: object): Promise<void | false>
            | boolean | void {
            if (response?.error && response.error) {
                if (this.hasError) return true
                this.hasError = true
                this.toggleErrorAlert(true, response.message)
                return true
            }
            return false
        },
    }
}