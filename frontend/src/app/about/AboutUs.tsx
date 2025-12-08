"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    Container,
    Button,
    Stack,
    Link,
    IconButton,
} from "@mui/material";
import { Room, AccessTime, Phone } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const AboutUs: React.FC = () => {
    const { t } = useTranslation('common');
    useEffect(() => {
        // optional setup
    }, []);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const mainSwiperRef = useRef<SwiperType | null>(null);
    const aboTopRef = useRef<HTMLDivElement | null>(null);
    const mainImages = [
        "image_14.jpg",
        "image_1.jpg",
        "image_10.jpg",
        "image_7.jpg",
        "image_8.jpg",
    ];

    const thumbs = [
        "image_14.jpg",
        "image_1.jpg",
        "image_10.jpg",
        "image_7.jpg",
        "image_8.jpg",
    ];

    return (
        <main>
            <Box sx={{ minHeight: "100vh" }}>
                {/* Title */}
                <Box
                    ref={aboTopRef}
                    sx={{
                        width: "100%",
                        position: "relative",
                        top: 0,
                        left: 0,
                        bgcolor: "#9e2265",
                        py: 4,
                        textAlign: "center",
                        overflowX: "hidden",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            mb: 0,
                            fontFamily: "'MTD Valky', serif",
                            fontWeight: 500,
                            letterSpacing: "0.05em",
                            fontSize: { xs: "1.5rem", md: "2.5rem" },
                            textTransform: "uppercase",
                            color: "#ffffff",
                            textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                        }}
                    >
                        {t('about.title')}
                    </Typography>
                </Box>

                <Container maxWidth="lg">
                    {/* Introduction */}
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        textAlign="center"
                        sx={{ pt: 6, fontFamily: "'Open Sans', sans-serif", fontSize: '30px'}}
                    >
                        {t('about.welcomeTitle')}
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            textAlign: "justify",
                            lineHeight: 1.8,
                            mt: 3,
                            color: "text.secondary",
                        }}
                    >
                        {t('about.paragraph1')}
                    </Typography>

                    {/* Main Swiper */}
                    <Box sx={{ width: "100%", py: 4 }}>
                        {/* Main Swiper */}
                        <Swiper
                            modules={[Thumbs]}
                            className="main-swiper"
                            style={{ marginBottom: "1rem" }}
                            onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            breakpoints={{
                                0: { // Mobile
                                    height: 250,
                                },
                                640: { // Tablet
                                    height: 400,
                                },
                                1024: { // Desktop
                                    height: 600,
                                },
                            }}
                        >
                            {mainImages.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <Image
                                        src={`/images/${img}`}
                                        alt={`Slide ${i + 1}`}
                                        width={1200}
                                        height={800}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: 0,
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnail Swiper */}
                        <Box position="relative">
                            <Swiper
                                modules={[Thumbs]}
                                slidesPerView={5}
                                spaceBetween={10}
                                className="thumb-swiper"
                                breakpoints={{
                                    0: { slidesPerView: 2.5, spaceBetween: 6, height: 80 },
                                    640: { slidesPerView: 3.5, spaceBetween: 8, height: 100 },
                                    1024: { slidesPerView: 5, spaceBetween: 10, height: 180 },
                                }}
                            >
                                {mainImages.map((thumb, i) => (
                                    <SwiperSlide key={i}>
                                        <Box
                                            onClick={() => {
                                                if (mainSwiperRef.current) {
                                                    mainSwiperRef.current.slideTo(i);
                                                }
                                                setActiveIndex(i);
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                border: activeIndex === i ? "3px solid #9e2265" : "3px solid transparent",
                                                borderRadius: 0,
                                                overflow: "hidden",
                                                boxSizing: "border-box",
                                                transition: "border-color 0.2s ease",
                                            }}
                                        >
                                            <Image
                                                src={`/images/${thumb}`}
                                                alt={`Thumbnail ${i + 1}`}
                                                width={200}
                                                height={200}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                    display: "block",
                                                }}
                                            />
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                    </Box>

                    {/* Second paragraph */}
                    <Typography
                        sx={{
                            fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            textAlign: "justify",
                            lineHeight: 1.8,
                            color: "text.secondary",
                            mb: 6,
                        }}
                    >
                        {t('about.paragraph2')}
                    </Typography>

                    {/* Google Maps */}
                    <Box
                        sx={{
                            backgroundColor: "white",
                            overflow: "hidden",
                            boxShadow: 2,
                            mb: 4,
                        }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30673.47556294559!2d108.1911715!3d16.0559157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ab5d9436d3%3A0x3a78e723f58964c7!2sSen%20Spa%20Danang!5e0!3m2!1svi!2s!4v1704420079487!5m2!1svi!2s"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Box>

                    {/* Paragraphs */}
                    <Box sx={{ textAlign: "justify", mb: 6 }}>
                        <Typography
                            sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', lineHeight: 1.8, color: "text.secondary" }}
                        >
                            {t('about.paragraph3')}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                                lineHeight: 1.8,
                                color: "text.secondary",
                                mt: 3,
                            }}
                        >
                            {t('about.paragraph4')}
                        </Typography>
                    </Box>

                    {/* Info Section */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 1.5, md: 4 }}
                        justifyContent={{ md: "space-between" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        sx={{
                            py: 1,
                            textAlign: { xs: "left", md: "left" },
                            fontFamily: "'Open Sans', sans-serif", fontSize: '14px',
                            color: "text.primary",
                        }}
                    >
                        {/* Address */}
                        <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: { xs: 1, md: 0 } }}>
                            <IconButton
                                sx={{
                                    bgcolor: "#9e2265",
                                    color: "white",
                                    width: 32,
                                    height: 32,
                                    "&:hover": { bgcolor: "#9e2265" },
                                    flexShrink: 0,
                                }}
                            >
                                <Room fontSize="small" />
                            </IconButton>
                            <Link
                                href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                                target="_blank"
                                underline="hover"
                                sx={{
                                    fontFamily: "'Open Sans', sans-serif", fontSize: '14px',
                                    color: "text.primary",
                                    lineHeight: 1.4,
                                    wordBreak: "break-word",
                                }}
                            >
                                {t('about.address')}
                            </Link>
                        </Stack>

                        {/* Time */}
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <IconButton
                                sx={{
                                    bgcolor: "#9e2265",
                                    color: "white",
                                    width: 32,
                                    height: 32,
                                    "&:hover": { bgcolor: "#9e2265" },
                                    flexShrink: 0,
                                }}
                            >
                                <AccessTime fontSize="small" />
                            </IconButton>
                            <Typography sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', lineHeight: 1.4 }}>
                                {t('about.openDaily')}
                            </Typography>
                        </Stack>

                        {/* Phone */}
                        <Stack direction="row" alignItems="flex-start" spacing={1.5}>
                            <IconButton
                                sx={{
                                    bgcolor: "#9e2265",
                                    color: "white",
                                    width: 32,
                                    height: 32,
                                    "&:hover": { bgcolor: "#9e2265" },
                                    flexShrink: 0,
                                }}
                            >
                                <Phone fontSize="small" />
                            </IconButton>
                            <Typography
                                component="span"
                                sx={{
                                    fontFamily: "'Open Sans', sans-serif", fontSize: '14px',
                                    lineHeight: 1.4,
                                    wordBreak: "break-word",
                                }}
                            >
                                {t('about.phoneEnquiry')}{" "}
                                <Link href="tel:+84976591515" underline="hover" color="text.primary" >
                                    {t('about.phoneNumber')}
                                </Link>
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Book Now Button */}
                    <Box textAlign="center" my={8}>
                        <Button
                            href="/menu"
                            variant="contained"
                            sx={{
                                fontFamily: "'Open Sans', sans-serif",
                                borderRadius: 0,
                                bgcolor: "#9e2265",
                                color: "white",
                                fontSize: { xs: 18, md: 24 },
                                px: { xs: 5, md: 8 },
                                py: { xs: 1, md: 1.5 },
                                '&:hover': { bgcolor: "#7a184e" },
                            }}
                        >
                            {t('about.bookNow')}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </main>
    );
};

export default AboutUs;
