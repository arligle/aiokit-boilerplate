/**
 * 推断泛型参数 T 是否为只读数组类型，并提取成员的类型进行判断
 * 不符合 string | number | symbol 的返回 never类型，表示不符合条件。
 */
export type ExtractArrayMembers<T> = T extends readonly (infer MemberType)[]
  ? MemberType
  : T extends string | number | symbol
  ? T
  : never;
