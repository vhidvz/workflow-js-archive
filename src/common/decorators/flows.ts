import {
  ActivityKey,
  ArgsKey,
  EventKey,
  GatewayKey,
  ProcessKey,
  StartEventKey,
} from '../keys';
import { Definition, EventType, GatewayType, TaskType } from '../../core';
import { Args, Metadata, Params } from '../types';

/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import 'reflect-metadata';

export function Arg(arg: Args) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const args: { [x: number]: Args }[] =
      Reflect.getOwnMetadata(ArgsKey, target, propertyKey) || [];
    args.push({ [parameterIndex]: arg });

    Reflect.defineMetadata(ArgsKey, args, target, propertyKey);
  };
}

export function DefineStart(params: Params) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(
      StartEventKey,
      { type: EventType.Start, params },
      target,
      propertyName,
    );

    const method = descriptor.value!;
    descriptor.value = function () {
      const parameters: any[] = [];
      const args: { [x: number]: Args }[] = Reflect.getOwnMetadata(
        ArgsKey,
        target,
        propertyName,
      );

      if (args) {
        const metadata: Metadata = Reflect.getOwnMetadata(ProcessKey, target);
        for (const arg in args) {
          if (['Event', 'Gateway', 'Activity'].includes(arg))
            parameters.push(Definition.getFlowNode(metadata, params));
          else if (arg === 'Token') parameters.push(target.$_token);
          else if (arg === 'Data') parameters.push(target.$_token.data);
          else if (arg === 'Value') parameters.push(target.$_token.state.value);
        }
      }

      return method.call(this, arguments, parameters);
    };
  };
}

export function DefineEvent(params: { type?: EventType } & Params) {
  return Reflect.metadata(EventKey, params);
}

export function DefineActivity(params: { type?: TaskType } & Params) {
  return Reflect.metadata(ActivityKey, params);
}

export function DefineGateway(params: { type?: GatewayType } & Params) {
  return Reflect.metadata(GatewayKey, params);
}
