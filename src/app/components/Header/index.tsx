import * as React from 'react';
// import { Link } from 'react-router';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

// import { IMember } from 'models/member';

// const style = require('./style.css');
// interface IProps {
//   member: IMember;
// }

const styles: StyleRulesCallback<'root'> = ({}) => ({ // You can use the 'theme' variable for styling
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface IState  {
  open: boolean;
  auth: boolean;
  anchorEl: any;
};

export class Header extends React.Component<IState & WithStyles<'root'>> {
  public state = {
    auth: true,
    anchorEl: null,
    open: false,
  };

  private handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  private handleClose = () => {
    this.setState({ anchorEl: null });
  }

  public render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className="" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className="">
              Title
            </Typography>
                <div>
                <IconButton aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(Header));
