import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/TransactionsBarChart';
import { Container, Typography, Box, Select, MenuItem } from '@mui/material';
import './styles.css';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("03");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" color="primary" fontWeight="bold">
          Transaction Dashboard
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          variant="outlined"
          sx={{ width: '100%' }}
        >
          {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((month, index) => (
            <MenuItem key={index} value={month}>
              {new Date(0, index).toLocaleString("en", { month: "long" })}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <StatisticsBox month={selectedMonth} />
      <TransactionsTable month={selectedMonth} />
      <BarChart month={selectedMonth} />
    </Container>
  );
};

export default App;
