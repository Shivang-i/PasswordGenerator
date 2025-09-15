import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // ------------------ React Hooks ------------------

  // useState → used to store and update component states
  const [length, setLength] = useState(8); 
  // password length, default is 8

  const [numberAllowed, setNumberAllowed] = useState(false); 
  // whether numbers should be included in the password

  const [characterAllowed, setCharacterAllowed] = useState(false); 
  // whether special characters should be included in the password

  const [password, setPassword] = useState(""); 
  // stores the generated password

  // useCallback → memoizes the function so it is not re-created 
  // unless its dependencies (length, numberAllowed, characterAllowed) change.
  // This improves performance in React.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*(){}[]=~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass); // update state with new password
  }, [length, numberAllowed, characterAllowed]);

  // useEffect → runs automatically whenever dependencies change.
  // Here, it regenerates the password when length, numberAllowed, or characterAllowed changes.
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  // useRef → creates a reference to a DOM element (here, the password input box).
  // It allows direct access to the input element (for selecting text).
  const passwordRef = useRef(null);

  // useCallback → memoized function that copies password to clipboard.
  // It selects the input field and writes its value to clipboard.
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // selects the password text
    window.navigator.clipboard.writeText(password); // copies it to clipboard
  }, [password]);

  return (
    // ✅ Full screen, flexbox center aligned
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="w-full max-w-md mx-auto shadow-xl rounded-lg px-6 py-8 text-gray-100 bg-gray-900">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          🔐 Password Generator
        </h1>

        {/* Password Display + Copy Button */}
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden mb-6 shadow">
          <input
            type="text"
            value={password}
            placeholder="Generated password"
            className="outline-none w-full py-2 px-3 bg-transparent text-lg text-green-400 font-mono"
            readOnly
            ref={passwordRef} // ref attached here for selection
          />
          <button
            className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium transition"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Password Length Slider */}
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-200">
              Length: <span className="text-yellow-400">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer w-2/3 accent-blue-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          {/* Include Numbers */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="numberInput" className="text-gray-200">
              Include Numbers
            </label>
          </div>

          {/* Include Special Characters */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="characterInput" className="text-gray-200">
              Include Special Characters
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={passwordGenerator}
          className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition "
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
