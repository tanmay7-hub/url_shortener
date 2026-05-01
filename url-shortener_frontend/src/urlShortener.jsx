import { useState } from "react";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  
  const [redirectCode, setRedirectCode] = useState("");

  const handleShorten = async () => {
    if (!originalUrl) return alert("Enter a URL");

    try {
      setLoading(true);
      const API = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${API}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          OriginalUrl: originalUrl,
          customAlias: customAlias || undefined
        })
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortCode || data.shortUrl);
      } else {
        console.error(data);
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  const handleRedirect = () => {
   
    if (!redirectCode) return alert("Enter short code");

    const code = redirectCode.includes("http")
      ? redirectCode.split("/").pop()
      : redirectCode;
    const API = import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${API}/${code}`;
  };

  return (
    <div className="container">
      <h2 className="title">🔗 URL Shortener</h2>
      <p>Type full url like this: ( http://youtube.com )</p>

      <input
        type="text"
        placeholder="Enter long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="input"
      />

      <input
        type="text"
        placeholder="Custom alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        className="input"
      />

      <button onClick={handleShorten} className="button" disabled={loading}>
        {loading ? "Processing..." : "Shorten"}
      </button>

      {shortUrl && (
        <div className="result">
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer" className="link">
              {shortUrl}
            </a>
          </p>
          <button onClick={copyToClipboard} className="copyBtn">
            Copy
          </button>
        </div>
      )}

      <hr style={{ margin: "30px 0" }} />

      <h3>🔁 Redirect using short code</h3>

      <input
        type="text"
        placeholder="Enter short code (or full short URL)"
        value={redirectCode}
        onChange={(e) => setRedirectCode(e.target.value)}
        className="input"
      />

      <button onClick={handleRedirect} className="button">
        Go to URL
      </button>
    </div>
  );
}
