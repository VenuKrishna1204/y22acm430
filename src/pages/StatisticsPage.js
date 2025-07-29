import React from "react";
import {getUrls} from "../data/storage";
import {Typography,Box} from "@mui/material";

const StatisticsPage=()=>{
  const data=getUrls();

  return (
    <Box p={4}>
      <Typography variant="h4">Shortened URL History</Typography>
      {data.length === 0 ? (
        <Typography>No URLs found</Typography>
      ) : (
        data.map((item, idx) => (
          <Box key={idx} sx={{ my: 2 }}>
            <Typography><strong>Original:</strong> {item.url}</Typography>
            <Typography><strong>Shortened:</strong> <a href={item.shortUrl}>{item.shortUrl}</a></Typography>
            <Typography><strong>Expiry:</strong> {item.expiry}</Typography>
            <hr />
          </Box>
        ))
      )}
    </Box>
  );
};

export default StatisticsPage;
