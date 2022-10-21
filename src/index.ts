import { Default, DefineProcess, DefineStart } from './common';

export * from './core';
export * from './type';
export * from './utils';
export * from './common';

@DefineProcess(Default, {
  name: 'Pizza Customer',
  path: './example/supplying-pizza.bpmn',
})
export class PizzaCustomer {
  @DefineStart({ name: '' })
  public hungryForPizza() {
    return;
  }
}
