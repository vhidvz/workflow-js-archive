import { readFile, parse, BPMNSchema, Element, processes } from '../../../src';

describe('test util functions', () => {
  let xml = '';
  let obj: BPMNSchema;

  it('should build element', () => {
    xml = readFile('./example/supplying-pizza.bpmn');
    obj = parse(xml);

    const process = processes(obj).pop();

    if (!process) throw null;

    const el = Element.build(process);
    expect(el).toBeDefined();
  });

  it('should find element', () => {
    const el = Element.find('Process_166h0sl');
    expect(el).toBeDefined();
  });
});
