import { Element } from './base';

export class Token {
  history: Element[] = [];

  push(el: Element): number {
    return this.history.push(el);
  }

  pop(): Element | undefined {
    return this.history.pop();
  }

  target(): Element {
    return this.history[this.history.length - 1];
  }

  constructor(token?: Partial<Token>) {
    if (token) Object.assign(this, token);
  }
}
