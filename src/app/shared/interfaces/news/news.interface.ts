import { IPageResponse } from "../page/page.interface";
import { INewsAddResponse } from "./news-info.interface";

export interface INewsRequest {
    page: IPageResponse;
    name: string;
    path: string;
    description: string;
    imagePath: string;
    detail:INewsAddResponse[]
}

export interface INewsResponse extends INewsRequest {
    id:  string | number;
}
