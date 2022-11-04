import { readFile, parse, BPMNSchema } from '../src';

describe('test util functions', () => {
  let xml = '';
  let obj: BPMNSchema;

  it('should return parsed xml', () => {
    xml = readFile('./example/supplying-pizza.bpmn');

    expect(xml).toBeTruthy();

    obj = parse(xml);

    expect(obj).toMatchObject(expect.any);
  });
});
