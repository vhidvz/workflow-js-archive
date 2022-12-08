/* eslint-disable @typescript-eslint/no-explicit-any */
import { Element, Attribute } from './base';
import { NodeOption } from '../common';

export type Sate<T = any> = Omit<Attribute, 'id' | 'name'> & {
  value?: T;
  ref: Element;
  finished?: boolean;
  reference?: string;
} & NodeOption;

export class Token<T = any, K = any> {
  data?: T;
  locked?: boolean;

  ref?: Token<T, K>;
  reference?: string;

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

  push(node: Element, options: { value?: K } & NodeOption) {
    this.history.push({ $: { ...node.$ }, ...options, ref: node });
  }

  get state(): Sate<K> | undefined {
    if (!this.chields.length) return this.history[this.history.length - 1];
  }

  constructor(token?: Partial<Token<T, K>>) {
    if (token) Object.assign(this, token);
  }
}
