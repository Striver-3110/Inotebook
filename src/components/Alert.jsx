import React from 'react'

export default function Alert({alert}) { // this alert is from props... basically it is same as const {alert} = props;
  const capitalize = msg => {
    const message = msg.toLowerCase()
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`
  }
  return (
    <div style={{ height: '50px', position: 'sticky', top: 0, zIndex: 1000 }}>
      {alert.type && (
        <div>
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role='alert'
          >
            <strong>
              {capitalize(alert.type) === 'Success' ? 'Success' : 'Failure'}
            </strong>
            : {alert.message}
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
            ></button>
          </div>
        </div>
      )}
    </div>
  )
}
