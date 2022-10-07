import { readFile, parse, collaborations, processes, BPMNSchema } from '../src';

describe('test util functions', () => {
  let xml = '';
  let obj: BPMNSchema;

  it('should return parsed xml', () => {
    xml = readFile('./example/supplying-pizza.bpmn');

    expect(xml).toBeTruthy();

    obj = parse(xml);

    expect(obj).toMatchObject(expect.any);
  });

  it('should find processes and collaborations', () => {
    const p = processes(obj);

    expect(p.length).toBeGreaterThan(1);

    const c = collaborations(obj);

    expect(c.length).toBeGreaterThan(1);
  });
});
