// components/UTCustomersContent.tsx

"use client"

import React from "react"
import CustomersContent from "./CustomersContent"

const UTCustomersContent = (): JSX.Element => {
  return (
    <CustomersContent
      dbName="UT_database"
      apiEndpoint="/api/clienti"
    />
  )
}

export default UTCustomersContent
