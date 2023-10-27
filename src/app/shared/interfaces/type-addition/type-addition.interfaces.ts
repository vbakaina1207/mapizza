export interface ITypeAdditionRequest {
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath: string;
    
}

export interface ITypeAdditionResponse extends ITypeAdditionRequest {
    id: string;
}
