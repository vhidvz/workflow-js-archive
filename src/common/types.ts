import { BPMNSchema } from '../type';

export type Params = { id: string | symbol } | { name: string };
export type Options = ({ path: string } & Params) | ({ schema: BPMNSchema } & Params);

export type Args = 'Event' | 'Activity' | 'Gateway' | 'Token' | 'Data' | 'Value';

export type Metadata = {
  definition: { id: string | symbol };
  process: { id: string | symbol; name: string };
};
