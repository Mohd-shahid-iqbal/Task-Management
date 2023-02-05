import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      name: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      description: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleModal() {
    this.setState({ show: !this.state.show });
    this.props.getalldata();
  }

  submitHandler = () => {
    const data = {
      // generating uuid on the behalf of current time
      id: Math.floor(Math.random() * Date.now()),
      name: this.state.name,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      description: this.state.description,
    };
    this.props.setrows([...this.props.rows, data]);

    this.setState({
      show: !this.state.show,
      name: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      description: "",
    });
  };

  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary crud"
          onClick={() => this.handleModal()}
        >
          CREATE TASK
        </button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={() => this.handleModal()}
          // onEntered={this.test}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form autocomplete="off" onSubmit={this.submitHandler}>
              <div className="container page">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={this.state.first_name}
                        name="name"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={this.state.start_time}
                        name="start_time"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>End Time</label>
                      <input
                        type="time"
                        value={this.state.end_time}
                        name="end_time"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={this.state.start_date}
                        name="start_date"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        value={this.state.end_date}
                        name="end_date"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={this.state.description}
                      name="description"
                      onChange={this.handleChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <br />
                  <div className="mx-auto">
                    <button
                      // type="submit"
                      onClick={this.submitHandler}
                      className="btn btn-primary text-right"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.handleModal()}
              className="btn btn-danger"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Popup;
