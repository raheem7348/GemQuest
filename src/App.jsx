import { useState } from "react";
import { URL } from "./constants";
import './index.css'
import Answers from "./components/Answers";

function App() {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))


  let payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }
  const askQuestion = async () => {
    if (localStorage.getItem('history')) {
      let history = localStorage.getItem('history')
      history = JSON.parse(localStorage.getItem('history'))
      history = [question, ...history]
      localStorage.setItem('history', JSON.stringify(history))
      setRecentHistory(history)
    } else {
      localStorage.setItem('history', JSON.stringify([question]))
      setRecentHistory([question])
    }

    let responce = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    let data = await responce.json()

    let dataString = data.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())

    // console.log(dataString);
    //  console.log(data.candidates[0].content.parts[0].text);
    //  setResult(data.candidates[0].content.parts[0].text)
    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }])

  }
  console.log(result);


  return (
    <div className="grid grid-cols-5 h-screen text-center">

      {/* left Part */}
      <div className="col-span-1 bg-zinc-800 h-screen text-zinc-300">
        <ul>
          {
            recentHistory && recentHistory.map((item, index) =>(
              <li>{item}</li>
            ))
          }
        </ul>
      </div>

      {/* right Part */}
      <div className="col-span-4 p-10 ">
        <div className="container h-140 overflow-auto no-scrollbar ">
          <div className="text-zinc-300  ">

            <ul>
              {
                result.map((item, index) => (
                  <div className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ?
                        <li key={index + Math.random()} className="text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit ">
                          <Answers ans={item.text} index={index} totalResult={1} type={item.type} /></li>
                        : item.text.map((ansItem, ansIndex) => (
                          <li key={index + Math.random()} className="text-left p-1"><Answers ans={ansItem} index={ansIndex} totalResult={item.length} type={item.type} /></li>
                        ))
                    }
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="flex bg-zinc-800 text-white w-1/2 mx-auto rounded-full border border-zinc-700  h-16 p-1 pr-5">
          <input className="w-full h-full outline-none mx-2 text-bold " type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask me anything" />
          <button onClick={askQuestion} className="hover:bg-zinc-700 p-2">Ask</button>
        </div>
      </div>

    </div>
  )
}

export default App
