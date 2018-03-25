import * as React from 'react';
import { logout, changePassword, lockAccount } from 'modules/member/';
import { IMember } from 'models/member';
import { IMemberAction } from 'models/member';
const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  member: IMember;
  logout: Redux.ActionCreator<IMemberAction>;
  changePassword: Redux.ActionCreator<IMemberAction>;
  lockAccount: Redux.ActionCreator<IMemberAction>;
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
      newName: 'Finally Works',
    };
  }

  public changePassword = () => {
    const {changePassword} = this.props;
    changePassword(this.state.newName);
  }

  public render(): React.ReactElement<{}> {
    const { logout, lockAccount, member} = this.props;

    return (
      <div className={style.Member}>
      <br/>
        <button
          name="incBtn"
          onClick={logout}>
          Logout
        </button>
        <button
          name="decBtn"
          onClick={this.changePassword}
          disabled={member.sessionID === null}>
          changePassword
        </button>

         <button
          name="decBtn"
          onClick={lockAccount}
          disabled={member.sessionID === null}>
          lockAccount
        </button>

        <p>{member.password}</p>
      </div>
    );
  }
}

export { Member }
