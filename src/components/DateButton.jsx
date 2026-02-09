import * as React from "react";
import dayjs from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button, Popover, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [date, setDate] = React.useState(dayjs());

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Button
          variant="outlined"
          startIcon={<CalendarTodayIcon />}
          onClick={handleClick}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            color: 'text.primary',
            borderColor: 'divider',
            px: 2,
            py: 0.8,
            '&:hover': {
              backgroundColor: 'action.hover',
              borderColor: 'text.secondary',
            }
          }}
        >
          {date.format("MMM DD, YYYY")}
        </Button>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { borderRadius: '16px', boxShadow: 3, mt: 1 }
        }}
      >
        <DateCalendar
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            handleClose();
          }}
        />
      </Popover>
    </LocalizationProvider>
  );
}