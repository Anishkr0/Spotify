import './App.css';
import { FaSpotify } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [URL, setURL] = useState("");

  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };
  console.log(URL);

  const download = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: { url: URL },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com',
      },
    };
  
    try {
      const response = await axios.request(options);
  
      if (response.data?.data?.downloadLink) {
        window.location.href = response.data.data.downloadLink;
  
        setURL("");
      } else {
        console.error("Unexpected API response:", response.data);
        alert("Failed to fetch the download link. Please check the URL.");
      }
    } catch (error) {
      console.error("Error while downloading the song:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  
  return (
    <>
      <div className="h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-600 via-emerald-600 to-amber-500 flex items-center justify-center flex-col gap-y-8 p-4">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-x-3 text-2xl md:text-3xl font-bold text-white">
          <FaSpotify size={60} />
          <p>Song Downloader</p>
        </div>

        {/* Input and Button Section */}
        <div className="flex items-center justify-center w-full max-w-md gap-2">
          <input
            type="url"
            placeholder="Enter song URL"
            className="flex-grow h-12 px-4 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            onChange={handleURL}
            value={URL}
          />
          <button
            className="cursor-pointer h-12 px-6 bg-green-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200"
            onClick={download}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
