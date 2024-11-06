// components/UTCustomersContent.tsx

"use client"

import React from "react"
import CustomersContent from "./CustomersContent"

const CCCustomersContent = (): JSX.Element => {
  return <CustomersContent dbName="CC_database" apiEndpoint="/api/clienti" />
}

export default CCCustomersContent
