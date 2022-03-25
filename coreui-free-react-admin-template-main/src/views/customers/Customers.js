import React from 'react'
// import customerData from './CustomersData'
import { Redirect } from 'react-router-dom'
import DataTable from 'react-data-table-component'
// import DataTable from '../../DataTable'
import {
  // CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  // CTable,
} from '@coreui/react'

const fields = [
  { name: 'Name', selector: (row) => row.name },
  { name: 'Email', selector: (row) => row.email },
  { name: 'Type', selector: (row) => row.type },
]

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
      filterValue: '',
      user: User,
      pending: true,
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
          pending: false,
          datatable: result,
        })
      })
  }
  render() {
    if (this.state.user === null) {
      return <Redirect to="/login" />
    }
    if (!this.state.user.is_admin) {
      return <Redirect to="/dashboard" />
    }
    const { datatable } = this.state
    console.log(datatable)
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
                    (item, index) =>
                      (item.name &&
                        item.name?.toLowerCase().includes(this.state.filterValue.toLowerCase())) ||
                      (item.email &&
                        item.email?.toLowerCase().includes(this.state.filterValue.toLowerCase())) ||
                      (item.type &&
                        item.type?.toLowerCase().includes(this.state.filterValue.toLowerCase())),
                  )}
                  selectableRows
                  direction="auto"
                  fixedHeaderScrollHeight="300px"
                  highlightOnHover
                  pagination
                  pointerOnHover
                  responsive
                  selectableRowsHighlight
                  selectableRowsNoSelectAll
                  selectableRowsRadio="checkbox"
                  striped
                  progressPending={this.state.pending}
                  // subHeader
                  // subHeaderAlign="left"
                />
              </CCardBody>
              {/* <CCardBody>
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
              </CCardBody> */}
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default Customers
