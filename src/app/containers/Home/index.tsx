import * as React from 'react';
import { IMember } from 'models/member';
import { updateCoins } from 'modules/coin';
import { ICoins, ICoinAction } from 'models/coin';
import { placeBuyTrade, placeSellTrade, cancelTrade, resetRequest } from 'modules/member';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

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
  placeBuyTrade: Redux.ActionCreator<ICoinAction>;
  placeSellTrade: Redux.ActionCreator<ICoinAction>;
  cancelTrade: Redux.ActionCreator<ICoinAction>;
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
    placeBuyTrade: (coin, rate, amount, exchangeID) => dispatch(placeBuyTrade(coin, rate, amount, exchangeID)),
    placeSellTrade: (coin, rate, amount, exchangeID) => dispatch(placeSellTrade(coin, rate, amount, exchangeID)),
    cancelTrade: (openTrade) => dispatch(cancelTrade(openTrade)),
    resetRequest: () => dispatch(resetRequest()),
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
    amount: '',
    orderType: null,
    openDialog: false,
    orderItem: null,
  };

  private handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state);
  }

  private handleClickBox = (name, itemname) => ({}) => {
    this.setState({
      [name]: itemname,
    });
  }

  public placeBuyTrade = (coin, rate, amount, exchangeID) => ({}) =>  {
    const {placeBuyTrade} = this.props;
    placeBuyTrade(coin, rate, amount, exchangeID);
    this.setState({ openDialog: false, orderItem: null,  orderType: null, amount: ''});
  }

  public placeSellTrade = (coin, rate, amount, exchangeID) => ({}) => {
    const {placeSellTrade} = this.props;
    placeSellTrade(coin, rate, amount, exchangeID);
    this.setState({ openDialog: false, orderItem: null,  orderType: null, amount: ''});
  }

  public cancelTrade = (openTrade) => ({}) => {
    const {cancelTrade} = this.props;
    cancelTrade(openTrade);
  }

  public handleKeyPress = () => (event) => {
    // User should not use [Enter] to submit
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    }

    private defaultSearchClick = (name) => ({}) => {
      this.setState({
        [name]: '',
      });
    }

  public defaultSearch = (name) => ({}) => {
    const cSearchTerm = this.state.searchTerm;
    let nSearchTerm = cSearchTerm;
    if (cSearchTerm === 'Enter coin name...') {
      nSearchTerm = '';
    } else if (cSearchTerm === '') {
      nSearchTerm = 'Enter coin name...';
    }
    this.setState({
      [name]: nSearchTerm,
    });
  }

  public handleClose = () => {
    this.setState({ openDialog: false, orderItem: null,  orderType: null, amount: ''});
  }

  public handleOpenBuySell  = (item, type) => ({}) => {
    this.setState({ orderItem: item,  orderType: type, openDialog: true });
  }

  private coinOwnerShipDetailsUI(item) {
    const BUY = 'BUY';
    const SELL = 'SELL';

    // const { classes } = this.props as any;
    const coinOpenTrades = this.props.member.openTrades[item.symbol];
    let totalBuyTrades = 0;
    let totalSellTrades = 0;

    for (const o of coinOpenTrades[BUY]) {
      totalBuyTrades = totalBuyTrades + o.amount;
    }

    for (const o of coinOpenTrades[SELL]) {
      totalSellTrades = totalSellTrades + o.amount;
    }

    return(
      <Grid container={true} spacing={24} alignItems="center" direction="row" justify="center">
        <Grid key={item.id + 'OwnerShip'} item={true} xs={3}>
          <Typography>Current Buy Orders:  {totalBuyTrades}</Typography>
          <Typography>Current Sell Orders: {totalSellTrades}</Typography>
        </Grid>
      </Grid>
    );
  }

  private dialogBUYUI() {
    const {orderItem} = this.state;
    console.log(this.state);
    return(
      <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Place your buy order on the exchange</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please check all the prices and details are correct, adjust if necessary
            </DialogContentText>
            <Typography>Placing order for: {orderItem.name}</Typography>
            <TextField
              autoFocus={true}
              margin="dense"
              id="number"
              label="Amount"
              value={this.state.amount}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange('amount')}
              type="number"
              fullWidth={true}
            />
            <TextField
              autoFocus={true}
              margin="dense"
              id="exchange"
              disabled={true}
              label="Exchange"
              value="Bittrex Exchange"
              onKeyPress={this.handleKeyPress}
              fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.placeBuyTrade(orderItem, orderItem.price_btc, Number(this.state.amount)
              , 1)} color="primary">
              PlACE BUY ORDER
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  private dialogSELLUI() {
    const {orderItem} = this.state;
    return(
      <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Place your sell order on the exchange</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please check all the prices and details are correct, adjust if necessary
            </DialogContentText>
            <Typography>Placing order for: {orderItem.name}</Typography>
            <TextField
              autoFocus={true}
              margin="dense"
              id="number"
              label="Amount"
              value={this.state.amount}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange('amount')}
              type="number"
              fullWidth={true}
            />
            <TextField
              autoFocus={true}
              margin="dense"
              id="exchange"
              disabled={true}
              label="Exchange"
              value="Bittrex Exchange"
              onKeyPress={this.handleKeyPress}
              fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.placeSellTrade(orderItem, orderItem.price_btc,
              Number(this.state.amount), 1)} color="primary">
              PlACE SELL ORDER
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  private coinBuySellUI(item) {
    const { classes } = this.props as any;

    return(
      <Grid container={true} spacing={24} alignItems="center" direction="row" justify="center">
        <Grid key={item.id + 'BuyButton'} item={true} xs={3}>
          <Button fullWidth={true} variant="flat"
              size="small" color="primary" className={classes.button}
              onClick={this.handleOpenBuySell(item, 'BUY')} >
              Place Buy Order
          </Button>
        </Grid>
        <Divider />
        <Grid key={item.id + 'SellButton'} item={true} xs={3}>
          <Button fullWidth={true} variant="flat"
              size="small" color="primary" className={classes.button}
              onClick={this.handleOpenBuySell(item, 'SELL')} >
              Place Sell Order
          </Button>
        </Grid>
      </Grid>
    );
  }

  public render() {

    const { classes } = this.props as any;
    const { coins } = this.props;

    const member = this.props.member as any;

    const searchBar = (
      <div >
        <form noValidate={true} autoComplete="off">
          <TextField
            value={this.state.searchTerm}
            id="bootstrap-input"
            onChange={this.handleChange('searchTerm')}
            onClick={this.defaultSearchClick('searchTerm')}
            onMouseOut={this.defaultSearch('searchTerm')}
            onKeyDown={this.handleKeyPress()}
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

    let allcoins = null;
    if (coins.coins !== null) {
       allcoins = (
        coins.coins.map( (itema) => {
          const searchTerm = this.state.searchTerm.toLowerCase();
          let shouldReturn = false;
          if (searchTerm === 'enter coin name...' || searchTerm === '') {
            shouldReturn = true;
          } else if (itema.name.toLowerCase().startsWith(searchTerm) ||
            itema.symbol.toLowerCase().startsWith(searchTerm)) {
            shouldReturn = true;
          }

          if (shouldReturn) {
            return (
                <Grid onClick={this.handleClickBox('searchTerm', itema.name)} key={itema.id} item={true} xs={12}>
                  <Paper className={classes.paper}>
                  <img height="32" width="32" src={require('../assets/icons/' + itema.symbol.toLowerCase() + '.svg')} />
                  <Typography>{itema.name}</Typography>
                  <Typography>{itema.price_usd} USD</Typography>
                  <Typography>{itema.price_btc} BTC</Typography>
                  {member.sessionID && member.openTrades[itema.symbol] ? this.coinOwnerShipDetailsUI(itema) : null}
                  {member.sessionID ? this.coinBuySellUI(itema) : null}
                  </Paper>
                </Grid>
            );
          }
        },
      ));
    }

    return (
      <div className={style.Home}>
        <Grid container={true} spacing={24} alignItems="stretch" direction="column" justify="center">
        {this.state.orderType === 'BUY' ? this.dialogBUYUI() : null}
        {this.state.orderType === 'SELL' ? this.dialogSELLUI() : null}
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
