type serviceMessage = {
  message: string
};
// -------------------------------------------------------------
type serviceResponseErrorType = (
  'INVALID_DATA' | 'UNAUTHORIZED' | 'CONFLICT' | 'NOT_FOUND'
);

type sucess = 'SUCCESSFUL' | 'CREATED';
// --------------------------------------------------------------
type statusType = serviceResponseErrorType | sucess;
// --------------------------------------------------------------
type serviceResponseError = {
  status: serviceResponseErrorType
  data: serviceMessage
};
// --------------------------------------------------------------
type serviceResponseSuccess<I> = {
  status: sucess
  data: I
};

type serviceResponse<I> = serviceResponseError | serviceResponseSuccess<I>;

export {
  serviceMessage,
  serviceResponseErrorType,
  sucess,
  statusType,
  serviceResponseError,
  serviceResponseSuccess,
  serviceResponse,
};
