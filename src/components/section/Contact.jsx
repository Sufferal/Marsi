import React from 'react'
import '../../css/section/Contact.css'

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value
    const email = e.target.email.value
    const language = e.target.language.value

    if (!name || !email || language === 'select') {
      alert('Please fill out all fields')
      return
    }

    console.log(`Name: ${name}, Email: ${email}, Language: ${language}`)

    e.target.reset()
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in touch</h2>
          <p className="section-desc">Which language would you like to be next?</p>
        </div>
        <div className="section-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input className="form-input" type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" id="email" name="email" required />
            </div>  

            <div className="form-group">
              <label className="form-label" htmlFor="language">Language</label>
              <select className="form-select" id="language" name="language">
                <option value="select">Select</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>

            <button className="form-btn" type="submit">Submit</button>  
          </form> 
        </div>
      </div>
    </section>
  )
}

export default Contact