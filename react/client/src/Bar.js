import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './kiss_logo.jpg'
import { Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import KISSContract from "./contracts/KISS.json";
import getWeb3 from "./utils/getWeb3";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    formControl: {
        // marginLeft: -12,
        // marginRight: 20,
        // minWidth: 200,
    },
};


class Bar extends Component {

    state = {
        transfer: false,
        help: false,
        address: '',
        hours: '',
        proName: '',
        tel: '',
        email: '',
        availableTime: '',
        category: '',
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null,
        open: false,
        age: '',
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleChangeForm = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };


    handleClickTransfer = () => {
        this.setState({ transfer: true })
    }

    handleCloseTransfer = () => {
        this.setState({ transfer: false })
    }

    handleClickHelp = () => {
        this.setState({ help: true })
    }

    handleCloseHelp = () => {
        this.setState({ help: false })
    }

    handleSubmit = () => {
        console.log(this.state.category)
        this.handleCloseHelp()
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = KISSContract.networks[networkId];
            const instance = new web3.eth.Contract(
                KISSContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            this.setState({ web3, accounts, contract: instance });
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            // this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    handleTransferHours = () => {
        console.log(this.state.hours)
        console.log(this.state.address)

        this.runExample()
        this.setState({ transfer: false })
    };

    runExample = async () => {
        const { accounts, contract } = this.state;

        // Stores a given value, 5 by default.
        await contract.methods.transfer(this.state.address, this.state.hours).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.getBalance(this.state.address).call();

        // Update state with the result.
        this.setState({ storageValue: response });
        console.log(response)
    };


    render() {
        const { classes } = this.props;
        const { address, hours, transfer, proName, tel, email, availableTime } = this.state
        const { help } = this.state
        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="inherit">
                    <Toolbar>
                        <img src={logo} alt="" srcSet={logo + ' 2x'} width="80" />
                        <Grid container justify="flex-end" alignItems="center">
                            <div>
                                <Button className={classes.userButton} onClick={this.handleClickTransfer}>
                                    <Typography className={classes.userButtonFont}>
                                        <strong >Transfer Hours</strong>
                                    </Typography>
                                </Button>
                                <Button className={classes.userButton} onClick={this.handleClickHelp}>
                                    <Typography className={classes.userButtonFont}>
                                        <strong>Provide Help</strong>
                                    </Typography>
                                </Button>
                            </div>
                        </Grid>
                        <IconButton className={classes.settingsButton}
                        // onClick={this.toggleDrawer(true)}
                        ><SettingsIcon /></IconButton>
                    </Toolbar>
                </AppBar>

                <Dialog open={transfer} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">Transfer Hours</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="address"
                            label="Address"
                            fullWidth
                            value={address}
                            onChange={this.handleChange('address')}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="hours"
                            label="Hours"
                            // type="e"
                            fullWidth
                            value={hours}
                            onChange={this.handleChange('hours')}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTransfer} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleTransferHours} color="primary">
                            Transfer
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={help} onClose={this.handleCloseHelp} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">Provide Help</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="proName"
                            label="Provider Name"
                            fullWidth
                            value={proName}
                            onChange={this.handleChange('proName')}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="tel"
                            label="Telephone Number"
                            fullWidth
                            value={tel}
                            onChange={this.handleChange('tel')}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={this.handleChange('email')}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="availableTime"
                            label="Available Time"
                            value={availableTime}
                            onChange={this.handleChange('availableTime')}
                            variant="outlined"
                            fullWidth
                        />
                        {/* <TextField
                            margin="dense"
                            id="category"
                            label="Category"
                            value={category}
                            onChange={this.handleChange('category')}
                            variant="outlined"
                            fullWidth
                        /> */}
                        <form autoComplete="off">
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="demo-controlled-open-select">Category</InputLabel>
                                <Select
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={this.state.category}
                                    onChange={this.handleChangeForm}
                                    inputProps={{
                                        name: 'category',
                                        id: 'category-controlled-open-select',
                                    }}
                                >
                                    <MenuItem value={1}>Household</MenuItem>
                                    <MenuItem value={2}>Eating</MenuItem>
                                    <MenuItem value={3}>Plants</MenuItem>
                                    <MenuItem value={4}>Animals</MenuItem>
                                    <MenuItem value={5}>Office</MenuItem>
                                    <MenuItem value={6}>Entertainment</MenuItem>
                                    <MenuItem value={7}>Family</MenuItem>
                                    <MenuItem value={8}>Transportation</MenuItem>
                                    <MenuItem value={9}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseHelp} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default withStyles(styles)(Bar)
