export class Element {
  name?: string;
  id = 'NOT_INITIALIZED';

  constructor(data?: Partial<Element>) {
    if (data) Object.assign(this, data);
  }
}
