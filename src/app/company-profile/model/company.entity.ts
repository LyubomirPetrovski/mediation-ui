import { CompanyAddress, CompanyContact, CompanySizeEnum, OpenPosition } from './company.dto';
import { DocumentRef } from 'src/app/shared/entities/document-ref.entity';
import { DisplayProperty } from 'src/app/shared/class/display-property.class';

export interface Company {
    id: string;
    bulstat: string;
    name: string;
    address: CompanyAddress;
    contact: CompanyContact;
    kidRef: DocumentRef;
    companySize: string;
    openPositions: OpenPosition[];
}
