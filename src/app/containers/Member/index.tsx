import * as React from 'react';
import { logout, changePassword, lockAccount } from 'modules/member/';
import { IMember } from 'models/member';
import { IMemberAction } from 'models/member';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  member: IMember;
  logout: Redux.ActionCreator<IMemberAction>;
  changePassword: Redux.ActionCreator<IMemberAction>;
  lockAccount: Redux.ActionCreator<IMemberAction>;
  router: any;
}

interface IState {
  newName: string;
}

@connect(
  (state) => ({ member: state.member }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
    changePassword: (newPassword) => dispatch(changePassword(newPassword)),
    lockAccount: (lockUntilDate) => dispatch(lockAccount(lockUntilDate)),
  }),
)

class Member extends React.Component<IProps, IState> {

  public constructor(props) {
    super(props);
    this.state = {
      newName: 'Password Changed',
    };
  }

  public changePassword = () => {
    const {changePassword} = this.props;
    changePassword(this.state.newName);
  }

  public lockAccount = () => {
    const {lockAccount, logout} = this.props;
    lockAccount('True');
    logout();
  }

  public componentDidUpdate(prevProps) {
    const pSessionID = prevProps.member.sessionID;
    const cSessionID = this.props.member.sessionID;
    if (!this.props.member.request.error) {
        if (pSessionID !== null && cSessionID === null) {
          this.props.router.push('/');
        }
    }
  }

  public render(): React.ReactElement<{}> {
    const { logout, member} = this.props;

    return (
      <div className={style.Member}>
      <Grid container={true} spacing={24} alignItems="center" direction="column" justify="center">
          <Grid item={true} xs={6}>
          <Paper>
          <button
            name="logout"
            onClick={logout}>
            Logout
          </button>
          </Paper>
          </Grid>
          <Grid item={true} xs={6}>
          <Paper>
          <button
            name="changepassowrd"
            onClick={this.changePassword}
            disabled={member.sessionID === null}>
            changePassword
          </button>
          </Paper>
          </Grid>
          <Grid item={true} xs={6}>
          <Paper>
          <button
            name="lockaccount"
            onClick={this.lockAccount}
            disabled={member.sessionID === null}>
            lockAccount
          </button>
          </Paper>
          </Grid>
          <p>{member.username}</p>
        </Grid>
      </div>
    );
  }
}

export { Member }
