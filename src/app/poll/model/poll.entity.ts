import { DisplayProperty } from 'src/app/shared/class/display-property.class';

export class Poll {
    id: string;
    companyName: string;
    companyAddress: string;
    companyEIK: string;
    companyPhone: string;
    companyEmail: string;
    companyKID: DisplayProperty;
    companySize: string;

    qualification1: string;
    secEduPos2: DisplayProperty[];
    highEduPos3: DisplayProperty[];
    secEduPosOccupiedByHighEdu4: number;
    highEduPosOccupiedBySecEdu4: number;
    haveVacantPos5: string;
    vacantPosSecEduCount6: number;
    vacantPosSecEduCodes6: DisplayProperty[];
    vacantPosHighEduCount7: number;
    vacantPosHighEduCodes7: DisplayProperty[];
    secEduInFiveYearsCount8: number;
    secEduPosInFiveYearsCodes8: DisplayProperty[];
    highEduInFiveYearsCount9: number;
    highEduPosInFiveYearsCodes9: DisplayProperty[];
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
}
