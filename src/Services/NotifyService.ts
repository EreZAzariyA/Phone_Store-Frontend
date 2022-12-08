import { Notyf } from "notyf";

class NotifyService {

    private notification = new Notyf({ duration: 4000, position: { x: "center", y: "top" } });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        const message = this.getError(err);
        this.notification.error(message);
    }

    private getError(err: any): string {

        if(typeof err === "string") return err;

        if(typeof err.response?.data === "string") return err.response.data; // axios: 401, 403, 500

        if(Array.isArray(err.response?.data)) return err.response.data[0]; // axios: 400 - array of errors

        if(typeof err.message === "string") return err.message;

        return "Some error, please try again.";
    }

}

const notifyService = new NotifyService();

export default notifyService;