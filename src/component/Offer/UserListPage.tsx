import * as React from 'react';
import lodash from 'lodash';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { Table } from '../ui/Table/Table';
import { TableHeader } from '../ui/Table/TableHeader';
import { TableRow } from '../ui/Table/TableRow';
import { TableHead } from '../ui/Table/TableHead';
import { TableBody } from '../ui/Table/TableBody';
import { TableCell } from '../ui/Table/TableCell';
import { Button } from '../ui/Button';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Loading from '../Loading/Loading';
import { useCallback, useMemo, useState } from 'react';
import { InputWithIcon } from '../ReusableElements/InputWithIcon';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/Toast/UseToast';
import { useAuth } from '../AuthenticationContextProvider';
import FindAllUsersResponse from '../../offer/FindAllUsersResponse';
import Page from '../Page/Page';
import UserApi from '../../api/UserApi';
import User from '../../user/User';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return <div>{row.getValue('email') || '-'}</div>;
    },
  },
  {
    accessorKey: 'sessionCount',
    header: 'Sessions/Sessions left',
    cell: ({ row }) => {
      console.log('row', row);
      const sessionCount = row.getValue('sessionCount') as number;
      const sessionsLeft = row.getValue('sessionsLeft') as number;
      console.log('sessionCount', sessionCount);
      console.log('sessionsLeft', sessionsLeft);
      console.log('sessionCount', lodash.isNumber(sessionCount));
      console.log('sessionsLeft', lodash.isNumber(sessionsLeft));
      const sessionCountText = lodash.isNumber(sessionCount)
        ? `${sessionCount}`
        : '-';
      const sessionLeftValue = lodash.isNumber(sessionsLeft)
        ? `${sessionsLeft}`
        : '-';
      const plan = row.getValue('plan') as string;
      const sessionLeftText = plan !== 'free' ? 'unl' : sessionLeftValue;
      return <div>{`${sessionCountText}/${sessionLeftText}`}</div>;
    },
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
    cell: ({ row }) => {
      const plan = row.getValue('plan') as string;
      return <div>{plan || '-'}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    cell: ({ row }) => {
      const updatedAt = row.getValue('createdAt') as string;
      if (updatedAt) {
        const formattedDate = format(
          new Date(updatedAt),
          'dd-MM-yyyy HH:mm:ss'
        );
        return <div>{formattedDate}</div>;
      }
      return <div>{'-'}</div>;
    },
  },
];

export default function UserListPage() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, error, isLoading, refetch } = useQuery<
    FindAllUsersResponse | undefined,
    Error
  >({
    queryKey: ['user-results', pageIndex, query],
    queryFn: async () => {
      try {
        if (!userId) {
          throw new Error('No user ID');
        }
        return new UserApi().getAll(userId, pageIndex + 1);
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Could not fetch data',
          description: 'Please try again for few moments',
        });
        console.log(e);
      }
    },
    retry: false,
    cacheTime: 0,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data?.results || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: data?.pages,
  });

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      setQuery(searchQuery);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleResultNavigate = (user: User) => {
    // navigate(`/panel-gecko-admin/oferta/${offer._id}`, { state: offer });
  };

  return (
    <Page>
      <div className="size-full">
        <h2 className="mb-5 text-lg font-bold">Users</h2>
        <div>
          <InputWithIcon
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search"
            Icon={Search}
          />
        </div>
        {isLoading ? <Loading /> : null}
        {!isLoading && error ? <div>Error: {error.message}</div> : null}
        {!isLoading && !error ? (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="text-sm font-semibold text-black "
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="cursor-pointer"
                        onClick={() =>
                          handleResultNavigate(row.original as User)
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </Page>
  );
}
