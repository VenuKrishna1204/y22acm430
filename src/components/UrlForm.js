import React from "react";
import { TextField, Grid } from "@mui/material";

const UrlForm=({index,input,error,onChange })=>{
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={`Long URL #${index + 1}`}
          value={input.url}
          onChange={(e) => onChange(index, "url", e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          fullWidth
          label="Validity (minutes)"
          value={input.validity}
          onChange={(e) => onChange(index, "validity", e.target.value)}
          type="number"
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          fullWidth
          label="Preferred Shortcode"
          value={input.shortcode}
          onChange={(e) => onChange(index, "shortcode", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default UrlForm;
