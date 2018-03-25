import * as React from 'react';
import { login } from 'modules/member';
import { IMember, IMemberAction } from 'models/member';
const { connect } = require('react-redux');
// const { asyncConnect } = require('redux-connect');
const style = require('./style.css');

interface IProps {
  member: IMember;
  getStars: Redux.ActionCreator<IMemberAction>;
}

@connect(
  (state) => ({ member: state.member }),
  (dispatch) => ({
    login: (username, password) => dispatch(login(username, password)),
  }),
)

class Login extends React.Component<IProps, {}> {
  public render() {
    const { member } = this.props;

    return (
      <div className={style.Login}>
        {member.request.isFetching ? 'Loging in' : member.username}
      </div>
    );
  }
}

export { Login }
