import { Metadata, Option } from './common';
import { Token } from './core';

export * from './core';
export * from './type';
export * from './utils';
export * from './common';

export class WorkflowJS {
  $__metadata__!: Metadata;

  public run(options?: { node?: Option; value?: any; token?: Token }) {}
}
