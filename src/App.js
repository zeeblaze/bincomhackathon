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

  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI("AIzaSyDKSEwtteUn5cSx9gRp-NE8qQk2ZtIjYno");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

  const handleSubmit = async (e) => {
    e.preventDefault();
      const prompt = `Do a simple assessment for a person considering their date of birth: ${DOB}, weight: ${Weight}, height: ${Height}, blood type: ${Bloodtype}, allergies ${Allergies}, genotype: ${Genotype}`;

      try {
          const result = await model.generateContent(prompt);
          setResponse(result.response.text())
          console.log(result.response.text());

      } catch(errors){
          console.log(errors)
      }
      
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
        <p>This app helps in predictive risk assessment for doctors using generative AI by inputing their patient details.</p>
        <div>
          <form class="login-form" onSubmit={handleSubmit}>
              <div class="form-group">
                  <label for="dob">D.O.B</label>
                  <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} placeholder="Date of Birth" required/>
              </div>
              <div class="form-group">
                  <label for="weight">Weight</label>
                  <input type="text" value={Weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" required/>
              </div>
              <div class="form-group">
                  <label for="height">Height</label>
                  <input type="text" value={Height} onChange={(e) => setHeight(e.target.value)} placeholder="Weight" required/>
              </div>
              <div class="form-group">
                  <label for="bloodtype">Bloodtype</label>
                  <input type="text" value={Bloodtype} onChange={(e) => setBloodtype(e.target.value)} placeholder="bloodtype" required/>
              </div>
              <div class="form-group">
                  <label for="allergies">Allergies</label>
                  <input type="text" value={Allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="allergies" required/>
              </div>
              <div class="form-group">
                  <label for="genotype">Genotype</label>
                  <input type="text" value={Genotype} onChange={(e) => setGenotype(e.target.value)} placeholder="genotype" required/>
              </div>
              <button type="submit" class="login-button">Submit</button>
          </form>
          <label for="output">{response}</label>
        </div>
        
      </div>
    );}

export default App;
