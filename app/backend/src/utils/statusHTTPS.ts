const statusHTTPS = (code: string): number => {
  switch (code) {
    case 'SUCCESSFUL': return 200;
    case 'INVALID_DATA': return 400;
    case 'CREATED': return 201;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    default: return 500;
  }
};

export default statusHTTPS;
