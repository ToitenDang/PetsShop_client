import { styled } from '@mui/material/styles';

export const ResponsiveContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('cus_hg_sm')]: {
    width: '100%'
  },
  [theme.breakpoints.down('ml')]: {
    width: '95%'
  }
}));

export const ResponsiveLogo = styled('p')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem'
  }
}));

 