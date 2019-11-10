import { CompanyAddress, CompanyContact, CompanySizeEnum } from "./company.dto";
import { DocumentRef } from "src/app/shared/entities/document-ref.entity";

export interface Company {
    id: string;
    bulstat: string;
    name: string;
    address: CompanyAddress;
    contact: CompanyContact;
    kidRef: DocumentRef;
    companySize: string;
}