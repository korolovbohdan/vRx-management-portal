export class Finding {
  constructor(
    readonly id: string,
    readonly assetId: string,
    readonly severity: string,
    readonly title: string,
    readonly status: string
  ) {
  }
}
