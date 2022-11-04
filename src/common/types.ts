/* eslint-disable @typescript-eslint/no-explicit-any */
import { BPMNSchema } from '../type';
import { Element } from '../core';

export type DefineOption =
  | ({ xml: string } & Option)
  | ({ path: string } & Option)
  | ({ schema: BPMNSchema } & Option);

export type Metadata = {
  definition: { id?: string | symbol };
  process: Option | { id: string | symbol; name?: string };
};

export type ParamType = 'node' | 'token' | 'value';

export type NodeOption = { start?: boolean; end?: boolean };

export type Option = { id: string | symbol } | { name: string };

export type DataObject<T = any> = { next?: Element | Element[]; value?: T };
