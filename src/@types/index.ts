type ErrorResponse = {
  status: string;
  code: number;
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

type ParamType = {
  params: {
    date?: string;
    search?: string;
    page?: number;
    status?: string;
  };
};
