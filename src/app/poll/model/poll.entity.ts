import { DisplayProperty } from 'src/app/shared/class/display-property.class';

export class Poll {
    id: string;
    companyName: string;
    companyEIK: string;
    companyCityId: DisplayProperty;
    companyAddress: string;

    contactPerson: string;    
    contactPhone: string;
    contactEmail: string;
    companyKID: DisplayProperty;
    companySize: string;

    qualification1: string;
    secEduPos2: DisplayProperty[];
    highEduPos3: DisplayProperty[];
    secEduPosOccupiedByHighEdu4: number;
    highEduPosOccupiedBySecEdu4: number;
    haveVacantPos5: string;
    vacantPosSecEduCodes6: NKPDCount[];
    vacantPosHighEduCodes7: NKPDCount[];
    secEduPosInFiveYearsCodes8: NKPDCount[];
    highEduPosInFiveYearsCodes9: NKPDCount[];
    haveContactsWithEduInstitutions10: string;
    participationInExaminationCommittees11: boolean;
    curriculumDevelopmentInSecEdu11: boolean;
    haveInternship11: boolean;
    eduStandartDevelopment11: boolean;
    participationInOtherInitiatives11: boolean;
    secEduParticipationMajors11: string[];
    highEduParticipationMajors12: string[];
    participateDualEduMajors13: string[];
    dualEduCountPerYear14: number;
    ableDualEduMajors14: number;
    acceptInovations15: string;
    secEduTheory16: string;
    secEduPractive16: string;
    highEduTheory17: string;
    highEduPractice17: string;
    profEduCompliance18: string;
    modifyNKPDList19: string;
    notes: string;
}

export interface NKPDCount {
    nkpd: DisplayProperty,
    count: number
}
