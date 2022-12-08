/* eslint-disable @typescript-eslint/no-explicit-any */
import { BPMNDefinition, BPMNSchema } from '../type';
import { Element } from '../core';

export type DefineOption =
  | ({ xml: string } & Option)
  | ({ path: string } & Option)
  | ({ schema: BPMNSchema } & Option);

export type DefinitionOption =
  | { xml: string }
  | { path: string }
  | { schema: BPMNDefinition };

export type NodeOption = {
  start?: true;
  end?: true;
  next?: 'auto';
};

export type Metadata = {
  definition: { id?: string | symbol };
  process: Option | { id: string | symbol; name?: string };
};

export type ParamType = 'node' | 'token' | 'value';

export type Option = { id: string | symbol } | { name: string };

export type DataObject<T = any> = {
  next?: Element | Element[];
  value?: T;
};
