import * as React from 'react';
import { IMember } from 'models/member';
import { updateCoins } from 'modules/coin';
import { ICoins, ICoinAction } from 'models/coin';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
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
  formControl: {
    margin: theme.spacing.unit,
  },
  textFieldRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    'borderRadius': 4,
    'backgroundColor': theme.palette.common.white,
    'border': '1px solid #ced4da',
    'fontSize': 16,
    'padding': '10px 12px',
    'width': 'calc(100% - 24px)',
    'transition': theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
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

  public state = {
    auth: true,
    open: false,
    searchTerm: 'Enter coin name...',
  };

  private handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  private makeEmpty = (name) => ({}) => {
    this.setState({
      [name]: '',
    });
  }

  public render() {

    const { classes } = this.props as any;
    const { coins } = this.props;

    const searchBar = (
      <div >
        <form noValidate={true} autoComplete="off">
          <TextField
            value={this.state.searchTerm}
            id="bootstrap-input"
            onChange={this.handleChange('searchTerm')}
            onClick={this.makeEmpty('searchTerm')}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
          />
        </form>
      </div>
    );

    console.log(coins);
    let allcoins = null;
    if (coins.coins !== null) {
       allcoins = (
        coins.coins.map( (itema) => {
          return (
              <Grid key={itema.id} item={true} xs={12}>
                <Paper className={classes.paper}>
                <img height="32" width="32" src={require('../assets/icons/' + itema.symbol.toLowerCase() + '.svg')} />
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
        <Grid container={true} spacing={24} alignItems="stretch" direction="column" justify="center">
          <Grid key="SearchBar" item={true} xs={12}>
          {searchBar}
          </Grid>
          {allcoins}
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(Home));
