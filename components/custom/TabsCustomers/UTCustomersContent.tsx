"use client"

import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { Card, CardContent } from "components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"

interface Customer {
  _id: string
  "ID Client": number
  Telefon: number
  "Cod agentie": number
  Status: string
}

interface ApiResponse {
  customers: Customer[]
  total: number
}

export default function UTCustomersContent() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/customers?db=UT_database&page=${currentPage}&limit=${itemsPerPage}`)
        if (!response.ok) {
          throw new Error("Failed to fetch customers")
        }
        const data: ApiResponse = (await response.json()) as ApiResponse
        setCustomers(data.customers)
        setTotalPages(Math.ceil(data.total / itemsPerPage))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [currentPage])

  const renderPaginationItems = () => {
    const items = []
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

  if (isLoading) return <div>Loading UT customers...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardContent>
        {customers.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Client</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Cod agentie</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer["ID Client"]}</TableCell>
                    <TableCell>{customer.Telefon}</TableCell>
                    <TableCell>{customer["Cod agentie"]}</TableCell>
                    <TableCell>{customer.Status}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Vezi detalii
                      </Button>
                      <Button size="sm" variant="destructive" className="ml-2">
                        Șterge
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
          </>
        ) : (
          <div>Niciun client gasit</div>
        )}
      </CardContent>
    </Card>
  )
}
