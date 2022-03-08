import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import {
  CTable,
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

const fields = [
  { key: 'visitor_name', label: 'Visitor Name' },
  { key: 'visitor_company', label: 'Visitor Company' },
  { key: 'visitor_card_pic', label: 'Card', sorter: false, filter: false },
  { key: 'visitor_face_pic', label: 'Face', sorter: false, filter: false },
  { key: 'visiting_to', label: 'Visit To' },
  { key: 'visit_purpose', label: 'Visitor Purpose' },
  { key: 'time_in', label: 'Visit Date' },
  { key: 'time_out', label: 'Time Out' },
  { key: 'national_id', label: 'National ID' },
  { key: 'nationality', label: 'Nationality' },
  { key: 'user_id', label: 'Customer' },
  { key: 'ocr_data', label: 'Details', sorter: false, filter: false },
]

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('token')
    const User = JSON.parse(localStorage.getItem('user'))
    let Authorization = token
    let loggedIn

    if (Authorization == null) {
      loggedIn = false
    }
    loggedIn = true
    this.state = {
      auth: Authorization,
      user: User,
      datatable: [],
      pmodal: false,
      cmodal: false,
      pic_url: '',
      details: [],
      setDetails: '',
    }

    this.toggle = this.toggle.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
    this.closeDetails = this.closeDetails.bind(this)
  }

  componentDidMount() {
    if (this.state.auth != null) {
      console.log(this.state.auth)
      fetch(process.env.REACT_APP_API_URL + 'api/visitors/3', {
        headers: { Authorization: this.state.auth },
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            datatable: result,
          })
        })
    }
  }

  toggle(pic = '') {
    this.setState({
      pmodal: !this.state.pmodal,
      pic_url: pic,
    })
  }

  toggleDetails(item, index = '') {
    let newDetails = this.state.datatable[index]
    newDetails = JSON.parse(newDetails.ocr_data)
    this.setState({
      cmodal: !this.state.cmodal,
      details: newDetails,
      // setDetails: Object.keys(newDetails)
      // setDetails: Object.keys(newDetails).map(function (key) {
      //   return (
      //     <div>
      //       {key} = {newDetails[key]}
      //     </div>
      //   )
      // }),
    })
  }

  closeDetails() {
    this.setState({
      cmodal: !this.state.cmodal,
      details: '',
    })
  }

  render() {
    if (this.state.auth === null) {
      return <Redirect to="/login" />
    }
    const { datatable } = this.state

    return (
      <>
        {/* <WidgetsDropdown /> */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Visitors</CCardHeader>
              <CCardBody>
                <CTable
                  items={datatable}
                  fields={fields}
                  columnFilter
                  tableFilter
                  hover
                  striped
                  bordered
                  size="md"
                  itemsPerPage={20}
                  pagination
                  scopedSlots={{
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
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CModal show={this.state.pmodal} onClose={this.toggle}>
          <CModalHeader closeButton>Picture</CModalHeader>
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

        <CModal show={this.state.cmodal} onClose={this.closeDetails}>
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
