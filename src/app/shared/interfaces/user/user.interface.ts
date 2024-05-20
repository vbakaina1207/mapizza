

export interface IAddressRequest {
    typeAddress: string;
    city: string;
    street: string;
    house: string;
    entrance: number;
    floor: number;
    flat: number;
}

export interface IAddressResponse extends IAddressRequest {
    id: string;
}
