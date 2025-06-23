import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchMatrix } from '@/actions/matrix';

const useMatrix = ({ params }: ParamType) => {
  return useQuery<MatrixResponse, Error>({
    queryKey: ['matrix', params],
    queryFn: () => fetchMatrix({ params }),
    placeholderData: keepPreviousData,
  });
};

export default useMatrix;
