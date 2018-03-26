import * as React from 'react';
import { login } from 'modules/member';
import { IMember, IMemberAction } from 'models/member';
const { connect } = require('react-redux');
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
// const { asyncConnect } = require('redux-connect');
const style = require('./style.css');

const styles: StyleRulesCallback<'root'> = (theme) => ({ // You can use the 'theme' variable for styling
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  menu: {
    width: 200,
  },
});

interface IProps {
  member: IMember;
  login: Redux.ActionCreator<IMemberAction>;
  router: any;
}

@connect(
  (state) => ({ member: state.member }),
  (dispatch) => ({
    login: (username, password) => dispatch(login(username, password)),
  }),
)

class Login extends React.Component<IProps & WithStyles<'root'>> {

  public constructor(props) {
    super(props);
  }

  public state = {
    username: '',
    password: '',
  };

  private handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  public login = () => {
    const {login} = this.props;
    login(this.state.username, this.state.password);
  }

  public componentDidUpdate(prevProps) {
    const pSessionID = prevProps.member.sessionID;
    const cSessionID = this.props.member.sessionID;
    if (!this.props.member.request.error) {
        if (pSessionID === null && cSessionID !== null) {
          this.props.router.push('/member');
        }
    }
  }

  public render() {
    // const { member } = this.props;
    const { classes } = this.props as any;
    return (
      <div className={style.root}>
        <Grid container={true} spacing={24} alignItems="center" direction="column" justify="center">
          <Paper className={classes.paper}>
            <Grid item={true} xs={6}>
              <TextField
                        id="username"
                        label="Username"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
              />
            </Grid>
            <Divider/>
            <Grid item={true} xs={6}>
              <TextField
                    id="password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange('password')}
                    margin="normal"
            />
          </Grid>
          <Divider/>
          <Grid item={true} xs={6}>
            <Button fullWidth={true} variant="raised"
            size="large" color="primary" className={classes.button} onClick={this.login} >
             Login
           </Button>
          </Grid>
        </Paper>
      </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(Login));
