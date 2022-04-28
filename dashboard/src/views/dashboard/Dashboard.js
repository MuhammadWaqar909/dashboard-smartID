import React from 'react'
import { Redirect } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import {
  // CTable,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CCol,
  CRow,
  CImage,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
// import { Button } from '@coreui/coreui'

const customStyle = { headCells: { style: { fontWeight: 600, fontSize: '14px' } } }
let fields
const subHeaderComponent = (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input id="outlined-basic" label="Search" style={{ margin: '5px' }} />
  </div>
)

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('token')
    const User = JSON.parse(localStorage.getItem('user'))

    fields = [
      {
        key: 'visitor_name',
        wrap: true,
        minWidth: '120px',
        name: 'Visitor Name',
        selector: (row) => row.visitor_name,
        filterable: true,
      },
      {
        key: 'visitor_company',
        wrap: true,
        minWidth: '150px',
        name: 'Visitor Company',
        selector: (row) => row.visitor_company,
        filterable: true,
      },
      {
        key: 'visitor_card_pic',
        name: 'Card',
        wrap: true,

        selector: (row) => (
          <button
            style={{
              width: '100%',
              height: '50px',
              background: 'none',
              outline: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => this.toggle(row.visitor_card_pic)}
          >
            <img
              style={{ width: '100%', height: '100%' }}
              src={`${process.env.REACT_APP_MEDIA_URL + row.visitor_card_pic}`}
              alt="card/jpg"
            />
          </button>
        ),
      },
      {
        key: 'visitor_face_pic',
        name: 'Face',
        wrap: true,

        selector: (row) => (
          <button
            style={{
              width: '100%',
              height: '50px',
              background: 'none',
              outline: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => this.toggle(row.visitor_face_pic)}
          >
            <img
              style={{ width: '100%', height: '100%' }}
              src={`${process.env.REACT_APP_MEDIA_URL + row.visitor_face_pic}`}
              alt="card/jpg"
            />
          </button>
        ),
      },
      {
        key: 'visiting_to',
        wrap: true,
        name: 'Visit To',
        selector: (row) => row.visiting_to,
        filterable: true,
      },

      {
        key: 'visit_purpose',
        wrap: true,
        name: 'Visitor Purpose',
        minWidth: '140px',
        selector: (row) => row.visit_purpose,
        filterable: true,
      },
      {
        key: 'time_in',
        wrap: true,
        name: 'Visit Date',
        selector: (row) => row.time_in,
        filterable: true,
      },
      {
        key: 'time_out',
        wrap: true,
        name: 'Time Out',
        selector: (row) => row.time_out,
        filterable: true,
      },
      {
        key: 'national_id',
        minWidth: '140px',
        wrap: true,
        name: 'National ID',
        selector: (row) => row.national_id,
        filterable: true,
      },
      {
        key: 'nationality',
        wrap: true,
        minWidth: '140px',
        name: 'Nationality',
        selector: (row) => row.nationality,
        filterable: true,
      },
      {
        key: 'user_id',
        wrap: true,
        name: 'Customer',
        selector: (row) => row.customer_id,
        filterable: true,
      },
      {
        key: 'ocr_data',
        name: 'Details',
        wrap: true,

        selector: (row) => (
          <button
            onClick={() => {
              this.toggleDetails(row.ocr_data)
              // console.log('Show Data Target....')
            }}
          >
            Show Data
          </button>
        ),
      },
    ]

    let Authorization = token
    let loggedIn = true

    if (Authorization == null) {
      loggedIn = false
    }

    this.state = {
      auth: Authorization,
      filterValue: '',
      user: User,
      datatable: [],
      pmodal: false,
      cmodal: false,
      pic_url: '',
      pending: true,
      details: [],
      setDetails: '',
    }

    this.toggle = this.toggle.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
    this.closeDetails = this.closeDetails.bind(this)
    this.closePictureModel = this.closePictureModel.bind(this)
  }

  componentDidMount() {
    if (this.state.auth != null) {
      fetch(process.env.REACT_APP_API_URL + 'api/visitors/3', {
        headers: { Authorization: this.state.auth },
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            pending: false,
            datatable: result,
          })
        })
    }
  }
  toggle(pic) {
    this.setState({
      pmodal: !this.state.pmodal,
      pic_url: pic,
    })
  }

  toggleDetails(item, index = '') {
    let newDetails = JSON.parse(item)

    this.setState({
      cmodal: !this.state.cmodal,
      setDetails: Object.keys(newDetails),
      setDetails: Object.keys(newDetails).map((key) => `${key} = ${newDetails[key]}`),
    })
    console.log(this.state.setDetails)
  }

  closeDetails() {
    this.setState({
      cmodal: false,
      details: '',
    })
  }
  closePictureModel() {
    this.setState({
      pmodal: false,
    })
  }

  render() {
    if (this.state.auth === null) {
      return <Redirect to="/login" />
    }
    const { datatable } = this.state
    console.log(datatable[0]?.id)
    return (
      <>
        {/* <WidgetsDropdown /> */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Visitors</CCardHeader>
              <CCardBody>
                <div>
                  <label htmlFor="Search">
                    <strong>Search</strong>
                  </label>
                  <br />
                  <input
                    id="Search"
                    type="text"
                    placeholder="Enter Filter"
                    onChange={(item) => {
                      console.log(item.target.value)
                      return this.setState({ filterValue: item.target.value })
                    }}
                  />
                </div>
                <DataTable
                  columns={fields}
                  data={datatable.filter(
                    (item) =>
                      (item.visitor_name &&
                        item.visitor_name
                          .toLowerCase()
                          .includes(this.state.filterValue.toLowerCase())) ||
                      (item.visitor_company &&
                        item.visitor_company
                          .toLowerCase()
                          .includes(this.state.filterValue.toLowerCase())) ||
                      (item.id &&
                        item.id
                          .toString()
                          .toLowerCase()
                          .includes(this.state.filterValue.toString().toLowerCase())) ||
                      (item.visit_purpose &&
                        item.visit_purpose
                          .toString()
                          .toLowerCase()
                          .includes(this.state.filterValue.toString().toLowerCase())),
                  )}
                  // data={datatable}
                  selectableRows
                  direction="auto"
                  fixedHeaderScrollHeight="300px"
                  highlightOnHover
                  pagination
                  pointerOnHover
                  selectableRowsHighlight
                  selectableRowsNoSelectAll
                  selectableRowsRadio="checkbox"
                  striped
                  progressPending={this.state.pending}
                  // customStyles={customStyle}
                  // subHeaderComponent={subHeaderComponent}
                  responsive
                  subHeaderAlign="right"
                  subHeaderWrap
                />
                {/* <CSmartTable
                  items={datatable}
                  fields={fields}
                  columnfilter="true"
                  tablefilter="true"
                  hover
                  striped
                  bordered
                  size="md"
                  itemsperpage={20}
                  pagination="true"
                  scopedslots={{
                    user_id: (item) => <td>{item.user.name}</td>,
                    customer_id: (item) => <td>{item.user.name}</td>,
                    visitor_face_pic: (item) => (
                      <td>
                        <CImage
                          src={process.env.REACT_APP_MEDIA_URL + item.visitor_face_pic}
                          fluid
                          className="mb-2"
                          thumbnail
                          onClick={() => this.toggle(item.visitor_face_pic)}
                          width="75"
                          height="75"
                        />
                      </td>
                    ),
                    visitor_card_pic: (item) => (
                      <td>
                        <CImage
                          src={process.env.REACT_APP_MEDIA_URL + item.visitor_card_pic}
                          fluid
                          className="mb-2"
                          thumbnail
                          onClick={() => this.toggle(item.visitor_card_pic)}
                          width="75"
                          height="75"
                        />
                      </td>
                    ),
                    ocr_data: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.toggleDetails(item, index)
                            }}
                          >
                            Show Data
                          </CButton>
                        </td>
                      )
                    },
                  }}
                /> */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CModal visible={this.state.pmodal} onClose={this.closePictureModel}>
          <CModalHeader>Picture</CModalHeader>
          <CModalBody>
            <CImage
              src={process.env.REACT_APP_MEDIA_URL + this.state.pic_url}
              fluid
              className="mb-2"
              thumbnail
              width="480"
              height="200"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={this.toggle}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={this.state.cmodal} onClose={this.closeDetails}>
          <CModalHeader closeButton>Details</CModalHeader>
          <CModalBody>
            <CContainer>{this.state.setDetails}</CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={this.closeDetails}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }
}

export default Dashboard
