// src/components/TransactionsTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { debounce } from 'lodash';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Debounced search handler to limit API calls
  const debouncedSearch = debounce(value => {
    setSearch(value);
    setPage(1);
  }, 500);

  // Fetch transactions based on search, month, and page
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://transaction-backend-93xd.onrender.com/api/transactions`, {
          params: { month, search, page },
        });
        setTransactions(response.data);
        setHasMoreData(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
      setIsLoading(false);
    };

    fetchTransactions();
  }, [month, search, page]);

  // Rendered when no transactions are found
  const NoDataMessage = () => (
    <Typography variant="h6" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
      No transactions found for the selected month and search term.
    </Typography>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Transactions"
          variant="outlined"
          fullWidth
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : transactions.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.price.toFixed(2)}</TableCell>
                  <TableCell>{new Date(transaction.dateOfSale).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoDataMessage />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isLoading}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMoreData || isLoading}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionsTable;
