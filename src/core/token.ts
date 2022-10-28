import { Element, Attribute } from './base';

export type Sate = Attribute & { timestamp: number; value?: unknown; ref: Element };

export class Token {
  ref?: Token;
  data: unknown = {};
  history: Sate[] = [];
  chields: Token[] = [];

  new(): Token {
    const token = new Token({ ref: this });
    this.chields.push(token);
    return token;
  }

  pop(): Sate | undefined {
    return this.history.pop();
  }

  push(node: Element, value?: unknown, timestamp = Date.now()) {
    this.history.push({ $: { ...node.$ }, timestamp, value, ref: node });
  }

  constructor(token?: Partial<Token>) {
    if (token) Object.assign(this, token);
  }
}
