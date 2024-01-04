import ServiceResponse from '../service.response';

interface ICreateService<F> {
  create(data: Partial<F>): Promise<ServiceResponse<F>>;
}

interface IReadService<F> {
  findById(id: number): Promise<ServiceResponse<F>>;
  findAll(): Promise<ServiceResponse<F[]>>;
}

interface IUpdateService<F> {
  update(id: number, data: Partial<F>): Promise<ServiceResponse<F>>;
}

interface IDeleteService {
  delete(id: number): Promise<ServiceResponse<null>>;
}

export default interface ICRUDService<F> extends
  ICreateService<F>,
  IReadService<F>,
  IUpdateService<F>,
  IDeleteService
{}

export { ICreateService, IReadService, IUpdateService, IDeleteService };
