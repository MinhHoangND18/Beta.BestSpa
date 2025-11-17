'use client'

import React, { useState, FormEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Card,
    CardMedia,
} from '@mui/material';

interface ContactFormData {
    full_name: string;
    email: string;
    title: string;
    content: string;
}

const qrCodes = [
    { id: 1, src: '/images/image_1.png', src2x: '/images/image_5.png' },
    { id: 2, src: '/images/image.png', src2x: '/images/image_4.png' },
    { id: 3, src: '/images/image_2.png', src2x: '/images/image_3.png' },
];

export default function ContactPage() {
    const { t } = useTranslation('common');
    const [formData, setFormData] = useState<ContactFormData>({
        full_name: '',
        email: '',
        title: '',
        content: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const conTopRef = useRef<HTMLDivElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log('Form submitted:', formData);

            setFormData({ full_name: '', email: '', title: '', content: '' });
            alert(t('contact.messages.success'));
        } catch (error) {
            console.error(error);
            alert(t('contact.messages.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh', py: 0 }}>
            <Box
                ref={conTopRef}
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
                        {t('contact.title')}
                    </Typography>
            </Box>

            {/* Breadcrumb */}
            <Typography align="center" sx={{ mb: 6, p: 2 }}>
                <Typography
                
                    component="a"
                    href="/"
                    sx={{ color: '#9e2265', textDecoration: 'none', mr: 1, fontFamily: "'Open Sans', sans-serif" }}
                >
                    {t('nav.home')}
                </Typography>

                &rsaquo;
                <span style={{ marginLeft: 8, color: '#000', fontFamily: "'Open Sans', sans-serif" }}>{t('contact.title')}</span>
            </Typography>

            <Container maxWidth="lg">
                <Box>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            gutterBottom
                            sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: { xs: '25px', md: '30px' } }}
                        >
                            {t('contact.contactUsByEmail')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                            {t('contact.welcomeMessage')}
                        </Typography>
                    </Box>

                    {/* Content */}
                    <Box sx={{
                        display: 'flex',
                        gap: 6,
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'flex-start'
                    }}>
                        {/* Form liên hệ */}
                        <Box sx={{ flex: 1, maxWidth: { md: '550px' }, width: '100%' }}>
                            <Box component="form" onSubmit={handleSubmit} noValidate>
                                <Box
                                    sx={{
                                        width: {
                                            xs: '90vw',
                                            sm: '90%',
                                            md: '100%',
                                        },
                                        mx: 'auto',

                                    }}
                                >
                                    <Box sx={{ mb: 3, borderRadius: 0, }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                                            {t('contact.form.fullName')} <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder={t('contact.form.fullName')}
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    '& fieldset': {
                                                        borderColor: '#e0e0e0',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#9e2265',
                                                },
                                            }}

                                        />
                                    </Box>

                                    <Box sx={{ mb: 3, borderRadius: 0, }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                                            {t('contact.form.emailAddress')} <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder={t('contact.form.emailAddress')}
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    '& fieldset': {
                                                        borderColor: '#e0e0e0',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#9e2265',
                                                },
                                            }}

                                        />
                                    </Box>

                                    <Box sx={{ mb: 3, borderRadius: 0, }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                                            {t('contact.form.title')} <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder={t('contact.form.title')}
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    '& fieldset': {
                                                        borderColor: '#e0e0e0',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#9e2265',
                                                },
                                            }}

                                        />
                                    </Box>

                                    <Box sx={{ mb: 3, borderRadius: 0, }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                                            {t('contact.form.content')} <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder={t('contact.form.content') + '...'}
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    '& fieldset': {
                                                        borderColor: '#e0e0e0',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#9e2265',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#9e2265',
                                                },
                                            }}

                                        />
                                    </Box>
                                </Box>


                                <Box sx={{ mt: 4 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{fontFamily: "'Open Sans', sans-serif",
                                            borderRadius: 0,
                                            backgroundColor: '#9e2265',
                                            '&:hover': { backgroundColor: '#d83b8a' },
                                            width: '180px',
                                            height: '50px',
                                            textTransform: 'uppercase',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white'}} /> : t('contact.form.send')}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        {/* Google Map + Info */}
                        <Box sx={{ flex: 1, maxWidth: { md: '550px' }, width: '100%' }}>
                            <Card sx={{
                                mb: 3,
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '1px solid #e0e0e0'
                            }}>
                                <CardMedia
                                    component="iframe"
                                    height="355"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30673.47556294559!2d108.1911715!3d16.0559157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ab5d9436d3%3A0x3a78e723f58964c7!2sSen%20Spa%20Danang!5e0!3m2!1svi!2s!4v1704420079487!5m2!1svi!2s"
                                    allowFullScreen
                                    loading="lazy"
                                    sx={{ border: 0 }}
                                />
                            </Card>

                            <Typography
                                variant="h6"
                                fontWeight={600}
                                color="#9e2265"
                                sx={{ mb: 2.5, textTransform: 'uppercase', fontFamily: "'Open Sans', sans-serif" }}
                            >
                                {t('footer.spaName')}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                <Typography sx={{ mr: 1.5, minWidth: '20px' }}>✉️</Typography>
                                <Typography sx={{ lineHeight: 1.6, fontFamily: "'Open Sans', sans-serif" }}>
                                    <a
                                        href="mailto:senspa.dn@gmail.com"
                                        style={{
                                            color: '#000',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        senspa.dn@gmail.com
                                    </a>
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                <Typography sx={{ mr: 1.5, minWidth: '20px' }}>📍</Typography>
                                <Typography sx={{ lineHeight: 1.6 , fontFamily: "'Open Sans', sans-serif"}}>
                                    <a
                                        href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#000',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang
                                    </a>
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Typography sx={{ mr: 1.5, minWidth: '20px' }}>📞</Typography>
                                <Typography sx={{ lineHeight: 1.6 , fontFamily: "'Open Sans', sans-serif"}}>
                                    <a
                                        href="tel:+84976591515"
                                        style={{
                                            color: '#000',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        +84 976 591 515
                                    </a>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* QR Codes */}
                <Box textAlign="center" mt={10}>
                    <Typography variant="h5" fontWeight={600} color="#9e2265" mb={1} sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '30px', }}>
                        {t('contact.contactUsByPhone')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4} sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                        {t('contact.scanQRCode')}
                    </Typography>

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
            </Container >
        </Box >
    );
}
