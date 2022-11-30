import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import {
    ButtonBase,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Grid,
    Skeleton,
    Stack,
    Theme,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import FlexSpacer from '../../../design-system/atoms/FlexSpacer';
import Slider from '../../../design-system/organismes/Slider';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../../design-system/atoms/Typography';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { INft } from '../../../interfaces/artwork';

export interface HeroProps {
    loading?: boolean;
    selectedTheme?: string;
    theme?: Theme;
    sliderLoading?: boolean;
    sliderNfts: INft[];
}

const GridStyled = styled(Grid)`
    @media (max-width: 900px) {
        display: none;
    }
`;

export const Hero: FC<HeroProps> = ({ ...props }) => {
    const { t } = useTranslation(['translation']);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const history = useHistory();
    const navigateTo = (componentURL: string) => {
        history.push(`/${componentURL}`);
    };

    const [imgToVideoToggler, setImgToVideoToggler] = useState(true);

    return (
        <Grid container>
            {/* HERO: Greetings and button set */}
            <Grid item xs={12} md={5} pr={isMobile ? 0 : 5}>
                <FlexSpacer minHeight={4} />

                <Typography size="h1" weight="SemiBold" sx={{ pt: 4 }} >
                    Tezos India Marketplace
                </Typography>

                <Typography size="h3" weight="Light" sx={{ pt: 2, mb: 1 }}>
                    This is a demo of Kanva.cf
                </Typography>

                <Typography
                    size="h5"
                    weight="Light"
                    
                    sx={{ pt: 1, mb: 1 }}
                >
                    {t('home.hero.description_2')}
                </Typography>

                <FlexSpacer minHeight={3} />

                <Stack direction="row">
                    <CustomButton
                        size="medium"
                        label={t('home.hero.button_1')}
                        onClick={() => navigateTo('store')}
                    />
                </Stack>
            </Grid>

            {/* HERO: Featured Image */}
            
            {/* <GridStyled item xs={12} md={7} px={0} sx={{ display: 'flex' }}>
                {
                    //Render Skeleton if image not loading
                    props.sliderLoading ? (
                        <Skeleton
                            height="40rem"
                            width="40rem"
                            sx={{
                                transform: 'none',
                                maxWidth: isMobile ? '100%' : '80%',
                                marginLeft: 'auto',
                            }}
                        />
                    ) : // Render Slider
                    imgToVideoToggler ? (
                        <Slider
                            loading={props.sliderLoading}
                            sliderNfts={props.sliderNfts}
                        />
                    ) : (
                        //Render Single image
                        <Card
                            sx={{
                                borderRadius: '1rem',
                                marginLeft: 'auto',
                                maxWidth: 750,
                            }}
                        >
                            <CardActionArea>
                                <ButtonBase
                                    onClick={() => navigateTo('sign-in')}
                                >
                                    <CardMedia
                                        component="img"
                                        image="https://uploads-ssl.webflow.com/60098420fcf354eb258f25c5/60098420fcf3542cf38f287b_Illustrations%202019-37.jpg"
                                        alt="random"
                                        sx={{
                                            height: '70vh',
                                            minHeight: 300,
                                            maxHeight: 600,
                                            maxWidth: 750,
                                            display: isMobile ? 'none' : 'flex',
                                        }}
                                    />
                                </ButtonBase>
                            </CardActionArea>
                        </Card>
                    )
                }
            </GridStyled> */}
        </Grid>
    );
};
