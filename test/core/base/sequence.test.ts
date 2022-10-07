import { readFile, parse, BPMNSchema, Element, Sequence, processes } from '../../../src';

describe('test util functions', () => {
  let xml = '';
  let obj: BPMNSchema;

  it('should build sequence', () => {
    xml = readFile('./example/supplying-pizza.bpmn');
    obj = parse(xml);

    const process = processes(obj)[0];

    if (!process) throw null;

    process['bpmn:startEvent']?.map((el) => Element.build(el));
    process['bpmn:userTask']?.map((el) => Element.build(el));
    process['bpmn:serviceTask']?.map((el) => Element.build(el));
    process['bpmn:intermediateCatchEvent']?.map((el) => Element.build(el));
    process['bpmn:manualTask']?.map((el) => Element.build(el));
    process['bpmn:endEvent']?.map((el) => Element.build(el));
    process['bpmn:eventBasedGateway']?.map((el) => Element.build(el));

    process['bpmn:sequenceFlow']?.map((el) => Sequence.build(el));

    const endEvent = process['bpmn:endEvent']?.pop();
    const startEvent = process['bpmn:startEvent']?.pop();

    if (!endEvent || !startEvent) throw null;

    expect(endEvent).toBeDefined();
    expect(startEvent).toBeDefined();

    const targetRefs = Sequence.targets(endEvent.$.id);
    const sourceRefs = Sequence.sources(startEvent.$.id);

    expect(targetRefs.length).toBeGreaterThanOrEqual(1);
    expect(sourceRefs.length).toBeGreaterThanOrEqual(1);
  });
});
