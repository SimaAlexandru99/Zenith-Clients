"use client"

import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog"
import { Card, CardContent } from "components/ui/card"
import { Input } from "components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "components/ui/pagination"
import { Skeleton } from "components/ui/skeleton"
import { TableCell, TableRow } from "components/ui/table"
import { Customer } from "types/customer"
import CustomersTable from "./CustomersTable"

interface ApiResponse {
  customers: Customer[]
  total: number
}

type SortOrder = "asc" | "desc" | null

interface CustomersContentProps {
  dbName: string
  apiEndpoint: string
}

const CustomersContent = ({ dbName, apiEndpoint }: CustomersContentProps): JSX.Element => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Customer; order: SortOrder } | null>(null)
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null)
  const itemsPerPage = 10

  // Search handling with proper memoization
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), [handleSearch])

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${apiEndpoint}?db=${encodeURIComponent(
            dbName
          )}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(searchQuery)}`
        )

        if (!response.ok) throw new Error("Eșec la încărcarea clienților")

        const data = (await response.json()) as ApiResponse
        setCustomers(data.customers)
        setTotalPages(Math.ceil(data.total / itemsPerPage))
      } catch (err) {
        setError(err instanceof Error ? err.message : "A apărut o eroare necunoscută")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [currentPage, searchQuery, apiEndpoint, dbName])

  const handleSort = (key: keyof Customer): void => {
    let order: SortOrder = "asc"
    if (sortConfig?.key === key && sortConfig.order === "asc") {
      order = "desc"
    } else if (sortConfig?.key === key && sortConfig.order === "desc") {
      order = null
    }

    setSortConfig(order ? { key, order } : null)
    setCurrentPage(1) // Reset to first page when sorting changes
  }

  const sortedCustomers = (): Customer[] => {
    if (!sortConfig || !sortConfig.key || !sortConfig.order) return customers

    return [...customers].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === null || bValue === null) return 0
      if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1
      return 0
    })
  }

  const renderPaginationItems = (): JSX.Element[] => {
    const items: JSX.Element[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setCurrentPage(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />)
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setCurrentPage(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />)
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setCurrentPage(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  const renderSkeletonRows = (): JSX.Element[] => {
    return Array.from({ length: itemsPerPage }).map((_, index) => (
      <TableRow key={index} className="animate-pulse">
        <TableCell>
          <Skeleton className="w-full h-6" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-6" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-6" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-6" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-24 h-6" />
        </TableCell>
      </TableRow>
    ))
  }

  const handleDelete = (id: string): void => {
    setDeleteCustomerId(id)
  }

  const confirmDelete = async (): Promise<void> => {
    if (!deleteCustomerId) return

    try {
      const response = await fetch(`/api/customers/${deleteCustomerId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Ștergerea clientului a eșuat")

      setCustomers(customers.filter((c) => c._id !== deleteCustomerId))
      setDeleteCustomerId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare necunoscută")
    }
  }

  return (
    <>
      {/* Search Bar Outside the Card */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="text"
            placeholder="Caută client..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* You can add additional controls here if needed */}
      </div>

      <Card>
        <CardContent>
          {/* Customers Table */}
          <CustomersTable
            customers={sortedCustomers()}
            isLoading={isLoading}
            error={error}
            sortConfig={sortConfig}
            onSort={handleSort}
            onDelete={handleDelete}
            renderSkeletonRows={renderSkeletonRows}
          />

          {/* Pagination */}
          {!isLoading && customers.length > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={!!deleteCustomerId}
            onOpenChange={(open) => {
              if (!open) setDeleteCustomerId(null)
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmare Ștergere</AlertDialogTitle>
                <AlertDialogDescription>Ești sigur că dorești să ștergi acest client?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteCustomerId(null)}>Anulează</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Șterge</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Error Message */}
          {error && !isLoading && <div className="mt-4 text-center text-red-500">Eroare: {error}</div>}
        </CardContent>
      </Card>
    </>
  )
}

export default CustomersContent
