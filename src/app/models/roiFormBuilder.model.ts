export interface RoiFormBuilderModel {
    inputGroups: InputGroupModel[]; 
    outputGroups: OutputGroupModel[];
}

export interface InputGroupModel {
    id: string;
    name: string;
    description: string;
    inputs: InputModel[];
}

export interface OutputGroupModel {
    id: string;
    name: string;
    description: string;
    categories: CategoryModel[];
}

export interface InputModel {
    inputId: string;
    categoryId: string;
    subCategoryId: string;
    sequence: number;
    question: string;
    inputType: InputTypeEnum;
    defaultValue: string;
    inputOptions: InputOptionModel[];
    inputFormat: InputFormatEnum;
    criteria: CriteriaModel[];
}

export interface CategoryModel {
    id: string;
    groupId: string;
    name: string;    
    sequence: string;
    costType: CostTypeEnum;
    analyticsImpact: BooleanEnum;
    frequency: FrequencyEnum;
    calculation: string;
    outputFormat : string;
}

export interface InputOptionModel {
    value: string;
}

export interface CriteriaModel {
    inputId: string;
    inputValue: string;
}

export enum InputTypeEnum {
    "radio" = "radio",
    "text" = "text"
}

export enum InputFormatEnum {
    "numeric-decimal-$" = "numeric-decimal-$",
    "numeric-decimal" = "numeric-decimal",
    "numeric" = "numeric",
    "pl-yes-no" = "pl-yes-no",
    "percentage" = "percentage",
    "percentage-00.000" = "percentage-00.000"
}

export enum FrequencyEnum {
    AnnualRecurring = "Annual Recurring",
    Year1Only ="Year 1 Only"
}

export enum CostTypeEnum {
    HardCosts = "HardCosts",
    SoftCosts = "SoftCosts"
}

export enum BooleanEnum {
    Yes = "true",
    No = "false",
    True = "true",
    False = 'false'
}
