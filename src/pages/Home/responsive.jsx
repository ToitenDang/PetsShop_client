import { styled } from '@mui/material/styles';

export const ResponsiveSlider = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },
  
}));

export const ResponsiveSale = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    
  }));