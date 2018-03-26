import * as React from 'react';
import { IMember } from 'models/member';
import { updateCoins } from 'modules/coin';
import { ICoins, ICoinAction } from 'models/coin';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

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
  coins: ICoins;
  updateCoins: Redux.ActionCreator<ICoinAction>;
}
@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return dispatch(updateCoins());
  },
}])
@connect(
  (state) => ({ coins: state.coins, member: state.member }),
  (dispatch) => ({
    updateCoins: () => dispatch(updateCoins()),
  }),
)

class Home extends React.Component<IProps & WithStyles<'root'>> {

  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.updateCoins();
  }

  public render() {

    const { classes } = this.props as any;
    const { coins } = this.props;
    console.log(coins);
    let allcoins = null;
    if (coins.coins !== null) {
       allcoins = (
        coins.coins.map( (itema) => {
          return (
              <Grid key={itema.id} item={true} xs={12}>
                <Paper className={classes.paper}>
                <Typography>{itema.name}</Typography>
                <Typography>{itema.price_usd}</Typography>
                </Paper>
              </Grid>
          );
        },
      ));
    }

    return (
      <div className={style.Home}>
        <Grid container={true} spacing={24} alignItems="center" direction="column" justify="center">
          {allcoins}
      </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(Home));
