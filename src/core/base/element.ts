export class Element {
  id: string = 'NOT_INITIALIZED';

  constructor(data?: Partial<Element>) {
    if (data) Object.assign(this, data);
  }
}
