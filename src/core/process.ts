import { ProcessType } from '../type';
import { toProcess } from '../utils';
import { Token } from './token';

export class Process {
  token: Token;
  schema: ProcessType;

  constructor(data: ProcessType, token?: Token) {
    this.schema = toProcess(data);
    this.token = new Token(token);
  }
}
