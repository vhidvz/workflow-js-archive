export class Element {
  id = 'NOT_INITIALIZED';
  name?: string;

  static build(): Element {
    return new Element();
  }

  constructor(data?: Partial<Element>) {
    if (data) Object.assign(this, data);
  }
}
