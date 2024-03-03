// export interface INewsInfoRequest {
//     news: [INewsAddResponse]
// }

// export interface INewsInfoResponse extends INewsInfoRequest {
//     id:  string;
// }

export interface INewsAddRequest { 
    title: string;
    description: string;
    imagePath: string;
    detail: [INewsDetailResponse]
    
}

export interface INewsAddResponse extends INewsAddRequest {
    id:  string;
}


export interface INewsDetailRequest {
    title: string;
    description: string;
    imagePath: string;
    detail: [INewsAddResponse]
}

export interface INewsDetailResponse extends INewsDetailRequest {
    id:  string;
}
