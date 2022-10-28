import { Metadata, NodeOption, Option, ParamType } from '../types';
import { NodeKey, ParamKey } from '../keys';
import { Token } from '../../core';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */

import 'reflect-metadata';

export function Param(type: ParamType) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const params = Reflect.getOwnMetadata(ParamKey, target, propertyKey) ?? [];

    params.splice(parameterIndex, type);

    Reflect.defineMetadata(ParamKey, params, target, propertyKey);
  };
}

export function Node(options: Option & NodeOption) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(NodeKey, options, target, propertyName);

    const method = descriptor.value!;
    descriptor.value = function ({ token, value }: { token: Token; value?: any }) {
      const params: ParamType[] = Reflect.getOwnMetadata(ParamKey, target, propertyName);

      if (params.length) {
        const args: any[] = [];

        if ('$__metadata__' in (this as any)) {
          const metadata = (this as any).$__metadata__ as Metadata;

          for (const param of params) {
            if (param === 'node') args.push(metadata);
            else if (param === 'token') args.push(token);
            else if (param === 'value') args.push(value);
            else args.push(undefined);
          }
        } else throw new Error('@DefineProcess decorator is required.');

        return method.call(this, ...args);
      }

      return method.call(this, ...arguments);
    };
  };
}
