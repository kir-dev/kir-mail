export class ResponseDto {
  constructor(
    private readonly status: number,
    private readonly message: string
  ) {}
}
