export interface UseCaseBase<I, O>  {
    execute(input: I): Promise<O>
}