import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { cilUser } from '@coreui/icons'
import {
  CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

class Register extends React.Component {
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
      fields: {},
      errors: {},
    }
  }

  componentDidMount() {}
  handleValidation() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    //Name
    if (!fields['name']) {
      formIsValid = false
      errors['name'] = 'Cannot be empty'
    }

    if (typeof fields['name'] !== 'undefined') {
      if (!fields['name'].match(/^[a-zA-Z]+$/)) {
        formIsValid = false
        errors['name'] = 'Only letters'
      }
    }

    //Email
    if (!fields['email']) {
      formIsValid = false
      errors['email'] = 'Cannot be empty'
    }

    if (typeof fields['email'] !== 'undefined') {
      let lastAtPos = fields['email'].lastIndexOf('@')
      let lastDotPos = fields['email'].lastIndexOf('.')

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields['email'].indexOf('@@') == -1 &&
          lastDotPos > 2 &&
          fields['email'].length - lastDotPos > 2
        )
      ) {
        formIsValid = false
        errors['email'] = 'Email is not valid'
      }
    }
    //Password
    if (!fields['password']) {
      formIsValid = false
      errors['password'] = 'Cannot be empty'
    }
    if (!fields['conf_password']) {
      formIsValid = false
      errors['conf_password'] = 'Cannot be empty'
    }
    if (
      fields['password'] &&
      fields['conf_password'] &&
      fields['password'] != fields['conf_password']
    ) {
      formIsValid = false
      errors['password'] = 'password mismatch'
    }
    this.setState({ errors: errors })
    return formIsValid
  }

  customerSubmit = (e) => {
    e.preventDefault()
    let errors = {}
    if (this.handleValidation()) {
      let fields = this.state.fields
      let customerData = {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        type: 'customer',
      }
      fetch(process.env.REACT_APP_API_URL + 'api/customers', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: this.state.auth,
        },
        body: JSON.stringify(customerData),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status == 1) {
            return <Redirect to="#/customers" />
          } else {
            Object.entries(response.messages).map(([key, value]) => {
              errors[key] = value
            })
            this.setState({ errors: errors })
          }
        })
    } else {
      //alert("Form has errors.");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({ fields })
  }
  render() {
    // if (this.state.user === null) {
    //   return <Redirect to="/login" />
    // }
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Customer Add</CCardHeader>
              <CCardBody className="px-auto">
                <CForm onSubmit={this.customerSubmit}>
                  <h1>Customer</h1>
                  <p className="text-muted">Create new Customer</p>
                  <CInputGroup className="mb-3">
                    {/* <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend> */}
                    <CInputGroupText id="basic-addon1">
                      <CIcon icon={cilUser} size="lx" />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="name"
                      placeholder="Username"
                      autoComplete="username"
                      onChange={this.handleChange.bind(this, 'name')}
                      value={this.state.fields['name']}
                    />
                    <div style={{ color: 'red' }}>{this.state.errors['name']}</div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">@</CInputGroupText>

                    <CFormInput
                      type="text"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={this.handleChange.bind(this, 'email')}
                      value={this.state.fields['email']}
                    />
                    <div style={{ color: 'red' }}>{this.state.errors['email']}</div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <CIcon icon={cilLockLocked} size="lx" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={this.handleChange.bind(this, 'password')}
                      value={this.state.fields['password']}
                    />
                    <span style={{ color: 'red' }}>{this.state.errors['password']}</span>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText id="basic-addon1">
                      <CIcon icon={cilLockLocked} size="lx" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="conf_password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={this.handleChange.bind(this, 'conf_password')}
                      value={this.state.fields['conf_password']}
                    />
                    <span style={{ color: 'red' }}>{this.state.errors['conf_password']}</span>
                  </CInputGroup>
                  <CButton type="submit" color="success" block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default Register
