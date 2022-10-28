import { Element, Property } from './base';

export type Sate = Property & { timestamp: number; value?: unknown; ref: Element };

export class Token {
  ref?: Token;
  data: unknown = {};
  history: Sate[] = [];
  chields: Token[] = [];

  get state(): Sate {
    return this.history[this.history.length - 1];
  }

  new(): Token {
    const token = new Token({ ref: this });
    this.chields.push(token);
    return token;
  }

  pop(): Sate | void {
    return this.history.pop();
  }

  push(node: Element) {
    this.history.push({ $: { ...node.$ }, timestamp: Date.now(), ref: node });
  }

  constructor(token?: Partial<Token>) {
    if (token) Object.assign(this, token);
  }
}
