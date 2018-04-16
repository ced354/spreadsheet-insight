export interface IWorkbook{
    Sheets: IWorksheet[];
}

export interface IWorksheet{
    Name: string;
    Headers: string[];
    Values: any[];
}