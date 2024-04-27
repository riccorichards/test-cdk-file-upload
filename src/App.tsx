import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getImage, getSignUrl, uploadFileUsingPresignedUrl } from "./helper";

function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState<string | null>(null);

  const submitFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const signUrl = await getSignUrl(file);
        console.log({ signUrl });
        // if (signUrl) {
        //   const uploadedFile = await uploadFileUsingPresignedUrl(file, signUrl);
        // }
        setFile(signUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        setFile(null);
      }
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <input type="file" onChange={submitFile} />
        {file && (
          <img src={file} alt="" style={{ width: "150px", height: "150px" }} />
        )}
        <button onClick={() => getImage()}>Get Image</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
