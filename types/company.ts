export type Tag = {
    id: number,
    title: string
}

export type Company = {
    picture: string,
    title: string,
    description_full: string,
    industries: Tag[]
}

export type Option = {
    id: number,
    title: string,
    isActive: boolean
}

export type Definition = {
    Industry: Industry[],
    IndustryGroup: IBranch[],
    CompanySpecialization: CompanySpecialization[],
    CompanySpecializationGroup: IBranch[]
}

interface IBranch extends Option {
    "ident": string,
    "icon": string
}

export interface Industry extends IBranch {
    "industry_group_id": number,
    "industryGroup": IBranch
}

export type IndustryGroup ={
    "id": number,
    "ident": string,
    "title": string,
    "icon": string
}

export interface CompanySpecialization extends IBranch {
    "company_specialization_group_id": 1,
    "companySpecializationGroup": IBranch
}

export type FilterParameter = {
    string: string
}

export type DataFetcher = {
    data: Ref<any>
    pending: Ref<boolean>
}