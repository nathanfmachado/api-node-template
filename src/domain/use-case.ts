export interface UseCase<TRequest, TReply> {
  exec(requestObject: TRequest): Promise<TReply>;
}