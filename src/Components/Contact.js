import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import axios from "axios";

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactEmail: '',
      contactSubject: '',
      contactMessage: ''
    }
  }

  onNameChange(event) {
    this.setState({contactName: event.target.value})
  }
  onEmailChange(event) {
      this.setState({contactEmail: event.target.value})
  }

  onSubjectChange(event) {
      this.setState({contactSubject: event.target.value})
  }

  onMsgChange(event) {
      this.setState({contactMessage: event.target.value})
  }

  render() {
    if (!this.props.data) return null;


    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const st = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.message;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">

              <form id="contactForm" onSubmit={this.submitEmail.bind(this)} method="POST">
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactName"
                      name="contactName"
                      required value={this.state.contactName}
                      onChange={this.onNameChange.bind(this)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      required value={this.state.contactEmail}
                      onChange={this.onEmailChange.bind(this)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      required value={this.state.contactSubject}
                      onChange={this.onSubjectChange.bind(this)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                      required value={this.state.contactMessage}
                      onChange={this.onMsgChange.bind(this)}
                    ></textarea>
                  </div>
                  <div>
                    <button type='submit'>Submit</button>

                  </div>
                </fieldset>
              </form>
            </div>
          </Slide>
          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Address and Phone</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} <br />
                  {city}, {st} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>
            </aside>
          </Slide>
        </div>
        
      </section>
    );

  }



  submitEmail(e){
    e.preventDefault();
    axios({
      method: "POST", 
      url:"/send", 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
          alert("Message Sent."); 
          this.resetForm()
      }else if(response.data.status === 'fail'){
          alert("Message failed to send.")
      }
    })
  };
    resetForm() {
      this.setState({contactName: '', contactEmail: '',contactSubject:'', contactMessage: ''})
    };
}


export default Contact;
