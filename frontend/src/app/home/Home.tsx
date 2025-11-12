'use client'

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Modal,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    OutlinedInput,
    useTheme,
    useMediaQuery,
    Stack,
    Avatar,
    Rating
} from "@mui/material";
import FormBooking from "@components/FormBooking";
import {
    Close,
    CalendarToday,
    KeyboardArrowDown,
    Instagram,
    LocationOn,
    Groups,
    Spa
} from "@mui/icons-material";
import { GlobalStyles } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import 'swiper/css';
import 'swiper/css/pagination';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CustomDatePicker from "@/components/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import 'swiper/css';
import 'swiper/css/pagination';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



// Types
interface Review {
    image: string;
    alt: string;
    quote: string;
    author: string;
    location: string;
    mapsLink: string;
    index: number;
}

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

// interface Product {
//     image: string;
//     duration: string;
//     price: string;
//     title: string;
//     desc: string;
// }

interface FormData {
    spa: string;
    date: Date | null;
    time: string;
    people: string;
}
export interface Product {
    id: number;
    image: string;
    title: string;
    duration: string;
    price: string;
    description: string;
}


export default function HomePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const router = useRouter();

    // States
    const { t, i18n } = useTranslation('common');
    const [activeBannerIndex, setActiveBannerIndex] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState("");
    const [showAllAbout, setShowAllAbout] = useState(false);
    const [openTimePicker, setOpenTimePicker] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isTimeFocused, setIsTimeFocused] = React.useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [openBooking, setOpenBooking] = useState(false);

    const handleOpenBooking = () => setOpenBooking(true);
    const handleCloseBooking = () => setOpenBooking(false);

    const handleBookNow = (product: Product) => {
        setSelectedProduct(product);
        setShowBookingForm(true);
    };

    const handleCloseForm = () => {
        setShowBookingForm(false);
        setSelectedProduct(null);
    };




    const [formData, setFormData] = useState<FormData>({
        spa: t('booking.spaName'),
        date: null,
        time: "",
        people: "",
    });

    // Update spa name when language changes
    // useEffect(() => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         spa: t('booking.spaName'),
    //     }));
    // }, [i18n.language, t]);


    // Data
    const bannerImages = [
        { src: "/images/image_5.jpg", alt: "SEN SPA Da Nang Banner 1" },
        { src: "/images/image_8.jpg", alt: "SEN SPA Da Nang Banner 2" },
        { src: "/images/image_3.jpg", alt: "SEN SPA Da Nang Banner 3" },
        { src: "/images/image_1.jpg", alt: "SEN SPA Da Nang Banner 4" },
        { src: "/images/image_9.jpg", alt: "SEN SPA Da Nang Banner 5" },
    ];
    const reviews: Review[] = [
        {
            image: '/images/image_12.png',
            alt: 'Ben Joseph Evangelista',
            quote: 'This was such an amazing experience from start to finish. Massage quality is great with the perfect pressure applied. Very good location and there is a discount of 10% during mornings. Highly recommended for rejuvenation and Vietnamese hospitality',
            author: 'Ben Joseph Evangelista',
            location: 'USA - May 2025',
            mapsLink: 'https://maps.app.goo.gl/LMHV3hnKKM3Hh9VY9',
            index: 0,
        },
        {
            image: '/images/image_6.png',
            alt: 'Tessa Sng',
            quote: 'I booked 90-minute body massages for me and my friends. It was lovely, and they released our tension, and we all managed to relax and even doze off during the session. We were greeted with warm towels to freshen up and brought to our room for the massage. The room is very clean and we had a wonderful time. The location is near Han market, which makes it attractive to pop by after your shopping. Price is attractive, too. I\'m definitely recommending this place!',
            author: 'Tessa Sng',
            location: 'Seoul, South Korea - May 2025',
            mapsLink: 'https://maps.app.goo.gl/5WERh37HPrRgZDJZ9',
            index: 1,
        },
        {
            image: '/images/image_15.png',
            alt: 'Mae Ramos',
            quote: 'We went to this spa to relax while waiting for our evening flight in Da Nang. This is near our hotel and the ambiance looks really nice. The staffs are all nice, providing some tea and snacks while we wait and also after our massage. We feel so relaxed and great afterwards. I highly recommend this spa.',
            author: 'Mae Ramos',
            location: 'Philippines - May 2025',
            mapsLink: 'https://maps.app.goo.gl/cmY3bjjSwLfyPcqc9',
            index: 2,
        },
        {
            image: '/images/image_16.png',
            alt: 'Katrina Lewis',
            quote: 'The best massage in Vietnam!! Super friendly, great English and was a beautiful facilities. Would highly recommend!! A++ (thank you to the therapist "Van" you were amazing)) :-)',
            author: 'Katrina Lewis',
            location: 'Australia - May 2025',
            mapsLink: 'https://maps.app.goo.gl/zLVPDDhgXcDBaPh27',
            index: 3,
        },
        {
            image: '/images/image_21.png',
            alt: 'Patricia H.',
            quote: 'Wonderful Experience at Sen Spa! I had the Back and Shoulder Therapy at Sen Spa in Da Nang, and it was amazing! The staff were warm and professional, and the atmosphere was incredibly relaxing. The massage was perfect—great pressure, skilled techniques, and total relaxation. A lovely touch was the delicious tea served before and after the treatment. I left feeling refreshed and completely tension-free. Highly recommend! I will definitely be back.',
            author: 'Patricia H.',
            location: 'Hamburg, Germany - February 2025',
            mapsLink: 'https://maps.app.goo.gl/choVqM7vZFqVufLb8',
            index: 4,
        },
        {
            image: '/images/image_6.png',
            alt: 'Ting Fung Lam',
            quote: 'The experience was amazing! Therapist was great and the foot massage we had was refreshing! Highly recommend to those we want to relax after a whole day walk.',
            author: 'Ting Fung Lam',
            location: 'Hong Kong - March 2025',
            mapsLink: 'https://maps.app.goo.gl/rAhcbrVqRH9m5yis6',
            index: 5,
        },
        {
            image: '/images/image_12.png',
            alt: 'Agnieszka Chrusciel',
            quote: 'It was such a nice time spent there... I was warmly welcome and could think what I need and want with a nice tea in my hand. Then the lady who did the massage was paying attention to everything I\'ve noted at my massage request and the pressure was just perfect! I needed to feel so cared for.. and after the massage I\'m brand new person 😁',
            author: 'Agnieszka Chrusciel',
            location: 'Peru - March 2025',
            mapsLink: 'https://maps.app.goo.gl/bYv3C9uhMHtk3ff39',
            index: 6,
        },
        {
            image: '/images/image_7.png',
            alt: 'Jamie Lee',
            quote: 'What a great spa experience at Da Nang. Friendly and accommodating receptionist. The massage is just so comfortable. I really enjoyed it a lot.',
            author: 'Jamie Lee',
            location: 'United Kingdom - March 2025',
            mapsLink: 'https://maps.app.goo.gl/CahN7DkRvb1RL9Rp6',
            index: 7,
        },
        {
            image: '/images/image_9.png',
            alt: 'Jessie Fa',
            quote: 'The ladies at the front desk were very attentive and helpful! Booking our massage packages over the phone and through WhatsApp was easy. They responded very promptly and also spoke fluent English. The place was very clean and relaxing. Massage was lovely and the massage therapists checked in frequently to make sure we were happy with the pressure. We felt very comfortable and enjoyed coming here 😊',
            author: 'Jessie Fa',
            location: 'Australia - December 2024',
            mapsLink: 'https://maps.app.goo.gl/AaBA4Qq6nAPpWVXn8',
            index: 8,
        },
        {
            image: '/images/image_20.png',
            alt: 'shreya mittal',
            quote: 'Really enjoyed the experience. Very friendly and warm reception served with tea and cookies. Later the 30 minutes head and foot massage were heavenly after a long tiring day. Prices were justified with the quality of service we get there. Highly recommend.',
            author: 'shreya mittal',
            location: 'United Kingdom - December 2024',
            mapsLink: 'https://maps.app.goo.gl/sY4Uq1BbiYp9txfx6',
            index: 9,
        },
    ];

    const features: Feature[] = [
        {
            icon: <Groups sx={{ fontSize: 40, color: "#9b165d" }} />,
            title: t('home.whyChooseUs.features.couples.title'),
            description: t('home.whyChooseUs.features.couples.description'),
        },
        {
            icon: <LocationOn sx={{ fontSize: 40, color: "#9b165d" }} />,
            title: t('home.whyChooseUs.features.location.title'),
            description: t('home.whyChooseUs.features.location.description'),
        },
        {
            icon: <Spa sx={{ fontSize: 40, color: "#9b165d" }} />,
            title: t('home.whyChooseUs.features.therapists.title'),
            description: t('home.whyChooseUs.features.therapists.description'),
        },
    ];

    const products = [
        {
          id: 1,
          image: '/images/5.png',
          title: t('products.1.title'),
          duration: t('products.1.duration'),
          description: t('products.1.description'),
          price: '550,000 ₫ ($20.37)',
        },
        {
            id: 2,
            image: '/images/8.png',
            title: t('products.2.title'),
            duration: t('products.2.duration'),
            description: t('products.2.description'),
            price: '550,000 ₫ ($20.37)',
        },
        {
            id: 3,
            image: '/images/16.png',
            title: t('products.3.title'),
            duration: t('products.3.duration'),
            description: t('products.3.description'),
            price: '580,000 ₫ ($21.48)',
        },
        {
            id: 4,
            image: '/images/32.png',
            title: t('products.4.title'),
            duration: t('products.4.duration'),
            description: t('products.4.description'),
            price: '690,000 ₫ ($25.56)',
        },
        {
            id: 5,
            image: '/images/13.png',
            title: t('products.5.title'),
            duration: t('products.5.duration'),
            description: t('products.5.description'),
            price: '580,000 ₫ ($21.48)',
        },
        {
            id: 6,
            image: '/images/20.png',
            title: t('products.6.title'),
            duration: t('products.6.duration'),
            description: t('products.6.description'),
            price: '290,000 ₫ ($10.74)',
        },
        {
            id: 7,
            image: '/images/18.png',
            title: t('products.7.title'),
            duration: t('products.7.duration'),
            description: t('products.7.description'),
            price: '720,000 ₫ ($26.67)',
        },
        {
            id: 8,
            image: '/images/25.png',
            title: t('products.8.title'),
            duration: t('products.8.duration'),
            description: t('products.8.description'),
            price: '450,000 ₫ ($16.67)',
        },
        {
            id: 9,
            image: '/images/21.png',
            title: t('products.9.title'),
            duration: t('products.9.duration'),
            description: t('products.9.description'),
            price: '450,000 ₫ ($16.67)',
        },
        {
            id: 10,
            image: '/images/11.png',
            title: t('products.10.title'),
            duration: t('products.10.duration'),
            description: t('products.10.description'),
            price: '550,000 ₫ ($20.37)',
        }
    ];
    const guestImages = [
        {
            id: 1,
            src: '/images/image_10.png',
            alt: 'Happy guest at SEN SPA Da Nang',
            href: 'https://www.instagram.com/senspadanang21/#',
            large: true
        },
        {
            id: 2,
            src: '/images/image_36.jpg',
            alt: 'Guest enjoying spa treatment',
            href: 'https://www.instagram.com/senspadanang21/#',
        },
        {
            id: 3,
            src: '/images/image_34.jpg',
            alt: 'Relaxed guest after massage',
            href: 'https://www.instagram.com/senspadanang21/#',
        },
        {
            id: 4,
            src: '/images/image_35.jpg',
            alt: 'Happy friends at spa',
            href: 'https://www.instagram.com/senspadanang21/#',
        },
        {
            id: 5,
            src: '/images/image_38.jpg',
            alt: 'Happy experience at spa',
            href: 'https://www.instagram.com/senspadanang21/#',
        },
    ];

    const locations = [
        {
            name: "SEN SPA Da Nang",
            address: "21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang",
        },
    ];



    const guests = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

    // Handlers
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.spa || !formData.date || !formData.time || !formData.people) {
            alert(t('booking.fillAllFields'));
            return;
        }

        localStorage.setItem(
            "bookingData",
            JSON.stringify({
                spa: formData.spa,
                date: formData.date?.toISOString(),
                time: formData.time,
                people: formData.people,
            })
        );
        router.push("/booking");
    };

    const handleInputChange = (field: keyof FormData, value: string | Date | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCloseBookingModal = () => {
        setShowBookingModal(false);
        setSelectedTreatment("");
    };
    const StyledSwiper = styled(Swiper)({

    });
    const selectedDate = formData.date;
    // Filter times based on selected date
    const filteredTimes = React.useMemo(() => {
        const now = new Date();

        const times = {
            Morning: ['10:00', '10:30', '11:00', '11:30'],
            Afternoon: [
                '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
            ],
            Evening: ['19:00', '19:30', '20:00', '20:30'],
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
    // Banner auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBannerIndex((prev) => (prev + 1) % bannerImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const largeImage = guestImages.find(img => img.large);
    const smallImages = guestImages.filter(img => !img.large);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flexGrow: 1 }}>
                {/* Hero Banner Section */}
                <Box sx={{ position: "relative", height: { xs: "50vh", md: "100vh" }, overflow: "hidden",   maxHeight: '860px', }}>
                    <React.Fragment>
                        <GlobalStyles
                            styles={{
                                '.my-swiper .swiper-pagination-bullet': {
                                    background: '#ffffffff',
                                    width: 10,
                                    height: 10,
                                    borderRadius: 999,
                                    margin: '0 4px',
                                },
                                '.my-swiper .swiper-pagination-bullet-active': {
                                    background: '#ffffffff',
                                },
                            }}
                        />
                        <Swiper
                            className="my-swiper"
                            modules={[Autoplay, Pagination]}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            style={{ height: '100%' }}
                        >
                            {bannerImages.map((image, i) => (
                                <SwiperSlide key={i}>
                                    <Box sx={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                      
                                        // '@media (max-width: 600px)': {
                                        //     height: '45vh',
                                        // },
                                    }}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            style={{


                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }} />
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </React.Fragment>

                    {/* Text trên pagination */}
                    <Box
                        sx={{
                            
                            position: "absolute",
                            bottom: "80px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            textAlign: "center",
                            color: "white",
                            zIndex: 5,
                            width: "90%",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "'Open Sans', sans-serif",
                                fontSize: { xs: "1rem", md: "1.5rem" },
                                fontWeight: 300,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            }}
                        >
                            {t('home.heroBanner')}
                        </Typography>
                    </Box>

                    {/* Booking Form  */}
                    <Container
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                            width: "calc(100% - 32px)",
                            maxWidth: "none",
                            px: 2,
                            display: { xs: "none", md: "block" },
                            borderRadius: 0,

                        }}
                    >
                        <Card
                            sx={{
                                p: 5,
                                borderRadius: 0,
                                boxShadow: 4,
                                background: "white",
                            }}
                        >
                            <form onSubmit={handleFormSubmit}>
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    alignItems="center"
                                    sx={{ width: "100%" }}
                                >
                                    {/* Location */}
                                    <Box sx={{ flex: 1 }}>
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
                                                    fontSize: "1.1rem",
                                                },
                                                "& .MuiInputLabel-root.Mui-focused": {
                                                    color: "#9e2265",
                                                },
                                            }}
                                        >
                                            <InputLabel sx={{py: 0.1}}>{t('booking.location')}</InputLabel>
                                            <Select
                                                value={formData.spa}
                                                label={t('booking.location')}
                                                onChange={(e) => handleInputChange("spa", e.target.value)}
                                                sx={{ fontSize: "1.1rem" }}
                                                renderValue={(selected) => selected || ""}
                                            >
                                                {locations.map((location, index) => (
                                                    <MenuItem key={index} value={location.name}>
                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Typography sx={{ fontWeight: 600, fontSize: "1.05rem", color: "text.primary" }}>
                                                                {location.name}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: "0.9rem", color: "text.secondary", mt: 0.2 }}>
                                                                {location.address}
                                                            </Typography>
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>


                                        </FormControl>
                                    </Box>

                                    {/* Date */}
                                    <Box sx={{ flex: 1, borderRadius: 0 }}>
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
                                    <Box sx={{ flex: 1 }}>
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
                                    <Box sx={{ flex: 1 }}>
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
                                                    py: 0.1,
                                                    color: isFocused ? "text.secondary" : "text.secondary",
                                                    backgroundColor: (isFocused || !!formData.people) ? "white" : "transparent",
                                                    px: (isFocused || !!formData.people) ? 0.5 : 0,
                                                }}
                                            >
                                                {t('booking.guest')}
                                            </InputLabel>

                                            <Select
                                                value={formData.people}
                                                onOpen={() => setIsFocused(true)}
                                                onClose={() => {
                                                    if (!formData.people) setIsFocused(false);
                                                }}
                                                onChange={(e) => handleInputChange("people", e.target.value)}
                                                sx={{
                                                    fontSize: "1.1rem",
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
                                        </FormControl>
                                    </Box>

                                    {/* Button */}
                                    <Box sx={{ width: "200px" }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                borderRadius: 0,
                                                height: "64px",
                                                backgroundColor: "#9e2265",
                                                "&:hover": {
                                                    backgroundColor: "#d83b8a",
                                                },
                                                fontWeight: 600,
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            {t('booking.bookNow')}
                                        </Button>
                                    </Box>
                                </Stack>
                            </form>
                        </Card>
                    </Container>

                    {/* Mobile Booking Button */}
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={handleOpenBooking}
                        sx={{
                            borderRadius: 0,
                            display: { xs: "flex", md: "none" },
                            position: "absolute",
                            top: "30%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            borderColor: "#fff",
                            borderWidth: 2,
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            px: 4,
                            py: 1.5,
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.2)",
                                borderColor: "#fff",
                            },
                            zIndex: 20,
                        }}
                    >
                        {t('booking.bookNow')}
                    </Button>

                </Box>

                {/* Hero Content */}
                <Box
                    sx={{
                        maxHeight: 160,
                        backgroundColor: "#9e2265",
                        color: "white",
                        py: { xs: 2, md: 3 },
                        textAlign: "center",
                    }}
                >
                    <Container maxWidth="lg" sx={{p: 2}}>
                        <ThemeProvider theme={theme}>
                            <Typography
                                variant="h2"
                                component="h3"
                                sx={{
                                    mb: 0,
                                    fontFamily: "'MTD Valky', serif",
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                    fontSize: { xs: "1.6rem", md: "3rem" },
                                    textTransform: "uppercase",
                                    color: "#fff",
                                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",

                                }}
                            >
                                {t('footer.spaName')}
                            </Typography>
                        </ThemeProvider>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "'Open Sans', sans-serif",
                                fontWeight: 300,
                                fontSize: { xs: "1rem", md: "1.5rem" },
                                letterSpacing: "0.075em",
                                lineHeight: 1.3,
                            }}
                        >
                            {t('home.subtitle')}
                        </Typography>
                    </Container>
                </Box>

                {/* About Section */}
                <Box sx={{ py: 6, bgcolor: "background.paper" }}>
                    <Container>
                        {/* Bọc tất cả Typography trong Box có clamp */}
                        <Box
                            sx={{
                                fontFamily: "'Open Sans', sans-serif",
                                textAlign: "center",
                                display: "-webkit-box",
                                WebkitLineClamp: showAllAbout ? "unset" : 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Open Sans', sans-serif", fontSize: 16 }}>
                                {t('home.about.founded')}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Open Sans', sans-serif", fontSize: 16 }}>
                                {t('home.about.location')}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Open Sans', sans-serif", fontSize: 16 }}> 
                                {t('home.about.services')}
                            </Typography>
                        </Box>

                        {isMobile && (
                            <Box textAlign="center">
                                <Button onClick={() => setShowAllAbout(!showAllAbout)} sx={{ color: '#9e2265' }}>
                                    {showAllAbout ? t('home.about.viewLess') : t('home.about.viewAll')}
                                </Button>
                            </Box>
                        )}
                    </Container>
                </Box>


                {/* Featured Products Section */}
                <Box sx={{ py: 4, bgcolor: "grey.50" }}>
                    <Container maxWidth={false} sx={{ maxWidth: '1250px', mx: 'auto', px: { xs: 2, md: 4 } }}>
                        <Box textAlign="center" sx={{ mb: 4 }}>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h4" component="h2" gutterBottom
                                    sx={{
                                        mb: 0,
                                        fontFamily: "'MTD Valky', serif",
                                        fontWeight: 500,
                                        letterSpacing: "0.05em",
                                        fontSize: { xs: "1.5rem", md: "2.5rem" },
                                        textTransform: "uppercase",
                                        color: "#000000ff",
                                        textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                    }}>
                                    {t('home.featuredProducts.title')}
                                </Typography>
                            </ThemeProvider>
                            <Typography variant="body1"
                                sx={{ color: "#000000ff", fontFamily: "'Open Sans', sans-serif", }}>
                                {t('home.featuredProducts.description')}
                            </Typography>
                        </Box>

                        <Swiper
                            spaceBetween={6}
                            slidesPerView={4}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 },
                            }}
                        >
                            {products.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <Card
                                        sx={{
                                            borderRadius: 0,
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            border: "none",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            // "&:hover": {
                                            //     transform: "translateY(-5px)",
                                            //     boxShadow: 6,
                                            // },
                                        }}
                                    >
                                        {/* Ảnh */}
                                        <CardMedia sx={{ height: 300, position: "relative" }}>
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    background: "rgba(62, 62, 62, 0.7)",
                                                    color: "white",
                                                    p: 1,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                                                    <Typography variant="body2" sx = {{fontFamily: "'Open Sans', sans-serif",}}>{product.duration}</Typography>
                                                </Box>
                                                <Typography variant="body1" sx={{ fontSize: 14 , fontFamily: "'Open Sans', sans-serif",}} >
                                                    {product.price}
                                                </Typography>
                                            </Box>
                                        </CardMedia>


                                        <CardContent
                                            sx={{
                                                flexGrow: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                p: 1,
                                                textAlign: "left",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                sx={{
                                                    fontFamily: "'Open Sans', sans-serif",
                                                    py: '4',
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    cursor: 'pointer',
                                                    // minHeight: 56,
                                                    fontSize: '18px',
                                                    "&:hover": {
                                                        color: "  #9e2265",
                                                    },
                                                }}
                                                onClick={() => handleBookNow(product)}
                                            >
                                                {product.title}
                                            </Typography>

                                            <Box component="ul" sx={{ pl: 1, m: 0, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                                                <li>
                                                    <Typography variant="body2" color="text.primary" sx={{fontFamily: "'Open Sans', sans-serif", fontSize: '14px',}}>
                                                        <strong>{t('home.featuredProducts.duration')}</strong> {product.duration}
                                                    </Typography>
                                                </li>

                                                <li>
                                                    <Typography variant="body2" color="text.primary" sx={{fontFamily: "'Open Sans', sans-serif", fontSize: '14px',}}>
                                                        <strong>{t('home.featuredProducts.price')}</strong> {product.price}
                                                    </Typography>
                                                </li>

                                                <li>
                                                    <Typography
                                                        variant="body2"
                                                        color="#333333ff"
                                                        sx={{
                                                            fontFamily: "'Open Sans', sans-serif", fontSize: '14px',
                                                            lineHeight: 1.4,
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {product.description}
                                                    </Typography>
                                                </li>
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>



                        <Box textAlign="center" sx={{ mt: 4 }}>
                            <Button variant="outlined" size="large" href="/menu"
                                sx={{
                                    fontFamily: "'Open Sans', sans-serif", fontSize: '15px',
                                    borderRadius: 0,
                                    height: "56px",
                                    borderColor: "#9e2265",
                                    color: "#9e2265",
                                    '&:hover': {
                                        backgroundColor: "#9e2265",
                                        color: "#fff",
                                        borderColor: "#9e2265",
                                    },
                                }}>
                                {t('home.featuredProducts.viewSpaMenu')}
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Testimonials Section */}
                <Box sx={{ py: 6, bgcolor: "background.paper" }}>
                    <Container>
                        <Box textAlign="center" sx={{ mb: 6 }}>
                            <Typography variant="h4" component="h2" gutterBottom
                                sx={{
                                    mb: 2,
                                    fontFamily: "'MTD Valky', serif",
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                                    textTransform: "uppercase",
                                    color: "#000000ff",
                                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                }}>
                                {t('home.testimonials.title')}
                            </Typography>
                            <Typography variant="body1" color="text.secondary"
                                sx={{ color: "#000000ff", fontFamily: "'Open Sans', sans-serif", }}>
                                {t('home.testimonials.description')}
                            </Typography>
                        </Box>
                        <React.Fragment>
                            <GlobalStyles
                                styles={{
                                    '.my-swiper .swiper-pagination-bullet': {
                                        background: '#898989ff',
                                        width: 10,
                                        height: 10,
                                        borderRadius: 999,
                                        margin: '0 4px',
                                    },
                                    '.my-swiper .swiper-pagination-bullet-active': {
                                        background: '#9b165d',
                                    },
                                }}
                            />
                            <Swiper
                                className="my-swiper"
                                modules={[Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                spaceBetween={30}
                                slidesPerView={1}
                                breakpoints={{
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                            >
                                {reviews.map((review) => (
                                    <SwiperSlide key={review.index}>
                                        <Card
                                            sx={{
                                                p: 4,
                                                pt: 6,
                                                height: "100%",
                                                backgroundColor: "#fff6fa",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                textAlign: "center",
                                                borderRadius: 0,
                                                // boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                                // transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                // "&:hover": {
                                                //     transform: "translateY(-4px)",
                                                //     boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                                                //},
                                            }}
                                        >
                                            {/* Avatar */}
                                            <Avatar
                                                src={review.image}
                                                alt={review.alt}
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    fontSize: 42,
                                                    fontWeight: "bold",
                                                    mb: 4,
                                                    mt: 0,
                                                }}
                                            />

                                            {/* Nội dung */}
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontFamily: "'Open Sans', sans-serif",
                                                    mb: 3,
                                                    fontSize: 15,
                                                    color: "text.primary",
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                {review.quote}
                                            </Typography>

                                            {/*Author*/}
                                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, fontFamily: "'Open Sans', sans-serif", }}>
                                                {review.author}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, fontFamily: "'Open Sans', sans-serif", }}>
                                                {review.location}
                                            </Typography>

                                            {/* Logo Google */}
                                            <Button
                                                href={review.mapsLink}
                                                target="_blank"
                                                rel="nofollow"
                                                sx={{ textTransform: "none" }}
                                            >
                                                <Image src="/images/google.svg" alt="Google" width={100} height={32} />
                                            </Button>
                                        </Card>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </React.Fragment>
                    </Container>
                </Box>

                {/*Our guest happy*/}
                <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
                    <Container maxWidth="lg">
                        {/* Header Section */}
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    mb: 2,
                                    fontFamily: "'MTD Valky', serif",
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                                    textTransform: "uppercase",
                                    color: "#000000ff",
                                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                }}>
                                {t('home.happyGuests.title')}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="p"
                                sx={{
                                    fontFamily: "'Open Sans', sans-serif",
                                    maxWidth: '600px',
                                    mx: 'auto',
                                    lineHeight: 1.4,
                                    color: "#000000ff",
                                }}
                            >
                                {t('home.happyGuests.description')}
                            </Typography>
                        </Box>

                        {/* Guest Image Grid  */}
                        <Box sx={{
                            mb: 4,
                            display: 'flex',
                            flexDirection: { xs: 'column-reverse', md: 'row' },
                            gap: 1,
                            height: { xs: '800px', md: '500px' }
                        }}>
                            {/* Bên trái - 4 ảnh nhỏ */}
                            <Box sx={{
                                flex: '0 0 50%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                                gap: 1,
                                height: { xs: '300px', md: '500px' }
                            }}>
                                {smallImages.slice(0, 4).map((image) => (
                                    <Box key={image.id} sx={{ height: '100%' }}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                borderRadius: 0,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': { transform: 'scale(1.03)' },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={image.src}
                                                alt={image.alt}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 8,
                                                    right: 8,
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    '&:hover': { opacity: 1 },
                                                }}
                                            >
                                                <IconButton
                                                    component="a"
                                                    href={image.href}
                                                    target="_blank"
                                                    rel="nofollow"
                                                    sx={{
                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                                                    }}
                                                >
                                                    <Instagram />
                                                </IconButton>
                                            </Box>
                                        </Card>
                                    </Box>
                                ))}
                            </Box>

                            {/* Ảnh phải - ảnh lớn */}
                            <Box sx={{
                                flex: { xs: '1', md: '0 0 50%' },
                                display: 'flex',
                                height: { xs: '300px', md: '500px' }
                            }}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 0,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={largeImage?.src}
                                        alt={largeImage?.alt}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 8,
                                            right: 8,
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease-in-out',
                                            '&:hover': { opacity: 1 },
                                        }}
                                    >
                                        <IconButton
                                            component="a"
                                            href={largeImage?.href}
                                            target="_blank"
                                            rel="nofollow"
                                            sx={{
                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                                color: 'white',
                                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                                            }}
                                        >
                                            <Instagram />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Box>
                        </Box>

                        {/* Footer Button */}

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button variant="outlined" size="large"
                                href="https://www.google.com/maps/place/SEN+SPA+Da+Nang/@16.0622069,108.1608071,14509m/data=!3m1!1e3!4m8!3m7!1s0x314219ab5d9436d3:0x3a78e723f58964c7!8m2!3d16.0648855!4d108.2230748!9m1!1b1!16s%2Fg%2F11vpd2vhbm?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"

                                sx={{
                                    fontFamily: "'Open Sans', sans-serif", fontSize: '15px',
                                    borderRadius: 0,
                                    height: "56px",
                                    borderColor: "#9e2265",
                                    color: "#9e2265",
                                    '&:hover': {
                                        backgroundColor: "#9e2265",
                                        color: "#fff",
                                        borderColor: "#9e2265",
                                    },
                                }}>
                                {t('home.happyGuests.seeMoreReview')}
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Why Choose Us Section */}
                <Box sx={{ py: 6, bgcolor: "grey.50" }}>
                    <Container>
                        <Box textAlign="center" sx={{ mb: 6 }}>
                            <Typography variant="h4" component="h2" gutterBottom
                                sx={{
                                    mb: 2,
                                    fontFamily: "'MTD Valky', serif",
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                                    textTransform: "uppercase",
                                    color: "#000000ff",
                                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                }}>
                                {t('home.whyChooseUs.title')}
                            </Typography>
                            <Typography variant="body1" color="text.secondary"
                                sx={{ color: "#000000ff", fontFamily: "'Open Sans', sans-serif", }}>
                                {t('home.whyChooseUs.description')}
                            </Typography>
                        </Box>

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={4}
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            {features.map((feature, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: { xs: '100%', md: '30%' },
                                        textAlign: { xs: "left", md: "center" },
                                        px: 2,
                                        display: { xs: 'flex', md: 'block' },
                                        gap: { xs: 2, md: 0 },
                                        alignItems: { xs: 'flex-start', md: 'center' }
                                    }}
                                >
                                    <Box sx={{
                                        flexShrink: 0,
                                        color: "#9e2265",
                                        backgroundColor: "#fceef3ff", 
                                        borderRadius: "50%", 
                                        width: 60, 
                                        height: 60, 
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mx: { xs: 0, md: "auto" }, 
                                        mb: { xs: 0, md: 2 } 
                                    }}>
                                        {feature.icon}
                                    </Box>

                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" gutterBottom
                                            sx={{
                                                fontFamily: "'Open Sans', sans-serif",
                                                mt: { xs: 0, md: 2 },
                                                mb: 1,
                                                lineHeight: 1.2,
                                                color: '#000000ff'
                                            }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'Open Sans', sans-serif",}}>
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Container>
                </Box>

                {/* Booking Modal */}
                <Modal
                    open={showBookingModal}
                    onClose={handleCloseBookingModal}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <Card sx={{ p: 4, maxWidth: 500, width: "90%", maxHeight: "90vh", overflow: "auto" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography variant="h5">{t('home.bookYourSpaExperience')}</Typography>
                            <IconButton onClick={handleCloseBookingModal}>
                                <Close />
                            </IconButton>
                        </Box>

                        <form onSubmit={handleFormSubmit}>
                            <Stack spacing={3}>
                                <FormControl fullWidth>
                                    <InputLabel>{t('booking.location')}</InputLabel>
                                    <Select
                                        value={formData.spa}
                                        label={t('booking.location')}
                                        onChange={(e) => handleInputChange("spa", e.target.value)}
                                    >
                                        {locations.map((location, index) => (
                                            <MenuItem key={index} value={location.name}>
                                                {location.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <CustomDatePicker
                                    label={t('booking.date')}
                                    value={formData.date ? dayjs(formData.date) : null}
                                    onChange={(newDate) =>
                                        handleInputChange("date", newDate ? newDate.toDate() : null)
                                    }
                                    minDate={dayjs()}
                                />


                                <FormControl fullWidth>
                                    <InputLabel>{t('booking.time')}</InputLabel>
                                    <Select
                                        value={formData.time}
                                        label={t('booking.time')}
                                        onChange={(e) => handleInputChange("time", e.target.value)}
                                        required
                                    >
                                        {Object.entries(filteredTimes).map(([period, timeSlots]) =>
                                            timeSlots.map((time) => (
                                                <MenuItem key={time} value={time}>
                                                    {time} ({period === 'Morning' ? t('booking.morning') : 
                                                             period === 'Afternoon' ? t('booking.afternoon') : 
                                                             period === 'Evening' ? t('booking.evening') : period})
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>{t('booking.numberOfGuests')}</InputLabel>
                                    <Select
                                        value={formData.people}
                                        label={t('booking.numberOfGuests')}
                                        onChange={(e) => handleInputChange("people", e.target.value)}
                                        required
                                    >
                                        {guests.map((guest) => (
                                            <MenuItem key={guest} value={guest}>
                                                {guest}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button type="submit" variant="contained" size="large">
                                    {t('booking.bookNow')}
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Modal>

                <FormBooking
                    open={showBookingForm}
                    onClose={handleCloseForm}
                    selectedProduct={selectedProduct}
                />
                <FormBooking open={openBooking} onClose={handleCloseBooking} />
            </Box>
        </LocalizationProvider>
    );
}