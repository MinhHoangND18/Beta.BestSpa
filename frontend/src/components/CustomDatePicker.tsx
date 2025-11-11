'use client'

import * as React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, styled, useMediaQuery, useTheme, IconButton, Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import { useTranslation } from 'react-i18next';

interface CustomDatePickerProps {
  label?: string;
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    height: "64px",
    "& fieldset": {
      borderColor: "#e5e5e5",
    },
    "&:hover fieldset": {
      borderColor: "#9e2265",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9e2265",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#888",
    fontSize: "1.1rem",
    paddingTop: "0.1rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#9e2265",
  },
  "& input": {
    padding: "12px 14px",
    fontWeight: 500,
    fontSize: "1.1rem",
    userSelect: "none",
    caretColor: "transparent",
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function CustomDatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  open,
  onOpen,
  onClose,
}: CustomDatePickerProps) {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const translatedLabel = label || t('datePicker.selectDate');
  
  const localeMap: Record<string, string> = {
    'en': 'en',
    'ja': 'ja',
    'ko': 'ko',
  };
  const dayjsLocale = localeMap[i18n.language] || 'en';
  
  useEffect(() => {
    dayjs.locale(dayjsLocale);
  }, [dayjsLocale]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };

  const handleChange = (newValue: unknown) => {
    if (onChange) {
      const dayjsValue = newValue ? dayjs(newValue as Date | Dayjs) : null;
      onChange(dayjsValue);
    }
  };

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      key={dayjsLocale}
    >
      <Box sx={{ position: "relative" }}>
        <MobileDatePicker
          label={translatedLabel}
          value={value}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          format="DD/MM/YYYY"
          dayOfWeekFormatter={(date) => {
            const dayjsDate = dayjs(date as Date | Dayjs);
            return dayjsDate.format('ddd').toUpperCase();
          }}
          closeOnSelect={true}
          open={open !== undefined ? open : isOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          slots={{
            textField: (params) => (
              <StyledTextField
                {...params}
                fullWidth
                placeholder={!value && (open !== undefined ? open : isOpen) ? "" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpen) onOpen();
                  else handleOpen();
                }}
                inputProps={{
                  ...params.inputProps,
                  placeholder: !value && (open !== undefined ? open : isOpen) ? "" : "",
                }}
                InputProps={{
                  ...params.InputProps,
                  readOnly: true,
                  style: { cursor: "pointer" },
                  endAdornment: (
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                      {params.InputProps?.endAdornment}
                      <CalendarTodayIcon
                        sx={{
                          color: "#888",
                          fontSize: 20,
                          position: "absolute",
                          right: 0,
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  ),
                }}
              />
            ),
          }}
          slotProps={{
            dialog: {
              sx: {
                "& .MuiDialog-paper": {
                  margin: { xs: 0, md: 2 },
                  maxHeight: { xs: "100vh", md: "80vh" },
                  height: { xs: "100vh", md: "auto" },
                  width: { xs: "100vw", md: "auto" },
                  maxWidth: { xs: "100vw", md: "444px" },
                  position: "relative",
                  overflowY: { xs: "auto", md: "visible" },
                  WebkitOverflowScrolling: "touch",
                },
                "& .MuiDialogActions-root": {
                  display: { xs: "none", md: "flex" },
                },
                "& .MuiPickersToolbar-root": {
                  display: "none",
                },
                "& .MuiPickersLayout-root": {
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: { xs: "72px", md: 0 },
                },
                "& .MuiDialogContent-root": {
                  padding: { xs: "0", md: 2 },
                },
                "& .MuiPickersCalendarHeader-root": {
                  padding: { xs: "16px", md: "16px" },
                  marginBottom: { xs: 2, md: 0 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  bgcolor: { xs: "#fafafa", md: "transparent" },
                  borderRadius: { xs: "12px", md: 0 },
                  mx: { xs: 2, md: 0 },
                },
                "& .MuiPickersLayout-actionBar": {
                  display: "none",
                },
                "& .MuiPickersCalendarHeader-labelContainer": {
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                },
                "& .MuiPickersCalendarHeader-label": {
                  fontSize: { xs: "1.1rem", md: "1rem" },
                  fontWeight: 600,
                  color: "#9e2265",
                  margin: 0,
                },
                "& .MuiPickersCalendarHeader-switchViewButton": {
                  display: "none",
                },
                "& .MuiPickersArrowSwitcher-root": {
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                },
                "& .MuiPickersArrowSwitcher-spacer": {
                  width: 0,
                  flex: "none",
                },
                "& .MuiPickersArrowSwitcher-button": {
                  color: "#9e2265",
                  padding: { xs: "10px", md: "4px" },
                  bgcolor: { xs: "white", md: "transparent" },
                  borderRadius: { xs: "8px", md: 0 },
                  boxShadow: { xs: "0 2px 4px rgba(0,0,0,0.08)", md: "none" },
                  "&:hover": {
                    bgcolor: { xs: "rgba(158, 34, 101, 0.08)", md: "rgba(158, 34, 101, 0.08)" },
                  },
                  "& svg": {
                    fontSize: { xs: "1.5rem", md: "1.5rem" },
                  },
                },
                "& .MuiDayCalendar-header": {
                  padding: { xs: "0 10px", md: 0 },
                  marginBottom: { xs: 2, md: 0 },
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: { xs: "4px", md: 0 },
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  fontSize: { xs: "0.875rem", md: "0.875rem" },
                  fontWeight: 700,
                  color: "#9e2265",
                  width: { xs: "44px", md: "36px" },
                  height: { xs: "44px", md: "36px" },
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .MuiDayCalendar-slideTransition": {
                  minHeight: { xs: "calc(100vh - 240px)", md: "240px" },
                  padding: { xs: "0 16px 16px", md: 0 },
                },
                "& .MuiDayCalendar-weekContainer": {
                  margin: { xs: "0 0 4px 0", md: 0 },
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: { xs: "4px", md: 0 },
                },
                "& .MuiPickersDay-root.Mui-selected": {
                  transform: { xs: "none", md: "scale(1)" },
                },
              },
            },
            day: {
              sx: {
                "&.MuiPickersDay-root": {
                  fontWeight: 500,
                  fontSize: { xs: "1rem", md: "0.95rem" },
                  width: { xs: "40px", md: "36px" },
                  height: { xs: "40px", md: "36px" },
                  margin: { xs: "0 auto", md: "2px" },
                  borderRadius: { xs: "8px", md: "8px" },
                  transition: "all 0.2s ease",
                },
                "&.Mui-selected": {
                  backgroundColor: "#9e2265 !important",
                  color: "#fff !important",
                  fontWeight: 700,
                  transform: { xs: "scale(1)", md: "scale(1)" },
                },
                "&:hover": {
                  backgroundColor: "rgba(158,34,101,0.12)",
                  transform: { xs: "scale(1.05)", md: "scale(1)" },
                },
                "&.MuiPickersDay-today": {
                  border: "2px solid #9e2265",
                  fontWeight: 700,
                  bgcolor: { xs: "rgba(158, 34, 101, 0.05)", md: "transparent" },
                },
                "&.Mui-disabled": {
                  color: "#d0d0d0",
                },
              },
            },
            actionBar: {
              actions: [],
            },
          }}
        />
        {mounted && isMobile && (open !== undefined ? open : isOpen) && typeof document !== 'undefined' &&
          createPortal(
            <Box sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 1,
              borderColor: 'grey.200',
              bgcolor: 'white',
              zIndex: 1301,
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#9e2265" }}>
                {translatedLabel}
              </Typography>
              <IconButton
                onClick={handleCloseButtonClick}
                sx={{ color: "#9e2265" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>,
            document.body
          )}
      </Box>
    </LocalizationProvider>
  );
}