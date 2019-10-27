interface IError {
    value: string;
    msg: string;
    param: string;
    location: string;
}

class HttpError extends Error {
    public status: number;
    public errors: IError[];

    constructor(status: number, message: string, errors?: IError[]) {
        super(message);
        this.errors = errors;
        this.status = status;
        this.message = message;
    }
}

export default HttpError;
