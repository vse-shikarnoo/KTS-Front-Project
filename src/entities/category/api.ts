import qs from 'qs';
import { api, apiRoutes } from 'config/api';
import { ApiResponse } from 'types/apiResponse';
import { Category, CategoryListResponse } from './types';

export const getCategories = async (signal?: AbortSignal): Promise<Category[]> => {
  const query = qs.stringify({ populate: '*' }, { encodeValuesOnly: true, addQueryPrefix: true });
  const response = await api.get<ApiResponse<Category[]>>(`${apiRoutes.categories.getAll}${query}`, { signal });
  return response.data.data;
};

export const getCategoryList = async (
  page: number,
  pageSize: number,
  search?: string,
  signal?: AbortSignal,
): Promise<CategoryListResponse> => {
  const query = qs.stringify(
    {
      populate: '*',
      pagination: {
        page,
        pageSize,
      },
      filters: {
        title: {
          $contains: search,
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const response = await api.get<CategoryListResponse>(`${apiRoutes.categories.getAll}?${query}`, { signal });
  return response.data;
};
