// Define an interface representing objects with string keys and any values
interface Obj {
  [key: string]: any;
}

// Define a generic interface representing a use case
export interface IUseCase<T extends Obj | string = any, TRes = any> {
  // Define a method 'execute' which takes parameters of type T and returns a Promise of type TRes
  execute: (params: T) => Promise<TRes>;
}
