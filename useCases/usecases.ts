abstract class UseCase<T, U> {
  abstract execute(request: T): Promise<U>;
}
  
export { UseCase };
