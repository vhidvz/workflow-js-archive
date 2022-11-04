/* eslint-disable @typescript-eslint/no-explicit-any */
import { Element, Attribute } from './base';
import { NodeOption } from '../common';

export type Sate<T = any> = Omit<Attribute, 'id' | 'name'> & {
  timestamp: number;
  value?: T;
  ref: Element;
} & NodeOption;

export class Token<T = any, K = any> {
  data?: T;
  ref?: Token<T, K>;
  history: Sate<K>[] = [];
  chields: Token<T, K>[] = [];

  new(): Token<T, K> {
    const token = new Token<T, K>({ ref: this });
    this.chields.push(token);
    return token;
  }

  pop(): Sate<K> | undefined {
    return this.history.pop();
  }

  push(node: Element, options: { value?: K; timestamp: number } & NodeOption) {
    this.history.push({ $: { ...node.$ }, ...options, ref: node });
  }

  get state(): Sate<K> {
    return this.history[this.history.length - 1];
  }

  constructor(token?: Partial<Token<T, K>>) {
    if (token) Object.assign(this, token);
  }
}
