import React from 'react';
import { fade, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  useScrollTrigger,
  Tabs,
  Tab,
  Icon

} from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from '../../../assets/collabcirclelogo.png';
import Theme from '../../Theme/theme';
import LockOpenIcon from '@material-ui/icons/LockOpen';
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      fontFamily: 'Lato',
      fontWeight: 'bold',
    },

  },
  tabsContainer: {
    marginLeft: "auto",
    textAlign:'end',

  },
  tabsContent: {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    minWidth: 100,
    marginLeft: "20px",

    [theme.breakpoints.only('sm')]: {
      fontSize: "0.8rem",
      maxWidth: '70'
    },
    [theme.breakpoints.only('xs')]: {

      display: 'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleMenuClose} component={Link} to="/UpdateSettings" style={{ textDecoration: 'none' }}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ textDecoration: 'none' }} component = {Link} to = "/MyProjects">Taskboard</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ textDecoration: 'none' }} >My account</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ textDecoration: 'none' }}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (

    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton  color="inherit" style = {{marginTop:'-10px'}}>
            <LockOpenIcon />
        </IconButton>
        <p ><Link to = "/Login" style={{ textDecoration: 'none' ,  color: "black"}}>Login</Link></p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <HowToRegIcon/>
        </IconButton>
        <p ><Link to = "/SignUp" style={{ textDecoration: 'none' ,  color: "black"}}>Register</Link></p>
      </MenuItem>

    </Menu>
  );

  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.grow}>

        <AppBar >
          <Toolbar>

            <Typography className={classes.title} variant="h5" noWrap color="secondary">
              <img src={Logo} alt='logo' style={{ height: "35px", width: "60px" }}></img>
              <Link to="/Dashboard" style={{ textDecoration: 'none', color: "#782387" }}> COLLAB CIRCLE </Link>
              <br></br>
            </Typography>
            <Tabs
        
              value={value}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={handleChange}
              centered
              variant="scrollable"
              className={classes.tabsContainer}
            >
              <Tab className={classes.tabsContent} label="ABOUT US" component={Link} to="/AboutUs" style={{ textDecoration: 'none' }} />
              <Tab className={classes.tabsContent} label="LOGIN" component={Link} to="/Login" style={{ textDecoration: 'none' }} />
              <Tab className={classes.tabsContent} label="SIGN UP" component={Link} to="/SignUp" style={{ textDecoration: 'none' }} />

            </Tabs>


        
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {renderMenu}
      </div>
    </ThemeProvider>
  );
}
