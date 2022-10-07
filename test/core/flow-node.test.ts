import {
  readFile,
  parse,
  BPMNSchema,
  Element,
  Sequence,
  processes,
  FlowNode,
} from '../../src';

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

    const startEvent = process['bpmn:startEvent']?.map((el) => FlowNode.build(el)).pop();
    const endEvent = process['bpmn:endEvent']?.map((el) => FlowNode.build(el)).pop();

    if (!endEvent || !startEvent) throw null;

    expect(endEvent.outgoing.length).toBe(0);
    expect(endEvent.incoming[0]).toBeDefined();
    expect(endEvent.incoming.length).toBeGreaterThanOrEqual(1);

    expect(startEvent.incoming.length).toBe(0);
    expect(startEvent.outgoing[0]).toBeDefined();
    expect(startEvent.outgoing.length).toBeGreaterThanOrEqual(1);
  });
});
