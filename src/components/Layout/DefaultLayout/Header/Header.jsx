
import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '../../../ModeSelect/ModeSelect'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import  InputAdornment  from '@mui/material/InputAdornment'

import Categories from './Menus/Categories'
import Profile from './Menus/Profiles'
import Production from './Menus/Production'
import Contact from './Menus/Contact'

function Header() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      // padding: '0 60px',
      width: '100%',
      height: (theme) => theme.customSize.headerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>Logo</Box>
        <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 1}}>
          <Categories />
          <Production />
          <Contact />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) =>setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '300px',
            '& label': {color: 'white'},
            '& input': {color: 'white'},
            '& label.Mui-focused': {color: 'white'},
            '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
          />
        
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white'}} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profile/>
      </Box>
    </Box>)
}

export default Header;
