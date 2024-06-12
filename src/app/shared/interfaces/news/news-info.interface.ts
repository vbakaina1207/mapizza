

export interface INewsAddRequest { 
    title: string;
    description: string;
    imagePath: string;
    detail: INewsDetailResponse[]
    
}

export interface INewsAddResponse extends INewsAddRequest {
    id:  string | number;
}


export interface INewsDetailRequest {
    title: string;
    description: string;
    imagePath: string;
    detail: INewsAddResponse
}

export interface INewsDetailResponse extends INewsDetailRequest {
    id:  string;
}
