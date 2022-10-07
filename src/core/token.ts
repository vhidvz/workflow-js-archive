import { FlowNode } from './flow-node';
import { Property } from './base';

export type History = Property & { timestamp: number; ref: FlowNode };

export class Token {
  history: History[] = [];

  get node(): FlowNode {
    return this.history[this.history.length - 1].ref;
  }

  copy(): Token {
    return new Token({ history: this.history.map((item) => ({ ...item })) });
  }

  pop(): History | void {
    return this.history.pop();
  }

  push(node: FlowNode) {
    this.history.push({ $: { ...node.$ }, timestamp: Date.now(), ref: node });
  }

  constructor(token?: Partial<Token>) {
    if (token) Object.assign(this, token);
  }
}
