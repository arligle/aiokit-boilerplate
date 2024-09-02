/**
把泛型参数 T 生成一个新的对象，该对象的所有属性都是 never 类型。
示例：
type NeverT = {
  a: never;
  b: never;
};
*/
export type Never<T> = {
  [K in keyof T]: never;
};


