import { styled } from '@mui/material/styles';

export const ResponsiveContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  [theme.breakpoints.down('ml')]: {
    width: '95%'
  }
}));

export const ResponsiveLogo = styled('p')(({ theme }) => ({
  [theme.breakpoints.down('ms')]: {
    fontSize: '1.1rem'
  }
}));
