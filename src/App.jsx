import { useState,useEffect } from 'react';
import './App.css'

function App() {
  const [result,setResult] = useState('');
  const [prev_result,setPrev] = useState('0');
  const [last_click,setClick] = useState('0');
  const [formulas,setFormulas] = useState([]);
  const [theme,setThem] = useState(0);
  

  const ButtonsChars = ['7', '8', '9' ,'DEL','4', '5', '6','+', '1', '2', '3', '-','.','0', '/', '×','RESET','='];
  const letters = {
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    'DEL': 'delete',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '+': 'add',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '-': 'subtract',
    '.': 'decimal',
    '0': 'zero',
    '/': 'divide',
    '×': 'multiply',
    'RESET': 'clear',
    '=': 'equals',
  };

  useEffect(() => {
    document.body.className="body"+theme;

    return () => {
      document.body.className = ''; // Revert to the default background color
    };
  },[theme])

  function resetAll(){
    setResult('');
    setPrev('0')
    setFormulas([]);
    setClick('0')
  }

  function addZeroIfStartsWithDot(string) {
    // Check if the string starts with a period (`.`)
    if (string.startsWith('.')) {
      // Return a new string with a leading `0`
      return '0' + string;
    } else {
      // Return the original string
      return string;
    }
  }

  function removeLeadingZeros(string) {
    if (!string) {
      return string;
    }
    const regex = /^0+/;
    string = string.replace(regex, "");
      if (!string) {
      return "0";
    }
      return string;
  }

  function removeLastChar(str) {
    if (!str) {
      return '0';
    }
  
    const substring = str.slice(0, -1);
    if (substring === "") {
      return '0';
    } else {
      return substring;
    }
  }

  function addDotIfNotPresent(str) {
    if (str.includes(".")) {
      return str;
    } else {
      return str + ".";
    }
  }

  function removeDotAtEnd(string) {
    // Check if the string ends with a dot.
    const lastCharacter = string[string.length - 1];
    if (lastCharacter === '.') {
      // Remove the dot from the string.
      string = string.slice(0, -1);
    }
  
    return string;
  }

  function removeExtraMinus(str) {
    return str.replace(/^(-)+/, '$1');
  }

  function isMinus(token) {
    return token === '-' ;
  }
  


  function evaluateExpression(expression) {
    let ops = [...expression];
    let res = parseFloat(ops.shift());
    while ( ops.length > 0) {
      const operator = ops.shift();
      const operand = parseFloat(ops.shift());
      
      res = performOperation(res, operand, operator);
      
    }
    
    return parseFloat(Number(res).toFixed(10));
  }
  
  
  function performOperation(operand1, operand2, operator) {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '×':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      default:
        throw new Error('Invalid operator');
    }
  }
  
  
  
  

  function handelButton(event) {
    const textBtn=event.target.innerHTML;
    let tmpres='0';

    switch(textBtn){
      case '7':
      case '8':
      case '9':
      case '4':
      case '5':
      case '6':
      case '1':
      case '2':
      case '3':
      case '0':
        if(last_click === '=')
          setResult(textBtn)
        else 
          setResult(prev => {
            if (prev.length >=14)
              return prev
            else
              return addZeroIfStartsWithDot(removeLeadingZeros(prev+textBtn))
          })
        setClick(textBtn)
        break;

      case 'DEL':
        if(last_click !== '=' && isNaN(parseInt(last_click))){
          setResult(removeLastChar(prev_result))
          setFormulas(prev => [...prev.slice(0,-2)])
          setClick('0')
        }
        else {
          if (result.includes("e+"))
            resetAll();
          else
            setResult(prev => removeLastChar(prev))   
        }               
        break;
      
      case '-':
      case '/':
      case '+':
      case '×':
        
        if(result){
          setPrev(removeDotAtEnd(result));
          setResult("");
        } 

        if(last_click !== '=' && isNaN(parseInt(last_click))){
          if(isMinus(textBtn)){
            setResult(prev => removeExtraMinus('-' + prev))
          }
          else   
            setFormulas(prev => [...prev.slice(0,-1), textBtn])
        }    
        else {
          if(result)
           setFormulas(prev => [...prev,removeDotAtEnd(result), textBtn])
          else
            setFormulas(prev => [...prev,'0', textBtn])
        }
          
        setClick(textBtn)
        break;

      case '.':
        setResult(prev => addZeroIfStartsWithDot(addDotIfNotPresent(prev)))
        setClick('0')
        break;
      
      case 'RESET':
        resetAll();
        break;

      case '=':
        if(result)
          tmpres = evaluateExpression([...formulas,removeDotAtEnd(result)])
        else
          tmpres = 0;
        setPrev(tmpres.toString())
        setResult(tmpres.toString())
        setFormulas([]);
        setClick('=')
        break;
    }

  }


  function selectAstyle(elem,th){
    const defBtnsty = [
      {
        backgroundColor:"hsl(30, 25%, 89%)",
        color:"hsl(221, 14%, 31%)",
        boxShadow: "0 4px  hsl(28, 16%, 65%)"
      },
      {
        backgroundColor:"hsl(45, 7%, 89%)",
        color:"hsl(60, 10%, 19%)",
        boxShadow: "0 4px  hsl(35, 11%, 61%)"
      },
      {
        backgroundColor:"hsl(268, 47%, 21%)",
        color:"hsl(52, 100%, 62%)",
        boxShadow: "0 4px  hsl(290, 70%, 36%)"
      }
    ]

    const delresBtnsty = [
      {
        backgroundColor:"hsl(225, 21%, 49%)",
        color:"white",
        boxShadow: "0 4px  hsl(224, 28%, 35%)"
      },
      {
        backgroundColor:"hsl(185, 42%, 37%)",
        color:"white",
        boxShadow: "0 4px  hsl(185, 58%, 25%)"
      },
      {
        backgroundColor:"hsl(281, 89%, 26%)",
        color:"white",
        boxShadow: "0 4px  hsl(285, 91%, 52%)"
      }
    ]

    const equaBtnsty = [
      {
        backgroundColor:" hsl(6, 63%, 50%)",
        color:"white",
        boxShadow: "0 4px  hsl(6, 70%, 34%)"
      },
      {
        backgroundColor:" hsl(25, 98%, 40%)",
        color:"white",
        boxShadow: "0 4px  hsl(25, 99%, 27%)"
      },
      {
        backgroundColor:" hsl(176, 100%, 44%)",
        color:"hsl(198, 20%, 13%)",
        boxShadow: "0 4px  hsl(177, 92%, 70%)"
      }
    ]

    if(elem === 'DEL' || elem === 'RESET')
      return delresBtnsty[th];
    else if(elem === '=')
      return equaBtnsty[th];
    else
      return defBtnsty[th];

  }

  
  function creatButtons(){
    return ButtonsChars.map((elem,i) => {
        return <button 
        key={i} 
        type='button' 
        className='btns' 
        id={letters[elem]}
        onClick={handelButton}
        style={selectAstyle(elem,theme)}
        >
          {elem}
    </button>
    })
  }

  function handelToggel() {
    setThem(prev => ((prev+1)%3))
  }


  return (
   <div className='container'>
    <div className={'nav nav'+theme}>
      <div className='logo'>calc</div>
      <div className='toogle_container'>
        <p className='title'>THEME</p>
        <div className={'toogle toogle'+theme} onClick={handelToggel}>
          <div className='labels'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          </div>
          
          <div className={`circle circ${theme}`}></div>
        </div>
      </div>
    </div>

    <div className={'display disp'+theme} id="display" style={result.length > 14 ? {fontSize:"1rem"} : {}}>{result || prev_result}</div>

    <div className={'operations op'+theme}>
      {creatButtons()}
    </div>

   </div>
  )
}

export default App
