import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#282c34",
    minHeight: "100vh",
    color: "white"
  },
  textHeader: {
    textAlign: "center"
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      userLineID: '',
      pictureUrl: '',
      statusMessage: '',
      log: '',
      errorLog: '',
    };
    this.startLIFF = this.startLIFF.bind(this);
  }

  async startLIFF() {
    try {
      await liff.init({ liffId: 'LIFF ID' });
      let profile = await liff.getProfile();
      this.setState({
        displayName : profile.displayName,
        userId : profile.userId,
        pictureUrl : profile.pictureUrl,
        statusMessage : profile.statusMessage,
        log: 'LIFT-INIT SUCCESS'
      })
    } catch (e) {
      this.setState({
        errorLog: 'LIFT-INIT FAILURE ' + e.message 
      })
    }
  }

  sendMessage() {
    liff.sendMessages([
      {
        type: 'text',
        text: 'Hello, World!'
      }
    ]).then(() => {
      liff.closeWindow();
    }).catch((e) => {
      this.setState({
        log: `send error!! ${e}`
      })
    });
  }

  closeLIFF() {
    liff.closeWindow();
  }

  componentDidMount() {
    this.startLIFF();
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Grid container >
          <Grid item xs={12} className={classes.textHeader}>
            <img width="25%" src="https://img.icons8.com/color/420/line-me.png" />
          </Grid>
          <Grid item xs={12} className={classes.textHeader}>
            <Typography variant="h3" gutterBottom>
              React x LIFF
            </Typography>
          </Grid>
          { 
            this.state.pictureUrl && 
            (
              <Grid item xs={12} className={classes.textHeader}>
                <img width="25%" src={this.state.pictureUrl} />
              </Grid>
            )
          }
          { 
            this.state.displayName && (
              <Grid item xs={12} className={classes.textHeader}>
                <Typography variant="body" gutterBottom>
                  Name: {this.state.displayName}
                </Typography>
            </Grid>
            )
          }
          { 
            this.state.userLineID && (
              <Grid item xs={12} className={classes.textHeader}>
                <Typography variant="body" gutterBottom>
                  Name: {this.state.userLineID}
                </Typography>
            </Grid>
            )
          }
          <Grid item xs={12} className={classes.textHeader}>
          <Button variant="contained" onClick={this.sendMessage.bind(this)} style={{ marginRight: '20px' }}>
              Send Message
            </Button>
            <Button variant="contained" onClick={this.closeLIFF.bind(this)} color="secondary">
              Close LIFF
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.textHeader}>
            <Typography variant="5" gutterBottom>
              {this.state.errorLog || this.state.log}
            </Typography>
          </Grid>
        </Grid>
      </div>
        
    );
  }
  
}

export default withStyles(styles)(App);
