import { Process as ProcessType } from '../type';
import { Token } from './token';

export class Process {
  token: Token[] = [];
  schema: ProcessType = { $_id: 'NOT_INITIALIZED', isExecutable: false };

  constructor(data?: Partial<Process>) {
    if (data) Object.assign(this, data);
  }
}
