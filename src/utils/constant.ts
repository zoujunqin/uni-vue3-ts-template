// @ts-nocheck
import { snakeCase } from 'lodash';

/**
 * @name 通过一个数组生成对象和数组
 * @param { list } 原始数组
 * @param { namespace } 对象前缀
 * @param { key } 用数组的字段名称作为对象的key
 * @param { keyAlias } 作为key的补充
 * @eg  const {
          EXAMPLE_STATS,
          EXAMPLE_STATUUS_MAP,
          EXAMPLE_STATUS_LIST,
        } = defineConstants(
          [
            { key: '1', label: '测试数据1' },
            { key: '2', label: '测试数据2' },
            { key: '3', label: '测试数据3' },
            { key: '4', label: '测试数据4' },
          ] as const,
          'EXAMPLE_STATUS',
        );
 *
 */

export function defineConstants<
  T extends ReadonlyArray<Record<PropertyKey, unknown>>,
  N extends string,
  K extends keyof T[number] = 'key',
  KA extends keyof T[number] = K
>(list: T, namespace: N, key: K = 'key' as K, keyAlias?: KA) {
  const prefix = namespace ? `${namespace}_` : '';
  if (!keyAlias) {
    keyAlias = key as unknown as KA;
  }
  return {
    [namespace]: list.reduce(
      (obj, item) => ({
        ...obj,
        [snakeCase(item[keyAlias] as string).toUpperCase()]: item[key]
      }),
      {}
    ),
    [`${prefix}MAP`]: list.reduce(
      (obj, item) => ({
        ...obj,
        [item[key] as string]: item
      }),
      {}
    ),
    [`${prefix}LIST`]: list
  } as MergeIntersection<
    {
      [Key in N]: ToKeyValue<T, K, KA>;
    } & {
      [Key in ToProperty<'MAP', N>]: ToKeyMap<T, K>;
    } & {
      [Key in ToProperty<'LIST', N>]: T;
    }
  >;
}

type StringUppercaseSnakeCase<
  T extends string,
  ACC extends string = ''
> = T extends `${infer F}${infer REST}`
  ? Uppercase<F> extends F
    ? F extends '_'
      ? StringUppercaseSnakeCase<REST, `${ACC}${F}`>
      : StringUppercaseSnakeCase<
          REST,
          ACC extends ''
            ? F
            : Lowercase<ACC> extends ACC
              ? `${ACC}${F}`
              : `${ACC}_${F}`
        >
    : StringUppercaseSnakeCase<REST, `${ACC}${Uppercase<F>}`>
  : ACC;

type MergeIntersection<A> = A extends infer T
  ? { [Key in keyof T]: T[Key] }
  : never;

type ToSingleKeyValue<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
  KA extends keyof T = never
> = T extends {
  readonly [Z in K]: infer F;
}
  ? F extends PropertyKey
    ? {
        readonly [Key in StringUppercaseSnakeCase<
          KA extends never ? F : T[KA]
        >]: T[K];
      }
    : never
  : never;

type ToPropertyPrefix<N extends string = ''> = N extends '' ? '' : `${N}_`;

type ToKeyValue<
  T extends ReadonlyArray<Record<PropertyKey, any>>,
  K extends keyof T[number],
  KA extends keyof T[number] = never
> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyValue<A, K, KA>
    : MergeIntersection<ToSingleKeyValue<A, K, KA> & ToKeyValue<B, K, KA>>
  : [];

type ToProperty<
  Property extends string,
  N extends string = ''
> = `${ToPropertyPrefix<N>}${Property}`;

type ToSingleKeyMap<
  T extends Record<PropertyKey, any>,
  K extends keyof T
> = T extends {
  readonly [Z in K]: infer F;
}
  ? K extends PropertyKey
    ? F extends PropertyKey
      ? {
          readonly [Key in F]: T;
        }
      : never
    : never
  : never;

type ToKeyMap<
  T extends Readonly<Record<PropertyKey, any>[]>,
  K extends keyof T[number]
> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyMap<A, K>
    : MergeIntersection<ToSingleKeyMap<A, K> & ToKeyMap<B, K>>
  : [];
