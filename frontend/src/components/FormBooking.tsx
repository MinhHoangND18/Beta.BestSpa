'use client'
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import {
    Box,
    Modal,
    IconButton,
    Typography,
    TextField,
    MenuItem,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Dialog,
    DialogContent,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    Close,
    CalendarToday,
    AccessTime,
    Person,
    LocationOn,
} from "@mui/icons-material";
import CustomDatePicker from "@/components/CustomDatePicker";
import dayjs from "dayjs";
import type { Product } from "@/app/featured-products/FeaturedProduct";

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    selectedTreatment?: string;
    selectedProduct?: Product | null;
}

interface FormData {
    spa: string;
    date: Date | null;
    time: string;
    people: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
    open,
    onClose,
    selectedTreatment,
    selectedProduct,
}) => {
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Calculate spaName based on current language
    const spaName = useMemo(() => t('booking.spaName'), [t, i18n.language]);
    const prevLanguageRef = useRef(i18n.language);
    const initialSpaNameRef = useRef(spaName);

    const [formData, setFormData] = useState<FormData>(() => ({
        spa: spaName,
        date: null,
        time: "",
        people: "",
    }));

    // Update spa when language changes, but only if form hasn't been modified
    // Use useEffect with a condition to avoid unnecessary updates and ESLint warning
    useEffect(() => {
        // Only update if language actually changed
        if (prevLanguageRef.current !== i18n.language) {
            const previousLanguage = prevLanguageRef.current;
            prevLanguageRef.current = i18n.language;
            const previousSpaName = initialSpaNameRef.current;
            initialSpaNameRef.current = spaName;

            // Only update if user hasn't manually changed the spa value
            setFormData((prev) => {
                if (prev.spa === previousSpaName) {
                    return {
                        ...prev,
                        spa: spaName,
                    };
                }
                return prev;
            });
        }
    }, [i18n.language, spaName]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            alert(t('booking.fillAllFields'));
            return;
        }

        const selectedService = selectedProduct?.title || selectedTreatment || null;
        const selectedServiceId = selectedProduct?.id || null;

        localStorage.setItem(
            "bookingData",
            JSON.stringify({
                spa: formData.spa,
                date: formData.date?.toISOString(),
                time: formData.time,
                people: formData.people,
                selectedService: selectedService,
                selectedServiceId: selectedServiceId,
            })
        );

        router.push("/booking");
    };

    const [openTimePicker, setOpenTimePicker] = useState(false);
    const [openGuestPicker, setOpenGuestPicker] = useState(false);
    const [isTimeFocused, setIsTimeFocused] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const locations = [
        {
            name: t('booking.spaName'),
            address: "21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang",
        },
    ];
    const guests = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

    const selectedDate = formData.date;

    const filteredTimes = React.useMemo(() => {
        const now = new Date();

        const times = {
            'Morning': ['10:00', '10:30', '11:00', '11:30'],
            'Afternoon': [
                '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
            ],
            'Evening': ['19:00', '19:30', '20:00', '20:30'],
        };

        if (!selectedDate || selectedDate > now) {
            return times;
        }

        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const result: Record<string, string[]> = {};

        Object.entries(times).forEach(([period, slots]) => {
            result[period] = slots.filter((time) => {
                const [hour, minute] = time.split(':').map(Number);
                return hour > currentHour || (hour === currentHour && minute > currentMinute);
            });
        });

        return result;
    }, [selectedDate]);

    const periodTranslations: Record<string, string> = {
        'Morning': t('booking.morning'),
        'Afternoon': t('booking.afternoon'),
        'Evening': t('booking.evening'),
    };

    const handleInputChange = (field: keyof FormData, value: string | Date | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === "date") {
            setFormData((prev) => ({ ...prev, date: value as Date | null, time: "" }));
        }
    };

    const isFormValid = formData.spa && formData.date && formData.time && formData.people;

    const bookingTitle = selectedProduct?.title || selectedTreatment || null;

    return (
        <Modal
            open={open}
            onClose={() => { }}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    boxShadow: 24,
                    maxWidth: { xs: "100%", md: 1200 },
                    width: { xs: "100%", md: "90%" },
                    height: { xs: "100vh", md: "auto" },
                    maxHeight: { xs: "100vh", md: "90vh" },
                    overflow: "auto",
                    position: "relative",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 5,
                        paddingBottom: 2,
                        px: 5,
                        borderColor: "grey.200",
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "#9e2265" }}>
                        {bookingTitle ? `${t('booking.title')}: ${bookingTitle}` : t('booking.spaName')}
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: "#9e2265" }}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 } }}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        alignItems="center"
                        sx={{ width: "100%" }}
                    >
                        {/* Location */}
                        <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                            <FormControl
                                fullWidth
                                sx={{
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
                                        fontSize: "1rem",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#9e2265",
                                    },
                                }}
                            >
                                <InputLabel sx={{ py: 0.1 }}>{t('booking.location')}</InputLabel>
                                <Select
                                    value={formData.spa}
                                    label={t('booking.location')}
                                    onChange={(e) => handleInputChange("spa", e.target.value)}
                                    sx={{ fontSize: "1rem" }}
                                    renderValue={(selected) => selected || ""}
                                >
                                    {locations.map((location, index) => (
                                        <MenuItem key={index} value={location.name}>
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "1rem",
                                                        color: "text.primary",
                                                    }}
                                                >
                                                    {location.name}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "0.85rem",
                                                        color: "text.secondary",
                                                        mt: 0.2,
                                                    }}
                                                >
                                                    {location.address}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Date */}
                        <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                            <CustomDatePicker
                                label={t('booking.date')}
                                value={formData.date ? dayjs(formData.date) : null}
                                onChange={(newDate) => {
                                    handleInputChange("date", newDate ? newDate.toDate() : null);
                                    setIsDatePickerOpen(false);
                                }}
                                minDate={dayjs()}
                                open={isDatePickerOpen}
                                onOpen={() => setIsDatePickerOpen(true)}
                                onClose={() => setIsDatePickerOpen(false)}
                            />
                        </Box>

                        {/* Time */}
                        <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                sx={{
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
                                        fontSize: "1.1rem",
                                        py: 0.1,
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#9e2265",
                                    },
                                }}
                            >
                                <InputLabel
                                    shrink={!!formData.time}
                                    sx={{
                                        py: 1,
                                        fontSize: "1.1rem",
                                        color: "text.secondary",
                                        backgroundColor: !!formData.time ? "white" : "transparent",
                                        px: !!formData.time ? 0.5 : 0,
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {t('booking.time')}
                                </InputLabel>
                                <OutlinedInput
                                    notched
                                    readOnly
                                    value={formData.time || ""}
                                    onClick={() => {
                                        setIsTimeFocused(true);
                                        setOpenTimePicker(true);
                                    }}

                                    sx={{
                                        cursor: "pointer",
                                        fontSize: "1.1rem",
                                        color: formData.time ? "#000" : "#999",
                                    }}
                                    placeholder={t('booking.selectATime')}
                                    endAdornment={
                                        <Box
                                            component="span"
                                            sx={{
                                                transform: openTimePicker ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "0.2s",
                                                color: "#777",
                                            }}
                                        >
                                            ▾
                                        </Box>
                                    }
                                />
                            </FormControl>

                            {/* Popup chọn giờ */}
                            <Dialog
                                open={openTimePicker}
                                onClose={() => {
                                    setOpenTimePicker(false);
                                    if (!formData.time) setIsTimeFocused(false);
                                }}
                                maxWidth="xs"
                                fullWidth
                                PaperProps={{
                                    sx: {
                                        borderRadius: 0,
                                        // boxShadow: '0 8px 32px rgba(235, 52, 149, 0.15)',
                                    }
                                }}
                            >
                                <DialogContent sx={{ p: 4 }}>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        sx={{
                                            mb: 3,
                                            fontWeight: 700,
                                            color: "#9e2265",
                                            textTransform: "uppercase",
                                            letterSpacing: '0.5px',
                                            position: 'relative',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '-8px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '60px',
                                                height: '3px',
                                                bgcolor: '#9e2265',
                                                borderRadius: '2px',
                                            }
                                        }}
                                    >
                                        {t('booking.availabilityForToday')}
                                    </Typography>

                                    {Object.entries(filteredTimes).map(([period, times]) => (
                                        <Box key={period} sx={{ mb: 3 }}>
                                            <Typography
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 600,
                                                    color: '#9e2265',
                                                    fontSize: '0.95rem',
                                                    letterSpacing: '0.3px'
                                                }}
                                            >
                                                {period === 'Morning' ? t('booking.morning') :
                                                    period === 'Afternoon' ? t('booking.afternoon') :
                                                        period === 'Evening' ? t('booking.evening') : period}:
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 1.5,
                                                }}
                                            >
                                                {times.map((time) => (
                                                    <Button
                                                        key={time}
                                                        variant={formData.time === time ? "contained" : "outlined"}
                                                        onClick={() => {
                                                            handleInputChange("time", time);
                                                            setOpenTimePicker(false);
                                                        }}
                                                        sx={{
                                                            borderRadius: 0,
                                                            minWidth: "80px",
                                                            py: 1,
                                                            border: 0,
                                                            borderColor: formData.time === time ? "#eb3495ff" : "#e0e0e0",
                                                            color: formData.time === time ? "#fff" : "#2d2d2d",
                                                            bgcolor: formData.time === time ? "#eb3495ff" : "#e5e5e5ff",
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem',
                                                            textTransform: 'none',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            boxShadow: formData.time === time
                                                                ? '0 4px 12px rgba(235, 52, 149, 0.3)'
                                                                : 'none',
                                                            "&:hover": {
                                                                border: 'none',
                                                                bgcolor: formData.time === time ? "#d42d85" : "#eb3495ff",
                                                                color: '#fff',
                                                                borderColor: "#eb3495ff",
                                                                // boxShadow: '0 6px 16px rgba(235, 52, 149, 0.35)',
                                                            },
                                                            '&:active': {
                                                                transform: 'translateY(0)',
                                                            }
                                                        }}
                                                    >
                                                        {time}
                                                    </Button>
                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </DialogContent>
                            </Dialog>
                        </Box>

                        {/* Guests */}
                        <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                sx={{
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
                                        fontSize: "1rem",
                                        transition: "all 0.2s ease",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#9e2265",
                                    },
                                }}
                            >
                                <InputLabel
                                    shrink={isFocused || !!formData.people}
                                    sx={{
                                        py: 0.2,
                                        backgroundColor: isFocused || !!formData.people ? "white" : "transparent",
                                        px: isFocused || !!formData.people ? 0.5 : 0,
                                    }}
                                >
                                    {t('booking.guest')}
                                </InputLabel>

                                {/* Desktop: Normal Select */}
                                {!isMobile && (
                                    <Select
                                        value={formData.people}
                                        onOpen={() => setIsFocused(true)}
                                        onClose={() => {
                                            if (!formData.people) setIsFocused(false);
                                        }}
                                        onChange={(e) => handleInputChange("people", e.target.value)}
                                        sx={{
                                            fontSize: "1rem",
                                            "& .MuiSelect-select": {
                                                py: 1.5,
                                            },
                                        }}
                                    >
                                        {guests.map((guest) => (
                                            <MenuItem key={guest} value={guest}>
                                                {guest}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}

                                {/* Mobile: OutlinedInput with Dialog */}
                                {isMobile && (
                                    <OutlinedInput
                                        notched
                                        readOnly
                                        value={formData.people || ""}
                                        onClick={() => {
                                            setIsFocused(true);
                                            setOpenGuestPicker(true);
                                        }}
                                        sx={{
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            color: formData.people ? "#000" : "#e0e0e0ff",
                                        }}
                                        placeholder={t('booking.selectGuestsPlaceholder')}
                                        endAdornment={
                                            <Box
                                                component="span"
                                                sx={{
                                                    transform: openGuestPicker ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "0.2s",
                                                    color: "#e0e0e0ff",
                                                }}
                                            >
                                                ▾
                                            </Box>
                                        }
                                    />
                                )}
                            </FormControl>

                            {/* Guest Picker Dialog for Mobile */}
                            <Dialog
                                open={openGuestPicker}
                                onClose={() => {
                                    setOpenGuestPicker(false);
                                    if (!formData.people) setIsFocused(false);
                                }}
                                fullScreen={isMobile}
                                fullWidth
                                maxWidth="xs"
                                sx={{
                                    '& .MuiDialog-paper': {
                                        margin: { xs: 0, md: 2 },
                                        maxHeight: { xs: '100%', md: '80vh' },
                                        borderRadius: { xs: 0, md: 2 },
                                        width: { xs: '100%', md: 'auto' },
                                        maxWidth: { xs: '100%', md: '444px' },
                                    }
                                }}
                            >
                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'grey.200' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#9e2265" }}>
                                        {t('booking.selectGuests')}
                                    </Typography>
                                    <IconButton
                                        onClick={() => {
                                            setOpenGuestPicker(false);
                                            if (!formData.people) setIsFocused(false);
                                        }}
                                        sx={{ color: "#9e2265" }}
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>
                                <DialogContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        sx={{
                                            mb: 4,
                                            fontWeight: 700,
                                            color: "#9e2265",
                                            textTransform: "uppercase",
                                            letterSpacing: '0.5px',
                                            position: 'relative',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '-12px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '60px',
                                                height: '3px',
                                                bgcolor: '#9e2265',
                                                borderRadius: '2px',
                                            }
                                        }}
                                    >
                                        {t('booking.numberOfGuests')}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, 1fr)",
                                            gap: 2,
                                            maxWidth: "360px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        {guests.map((guest) => (
                                            <Button
                                                key={guest}
                                                variant={formData.people === guest ? "contained" : "outlined"}
                                                onClick={() => {
                                                    handleInputChange("people", guest);
                                                    setOpenGuestPicker(false);
                                                }}
                                                sx={{
                                                    height: "50px",
                                                    fontSize: "1.25rem",
                                                    fontWeight: 600,
                                                    borderRadius: "0px",
                                                    border: formData.people === guest ? "none" : "2px solid #e0e0e0",
                                                    color: formData.people === guest ? "#fff" : "#333",
                                                    bgcolor: formData.people === guest ? "#9e2265" : "#fff",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        bgcolor: formData.people === guest ? "#d83b8a" : "#fef5fa",
                                                        borderColor: formData.people === guest ? "none" : "#9e2265",
                                                        transform: "translateY(-2px)",
                                                        boxShadow: formData.people === guest
                                                            ? "0 6px 16px rgba(158, 34, 101, 0.4)"
                                                            : "0 4px 12px rgba(158, 34, 101, 0.15)",
                                                    },
                                                    "&:active": {
                                                        transform: "scale(0.95)",
                                                    },
                                                }}
                                            >
                                                {guest}
                                            </Button>
                                        ))}
                                    </Box>
                                </DialogContent>
                            </Dialog>
                        </Box>

                        {/* Button Desktop */}
                        <Box sx={{ width: { xs: "100%", md: "180px" }, display: { xs: "none", md: "block" }, boderRasius: 0, }}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={!isFormValid}
                                sx={{
                                    borderRadius: '0',
                                    height: "64px",
                                    backgroundColor: isFormValid ? "#9e2265" : "grey.400",
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    "&:hover": {
                                        backgroundColor: isFormValid ? "#d83b8a" : "grey.400",
                                    },
                                }}
                            >
                                {t('booking.bookNow')}
                            </Button>
                        </Box>
                    </Stack>

                    {/* Button Mobile */}
                    <Box sx={{ display: { xs: "block", md: "none" }, mt: 2, boderRasius: 0, }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={!isFormValid}
                            sx={{
                                borderRadius: '0',
                                height: "56px",
                                backgroundColor: isFormValid ? "#9e2265" : "grey.400",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "1rem",
                                "&:hover": {
                                    backgroundColor: isFormValid ? "#d83b8a" : "grey.400",
                                },
                            }}
                        >
                            {t('booking.bookNow')}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default BookingModal;