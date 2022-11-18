import { NodeOption, Option, ParamType } from '../types';
import { Process, Token } from '../../core';
import { NodeKey, ParamKey } from '../keys';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */

import 'reflect-metadata';

export type MethodOptions = { node: Option; token: Token; value?: any };

export function Param(type: ParamType) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const params = Reflect.getOwnMetadata(ParamKey, target, propertyKey) ?? [];

    params.unshift({ parameterIndex, type });

    Reflect.defineMetadata(ParamKey, params, target, propertyKey);
  };
}

export function Node(options: Option & NodeOption) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const nodes = Reflect.getOwnMetadata(NodeKey, target, '$__metadata__') ?? {};

    if ('name' in options) nodes[options.name] = { options, propertyName };
    else if ('id' in options) nodes[options.id] = { options, propertyName };

    Reflect.defineMetadata(NodeKey, nodes, target, '$__metadata__');

    const method = descriptor.value!;
    descriptor.value = function (
      process: Process,
      { node, token, value }: MethodOptions,
    ) {
      const params: { parameterIndex: number; type: ParamType }[] =
        Reflect.getOwnMetadata(ParamKey, target, propertyName);

      if (params.length) {
        const args: any[] = [];

        if ('$__metadata__' in (this as any)) {
          for (const param of params) {
            if (param.type === 'node') args.push(process.getNode(node));
            else if (param.type === 'token') args.push(token);
            else if (param.type === 'value') args.push(value);
            else throw new Error('Arguments type is not supported');
          }
        } else throw new Error('@DefineProcess decorator is required.');

        return method.call(this, ...args);
      }
    };
  };
}
