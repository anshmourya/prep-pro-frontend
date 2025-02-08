import { useState } from "react";

export interface QueryOptions {
  collation?: string;
  select?: string[];
  sort?: unknown;
  populate?: string;
  projection?: string;
  lean?: boolean;
  leanWithId?: boolean;
  offset?: number;
  page?: number;
  limit?: number;
  pageCount?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  pagination?: boolean;
  useEstimatedCount?: boolean;
  useCustomCountFn?: boolean;
  forceCountFn?: boolean;
  read?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

export interface Paginator {
  itemCount: number;
  offset: number;
  perPage: number;
  pageCount: number;
  currentPage: number;
  slNo: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prev: number | null;
  next: number | null;
}

export interface QueryData {
  query?: {
    [key: string]: string | number | [] | undefined | any;
  };
  options?: QueryOptions;
  isCountOnly?: boolean;
}

const useFilter = (initialState?: QueryData) => {
  const [filterOption, setFilterOption] = useState<QueryData>({
    ...initialState,
    options: {
      pageCount: 0,
      hasNextPage: false,
      hasPrevPage: false,
      page: 1,
      offset: 0,
      pagination: true,
      ...initialState?.options,
    },
    query: {
      ...initialState?.query,
    },
  });

  const setPaginatorData = ({
    pageCount,
    hasNextPage,
    hasPrevPage,
    offset,
  }: {
    pageCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    offset: number;
  }) => {
    setFilterOption((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        pageCount,
        hasNextPage,
        hasPrevPage,
        offset,
      },
    }));
  };

  const refetchPaginationData = (next: number) => {
    setFilterOption((prev) => {
      const updatedOptions = {
        ...prev.options,
        page: next,
        offset: (next - 1) * (prev.options?.limit ?? 10),
      };
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  const setQuery = (query: object) => {
    setFilterOption((prev) => {
      return {
        ...prev,
        query: {
          ...prev.query,
          ...query,
        },
      };
    });
  };

  const removeQueryKey = (key: string) => {
    setFilterOption((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev.query || {};
      return {
        ...prev,
        query: rest,
      };
    });
  };

  const removeOptionKey = (key: string) => {
    setFilterOption((prev) => {
      return {
        ...prev,
        options: {
          ...prev.options,
          [key]: undefined,
        },
      };
    });
  };

  const removeAllQuery = () => {
    setFilterOption((prev) => {
      return {
        ...prev,
        query: {},
      };
    });
  };
  return {
    filterOption,
    setFilterOption,
    setPaginatorData,
    refetchPaginationData,
    setQuery,
    removeQueryKey,
    useFilter,
    removeAllQuery,
    removeOptionKey,
  };
};

export default useFilter;
