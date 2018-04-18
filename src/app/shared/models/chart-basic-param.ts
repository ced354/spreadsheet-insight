export interface BaseColumn{
    Name: string;
    Sort: string; // 0:none. 1:asc, 2:desc
    Grouped: boolean;
}

export interface TargetColumn{
    Columns: TargetAggregate[];
}

export interface TargetAggregate{
    Name: string;
    Aggregate: number; // 0:count, 1:sum, 2: ave, 3: min, 4:max
}