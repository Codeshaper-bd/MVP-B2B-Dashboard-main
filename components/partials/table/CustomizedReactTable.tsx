"use client";
import { flexRender, type Row } from "@tanstack/react-table";
import { Fragment } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useTableContext } from "./TableProvider";

interface ICustomizedReactTableProps {
  renderSubComponent?: <T extends Record<string, any>>(props: {
    row: Row<T>;
  }) => React.ReactElement;
}

function CustomizedReactTable({
  renderSubComponent,
}: ICustomizedReactTableProps) {
  const { table, columns } = useTableContext();
  const tableRows = table?.getRowModel()?.rows;

  return (
    <Table
    // style={{
    //   width: table.getCenterTotalSize(),
    // }}
    >
      <TableHeader className="bg-secondary text-default-600 [&_tr]:!border-t-0">
        {table?.getHeaderGroups()?.map((headerGroup) => (
          <TableRow key={headerGroup?.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header?.id}
                colSpan={header?.colSpan}
                style={{ width: header.getSize() }}
              >
                {header?.isPlaceholder ? null : (
                  <div
                    className={
                      header?.column?.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={header?.column?.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="last:[&_tr]:border-b-0">
        {tableRows?.length ? (
          tableRows?.map((row) => (
            <Fragment key={row?.id}>
              <TableRow
                // key={row?.id}
                data-state={row?.getIsSelected() && "selected"}
                className="!text-default-600"
              >
                {row?.getVisibleCells()?.map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {/* Expanded Content */}
              {row.getIsExpanded() && (
                <TableRow>
                  <TableCell colSpan={row.getVisibleCells().length}>
                    {renderSubComponent?.({ row })}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns?.length}
              className="h-24 w-full text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CustomizedReactTable;
