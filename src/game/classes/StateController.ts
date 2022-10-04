export abstract class StateController {
  protected states!: { [key: string]: { enter: () => void } };

  protected currentState!: { enter: () => void };
}
