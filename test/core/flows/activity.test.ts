import {
  readFile,
  parse,
  BPMNSchema,
  Element,
  Sequence,
  processes,
  FlowNode,
  ActivityNode,
  ActivityType,
  TaskType,
} from '../../../src';

describe('test util functions', () => {
  let xml = '';
  let obj: BPMNSchema;

  it('should build sequence', () => {
    xml = readFile('./example/supplying-pizza.bpmn');
    obj = parse(xml);

    const process = processes(obj)[1];

    if (!process) throw null;

    process['bpmn:startEvent']?.map((el) => Element.build(el));
    process['bpmn:userTask']?.map((el) => Element.build(el));
    process['bpmn:serviceTask']?.map((el) => Element.build(el));
    process['bpmn:intermediateCatchEvent']?.map((el) => Element.build(el));
    process['bpmn:manualTask']?.map((el) => Element.build(el));
    process['bpmn:endEvent']?.map((el) => Element.build(el));
    process['bpmn:parallelGateway']?.map((el) => Element.build(el));

    process['bpmn:sequenceFlow']?.map((el) => Sequence.build(el));

    process['bpmn:startEvent']?.map((el) => FlowNode.build(el));
    process['bpmn:userTask']?.map((el) => FlowNode.build(el));
    process['bpmn:serviceTask']?.map((el) => FlowNode.build(el));
    process['bpmn:intermediateCatchEvent']?.map((el) => FlowNode.build(el));
    process['bpmn:manualTask']?.map((el) => FlowNode.build(el));
    process['bpmn:endEvent']?.map((el) => FlowNode.build(el));
    process['bpmn:parallelGateway']?.map((el) => FlowNode.build(el));

    const activity = process['bpmn:userTask']?.map((el) =>
      ActivityNode.build(el, { type: ActivityType.Task, taskType: TaskType.User }),
    );

    expect(activity?.length).toBeGreaterThan(1);
  });
});
