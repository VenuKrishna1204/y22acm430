import React, { useState } from "react";
import {
  Typography, Box, Snackbar, Alert, Button
} from "@mui/material";
import UrlForm from "../components/UrlForm";
import UrlStatsList from "../components/UrlStatsList";
import {isValidURL,isPositiveInteger,isValidSlug } from "../utils/validators";
import {generateUniqueShortcode,isShortcodeUnique, reserveShortcode } from "../utils/shortener";
import { saveUrls, getUrls } from "../data/storage";
import { logger } from "../middleware/logger";

const ShortenerPage = () => {
  const [inputs, setInputs] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "error" });

  const handleChange = (i, field, value) => {
    const updated = [...inputs];
    updated[i][field] = value;
    setInputs(updated);
  };

  const validate = () => {
    const validation = inputs.map(({ url, validity, shortcode }) => {
      if (!url || !isValidURL(url)) return "Invalid URL";
      if (validity && !isPositiveInteger(validity)) return "Invalid validity";
      if (shortcode && !isValidSlug(shortcode)) return "Invalid shortcode";
      if (shortcode && !isShortcodeUnique(shortcode)) return "Shortcode not unique";
      return "";
    });
    setErrors(validation);
    return validation.every(e => e === "");
  };

  const handleSubmit = () => {
    if (!validate()) {
      setSnackbar({ open: true, msg: "Fix errors in input", severity: "error" });
      return;
    }

    const now = Date.now();
    const output = inputs.map(({ url, validity, shortcode }) => {
      let code = shortcode || generateUniqueShortcode();
      reserveShortcode(code);

      const expiry = new Date(now + (validity ? +validity : 30) * 60000).toLocaleString();
      const shortUrl = `http://short.ly/${code}`;

      logger("SHORTEN_URL", { url, shortcode: code, expiry });

      return { url, shortUrl, expiry };
    });

    setResults(output);
    saveUrls([...getUrls(), ...output]);
    setSnackbar({ open: true, msg: "Shortened successfully", severity: "success" });
  };

  const addInput = () => {
    if (inputs.length >= 5) {
      setSnackbar({ open: true, msg: "Max 5 URLs allowed", severity: "warning" });
      return;
    }
    setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, index) => (
        <UrlForm key={index} index={index} input={input} error={errors[index]} onChange={handleChange} />
      ))}
      <Box display="flex" gap={2} mb={3}>
        <Button onClick={addInput} variant="outlined">Add URL</Button>
        <Button onClick={handleSubmit} variant="contained">Shorten</Button>
      </Box>
      <UrlStatsList data={results} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShortenerPage;
