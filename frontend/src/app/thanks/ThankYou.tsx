'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Container, Paper, Grid } from '@mui/material';
import Image from 'next/image';

interface BookingThankYouProps {
    title?: string;
    subtitle?: string;
    emailNote?: string;
    mainColor?: string;
}

interface Step {
    icon: string;
    label: string;
    active: boolean;
}

const BookingThankYou: React.FC<BookingThankYouProps> = ({
    title,
    subtitle,
    emailNote,
    mainColor = '#9e2265',
}) => {
    const { t, i18n } = useTranslation('common');
    const [, setForceUpdate] = useState(0);

    // useEffect(() => {
    //     // Force re-render when i18n is ready
    //     if (i18n.isInitialized) {
    //         setForceUpdate(prev => prev + 1);
    //     }
    // }, [i18n.isInitialized]);

    const defaultTitle = t('thankYou.title');
    const defaultSubtitle = t('thankYou.subtitle');
    const defaultEmailNote = t('thankYou.emailNote');

    const steps: Step[] = [
        { icon: "/reserve.svg", label: t('steps.reserve'), active: true },
        { icon: "/select.svg", label: t('steps.select'), active: true },
        { icon: "/confirm.svg", label: t('steps.confirm'), active: true },
    ];
    return (
        <Box component="main">
            {/* --- Progress Steps --- */}
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
                                            mt: { xs: 1, md: 2},
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

            {/* --- Thank you section --- */}
            <Box
                sx={{
                    bgcolor: '#f9f9f9',
                    py: { xs: 6, md: 10 },
                    minHeight: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Paper
                        elevation={6}
                        sx={{
                            p: { xs: 3, md: 6 },
                            textAlign: 'center',
                            borderRadius: 3,
                        }}
                    >
                        {/* Image */}
                        <Box sx={{ mb: 4 }}>
                            <Image
                                src="/images/thanks.png"
                                alt="Thank you icon"
                                width={150}
                                height={150}
                                style={{ margin: '0 auto', display: 'block' }}
                            />
                        </Box>

                        {/* Text */}
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#333',
                                mb: 2,
                                fontWeight: 600,
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                            }}
                        >
                            {title || defaultTitle}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#666',
                                mb: 4,
                                fontWeight: 400,
                                fontSize: { xs: '1.1rem', md: '1.25rem' },
                            }}
                        >
                            {subtitle || defaultSubtitle}
                        </Typography>

                        <Box
                            sx={{
                                p: 3,
                                borderLeft: `5px solid ${mainColor}`,
                                bgcolor: '#f7f7f7',
                                borderRadius: 2,
                                mb: 5,
                                textAlign: 'left',
                            }}
                        >
                            <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8 }}>
                                {emailNote ?? defaultEmailNote}{' '}
                                <Link
                                    href="/contacts"
                                    style={{
                                        color: mainColor,
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    {t('thankYou.contactUs')}
                                </Link>.
                            </Typography>
                        </Box>

                        <Button
                            component={Link}
                            href="/"
                            variant="contained"
                            sx={{
                                backgroundColor: mainColor,
                                '&:hover': { backgroundColor: '#d83b8a' },
                                px: 6,
                                py: 1.5,
                                fontSize: '1.2rem',
                                fontWeight: 600,
                            }}
                        >
                            {t('thankYou.backToHome')}
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default BookingThankYou;
