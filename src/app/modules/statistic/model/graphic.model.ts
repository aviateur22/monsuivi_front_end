
export class DoughnutData<T> {
  constructor(
    public readonly labels: string[],
    public readonly datasets: DoughnutDataset<T>[],
    public readonly message: string
  ){}
}

export class DoughnutDataset<T> {
  constructor(
      public readonly data: T[],
      public readonly backgroundColor: string[],
      public readonly hoverBackgroundColor: string[]
    ){}
}

export class StackedBarData<T> {
  constructor(
    public readonly labels: string[],
    public readonly datasets: StackedBarDataset<T>[],
    public readonly message: string
  ){}
}

export class StackedBarDataset<T>{
  constructor(
      public readonly type: string,
      public readonly label: string,
      public readonly backgroundColor: string,
      public readonly hoverBackgroundColor: string,
      public readonly data: T[]
    ){}
}


