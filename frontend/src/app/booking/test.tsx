'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    Collapse,
    List,
    ListItem,
    ListItemText,
    Divider,
    Dialog,
    DialogContent,
    DialogTitle,
    Portal,
    Popper,
    ClickAwayListener,
    CircularProgress,
} from "@mui/material";
import {
    Close,
    KeyboardArrowDown,
    Person,
    CheckCircle,
    Circle,
} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { allCountries } from "country-telephone-data";
import { useTranslation } from 'react-i18next';
import { CreateBookingOrderDto } from "@/types/booking";
import { ItemType } from "@/types/invoice-item";
import { createBookingOrder } from "@/lib/api/bookings";
import { getServices } from "@/lib/api/services";

interface Treatment {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    priceUSD: number;
}

interface Step {
    icon: string;
    label: string;
    active: boolean;
}

interface CountryData {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    areaCodes?: string[];
}



const socialApps = [
    { name: "KakaoTalk", icon: "/images/kakaotalk-logo.svg" },
    { name: "WhatsApp", icon: "/images/whatsapp-icon.svg" },
    { name: "Line", icon: "/images/line-logo.svg" },
    { name: "Zalo", icon: "/images/zalo-icon.svg" },
];

export default function BookingPage() {
    const { t } = useTranslation('common');
    const anchorRef = useRef(null);
    const dialCodeRef = useRef(null);
    const socialAppRef = useRef(null);
    const router = useRouter();
    const [dialCode, setDialCode] = useState("(+84)");
    const [showDialPicker, setShowDialPicker] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSocialPicker, setShowSocialPicker] = useState(false);
    const [showSummary, setShowSummary] = useState(true);
    //   const [guestServices, setGuestServices] = useState<number[][]>([]);
    //   const [guestOpen, setGuestOpen] = useState<boolean[]>([]);
    const [applyToAll, setApplyToAll] = useState(false);

    const pickerRef = useRef<HTMLDivElement | null>(null);
    const socialPickerRef = useRef<HTMLDivElement>(null);
    const cardInfoRef = useRef<HTMLDivElement | null>(null);
    const mainContentRef = useRef<HTMLDivElement | null>(null);

    const scrollToContactInfo = useCallback(() => {
        if (!cardInfoRef.current) return;
        const rect = cardInfoRef.current.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 120; 
        window.scrollTo({ top: offset < 0 ? 0 : offset, behavior: "smooth" });
    }, []);

    const scrollToMainContent = useCallback(() => {
        if (!mainContentRef.current) return;
        const rect = mainContentRef.current.getBoundingClientRect();
        const offset = window.scrollY + rect.top ;
        window.scrollTo({ top: offset < 0 ? 0 : offset, behavior: "smooth" });
    }, []);

    const steps: Step[] = [
        { icon: "/reserve.svg", label: t('steps.reserve'), active: true },
        { icon: "/select.svg", label: t('steps.select'), active: true },
        { icon: "/confirm.svg", label: t('steps.confirm'), active: false },
    ];

    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [treatmentsLoading, setTreatmentsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setTreatmentsLoading(true);
                // Fetch all services by setting a high limit
                const response = await getServices({ limit: 1000 });
                const services = response.data;
                
                const mappedTreatments: Treatment[] = services.map(service => ({
                    id: service.id,
                    name: service.name,
                    description: service.description || '',
                    duration: service.durationMinutes,
                    price: service.price,
                    priceUSD: service.priceUSD || 0,
                }));

                setTreatments(mappedTreatments);
            } catch (error) {
                console.error("Failed to fetch treatments:", error);
                // Optionally set an error state here
            } finally {
                setTreatmentsLoading(false);
            }
        };

        fetchServices();
    }, []);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        socialAccountId: "",
        email: "",
        content: "",
        socialApp: "",
    });

    //   const [bookingData, setBookingData] = useState({
    //     spa: "",
    //     date: "",
    //     time: "",
    //     people: "",
    //   });

    const [errors, setErrors] = useState({
        fullName: "",
        phone: "",
        email: "",
        socialAccountId: "",
    });

    const [bookingData, setBookingData] = useState({
        spa: "",
        date: "",
        time: "",
        people: "",
        selectedService: "",
    });
    const [bookingError, setBookingError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isBookingInfoComplete = useMemo(() => {
        return Boolean(bookingData.spa && bookingData.date && bookingData.time && bookingData.people);
    }, [bookingData]);

    useEffect(() => {
        const savedData = localStorage.getItem("bookingData");
        if (savedData) {
            setBookingData(JSON.parse(savedData));
        }
    }, []);

    const numberOfGuests = parseInt(bookingData.people || "0");
    const [guestServices, setGuestServices] = useState<number[][]>([]);
    const [guestOpen, setGuestOpen] = useState<boolean[]>([]);
    const hasAutoSelectedRef = useRef(false);

    function arraysEqual2D(a: number[][], b: number[][]): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            const ai = a[i] ?? [];
            const bi = b[i] ?? [];
            if (ai.length !== bi.length) return false;
            for (let j = 0; j < ai.length; j++) {
                if (ai[j] !== bi[j]) return false;
            }
        }
        return true;
    }

    useEffect(() => {
        const newServices = Array.from({ length: numberOfGuests }, (_, i) => guestServices[i] || []);
        const newOpen = Array.from({ length: numberOfGuests }, (_, i) => guestOpen[i] ?? false);

        const servicesChanged = !arraysEqual2D(newServices, guestServices);
        const openChanged = newOpen.length !== guestOpen.length || newOpen.some((v, i) => v !== (guestOpen[i] ?? false));

        if (servicesChanged) {
            setGuestServices(newServices);
        }
        if (openChanged) {
            setGuestOpen(newOpen);
        }
    }, [numberOfGuests]);

    useEffect(() => {
        if (
            bookingData.selectedService && 
            numberOfGuests > 0 && 
            guestServices.length === numberOfGuests &&
            !hasAutoSelectedRef.current
        ) {
            const selectedTreatment = treatments.find(
                (t) => t.name === bookingData.selectedService
            );

            if (selectedTreatment && (!guestServices[0] || guestServices[0].length === 0)) {
                const newGuestServices = [...guestServices];
                newGuestServices[0] = [selectedTreatment.id];
                setGuestServices(newGuestServices);
                hasAutoSelectedRef.current = true;

                // Clear selectedService from localStorage after using it
                const savedData = localStorage.getItem("bookingData");
                if (savedData) {
                    const data = JSON.parse(savedData);
                    delete data.selectedService;
                    localStorage.setItem("bookingData", JSON.stringify(data));
                    setBookingData((prev) => ({ ...prev, selectedService: "" }));
                }
            }
        }
    }, [bookingData.selectedService, numberOfGuests, guestServices, treatments]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const getSelectedTreatmentsText = (services: number[]) => {
        if (services.length === 0) return "";
        return services
            .map((id) => treatments.find((t) => t.id === id)?.name)
            .join(", ");
    };

    const toggleGuestService = (guestIndex: number, serviceId: number) => {
        const newGuestServices = [...guestServices];

        if (!newGuestServices[guestIndex]) {
            newGuestServices[guestIndex] = [];
        }

        const currentServices = newGuestServices[guestIndex];
        let updatedServices: number[];

        if (currentServices.includes(serviceId)) {
            updatedServices = currentServices.filter((id) => id !== serviceId);
        } else {
            updatedServices = [...currentServices, serviceId];
        }

        newGuestServices[guestIndex] = updatedServices;

        if (applyToAll && guestIndex === 0) {
            for (let i = 1; i < numberOfGuests; i++) {
                newGuestServices[i] = [...updatedServices];
            }
        }

        setGuestServices(newGuestServices);
    };

    const toggleGuestOpen = (guestIndex: number) => {
        setGuestOpen((prev) => {
            const newOpen = [...prev];
            newOpen[guestIndex] = !newOpen[guestIndex];
            return newOpen;
        });
    };

    const handleApplyToAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setApplyToAll(checked);

        if (checked && guestServices[0]) {
            const newGuestServices = [...guestServices];
            const firstGuestServices = guestServices[0];

            for (let i = 1; i < numberOfGuests; i++) {
                newGuestServices[i] = [...firstGuestServices];
            }

            setGuestServices(newGuestServices);
        }
    };

    const groupedCountries = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();

        const filtered = allCountries.filter((country) =>
            country.name.toLowerCase().includes(normalized)
        );

        return filtered.reduce((acc: Record<string, CountryData[]>, country) => {
            const firstLetter = country.name[0].toUpperCase();
            if (!acc[firstLetter]) acc[firstLetter] = [];
            acc[firstLetter].push(country);
            return acc;
        }, {} as Record<string, CountryData[]>);
    }, [searchTerm]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                setShowDialPicker(false);
            }
        }
        if (showDialPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDialPicker]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                socialPickerRef.current &&
                !socialPickerRef.current.contains(event.target as Node)
            ) {
                setShowSocialPicker(false);
            }
        }
        if (showSocialPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showSocialPicker]);

    const validateForm = () => {
        const newErrors = {
            fullName: "",
            phone: "",
            email: "",
            socialAccountId: "",
        };

        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('cardInfor.error.erFullNameRequi')
            isValid = false;
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = t('cardInfor.error.erFullNameRequiL2C')
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('cardInfor.error.erPhoneNumberRequi');
            isValid = false;
        } else if (!/^\d{8,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
            newErrors.phone = t('cardInfor.error.erPhoneNumberRequiValid');
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = t('cardInfor.error.erEmailRequi');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('cardInfor.error.erEmailRequiValid');
            isValid = false;
        }

        if (
            formData.socialAccountId.trim() &&
            formData.socialAccountId.trim().length < 3
        ) {
            newErrors.socialAccountId = t('cardInfor.error.erSocial');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleBlur = (
        field: "fullName" | "phone" | "email" | "socialAccountId"
    ) => {
        const newErrors = { ...errors };

        switch (field) {
            case "fullName":
                if (!formData.fullName.trim()) {
                    newErrors.fullName = t('cardInfor.error.erFullNameRequi');
                } else if (formData.fullName.trim().length < 2) {
                    newErrors.fullName = t('cardInfor.error.erFullNameRequiL2C');
                } else {
                    newErrors.fullName = "";
                }
                break;

            case "phone":
                if (!formData.phone.trim()) {
                    newErrors.phone = t('cardInfor.error.erPhoneNumberRequi');
                } else if (
                    !/^\d{8,15}$/.test(formData.phone.replace(/[\s-]/g, ""))
                ) {
                    newErrors.phone = t('cardInfor.error.erPhoneNumberRequiValid');
                } else {
                    newErrors.phone = "";
                }
                break;

            case "email":
                if (!formData.email.trim()) {
                    newErrors.email = t('cardInfor.error.erEmailRequi');
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = t('cardInfor.error.erEmailRequiValid');
                } else {
                    newErrors.email = "";
                }
                break;

            case "socialAccountId":
                if (
                    formData.socialAccountId.trim() &&
                    formData.socialAccountId.trim().length < 3
                ) {
                    newErrors.socialAccountId =
                        t('cardInfor.error.erSocial');
                } else {
                    newErrors.socialAccountId = "";
                }
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isBookingInfoComplete) {
            setBookingError(t('booking.completeReservationDetails'));
            scrollToMainContent();
            return;
        }
        setBookingError(null);
    
        if (!validateForm()) {
            console.log("Form has errors");
            scrollToContactInfo();
            return;
        }
    
        setIsLoading(true);
    
        // Assume storeId is 1 for now, as it's not in the component's state
        const storeId = 1;
    
        const invoiceItems = guestServices.flatMap((serviceIds) =>
            serviceIds.map((serviceId) => {
                const treatment = treatments.find((t) => t.id === serviceId);
                return {
                    itemId: serviceId,
                    itemType: ItemType.SERVICE, // Assuming all are services
                    quantity: 1, // Assuming quantity is always 1 per service selection
                    unitPrice: treatment?.price || 0,
                    discount: 0, // No per-item discount in UI, handle at invoice level
                    totalPrice: treatment?.price || 0,
                    itemName: treatment?.name,
                };
            })
        );
    
        const orderPayload: CreateBookingOrderDto = {
            customer: {
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
            },
            booking: {
                storeId: storeId, // Hardcoded for now
                bookingDate: bookingData.date,
                startTime: bookingData.time,
                notes: formData.content,
            },
            invoice: {
                storeId: storeId, // Hardcoded for now
                subtotal: totalVND,
                // discountAmount: discountVND,
                taxAmount: 0, // No tax in UI
                totalAmount: finalVND,
                notes: formData.content,
                items: invoiceItems,
            },
        };
    
        try {
            await createBookingOrder(orderPayload);
            // Clear data from local storage after successful booking
            localStorage.removeItem("bookingData");
            router.push("/thanks");
        } catch (error) {
            console.error("Failed to create booking:", error);
            setBookingError("Failed to create booking. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) => (prev ? null : e.currentTarget));
    };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // Calculate totals
    const allSelected = guestServices
        .filter((ids) => ids && ids.length > 0)
        .flatMap((ids) => treatments.filter((t) => ids.includes(t.id)));

    const totalVND = allSelected.reduce((sum, t) => sum + t.price, 0);
    const totalUSD = allSelected.reduce((sum, t) => sum + t.priceUSD, 0);
    const discountVND = totalVND * 0.1;
    const discountUSD = totalUSD * 0.1;
    const finalVND = totalVND - discountVND;
    const finalUSD = totalUSD - discountUSD;

    return (
        <Box component="main">
            {/* Steps */}
            <Box
                sx={{
                    height: { xs: 100, md: 120 },
                    bgcolor: '#9e2265',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    px: { xs: 1, md: 2 },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Container chứa line và steps */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '30%',
                        minWidth: { xs: 280, md: 350 },
                        maxWidth: 500,
                    }}
                >
                    {/* Line*/}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            height: { xs: 6, md: 12 },
                            bgcolor: '#fff',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            borderRadius: 3,
                        }}
                    />
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ position: 'relative', zIndex: 2 }}
                    >
                        {steps.map((step, index) => (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Icon Circle */}
                                    <Box
                                        sx={{
                                            width: { xs: 45, sm: 55, md: 70 },
                                            height: { xs: 45, sm: 55, md: 70 },
                                            borderRadius: '50%',
                                            bgcolor: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: { xs: 0, md: 0 },
                                            boxShadow: 2,
                                            zIndex: 3,
                                            position: 'relative',
                                            mt: { xs: 1, md: 2 },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={step.icon}
                                            alt={step.label}
                                            sx={{
                                                width: { xs: 25, sm: 30, md: 40 },
                                                height: { xs: 23, sm: 28, md: 38 },
                                                filter: step.active ? 'none' : 'grayscale(1) opacity(0.6)',
                                            }}
                                        />
                                    </Box>

                                    {/* Label */}
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{
                                            fontFamily: "'Open Sans', sans-serif",
                                            color: '#fff',
                                            fontSize: { xs: 11, sm: 13, md: 15 },
                                            mt: { xs: 0, md: 0 },
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {step.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Box sx={{
                display: { xs: 'block', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                // textAlign: { xs: 'left', md: 'center' },
            }}>
                <Grid container spacing={2} direction="row-reverse"
                    sx={{
                        py: 4,
                        maxWidth: { xs: '100%', sm: '90vw', md: '75vw' },
                        mx: { xs: 0, sm: 2 },
                        px: { xs: 0, sm: 2 },
                        width: '100%',
                        overflowX: "hidden",
                    }}
                >
                    <Grid item xs={16} md={4}>
                        <Paper
                            sx={{
                                py: 2,
                                paddingRight: 2,
                                position: { md: "sticky" },
                                top: 20,
                                boxShadow: "none",
                                backgroundColor: "transparent",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: "'Open Sans', sans-serif",
                                    fontWeight: 600,
                                    mb: 1,
                                    color: "#594a39",
                                    cursor: { xs: "pointer", md: "default" },
                                }}
                                onClick={() => setShowSummary(!showSummary)}
                            >
                                {t('booking.appointmentSummary')}
                                <KeyboardArrowDown
                                    sx={{
                                        display: { xs: "inline", md: "none" },
                                        float: "right",
                                        transform: showSummary ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "0.3s",
                                    }}
                                />
                            </Typography>

                            <Collapse in={showSummary}>
                                <Box
                                    sx={{

                                        backgroundColor: "#fff6fa",
                                        borderRadius: 0,
                                        py: 1,
                                        px: 2,
                                    }}
                                >
                                    <List dense sx={{ px: 0, paddingX: 0, fontFamily: "'Open Sans', sans-serif" }}>
                                        <ListItem disableGutters >
                                            <ListItemText


                                                primary={<span style={{ fontFamily: "'Open Sans', sans-serif" }}>
                                                    {t('booking.date')}:
                                                </span>}
                                                secondary={formatDate(bookingData.date) || "Not selected"}
                                                primaryTypographyProps={{
                                                    component: "span",
                                                    sx: { fontWeight: "bold", display: "inline", mr: 1, fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                                secondaryTypographyProps={{
                                                    component: "span",
                                                    sx: { display: "inline", fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem disableGutters>
                                            <ListItemText
                                                primary= {<span> {t('booking.time')}: </span>}
                                                secondary={bookingData.time || "Not selected"}
                                                primaryTypographyProps={{
                                                    component: "span",
                                                    sx: { fontWeight: "bold", display: "inline", mr: 1, fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                                secondaryTypographyProps={{
                                                    component: "span",
                                                    sx: { display: "inline", fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem disableGutters>
                                            <ListItemText
                                                primary={ <span> {t('booking.location')}: </span>}
                                                secondary={bookingData.spa || "Not selected"}
                                                primaryTypographyProps={{
                                                    component: "span",
                                                    sx: { fontWeight: "bold", display: "inline", mr: 1, fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                                secondaryTypographyProps={{
                                                    component: "span",
                                                    sx: { display: "inline", fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem disableGutters>
                                            <ListItemText
                                                primary= { <span> {t('booking.numberOfGuests')} : </span>}
                                                secondary={bookingData.people || "0"}
                                                primaryTypographyProps={{
                                                    component: "span",
                                                    sx: { fontWeight: "bold", display: "inline", mr: 1, fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                                secondaryTypographyProps={{
                                                    component: "span",
                                                    sx: { display: "inline", fontFamily: "'Open Sans', sans-serif" },
                                                }}
                                            />
                                        </ListItem>
                                    </List>


                                    {allSelected.length > 0 && (
                                        <>
                                            <Divider sx={{ my: 2 }} />
                                            {guestServices.map((serviceIds, guestIndex) => {
                                                if (!serviceIds || serviceIds.length === 0) return null;

                                                const selectedTreatments = treatments.filter((t) =>
                                                    serviceIds.includes(t.id)
                                                );

                                                if (selectedTreatments.length === 0) return null;

                                                return (
                                                    <Box key={guestIndex} sx={{ mb: 2 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ fontWeight: 600, mb: 1 }}
                                                        >
                                                            Guest {guestIndex + 1}:
                                                        </Typography>
                                                        {selectedTreatments.map((t) => (
                                                            <Stack
                                                                key={t.id}
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                sx={{ mb: 0.5 }}
                                                            >
                                                                <Typography variant="body2">{t.name}</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                                    {t.price.toLocaleString()} ₫
                                                                </Typography>
                                                            </Stack>
                                                        ))}
                                                    </Box>
                                                );
                                            })}

                                            <Divider sx={{ my: 2 }} />
                                            <Stack spacing={1}>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                        {t('prices.totalPrice')}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                        {totalVND.toLocaleString()} ₫ ($
                                                        {Number(totalUSD || 0).toFixed(2)})
                                                    </Typography>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    sx={{ color: "green" }}
                                                >
                                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                        {t('prices.discount')}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                        - {discountVND.toLocaleString()} ₫ ($
                                                        {discountUSD.toFixed(2)})
                                                    </Typography>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 700, color: "#9e2265" }}
                                                    >
                                                        {t('prices.totalAfter')}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 700, color: "#9e2265" }}
                                                    >
                                                        {finalVND.toLocaleString()} ₫ (${finalUSD.toFixed(2)})
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </>
                                    )}
                                </Box>
                            </Collapse>
                        </Paper>
                    </Grid>

                    {/* Main Content */}
                    <Grid item xs={16} md={8} ref={mainContentRef}>

                        <Stack spacing={0} sx={{
                            paddingRight: 2,
                            "& .MuiCard-root, & .MuiPaper-root": {
                                boxShadow: "none",
                                backgroundColor: "transparent",
                                border: "none",
                            },
                        }}>
                            {/* Guest Services */}
                            {Array.from({ length: numberOfGuests }, (_, index) => (
                                <Card key={index} sx={{ p: 0 }}>
                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#594a39', fontFamily: "'Open Sans', sans-serif", }}>
                                        {t('booking.selectTreatmentForGuest')} {index + 1}
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        label={`${t('booking.guest')} ${index + 1} `}
                                        value={getSelectedTreatmentsText(
                                            guestServices[index] || []
                                        )}
                                        onClick={() => toggleGuestOpen(index)}
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <KeyboardArrowDown />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            borderRadius: 0,
                                            cursor: "pointer",
                                            "& .MuiInputLabel-root": {
                                                color: "#888",
                                                fontFamily: "'Open Sans', sans-serif",
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#9e2265",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 0,
                                                "& fieldset": {
                                                    borderColor: "#ccc",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#9e2265",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#9e2265",
                                                },
                                            }
                                        }}
                                    />

                                    <Dialog
                                        open={guestOpen[index]}
                                        onClose={() => toggleGuestOpen(index)}
                                        maxWidth="md"
                                        fullWidth
                                        sx={{ borderRadius: 0 }}
                                    >
                                        <DialogTitle>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography variant="h6"
                                                    sx={{
                                                        fontFamily: "'Open Sans', sans-serif",
                                                        color: '#9e2265',
                                                        fontSize: '20',
                                                        fontWeight: 600,
                                                    }}>
                                                    {t('booking.selectTreatment')}
                                                </Typography>
                                                <IconButton onClick={() => toggleGuestOpen(index)}>
                                                    <Close />
                                                </IconButton>
                                            </Stack>
                                        </DialogTitle>
                                        <DialogContent>
                                            {treatmentsLoading ? (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                                                    <CircularProgress />
                                                </Box>
                                            ) : (
                                                treatments.map((treatment) => (
                                                    <Paper
                                                        key={treatment.id}
                                                        sx={{
                                                            p: 1,
                                                            mb: 2,
                                                            border: (guestServices[index] || []).includes(
                                                                treatment.id
                                                            )
                                                                ? "1px solid #9e2265"
                                                                : "1px solid #e0e0e0",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                        >
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography 
                                                                    variant="h6" 
                                                                    onClick={() => toggleGuestService(index, treatment.id)}
                                                                    sx={{ 
                                                                        mb: 1, 
                                                                        fontFamily: "'Open Sans', sans-serif",
                                                                        cursor: "pointer",
                                                                        "&:hover": {
                                                                            color: "#9e2265",
                                                                        },
                                                                    }}
                                                                >
                                                                    {treatment.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                    sx={{ mb: 1, fontFamily: "'Open Sans', sans-serif", }}
                                                                >
                                                                    {treatment.description}
                                                                </Typography>
                                                                <Stack direction="row" spacing={2}>
                                                                    <Typography variant="body2" sx={{ fontFamily: "'Open Sans', sans-serif", }}>
                                                                        {treatment.duration} {t('booking.minutes')}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{ fontWeight: 600, fontFamily: "'Open Sans', sans-serif", }}
                                                                    >
                                                                        {treatment.price.toLocaleString()} ₫ ($
                                                                        {treatment.priceUSD})
                                                                    </Typography>
                                                                </Stack>
                                                            </Box>
                                                            <Checkbox
                                                                checked={(guestServices[index] || []).includes(
                                                                    treatment.id
                                                                )}
                                                                onChange={() =>
                                                                    toggleGuestService(index, treatment.id)
                                                                }
                                                                sx={{
                                                                    color: "#9e2265",
                                                                    "&.Mui-checked": {
                                                                        color: "#9e2265",
                                                                    },
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Paper>
                                                ))
                                            )}
                                        </DialogContent>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => toggleGuestOpen(index)}
                                            sx={{
                                                borderRadius: 0,
                                                fontFamily: "'Open Sans', sans-serif",
                                                fontSize: '24px',
                                                mt: 2,
                                                bgcolor: "#9e2265",
                                                "&:hover": {
                                                    bgcolor: "#d83b8a",
                                                },
                                            }}
                                        >
                                            {t('done')}
                                        </Button>
                                    </Dialog>

                                    {index === 0 && numberOfGuests > 1 && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={applyToAll}
                                                    onChange={handleApplyToAll}
                                                    sx={{
                                                        color: "#9e2265",
                                                        "&.Mui-checked": {
                                                            color: "#9e2265",
                                                        },
                                                    }}
                                                />
                                            }
                                            label={<span style={{ fontFamily: "'Open Sans', sans-serif" }}>
                                                {t('booking.applyThisSameTreatmentForAllGuests')}
                                            </span>}

                                            sx={{ mt: 2 }}
                                        />
                                    )}
                                </Card>
                            ))}

                            {/* Contact Info */}
                            <Card
                                ref={cardInfoRef}
                                sx={{
                                    py: 3,
                                    cursor: "pointer",
                                    "& .MuiInputLabel-root": {
                                        color: "#888",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#9e2265",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 0,
                                        "& fieldset": {
                                            borderColor: "#ccc",
                                            borderRadius: 0,
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#9e2265",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#9e2265",
                                        },
                                    }
                                }}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#594a39', fontFamily: "'Open Sans', sans-serif", }}>
                                    {t('cardInfor.title')}
                                </Typography>

                                <Stack spacing={3}>
                                    <TextField
                                        sx={{ borderRadius: 0 }}
                                        fullWidth
                                        required
                                        label={t('cardInfor.fullName')}
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fullName: e.target.value })
                                        }
                                        onBlur={() => handleBlur("fullName")}
                                        error={!!errors.fullName}
                                        helperText={errors.fullName}
                                    />

                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                                        <Box sx={{ position: "relative", flex: 1, borderRadius: 0 }}>
                                            <Stack direction="row" spacing={1}>
                                                <TextField
                                                    value={dialCode}
                                                    onClick={() => setShowDialPicker(!showDialPicker)}
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: (
                                                            <InputAdornment position="start" >
                                                                <KeyboardArrowDown />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    inputRef={anchorRef}
                                                    sx={{
                                                        width: 130,
                                                        cursor: "pointer",
                                                        borderRadius: 0,
                                                        '& .MuiInputBase-root': {
                                                            paddingRight: '0px',
                                                        },
                                                        '& .MuiInputBase-input': {
                                                            paddingRight: '8px',
                                                        }
                                                    }}
                                                />
                                                <TextField
                                                    sx={{ borderRadius: 0, }}
                                                    fullWidth
                                                    required
                                                    label={t('cardInfor.phone')}
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            phone: e.target.value,
                                                        })
                                                    }
                                                    onBlur={() => handleBlur("phone")}
                                                    error={!!errors.phone}
                                                    helperText={errors.phone}
                                                />
                                            </Stack>

                                            <Popper
                                                open={showDialPicker}
                                                anchorEl={anchorRef.current}
                                                placement="bottom-start"
                                                sx={{ zIndex: 9999 }}
                                                modifiers={[
                                                    {
                                                        name: 'offset',
                                                        options: {
                                                            offset: [0, 8],
                                                        },
                                                    },
                                                ]}
                                            >
                                                <ClickAwayListener onClickAway={() => setShowDialPicker(false)}>
                                                    <Paper
                                                        elevation={8}
                                                        sx={{
                                                            maxHeight: 500,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                                            bgcolor: "white",
                                                            border: "1px solid #e0e0e0",
                                                            borderRadius: 0,
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {/* Selected Section */}
                                                        {dialCode && (
                                                            <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                                                                <Typography

                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{ mb: 1, display: "block", fontFamily: "'Open Sans', sans-serif", }}
                                                                >
                                                                    Selected
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "space-between",
                                                                        p: 1.5,
                                                                        bgcolor: "#f5f5f5",
                                                                        borderRadius: 0,
                                                                    }}
                                                                >
                                                                    <Typography variant="body2" fontWeight={500}>
                                                                        {allCountries.find(c => `(+${c.dialCode})` === dialCode)?.name} {dialCode}
                                                                    </Typography>
                                                                    <Typography sx={{ color: "#9c27b0", fontWeight: "bold" }}>
                                                                        ✓
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        )}

                                                        {/* Search Box */}
                                                        <Box sx={{ p: 2, borderBottom: "1px solid #9e2265" }}>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                placeholder="Country or region"
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <SearchIcon sx={{ color: "#9e2265" }} />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                sx={{
                                                                    "& .MuiOutlinedInput-root": {
                                                                        bgcolor: "white",
                                                                        borderRadius: 0,
                                                                        "& fieldset": {
                                                                            borderColor: "#e0e0e0",
                                                                        },
                                                                        "&:hover fieldset": {
                                                                            borderColor: "#9e2265",
                                                                        },
                                                                        "&.Mui-focused fieldset": {
                                                                            borderColor: "#9e2265",
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        </Box>

                                                        {/* Country List  */}
                                                        <Box sx={{ overflowY: "auto", flex: 1 }}>
                                                            {Object.keys(groupedCountries)
                                                                .sort()
                                                                .map((letter) => (
                                                                    <Box key={letter}>
                                                                        {/* Section Header */}
                                                                        <Box
                                                                            sx={{
                                                                                px: 2,
                                                                                py: 1,
                                                                                bgcolor: "#f5f5f5",
                                                                                position: "sticky",
                                                                                top: 0,
                                                                                zIndex: 1,
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant="subtitle2"
                                                                                sx={{ fontWeight: 600 }}
                                                                            >
                                                                                {letter}
                                                                            </Typography>
                                                                        </Box>

                                                                        {/* Country Items */}
                                                                        {groupedCountries[letter].map((country) => {
                                                                            const countryCode = `(+${country.dialCode})`;
                                                                            const isSelected = dialCode === countryCode;

                                                                            return (
                                                                                <Box
                                                                                    key={country.iso2}
                                                                                    onClick={() => {
                                                                                        setDialCode(countryCode);
                                                                                        setShowDialPicker(false);
                                                                                        setSearchTerm("");
                                                                                    }}
                                                                                    sx={{
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "space-between",
                                                                                        px: 2,
                                                                                        py: 1.5,
                                                                                        cursor: "pointer",
                                                                                        bgcolor: isSelected ? "#f5f5f5" : "transparent",
                                                                                        "&:hover": {
                                                                                            bgcolor: "#f5f5f5",
                                                                                        },
                                                                                    }}
                                                                                >
                                                                                    <Typography variant="body2">
                                                                                        {country.name}{" "}
                                                                                        <Typography
                                                                                            component="span"
                                                                                            variant="body2"
                                                                                            color="text.secondary"
                                                                                        >
                                                                                            (+{country.dialCode})
                                                                                        </Typography>
                                                                                    </Typography>
                                                                                    {isSelected && (
                                                                                        <Typography
                                                                                            sx={{
                                                                                                color: "#9c27b0",
                                                                                                fontWeight: "bold"
                                                                                            }}
                                                                                        >
                                                                                            ✓
                                                                                        </Typography>
                                                                                    )}
                                                                                </Box>
                                                                            );
                                                                        })}
                                                                    </Box>
                                                                ))}
                                                        </Box>
                                                    </Paper>
                                                </ClickAwayListener>
                                            </Popper>
                                        </Box>
                                    </Stack>

                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <Box sx={{ flex: 1, borderRadius: 0 }}>
                                            <Stack direction="row" spacing={1}>
                                                <TextField
                                                    value={formData.socialApp || "Social"}
                                                    onClick={handleClick}
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <KeyboardArrowDown />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{
                                                        width: 170,
                                                        cursor: "pointer",
                                                        borderRadius: 0,
                                                        '& .MuiInputBase-root': {
                                                            paddingRight: '0px',
                                                        },
                                                        '& .MuiInputBase-input': {
                                                            paddingRight: '8px',
                                                        }
                                                    }}
                                                />
                                                <TextField
                                                    sx={{ borderRadius: 0, }}
                                                    fullWidth
                                                    required
                                                    label={t('cardInfor.media')}
                                                    value={formData.socialApp}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            socialApp: e.target.value,
                                                        })
                                                    }
                                                    onBlur={() => handleBlur("socialAccountId")}
                                                    error={!!errors.socialAccountId}
                                                    helperText={errors.socialAccountId}
                                                />
                                            </Stack>

                                            {anchorEl && (
                                                <Popper
                                                    open={open}
                                                    anchorEl={anchorEl}
                                                    placement="bottom-start"
                                                    style={{ zIndex: 2100 }}
                                                >
                                                    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                                        <Box
                                                            sx={{
                                                                p: 2,
                                                                bgcolor: "white",
                                                                boxShadow: 3,
                                                                borderRadius: 0,
                                                                minWidth: 240,
                                                            }}
                                                        >
                                                            <Grid container spacing={1}>
                                                                {socialApps.map((app) => (
                                                                    <Grid item xs={6} key={app.name}>
                                                                        <Box
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, socialApp: app.name });
                                                                                setAnchorEl(null);
                                                                            }}
                                                                            sx={{
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                gap: 1,
                                                                                p: 1,
                                                                                cursor: "pointer",
                                                                                borderRadius: 0,
                                                                                "&:hover": { bgcolor: "#f5f5f5" },
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                component="img"
                                                                                src={app.icon}
                                                                                alt={app.name}
                                                                                sx={{ width: 32, height: 32 }}
                                                                            />
                                                                            <Typography variant="body2">{app.name}</Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        </Box>
                                                    </ClickAwayListener>
                                                </Popper>
                                            )}
                                        </Box>
                                    </Stack>

                                    <TextField
                                        sx={{ borderRadius: 0, fontFamily: "'Open Sans', sans-serif", }}
                                        fullWidth
                                        required
                                        label={t('cardInfor.email')}
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        onBlur={() => handleBlur("email")}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />

                                    <TextField
                                        sx={{ borderRadius: 0, }}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label={t('cardInfor.additionalRequest')}
                                        placeholder={t('placeholder.title')}
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({ ...formData, content: e.target.value })
                                        }
                                    />
                                </Stack>
                            </Card>

                            {/* Cancellation Policy */}
                            <Card sx={{ py: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 2, fontWeight: 600, color: '#594a39', fontFamily: "'Open Sans', sans-serif", }}
                                >
                                    {t('policy.title')}
                                </Typography>

                                <Stack spacing={2}>
                                    <Typography variant="body2" sx={{ fontFamily: "'Open Sans', sans-serif", }}>
                                        <strong>{t('policy.line1')}</strong>
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Open Sans', sans-serif", }} >{t('policy.line2')}</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Open Sans', sans-serif", }}>{t('policy.line3')}</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Open Sans', sans-serif", }}>{t('policy.line4')}</Typography>
                                </Stack>
                            </Card>
                            {/* Confirm Button */}
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={!isBookingInfoComplete || isLoading}
                                    sx={{
                                        fontFamily: "'Open Sans', sans-serif",
                                        bgcolor: "#9e2265",
                                        color: "white",
                                        fontWeight: 600,
                                        px: 15,
                                        py: 2,
                                        fontSize: "1rem",
                                        borderRadius: 0,
                                        textTransform: "uppercase",
                                        "&:hover": {
                                            bgcolor: "#d83b8a",
                                        },
                                    }}
                                >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : t('confirm')}
                                </Button>
                            </Box>
                            {bookingError && (
                                <Typography
                                    color="error"
                                    align="center"
                                    sx={{ mt: 1.5, fontFamily: "'Open Sans', sans-serif", }}
                                >
                                    {bookingError}
                                </Typography>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </Box>

    );
}