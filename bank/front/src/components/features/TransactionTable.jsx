import { DataGrid } from '@mui/x-data-grid';
import formatCurrency from "../../utils/currency-parser.js";
import formatDate from "../../utils/date-parser.js";
import { Box } from "@mui/material";

export default function TransactionTable({ isLoading, transactions, email }) {
  const uniqueTransactions = transactions.filter((tx, index, self) =>
    index === self.findIndex((t) => t._id === tx._id)
  );

  const columns = [
    { 
      field: 'from', 
      headerName: 'From', 
      flex: 1,
      minWidth: 130,
    },
    { 
      field: 'to', 
      headerName: 'To', 
      flex: 1,
      minWidth: 130,
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <span className={params.row.to === email ? 'text-green-600' : 'text-red-600'}>
          {formatCurrency(params.value)}
        </span>
      ),
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
          <span>{formatDate(params.value)}</span>
      ),
    },
  ];

  const rows = uniqueTransactions.map((tx) => ({
    id: tx._id,
    ...tx
  }));

  return (
    <div>
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Transaction History</h2>
    </div>
      <div className="w-full max-w-4xl mx-auto mt-2 bg-white rounded-lg shadow overflow-hidden">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          }, 
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          }
        }}
        pageSizeOptions={[10,25,50,100, { value: -1, label: 'All' }]}
        sx={{
          border: 'none',
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-main": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(37, 99, 235) !important",
            color: "white",
            fontSize: "0.875rem",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "rgb(37, 99, 235) !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            color: "white",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "white",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "white",
          },
          "& .MuiDataGrid-menuIcon": {
            color: "white",
          },
          "& .MuiDataGrid-iconButtonContainer": {
            color: "white",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e5e7eb",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9fafb",
          },
        }}
      />
    </div>
    </div>
  );
}