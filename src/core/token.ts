import { FlowNode } from './flow-node';
import { Property } from './base';

export type History = (Property & { timestamp: number; ref: FlowNode })[];

export class Token {
  history: History = [];

  get node(): FlowNode {
    return this.history[this.history.length - 1];
  }

  prev(): FlowNode {
    return this.history.pop()?.ref ?? { $: { id: 'NOT_FOUND' } };
  }

  next(node: FlowNode) {
    this.history.push({ $: node.$, timestamp: Date.now(), ref: node });
  }

  copy(): Token {
    return new Token({ history: this.history.map((item) => ({ ...item })) });
  }

  constructor(token?: Partial<Token>) {
    if (token) Object.assign(this, token);
  }
}
