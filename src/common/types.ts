import { BPMNSchema } from '../type';

export type DefineOption =
  | Option
  | ({ xml: string } & Option)
  | ({ path: string } & Option)
  | ({ schema: BPMNSchema } & Option);

export type Metadata = {
  definition: { id?: string | symbol };
  process: Option | { id: string | symbol; name?: string };
};

export type Option = { id: string | symbol } | { name: string };

export type NodeOption = { start?: boolean };

export type ParamType = 'node' | 'token' | 'value';
