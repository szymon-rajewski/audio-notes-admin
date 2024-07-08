import React, { useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '../ui/Table/Table';
import { TableHeader } from '../ui/Table/TableHeader';
import { TableRow } from '../ui/Table/TableRow';
import { TableHead } from '../ui/Table/TableHead';
import { TableBody } from '../ui/Table/TableBody';
import { TableCell } from '../ui/Table/TableCell';
import { Button } from '../ui/Button';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { useAuth } from '../AuthenticationContextProvider';
import Agent from '../../agent/Agent';
import FindAllAgentsResponse from '../../agent/FindAllAgentsResponse';
import { useNavigate } from 'react-router-dom';

const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: ({ row }) => <div>{row.getValue('lastUpdated')}</div>,
  },
];

export default function AgentTable() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState({});

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, error, isLoading, isFetching, refetch } = useQuery<
    FindAllAgentsResponse,
    Error
  >({
    queryKey: ['agentList', pageIndex],
    // queryFn: () => new AgentApi().getAll(userId, pageIndex + 1),
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: data?.pages,
  });

  const handleNavigate = (agent: Agent) => {
    navigate(`/agent/${agent._id}`, { state: agent });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Błąd: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <h2 className="mb-5 text-lg font-bold">Wszyscy agenci</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-sm font-semibold text-black"
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
                  className="cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleNavigate(row.original as Agent)}
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
                  No results.
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
    </div>
  );
}
