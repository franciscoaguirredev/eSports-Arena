import { EntityMetadata, Repository } from "typeorm"

export interface IHandleRespose {
    statusCode: number,
    message: string
    data : object | null | Array<any>
}

export interface IHandleError{
    message: string
    error: any
}