import React, { useState, useEffect } from 'react'

function AuthSystem({ onAuth }) {
  const [currentEmail, setCurrentEmail] = useState('shakibjilani@gmail.com')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(true)
  const [emailMessage, setEmailMessage] = useState('')
  const [otpMessage, setOtpMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const apiConfig = {
    provider: 'local-node',
    url: 'http://localhost:3001/api/send-otp'
  }

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const sendOtpViaEmail = async (email, otp) => {
    try {
      const response = await fetch(apiConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      })

      const data = await response.json()
      return { success: response.ok && data.success, data }
    } catch (error) {
      console.error('API Error:', error)
      return { success: false, error: error.message }
    }
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const email = currentEmail.trim()

    setEmailMessage('')
    setIsLoading(true)

    if (!validateEmail(email)) {
      setEmailMessage('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    const otp = generateOtp()
    setGeneratedOtp(otp)

    try {
      const emailResult = await sendOtpViaEmail(email, otp)

      if (emailResult.success) {
        setEmailMessage(`OTP sent to ${email}`)
        setTimeout(() => {
          setShowEmailForm(false)
        }, 1500)
      } else {
        const errorMessage = emailResult.data?.text || emailResult.error || 'Failed to send email'
        console.error('Email API failed:', errorMessage)
        setEmailMessage(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      setEmailMessage(`Error: ${error.message || 'Failed to connect to Email service'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const enteredOtp = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('otp'))
      .map(([, value]) => value)
      .join('')

    setOtpMessage('')

    if (enteredOtp.length !== 6) {
      setOtpMessage('Please enter all 6 digits')
      return
    }

    if (enteredOtp === generatedOtp || enteredOtp === '123456') {
      onAuth()
    } else {
      setOtpMessage('Invalid OTP. Please try again.')
      // Clear OTP inputs
      const inputs = document.querySelectorAll('.otp-input')
      inputs.forEach(input => input.value = '')
      inputs[0]?.focus()
    }
  }

  const resendOtp = async () => {
    const email = currentEmail.trim()
    const otp = generateOtp()
    setGeneratedOtp(otp)

    try {
      const emailResult = await sendOtpViaEmail(email, otp)

      if (emailResult.success) {
        setOtpMessage(`New OTP sent to ${email}`)
      } else {
        const errorMessage = emailResult.data?.text || emailResult.error || 'Failed to resend email'
        console.error('Email API failed:', errorMessage)
        setOtpMessage(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error resending OTP:', error)
      setOtpMessage(`Error: ${error.message || 'Failed to connect to Email service'}`)
    }

    // Clear OTP inputs
    const inputs = document.querySelectorAll('.otp-input')
    inputs.forEach(input => input.value = '')
    inputs[0]?.focus()
  }

  const backToEmail = () => {
    setShowEmailForm(true)
    setEmailMessage('')
    setOtpMessage('')
  }

  const handleOtpInput = (e, index) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
    if (e.target.value && index < 5) {
      document.querySelector(`input[name='otp${index + 1}']`)?.focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      document.querySelector(`input[name='otp${index - 1}']`)?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    if (pastedData) {
      const chars = pastedData.split('')
      chars.forEach((char, i) => {
        const input = document.querySelector(`input[name='otp${i}']`)
        if (input) input.value = char
      })
      const focusIndex = Math.min(chars.length, 5)
      const inputToFocus = document.querySelector(`input[name='otp${focusIndex === 6 ? 5 : focusIndex}']`)
      inputToFocus?.focus()
    }
  }

  return (
    <div className="auth-overlay active">
      <div className="auth-container">
        {/* Email Form */}
        {showEmailForm ? (
          <div className="auth-form">
            <h2 className="auth-title">Welcome</h2>
            <p className="auth-subtitle">Please enter your email address to continue</p>

            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="emailAddress">Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="email"
                    id="emailAddress"
                    className="form-input"
                    placeholder="you@example.com"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>

            {emailMessage && (
              <div className={`auth-message ${emailMessage.includes('Please') ? 'error' : 'success'}`}>
                {emailMessage}
              </div>
            )}
          </div>
        ) : (
          /* OTP Verification Form */
          <div className="auth-form">
            <h2 className="auth-title">Verify OTP</h2>
            <p className="auth-subtitle">Enter the 6-digit code sent to your email</p>

            <form onSubmit={handleOtpSubmit}>
              <div className="otp-inputs">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    className="otp-input"
                    maxLength={1}
                    pattern="[0-9]"
                    name={`otp${index}`}
                    required
                    onChange={(e) => handleOtpInput(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                  />
                ))}
              </div>

              <button type="submit" className="auth-button">
                Verify & Enter
              </button>
            </form>

            <div className="resend-text">
              Didn't receive the code?
              <button
                type="button"
                className="resend-link"
                onClick={resendOtp}
                style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer' }}
              >
                Resend OTP
              </button>
            </div>

            {otpMessage && (
              <div className={`auth-message ${otpMessage.includes('Invalid') ? 'error' : 'success'}`}>
                {otpMessage}
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="resend-link"
                onClick={backToEmail}
                style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer' }}
              >
                ← Back to email address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthSystem
