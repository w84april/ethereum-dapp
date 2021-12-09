import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function BasicTabs(props) {
  const { page, setPage } = props;

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={page}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Create User" />
          <Tab label="Show Users" />
        </Tabs>
      </Box>
    </Box>
  );
}
