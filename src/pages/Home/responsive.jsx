import { Calculate } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

export const ResponsiveSliderAndSale = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 'auto'
  }

}));

export const ResponsiveSlider = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }

}));

export const ResponsiveSale = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }

}));

export const ResponsiveSaleContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'calc(100% / 2)',
    maxHeight: 'calc(100% / 2)',
  }

}));
export const ResponsiveGroupSales = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    overflowY: 'hidden',
    overflowX: 'auto',
    maxWidth: '100%',
    width: '100%'
  }

}));

export const ResponsiveSaleItem = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'auto',
    maxWidth: '100%',
    minWidth: 'calc(100% /2)'
  }
}));

export const ResonsiveQuickShopContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '50%'
  }
}));