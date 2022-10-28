/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Metadata, NodeKey, NodeOption, Option } from './common';
import { Token } from './core';

export * from './core';
export * from './type';
export * from './utils';
export * from './common';

export class WorkflowJS {
  $__metadata__!: Metadata;

  public run(options: { node: Option; token: Token; value?: unknown }) {
    const properties = Reflect.getMetadata(NodeKey, this, '$__metadata__');

    let property!: { options: Option & NodeOption; propertyName: string };
    if ('name' in options.node) property = properties[options.node.name];
    else if ('id' in options.node) property = properties[options.node.id];

    if (!property) throw new Error('Requested method not found');

    (this as any)[property.propertyName](options);
  }
}
