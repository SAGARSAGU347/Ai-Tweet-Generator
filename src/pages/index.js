import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateTweet = async () => {
    if (!topic || !mood) {
      setError("Please enter both topic and mood");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const response = await fetch("/api/tweet-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, mood }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate tweet");
      }

      setTweet(data.tweet);
    } catch (error) {
      console.error("Failed to generate tweet:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
           Sagar&apos;s Tweet Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-500">Create viral tweets in seconds by Sagar
            <br/>Enjoy
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="topic" className="text-base sm:text-lg font-medium text-gray-700">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-2 border-gray-200 rounded-xl py-2 sm:py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base sm:text-lg text-gray-900"
              placeholder="What&apos;s the tweet about?"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="mood" className="text-base sm:text-lg font-medium text-gray-700">
              Mood
            </label>
            <input
              type="text"
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border-2 border-gray-200 rounded-xl py-2 sm:py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base sm:text-lg text-gray-900"
              placeholder="Funny, serious, sarcastic..."
            />
          </div>

          <button
            onClick={generateTweet}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-2 sm:py-3 px-4 font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              "Generate Tweet"
            )}
          </button>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-base text-red-700">{error}</p>
            </div>
          )}

          {tweet && (
            <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">AI Tweet Generator</p>
                  <p className="text-xs sm:text-sm text-gray-500">@aitweetgen</p>
                </div>
              </div>
              <p className="text-base sm:text-lg text-gray-800 whitespace-pre-line">{tweet}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
