import { styled } from '@mui/material/styles';

export const ResonsiveMenu = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  }));

export const ResonsiveMenuSum = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none'
  },
  [theme.breakpoints.down('lg')]: {
    display: 'block'
  }
}));