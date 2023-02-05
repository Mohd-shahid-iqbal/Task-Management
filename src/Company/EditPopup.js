import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class EditPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
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
  }

  submitHandler = () => {
    this.props.setTask([
      { ...this.state },
      ...this.props.tasks.filter((ele) => ele.id !== this.props.data.id),
    ]);
    this.props.closeMOdalHandler();
  };

  dataSetHandler = () => {
    this.setState({
      id: this.props.data.id,
      name: this.props.data.name,
      start_time: this.props.data.start_time,
      end_time: this.props.data.end_time,
      start_date: this.props.data.start_date,
      end_date: this.props.data.end_date,
      description: this.props.data.description,
    });
  };

  render() {
    return (
      <>
        {/* <button
          type="button"
          className="btn btn-primary crud"
          onClick={() => this.handleModal()}
        >
          CREATE CRUD
        </button> */}

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.show}
          onHide={() => this.props.closeMOdalHandler()}
          onEnter={() => this.dataSetHandler()}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit CRUD Operations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler}>
              <div className="container page">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={this.state.name}
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
                      {/* <input
                        type="text"
                        value={this.state.start_date}
                        name="start_date"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      /> */}
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
                      required
                    ></textarea>
                  </div>
                  <br />
                  <div className="mx-auto">
                    <button
                      type="button"
                      onClick={this.submitHandler}
                      className="btn btn-primary text-right"
                    >
                      Update Task
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.props.closeMOdalHandler()}
              className="btn btn-danger
                       "
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPopup;
