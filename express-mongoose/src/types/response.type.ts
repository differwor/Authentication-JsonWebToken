interface IResponse {
    status: "success" | "error" | "fail",
    code?: string, // define list error code corresponding to each error messages 
    message: string,
    data: any
}

export type {IResponse}