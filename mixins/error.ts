import {ErrorAlert} from "~/types/triggers"

export default {
    name: 'Error',
    data() {
        return {
            errorAlert: {
                show: false,
                text: ''
            } as ErrorAlert,
            hasError: false as boolean,
        }
    },
    methods: {
        toggleErrorAlert(show: boolean, text: string): void {
            this.hasError = show
            this.errorAlert.show = show
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