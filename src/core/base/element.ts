export class Element {
  id = 'NOT_INITIALIZED';
  name?: string;

  constructor(data?: Partial<Element>) {
    if (data) Object.assign(this, data);
  }
}
