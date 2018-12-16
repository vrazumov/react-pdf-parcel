import React from 'react'
//import { Redirect } from 'react-router-dom'
//import { connect } from 'react-redux'
import PDF from './viewer'


export default class PdfViewer extends React.Component {
  state = {
    redirect: false,
    file: this.props.file
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/temas' />
    }
  }
  render () {

    const {file} = this.props;

    return (
       
       <div>
         <h2>PDF Viewer {file}</h2>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect to temas</button>
        <div><PDF file={file}/></div>
       </div>
    )
  }
}

