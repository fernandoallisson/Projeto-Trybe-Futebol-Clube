import { ICreateService, IUpdateService } from '../CRUD/CRUD.service';
import ServiceResponse from '../service.response';
import IMacth from './IMatch';

export interface IMatchService extends ICreateService<IMacth>, IUpdateService<IMacth> {
  findAll(inProgress: string): Promise<ServiceResponse<IMacth[]>>;
  findById(id: number): Promise<ServiceResponse<IMacth>>;
}
