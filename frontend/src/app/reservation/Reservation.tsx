'use client'

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid
} from '@mui/material';
import Image from 'next/image';
import PhoneIcon from '@mui/icons-material/Phone';
import FormBooking from '@/components/FormBooking';

export default function Reservation() {
    const { t } = useTranslation('common');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<string>('');
    const ResTopRef = useRef<HTMLDivElement | null>(null);

    const handleBookNow = (treatmentName: string) => {
        setSelectedTreatment(treatmentName);
        setShowBookingModal(true);
    };

    const handleCloseForm = () => {
        setShowBookingModal(false);
        setSelectedTreatment('');
    };
    const qrCodes = [
        { id: 1, src: '/images/image_1.png', src2x: '/images/image_5.png' },
        { id: 2, src: '/images/image.png', src2x: '/images/image_4.png' },
        { id: 3, src: '/images/image_2.png', src2x: '/images/image_3.png' },
    ];

    return (
        <Box sx={{ bgcolor: '#fff', py: 0 }}>
            {/* Tiêu đề */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box
                    ref={ResTopRef}
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
                        {t('reservation.title')}
                    </Typography>
                </Box>

                <Typography align="center" sx={{ mb: 2, p: 2 }}>
                    <Typography
                        component="a"
                        href="/"
                        sx={{ color: '#9e2265', textDecoration: 'none', mr: 1, fontFamily: "'Open Sans', sans-serif" }}
                    >
                        {t('nav.home')}
                    </Typography>
                    &rsaquo;
                    <span style={{ marginLeft: 8, color: '#000', fontFamily: "'Open Sans', sans-serif" }}>{t('reservation.title')}</span>
                </Typography>
            </Box>

            <Container maxWidth="md">
                {/* --- CONTACT BY PHONE SECTION --- */}
                <Box sx={{ mb: 10, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: '#000',
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: { xs: '24px', md: '30px' }
                        }}
                    >
                        {t('reservation.contactUsByPhone')}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: '#666',
                            ffontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                        }}
                    >
                        {t('reservation.spaAddress')}
                    </Typography>

                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ color: '#666', fontSize: '20px' }} />
                        <Typography
                            variant="h6"
                            component="a"
                            href="tel:+84976591515"
                            sx={{
                                fontWeight: 600,
                                color: '#000',
                                fontFamily: "'Open Sans', sans-serif", fontSize: '24px',
                                '&:hover': { color: '#9e2265' }, textDecoration: 'none', mr: 1
                            }}
                        >
                            (+84) 976 591 515
                        </Typography>
                    </Box>

                    {/* QR Codes */}
                    <Box textAlign="center" mt={4} mb ={4}>
                        <Grid container justifyContent="center" spacing={3}>
                            {qrCodes.map((qr) => (
                                <Grid
                                     item xs={4} sm={'auto'} 

                                    key={qr.id}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <picture>
                                        <source
                                            srcSet={qr.src2x ? `${qr.src2x} 2x, ${qr.src} 1x` : qr.src}

                                        />
                                        <Image src={qr.src} alt="QR code" width={120} height={120} />
                                    </picture>
                                </Grid>
                            ))}
                        </Grid>

                    </Box>

                    <Typography variant="body1" sx={{ mb: 3,fontFamily: "'Open Sans', sans-serif", fontSize: '16px', color: '#000' }}>
                        {t('reservation.welcomeMessage')}
                    </Typography>

                    <Box sx={{
                        textAlign: 'left',
                        display: 'inline-block',
                        mb: 5,
                        '& ul': {
                            paddingLeft: '0',
                            listStyle: 'none',
                        },
                        '& li': {
                            fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            lineHeight: 2,
                            color: '#9e2265',
                            paddingLeft: '20px',
                            position: 'relative',
                            '&::before': {
                                content: '"▸"',
                                position: 'absolute',
                                left: 0,
                                color: '#9e2265',
                                fontWeight: 'bold',
                            }
                        }
                    }}>
                        <ul>
                            <li>{t('reservation.waysToBook.callPhone')}</li>
                            <li>{t('reservation.waysToBook.sendMessage')}</li>
                            <li>{t('reservation.waysToBook.bookOnline')}</li>
                        </ul>
                    </Box>

                    {/*Button */}
                    <Box>
                        <Button
                            variant="contained"
                            onClick={() => handleBookNow('Reservation')}
                            sx={{
                                fontFamily: "'Open Sans', sans-serif", 
                                borderRadius: 0,
                                backgroundColor: '#9e2265',
                                color: '#fff',
                                px: 8,
                                py: 2,
                                fontWeight: 600,
                                fontSize: '18px',
                                textTransform: 'uppercase',
                                mb: 5,
                                '&:hover': { backgroundColor: '#d83b8a' },
                                width: { xs: '100%', sm: 'auto' },
                                minWidth: '300px',
                            }}
                        >
                            {t('booking.bookNow')}
                        </Button>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 0.5, fontFamily: "'Open Sans', sans-serif", fontSize: '16px', color: '#000' }}>
                        {t('reservation.maxGuests')}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, fontFamily: "'Open Sans', sans-serif", fontSize: '16px', color: '#000' }}>
                        {t('reservation.confirmationMessage')}
                    </Typography>

                    <Box sx={{
                        mx: 12, textAlign: 'left',
                        '& ul': {
                            paddingLeft: '0',
                            listStyle: 'none',
                        },
                        '& li': {
                            fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            lineHeight: 2,
                            color: '#666',
                            paddingLeft: '20px',
                            position: 'relative',
                            '&::before': {
                                content: '"●"',
                                position: 'absolute',
                                left: 0,
                                color: '#666',
                                fontSize: '8px',
                                top: '9px',
                            }
                        }
                    }}>
                        <ul>
                            <li>{t('reservation.bookingSteps.location')}</li>
                            <li>{t('reservation.bookingSteps.guests')}</li>
                            <li>{t('reservation.bookingSteps.dateTime')}</li>
                            <li>{t('reservation.bookingSteps.services')}</li>
                        </ul>
                    </Box>
                </Box>

                {/* --- ADDITIONAL INFORMATION --- */}
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                fontFamily: "'Open Sans', sans-serif", fontSize: '20px',
                            }}
                        >
                            {t('reservation.aboutReservation.title')}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                lineHeight: 1.8,
                                fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            }}
                        >
                            {t('reservation.aboutReservation.description')}
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                fontFamily: "'Open Sans', sans-serif", fontSize: '20px',
                            }}
                        >
                            {t('reservation.aboutChange.title')}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                lineHeight: 1.8,
                                fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            }}
                        >
                            {t('reservation.aboutChange.description')}
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                fontFamily: "'Open Sans', sans-serif", fontSize: '20px',
                            }}
                        >
                            {t('reservation.aboutPayment.title')}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                lineHeight: 1.8,
                                fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                            }}
                        >
                            {t('reservation.aboutPayment.description')}
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* --- FORM BOOKING MODAL --- */}
            <FormBooking
                open={showBookingModal}
                onClose={handleCloseForm}
                selectedTreatment={selectedTreatment}
            />
        </Box>
    );
}