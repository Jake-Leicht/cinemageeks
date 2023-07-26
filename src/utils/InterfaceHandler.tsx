export interface FilterInterface{
    id: number;
    genre?: string;
    filmType?: string;
    year?: string;
    hideNullImg?: boolean;
}

export interface MovieInterface{
    id: number;
    key: number;
    cast: string[];
    directors: string[];
    genres: string[];
    rating: number;
    overview: string;
    runtime: number;
    title: string;
    filmType: string;
    year: number;
    cover: string;
}

export interface PurchaseInterface{
    id: number;
    cost?: number;
    quantity?: number;
    movie?: MovieInterface;
    rent?: boolean;
    buy?: boolean;
    movieQuality?: string;
    setQuantity?: () => void;
}

export interface TransactionsInterface{
    id: string;
    userEmail: string;
    transaction: any;
    dateOrdered: Date;
}