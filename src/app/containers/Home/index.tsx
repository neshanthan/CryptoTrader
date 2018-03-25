import * as React from 'react';
const style = require('./style.css');
import Header from '../../components/Header/index';
class Home extends React.Component<any, any> {
  public render() {
    return (
      <div className={style.Home}>
      <Header>Home</Header>
        <img src={require('./bitcoin.png')} />
        <p>Hello Big!</p>
      </div>
    );
  }
}

export { Home }
