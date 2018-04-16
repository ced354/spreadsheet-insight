import { IWorksheet } from "./workbook";

export interface ChartParam{
    Sheet: IWorksheet;
    Type: number; // 1:basic, 2:pie, 3:wordcloud, 4:force
}