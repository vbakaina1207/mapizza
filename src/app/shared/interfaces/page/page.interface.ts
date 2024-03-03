export interface IPageRequest {
    page: number;
}

export interface IPageResponse extends IPageRequest {
    id: number | string;
}
