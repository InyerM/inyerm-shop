export interface DashboardSummaryResponse {
  numberOfOrders: number
  paidOrders: number
  notPaidOrders: number
  numberOfProducts: number
  numberOfClients: number
  productsWithNoStock: number
  productsWithLowStock: number
}
