interface ICreate<F> {
  create(data: Partial<F>): Promise<F>;
}

interface IRead<F> {
  findById(id: number): Promise<F | null>;
  findAll(): Promise<F[]>;
}

interface IUpdate<F> {
  update(id: number, data: Partial<F>): Promise<F | null>;
}

interface IDelete {
  delete(id: number): Promise<number>;
}

export default interface ICRUD<F> extends ICreate<F>, IRead<F>, IUpdate<F>, IDelete {}

export { ICreate, IRead, IUpdate, IDelete };
