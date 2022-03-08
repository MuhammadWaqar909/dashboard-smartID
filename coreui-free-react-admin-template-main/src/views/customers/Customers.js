import React, { lazy } from 'react'
// import customerData from './CustomersData'
import { Redirect } from 'react-router-dom'
import {
  CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTable,
} from '@coreui/react'

const fields = ['name', 'email', 'type']

class Customers extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('token')
    const User = JSON.parse(localStorage.getItem('user'))
    let Authorization = token
    let loggedIn = true

    if (Authorization == null) {
      loggedIn = false
    }

    this.state = {
      auth: Authorization,
      user: User,
      datatable: [],
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + 'api/customers', {
      headers: { Authorization: this.state.auth },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          datatable: result,
        })
      })
  }
  render() {
    // if (this.state.user === null) {
    //   return <Redirect to="/login" />
    // }
    // if (!this.state.user.is_admin) {
    //   return <Redirect to="/dashboard" />
    // }
    const { datatable } = this.state

    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <span className="justify-content-start">Customers</span>
                <CNav variant="pills" className="card-header-pills justify-content-end">
                  <CNavItem>
                    <CNavLink href="#/customers/add" active>
                      Add Customer
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </CCardHeader>
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
                  itemsPerPage={10}
                  pagination
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default Customers
