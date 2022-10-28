import { DefineProcess, EventNode, Node, Param, Token, WorkflowJS } from '../src';

@DefineProcess({
  id: 'Process_166h0sl',
  path: './example/supplying-pizza.bpmn',
})
class PizzaCustomer extends WorkflowJS {
  @Node({ name: 'Hungry for Pizza', start: true })
  public hungryForPizza(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
    return;
  }
}

const workflow = new PizzaCustomer();

const token = workflow.run({ node: { name: 'Hungry for Pizza' }, token: new Token() });

console.log(token);
