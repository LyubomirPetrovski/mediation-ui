import { City } from 'src/app/poll/company-info/model/city.entity';
import { KID } from 'src/app/poll/company-info/model/company-KID.entity';
import { DocumentRef } from 'src/app/shared/entities/document-ref.entity';
import { DisplayProperty } from 'src/app/shared/class/display-property.class';

export interface CompanyFullData {
    id: string;
    bulstat: string;
    name: string;
    address: CompanyAddress;
    contact: CompanyContact;
    kidRef: DocumentRef;
    companySize: string;
    openPositions: OpenPosition[];

    city: City;
    kid: KID;
}

export interface CompanyAddress {
    cityId: number;
    address: string;
}

export interface CompanyContact {
    contactPerson: string;
    phone: string;
    eMail: string;
}

export enum CompanySizeEnum {
    Unknown = 0,

    Micro,
    Small,
    Average,
    Big
}

export interface OpenPosition {
    id: string;
    nkpd: DisplayProperty;
    deadline: string; // Date
    education: EducationEnum;
    count: number;
}

export enum EducationEnum {
    SecondaryEducation,
    HighEducation
}
