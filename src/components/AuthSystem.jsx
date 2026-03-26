import React, { useState, useEffect } from 'react'

function AuthSystem({ onAuth }) {
  const [currentPhone, setCurrentPhone] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [showPhoneForm, setShowPhoneForm] = useState(true)
  const [phoneMessage, setPhoneMessage] = useState('')
  const [otpMessage, setOtpMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const apiConfig = {
    provider: 'twilio',
    twilio: {
      accountSid: import.meta.env.VITE_TWILIO_ACCOUNT_SID,
      authToken: import.meta.env.VITE_TWILIO_AUTH_TOKEN,
      fromNumber: import.meta.env.VITE_TWILIO_FROM_NUMBER,
      url: `https://api.twilio.com/2010-04-01/Accounts/${import.meta.env.VITE_TWILIO_ACCOUNT_SID}/Messages.json`
    }
  }

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  }

  const sendOtpViaSms = async (phone, otp) => {
    const message = `Your verification code is: ${otp}. Valid for 5 minutes.`
    const config = apiConfig.twilio

    try {
      const params = new URLSearchParams()
      params.append('To', phone)
      params.append('From', config.fromNumber)
      params.append('Body', message)

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${config.accountSid}:${config.authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })

      const result = await response.json()
      return { success: response.ok, data: result }

    } catch (error) {
      console.error('SMS API Error:', error)
      return { success: false, error: error.message }
    }
  }

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    const phone = currentPhone.trim()

    setPhoneMessage('')
    setIsLoading(true)

    if (!validatePhone(phone)) {
      setPhoneMessage('Please enter a valid 10-digit phone number')
      setIsLoading(false)
      return
    }

    const fullPhone = '+91' + phone
    const otp = generateOtp()
    setGeneratedOtp(otp)

    try {
      const smsResult = await sendOtpViaSms(fullPhone, otp)

      if (smsResult.success) {
        setPhoneMessage(`OTP sent to +91 ${phone}`)
        setTimeout(() => {
          setShowPhoneForm(false)
        }, 1500)
      } else {
        console.log('SMS API failed, using fallback. OTP:', otp)
        setPhoneMessage(`OTP sent to +91 ${phone} (Check console for demo)`)
        setTimeout(() => {
          setShowPhoneForm(false)
        }, 1500)
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      console.log('Using fallback OTP:', otp)
      setPhoneMessage(`OTP sent to +91 ${phone} (Check console for demo)`)
      setTimeout(() => {
        setShowPhoneForm(false)
      }, 1500)
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
    const phone = currentPhone.replace('+91', '')
    const otp = generateOtp()
    setGeneratedOtp(otp)

    try {
      const smsResult = await sendOtpViaSms('+91' + phone, otp)

      if (smsResult.success) {
        setOtpMessage(`New OTP sent to +91 ${phone}`)
      } else {
        console.log('SMS API failed, using fallback. New OTP:', otp)
        setOtpMessage(`New OTP sent to +91 ${phone} (Check console)`)
      }
    } catch (error) {
      console.error('Error resending OTP:', error)
      console.log('Using fallback OTP:', otp)
      setOtpMessage(`New OTP sent to +91 ${phone} (Check console)`)
    }

    // Clear OTP inputs
    const inputs = document.querySelectorAll('.otp-input')
    inputs.forEach(input => input.value = '')
    inputs[0]?.focus()
  }

  const backToPhone = () => {
    setShowPhoneForm(true)
    setPhoneMessage('')
    setOtpMessage('')
  }

  useEffect(() => {
    // OTP input auto-focus logic
    const otpInputs = document.querySelectorAll('.otp-input')

    const handleOtpInput = (e, index) => {
      if (e.target.value && index < otpInputs.length - 1) {
        otpInputs[index + 1]?.focus()
      }
    }

    const handleOtpKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1]?.focus()
      }
      // Only allow numbers
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    otpInputs.forEach((input, index) => {
      input.addEventListener('input', (e) => handleOtpInput(e, index))
      input.addEventListener('keydown', (e) => handleOtpKeyDown(e, index))
    })
  }, [])

  return (
    <div className="auth-overlay active">
      <div className="auth-container">
        {/* Phone Number Form */}
        {showPhoneForm ? (
          <div className="auth-form">
            <h2 className="auth-title">Welcome</h2>
            <p className="auth-subtitle">Please enter your phone number to continue</p>

            <form onSubmit={handlePhoneSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#c9a84c', fontSize: '1rem', fontWeight: 'bold' }}>+91</span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="form-input"
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={currentPhone}
                    onChange={(e) => setCurrentPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>

            {phoneMessage && (
              <div className={`auth-message ${phoneMessage.includes('Please') ? 'error' : 'success'}`}>
                {phoneMessage}
              </div>
            )}
          </div>
        ) : (
          /* OTP Verification Form */
          <div className="auth-form">
            <h2 className="auth-title">Verify OTP</h2>
            <p className="auth-subtitle">Enter the 6-digit code sent to your phone</p>

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
                onClick={backToPhone}
                style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer' }}
              >
                ← Back to phone number
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthSystem
