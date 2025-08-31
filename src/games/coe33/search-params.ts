import { createSearchParamsCache } from 'nuqs/server';
import {
  paginationParser,
  searchParser,
  sortParser,
} from '@/app/search-params';

export const coe33SearchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationParser,
  // Add other custom parsers here
});
