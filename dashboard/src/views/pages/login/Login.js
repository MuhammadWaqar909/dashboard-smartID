import React from 'react'
import { Redirect } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import spinner from '../../../assets/spinner.gif'
import { cilLockLocked } from '@coreui/icons'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  // CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
// import { CIcon } from '@coreui/icons-react'
class Login extends React.Component {
  constructor(props) {
    super(props)
    let loggedIn = false

    this.state = {
      isLoading: false,
      email: '',
      pass: '',
      token: '',
      loggedIn,
      error: 'd-none',
      url: process.env.REACT_APP_API_URL,
    }
    this.onChange = this.onChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  formSubmit(e) {
    e.preventDefault()
    const { email, pass } = this.state
    this.setState({ isLoading: true })
    // console.log(`${email}, ${pass}`)
    this.login(email, pass)
  }

  login(userEmail, userPass) {
    console.log(`${userEmail}, ${userPass}`)

    fetch(this.state.url + 'api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': 'origin' },
      body: JSON.stringify({ email: userEmail, password: userPass }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message !== 'Unauthorized') {
          this.setState({
            loggedIn: true,
            token: result.token_type + ' ' + result.access_token,
            user: result.user,
          })
        } else {
          this.setState({
            isLoading: false,
            error: 'd-block',
          })
        }
      })
  }

  render() {
    if (this.state.loggedIn) {
      localStorage.setItem('token', this.state.token)
      localStorage.setItem('user', JSON.stringify(this.state.user))
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer className="mt-5">
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.formSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText id="basic-addon1">@</CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Email"
                          id="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        {/* <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText> */}
                        <CInputGroupText id="basic-addon1">
                          <CIcon icon={cilLockLocked} size="lx" />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          id="pass"
                          value={this.state.password}
                          onChange={this.onChange}
                          required
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol className={this.state.error} md="12">
                          <h3 className="text-center">Email Not Founded</h3>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="6">
                          {this.state.isLoading && (
                            <div style={{ width: '30px', height: '30px' }}>
                              <img
                                src={spinner}
                                style={{ width: '100%', height: '100%' }}
                                alt="Spinner/image"
                              />
                            </div>
                          )}
                          {!this.state.isLoading && (
                            <CButton color="primary" type="submit" className="px-4">
                              Login
                            </CButton>
                          )}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default Login
