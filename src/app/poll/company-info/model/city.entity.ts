import { NomRef } from "src/app/shared/entities/nom-ref.entity";

export interface City {
    id: number,
    name: string,
    ekatte: string,
    cityKind: CityKind,
    region: NomRef,
    municipality: NomRef
}

export enum CityKind
{
    Unknown = 0,

    City,
    Village
}