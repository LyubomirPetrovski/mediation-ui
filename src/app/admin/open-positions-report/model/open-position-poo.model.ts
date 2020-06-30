import { MonikerRef } from 'src/app/shared/entities/moniker-ref.entity';

export interface OpenPositionPOO {
    id: string;
    position: string;
    company: MonikerRef;
    count: number;
    deadline: string;
    created: string;
    recomendedPОО: POORef[];
}

export interface POORef {
    id: string;
    code: string;
    name: string;
}
