import { Link, useLocation } from "react-router-dom"
import LandingHeader from "../../Common/LandingHeader"
import LandingFooter from "../../Common/LandingFooter"
import "./style.css"
import startedLogo from "../../Assets/img1.jpg"
import { FaRegClock } from "react-icons/fa6"
import { FaHammer } from "react-icons/fa"
import { MdLaptopChromebook } from "react-icons/md"
import img2 from "../../Assets/img2.png"
import { FaArrowCircleRight } from "react-icons/fa"
import { IoMdCheckmark } from "react-icons/io"
import pic1 from "../../Assets/pic1.jpg"
import pic2 from "../../Assets/pic2.jpg"
import pic3 from "../../Assets/pic3.jpg"
import logo1 from "../../Assets/logo1.png"
import logo2 from "../../Assets/logo2.jpg"
import logo3 from "../../Assets/logo3.png"
import logo4 from "../../Assets/logo4.png"
import grantsAssists from "../../Assets/Grants_Assists_Img.png"
import hrQueries from "../../Assets/HR_Queries_Img.png"
import subjectSelectedIcon from "../../Assets/checkmark-round.png"
import subjectNotSelectedIcon from "../../Assets/checkmark-circle-solid.png"

import { useEffect, useState } from "react"

export default function Landing() {
  const location = useLocation()
  const [selectedSubject, setSelectedSubject] = useState("General Inquiry")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    jobTitle: "",
    mobileNumber: "",
    selectedSubject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Web3Forms API endpoint
    const web3formsUrl = "https://api.web3forms.com/submit"

    // Your Web3Forms Access Key
    const accessKey = "afad6b5c-463e-48b6-a406-6eb6a7d41388"

    // Prepare form data
    const data = {
      access_key: accessKey,
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      email: formData.email,
      jobTitle: formData.jobTitle,
      mobileNumber: formData.mobileNumber,
      selectedSubject: formData.selectedSubject,
      message: formData.message,
    }

    try {
      // Submit the form data
      const response = await fetch(web3formsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        alert("Form submitted successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          email: "",
          jobTitle: "",
          mobileNumber: "",
          selectedSubject: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
        alert("Failed to submit the form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelectionChange = (e) => {
    setSelectedSubject(e.target.value)
  }

  const items = [
    { icon: "🛡️ ", title: "Overtime rules in Canada?" },
    { icon: "🧾 ", title: " Parental leave policy?" },
    { icon: "💻 ", title: "Apply for a grant?" },
    { icon: "📊 ", title: "Track grant status" },
    { icon: "🌐 ", title: "Tech funding options?" },
    { icon: "🗓️ ", title: "How to apply leave?" },
    { icon: "💼 ", title: "Probation rules?" },
    { icon: "🗓️ ", title: "Compliance deadlines?" },
    { icon: "🧑‍⚖️ ", title: "Handling labor claims?" },
    { icon: "📜 ", title: "Mandatory benefits?" },
    { icon: "📊 ", title: "Performance review steps?" },
    { icon: "📌 ", title: "Policy violation process?" },
    { icon: "🗓️ ", title: "How to apply leave?" },
    { icon: "📈 ", title: "Eligibility for grants?" },
    { icon: "💼 ", title: "Probation rules?" },
  ]

  const subjects = [
    { value: "General Inquiry", icon: "/icons/general-inquiry.png" },
    { value: "HR Queries", icon: "/icons/hr-queries.png" },
    { value: "Grants Assist", icon: "/icons/grants-assist.png" },
  ]

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  return (
    <div className="body">
      <LandingHeader></LandingHeader>
      <div className="getStarted">
        <div className="container getStartedSection">
          <div className="Section">
            <div className="topSection">
              <div className="topLeftSection">
                <span className="text1">Your HR & Funding Assistant,</span>
                <span className="text2">Anytime, Anywhere.</span>
                <button
                  className="btn btn-toogle shadow pl-3 pr-3"
                  type="submit"
                >
                  Book A Demo
                </button>
              </div>

              <div className="topRightSection">
                <div className="heroCard">
                  <p className="heroTitle">
                    Leverage AI to uncover funding opportunities tailored to
                    your business needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="bottomSection">
              <div className="heroCard">
                <p className="heroTitle">
                  Empower your team with instant answers to HR-related questions
                  with HR Queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="solutions-container">
        <label className="text4 text-center">
          Solutions Designed to
          <br className="landing-solution-break"></br>
          <span className="empowerHighlight">Empower </span>
        </label>
        <div className="text5">
          <p>
            Effortlessly tackle HR tasks, compliance challenges, <br></br>and
            funding opportunities with infox.
          </p>
        </div>
      </div>
      <div className="card-container">
        <div className="landing-card card-1">
          <div className="card-title">AI-Powered HR Assistance</div>
          <div className="card-description">
            Streamline your workflows and resolve HR queries instantly with
            intelligent automation.
          </div>
        </div>
        <div className="landing-card card-2">
          <div className="card-title">Unlock Talent & Business Grants</div>
          <div className="card-description">
            Find funding opportunities that match your industry and goals. Infox
            make grant discovery and applications simple and efficient.
          </div>
        </div>
        <div className="landing-card card-3">
          <div className="card-title">Simplify Compliance</div>
          <div className="card-description">
            Stay updated with labor laws and regulatory changes. Infox provides
            real-time insights to ensure your business remains protected.
          </div>
        </div>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-fade-left"></div>
        <div className="carousel-container">
          <div className="carousel">
            {items.map((item, index) => (
              <div key={index} className="carousel-item">
                <div className="carousel-icon">{item.icon}</div>
                <div className="carousel-title">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-fade-right"></div>
      </div>
      <div className="grants">
        <div className="grantsLeftSection">
          <span className="grantsTitle">Find and Secure Grants with Ease</span>
          <span className="grantsDescription">
            Leverage AI to uncover funding opportunities tailored to your
            business needs.
          </span>
        </div>

        <div className="grantsRightSection">
          <img src={grantsAssists} className="grantsImg" />
        </div>
      </div>
      <div className="HRQueries">
        <div className="grantsRightSection">
          <img src={hrQueries} className="grantsImg" />
        </div>
        <div className="grantsLeftSection">
          <span className="grantsTitle">
            Streamlined HR Assistance, Powered by AI
          </span>
          <span className="grantsDescription">
            Empower your team with instant answers to HR-related questions with
            HR Queries.
          </span>
        </div>
      </div>
      {/* <div className="ourSolutions">
            <button className="btn ourSolutionsBtn" type="submit">Our Solutions</button>
            </div> */}
      {/* <div className="BookADemoSection">
                <span className="BookADemo">Book a Demo to See How infox Transforms </span>
                <span className="BookADemo"> Chaos into Streamlined HR Management.</span>
                <button className="btn BookADemoBtn" >Book A Demo</button>
            </div> */}
      <form onSubmit={handleSubmit}>
        <div className="contact-form-container">
          <h1 className="form-title" id="contact-us">
            Contact Us
          </h1>
          <div className="input-grid">
            <div className="input-group">
              <label className="input-label">
                First Name<span className="asteriskHighlight">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="landing-input-field"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                Last Name<span className="asteriskHighlight">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="landing-input-field"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                Company Name<span className="asteriskHighlight">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="landing-input-field"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                Business Email<span className="asteriskHighlight">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="landing-input-field"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="landing-input-field"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="landing-input-field"
              />
            </div>
          </div>
          <div className="subject-section">
            <div className="section-title">Select Subject</div>
            <div
              className="subject-options"
              style={{
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: 20,
                  maxHeight: 20,
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="selectedSubject"
                  value="General Inquiry"
                  checked={formData.selectedSubject === "General Inquiry"}
                  onChange={handleChange}
                  style={{
                    height: 20,
                    width: 20,
                    maxHeight: 20,
                    maxWidth: 20,
                    marginRight: 10,
                  }}
                />
                <label className="">General Inquiry</label>
              </div>
              <div
                style={{
                  display: "flex",
                  height: 20,
                  maxHeight: 20,
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="selectedSubject"
                  value="HR Queries"
                  checked={formData.selectedSubject === "HR Queries"}
                  onChange={handleChange}
                  style={{
                    height: 20,
                    width: 20,
                    maxHeight: 20,
                    maxWidth: 20,
                    marginRight: 10,
                  }}
                />
                <label className="">HR Queries</label>
              </div>
              <div
                style={{
                  display: "flex",
                  height: 20,
                  maxHeight: 20,
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="selectedSubject"
                  value="Grants Assist"
                  checked={formData.selectedSubject === "Grants Assist"}
                  onChange={handleChange}
                  style={{
                    height: 20,
                    width: 20,
                    maxHeight: 20,
                    maxWidth: 20,
                    marginRight: 10,
                  }}
                />
                <label className="">Grants Assist</label>
              </div>
            </div>
          </div>
          <div className="message-section">
            <h3 className="section-title">
              Message<span className="asteriskHighlight">*</span>
            </h3>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your Message.."
              className="message-input"
              required
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {submitStatus === "success" && (
            <p className="success-message mt-4 text-center">
              Form submitted successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="error-message mt-4 text-center">
              Failed to submit the form. Please try again.
            </p>
          )}
        </div>
      </form>
      <LandingFooter></LandingFooter>
    </div>
  )
}
