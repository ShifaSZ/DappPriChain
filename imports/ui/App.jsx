import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactJson from 'react-json-view';

export class App  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {blkNum: 0,
      block:{},
      key:"",
      src:"",
      dst:"",
      amount:""
    };

    this.handleBlkChange = this.handleBlkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleKeySubmit = this.handleKeySubmit.bind(this);

    this.handleSrcChange = this.handleSrcChange.bind(this);
    this.handleDstChange = this.handleDstChange.bind(this);
    this.handleAmntChange = this.handleAmntChange.bind(this);
    this.handleTxSubmit = this.handleTxSubmit.bind(this);
  }

  handleSrcChange(event) {
    this.setState({src: event.target.value});
  }

  handleDstChange(event) {
    this.setState({dst: event.target.value});
  }

  handleAmntChange(event) {
    this.setState({amount: event.target.value});
  }

  handleTxSubmit(event) {
    Meteor.call("sendEther",this.state.src,
      this.state.dst,this.state.amount, (err, result)=> {
      if (err)
        console.log(err)
      else if (result !== null)
        console.log(result)
    })
    event.preventDefault();
  }

  handleBlkChange(event) {
    this.setState({blkNum: event.target.value});
  }

  handleKeyChange(event) {
    this.setState({key: event.target.value});
  }

  handleSubmit(event) {
    Meteor.call("getBlock",this.state.blkNum, (err, result)=> {
      if (err)
        console.log(err)
      else if (result !== null)
        this.setState({block:result})
    })
    event.preventDefault();
  }

  handleKeySubmit(event) {
    Meteor.call("importRawKey",this.state.key, "xdgxdg204", (err, result)=> {
      if (err)
        console.log(err)
      else if (result !== null)
        console.log(result)
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <form onSubmit={this.handleKeySubmit}>
          Raw key:
          <input type="text" value={this.state.key}
            onChange={this.handleKeyChange}/>
          <input type="submit" value="Import"/><br/>
        </form>
        <form onSubmit={this.handleTxSubmit}>
          Source account:
          <input type="text" value={this.state.src}
            onChange={this.handleSrcChange}/><br/>
          Dest account:
          <input type="text" value={this.state.dst}
            onChange={this.handleDstChange}/><br/>
          Amount to transfer (Wei):
          <input type="number" value={this.state.amount}
            onChange={this.handleAmntChange}/>
          <input type="submit" value="Trans"/><br/>
        </form>
        <form onSubmit={this.handleSubmit}>
          Block number:
          <input type="number" value={this.state.blkNum}
            onChange={this.handleBlkChange}/>
          <input type="submit" value="Show"/>
        </form>
        <ReactJson src={this.state.block} name={"Block"} collapsed ={2}
          collapseStringsAfterLength ={60} />
      </div>
    )
  }
}

