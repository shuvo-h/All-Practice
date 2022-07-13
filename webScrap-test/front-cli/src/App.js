import {useCallback, useMemo, useState} from 'react';
import './App.css';
import ArText from './components/ArText';
import CookieTry from './components/cookie/CookieTry';
import ScrapTxt from './components/ScrapTxt';

function App() {
  const [scrapLinkOpen,setScrapLinkOpen] = useState(false);
  
  return (
    <div className="App">
      <div>
        <CookieTry></CookieTry>
        <ScrapTxt scrapLinkOpen={scrapLinkOpen} setScrapLinkOpen={setScrapLinkOpen}></ScrapTxt>
        <ArText></ArText>
      </div>
    </div>
  );
}

export default App;
