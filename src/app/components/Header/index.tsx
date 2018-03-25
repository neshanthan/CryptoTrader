import * as React from 'react';
import { Link } from 'react-router';
import { IMember } from 'models/member';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
const classnames = require('classnames');

import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';

const { connect } = require('react-redux');
export interface IProps {
  memberManager: IMember;
  Child: any;
}

const drawerWidth = 240;

const styles: StyleRulesCallback<'root'> = (theme) => ({ // You can use the 'theme' variable for styling
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftLeft: {
    marginLeft: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentLeft: {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShiftLeft: {
    marginLeft: 0,
  },
});
@connect(
  (state) => ({counter: state.counter, member: state }),
  (dispatch) => ({
    decrement: () => dispatch(),
    increment: () => dispatch(),
  }),
)

class Header extends React.Component<IProps & WithStyles<'root'>> {

  public constructor(props) {
    super(props);
    console.log('Nesh', this.props);
  }

  public state = {
    auth: true,
    open: false,
  };

  private handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  private handleDrawerClose = () => {
    this.setState({ open: false });
  }

  public render() {

    const { classes } = this.props as any;
    // const { classes } = this.props;
    const { anchor, open } = this.state as any;

    const drawer = (
      <Drawer variant="persistent" anchor={anchor} open={open} classes={{ paper: classes.drawerPaper}}>
        <div className={classes.drawerHeader}>
          <Typography variant="title" color="inherit" noWrap={true}>
                CryptoTrader
          </Typography>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MenuList>
        <Link to="/">
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SendIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset={true} primary="Home" />
        </MenuItem>
        </Link>
        <Link to="login">
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset={true} primary="Login" />
        </MenuItem>
        </Link>
        <Link to="member">
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset={true} primary="Account" />
        </MenuItem>
        </Link>
      </MenuList>
      </Drawer>
    );

    return (
      <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classnames({
              [`${classes.appBar}`]: true,
              [`${classes.appBarShift}`]: open,
              [`${classes.appBarShiftLeft}`]: open,
              })} >
              <Toolbar disableGutters={!open}>
                <IconButton className={classnames({[`${classes.menuButton}`]: true, [`${classes.hide}`]: open })}
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap={true}>
                Write Header
                </Typography>
              </Toolbar>
            </AppBar>
            {drawer}
            <main
                className={classnames({
                  [`${classes.content}`]: true,
                  [`${classes.contentLeft}`]: true,
                  [`${classes.contentShift}`]: open,
                  [`${classes.contentShiftLeft}`]: open,
                })}
              >
              a
          </main>
          </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(Header));
