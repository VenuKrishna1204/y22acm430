import React from "react";
import {Box,Typography } from "@mui/material";

const UrlStatsList = ({data})=>{
  return(
    <Box>
      <Typography variant="h6">After Result Shortened URLs</Typography>
      {data.map((res, idx)=>(
        <Box key={idx} sx={{ my: 1 }}>
          <Typography><strong>Original URL:</strong> {res.url}</Typography>
          <Typography><strong>Shortened URL:</strong> <a href={res.shortUrl}>{res.shortUrl}</a></Typography>
          <Typography><strong>Expires URL:</strong> {res.expiry}</Typography>
          <hr/>
        </Box>
      ))}
    </Box>
  );
};

export default UrlStatsList;