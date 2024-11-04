// components/CustomersTable.tsx

"use client"

import { ChevronDown, ChevronUp, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip"
import { Customer, CustomersTableProps } from "types/customer"

const CustomersTable = ({
  customers,
  isLoading,
  error,
  sortConfig,
  onSort,
  onDelete,
  renderSkeletonRows,
}: CustomersTableProps): JSX.Element => {
  return (
    <TooltipProvider>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            {["ID Client", "Telefon", "Cod agentie", "Status"].map((header) => (
              <TableHead
                key={header}
                onClick={() => onSort(header as keyof Customer)}
                className="cursor-pointer select-none"
              >
                <div className="flex items-center">
                  {header}
                  {sortConfig?.key === header &&
                    sortConfig.order &&
                    (sortConfig.order === "asc" ? (
                      <ChevronUp className="ml-1 size-4" />
                    ) : (
                      <ChevronDown className="ml-1 size-4" />
                    ))}
                </div>
              </TableHead>
            ))}
            <TableHead>Acțiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Loading State */}
          {isLoading && renderSkeletonRows()}

          {/* Error State */}
          {!isLoading && error && (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="mt-4 text-center text-red-500">{error}</div>
              </TableCell>
            </TableRow>
          )}

          {/* No Data State */}
          {!isLoading && !error && customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="mt-4 text-center">Niciun client găsit</div>
              </TableCell>
            </TableRow>
          )}

          {/* Data Rows */}
          {!isLoading &&
            !error &&
            customers.map((customer) => (
              <TableRow key={customer._id} className="hover:bg-gray-100">
                <TableCell>{customer["ID Client"]}</TableCell>
                <TableCell>{customer.Telefon}</TableCell>
                <TableCell>{customer["Cod agentie"]}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      customer.Status === "Active"
                        ? "bg-green-100 text-green-800"
                        : customer.Status === "Inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {customer.Status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {/* View Details Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/clienti/${customer._id}`}>
                          <Button size="sm" variant="ghost" className="p-2" aria-label="Vezi detalii">
                            <Eye className="size-5 text-blue-500" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Vezi detalii</TooltipContent>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 text-red-500"
                          onClick={() => onDelete(customer._id)}
                          aria-label="Șterge"
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Șterge</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  )
}

export default CustomersTable
