import logo from './assets/logo.png';
import { useState } from "react"
import './App.css';

function App() {
  const [DOB, setDOB] = useState('')
  const [Weight, setWeight] = useState('')
  const [Height, setHeight] = useState('')
  const [Bloodtype, setBloodtype] = useState('')
  const [Allergies, setAllergies] = useState('')
  const [Genotype,setGenotype] = useState('')
  const [response, setResponse] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI("AIzaSyDKSEwtteUn5cSx9gRp-NE8qQk2ZtIjYno");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = `Do a simple assessment for a person considering their date of birth: ${DOB}, weight: ${Weight}, height: ${Height}, blood type: ${Bloodtype}, allergies ${Allergies}, genotype: ${Genotype}`;

    try {
        const result = await model.generateContent(prompt);
        setResponse(result.response.text);
        setModalVisible(true);
        console.log(result.response.text);

    } catch(errors){
        console.log(errors)
    } finally {
        setLoading(false);
    }
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
      <div className="App">
        <header>
          <div className="logo">
            <img src={logo} alt="GenNext Innovators Logo" />
          </div>
          <h1>GenNext Innovators</h1>
          <input type="text" placeholder="Search" />
        </header>
        <p>This app helps in predictive risk assessment for doctors using generative AI by inputting their patient details.</p>
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="dob">D.O.B</label>
                  <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} placeholder="Date of Birth" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input type="text" value={Weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="height">Height (cm)</label>
                  <input type="text" value={Height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="bloodtype">Bloodtype</label>
                  <input type="text" value={Bloodtype} onChange={(e) => setBloodtype(e.target.value)} placeholder="Bloodtype" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="allergies">Allergies</label>
                  <input type="text" value={Allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Allergies" required/>
              </div>
              <div className="form-group">
                  <label htmlFor="genotype">Genotype</label>
                  <input type="text" value={Genotype} onChange={(e) => setGenotype(e.target.value)} placeholder="Genotype" required/>
              </div>
              {loading && <div className="loading-text visible"></div>}
              <button type="submit" className="login-button">Submit</button>
          </form>
        </div>
        
        {modalVisible && (
          <div className="modal visible">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <label htmlFor="output">{response}</label>
            </div>
          </div>
        )}
      </div>
    );
}

export default App;
