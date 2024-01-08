type ServiceResponse<F> = {
  statusCode: number,
  data: F,
};

export type ServiceResponseMessage = {
  message?: string,
  role?: string,
};

export default ServiceResponse;
