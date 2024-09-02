import { ExtractArrayMembers } from './extract-array-members.type';

type KeysOrListOfKeys<T> = keyof T | readonly (keyof T)[];

/**
 * 从对象中排除一些键
 */
export type ExcludeKeys<
  TObject,
  TKeys extends KeysOrListOfKeys<TObject>,
> = Omit<TObject, ExtractArrayMembers<TKeys>>;

/*
实际上就是利用omit类型，把TObject中的TKeys类型的属性排除掉。
并创建一个新的类型。
*/
