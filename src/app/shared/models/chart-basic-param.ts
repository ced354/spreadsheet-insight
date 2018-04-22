export class ChartBasicParam{
    Base: IBaseColumn;
    Targets: ITargetAggregate[];
}

export interface IBaseColumn{
    Name: string;
    Sort: number; // 0:none. 1:asc, 2:desc
    Grouped: boolean;
}

export interface ITargetAggregate{
    Name: string;
    Aggregate: number; // 0:count, 1:sum, 2: ave, 3: min, 4:max
}