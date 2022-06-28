import React,{useState,useCallback,useMemo} from 'react';

const ScrapTxt = ({scrapLinkOpen,setScrapLinkOpen}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [insertLink,setInsertLink] = useState("");
    const [scrappedData,setScrappedData] = useState([]);
    console.log(insertLink);
    
    const [scrapLinkData,setScrapLinkData] = useState(false);
    const getScrapText = ()=>{
        console.log("got call back click");
        setIsLoading(true)
        // fetch(`http://localhost:5000/scrap/?weburl=${insertLink}`)
        fetch(`https://warm-dusk-46872.herokuapp.com/scrap/?weburl=${insertLink}`)
        .then(res => res.json())
        .then(data => {
            setIsLoading(false);
            setScrappedData(data)
            optimizedTitlePara(data)
        })
        
    }
    console.log(scrappedData);

    const [optimizedTextPara, setOptimizedTextPara] = useState([])  // send this data to database
    const optimizedTitlePara = (textArr) =>{
        const tempOptTextParaArr = []
        let tempOptTextParaObj = {}
        let currentTag = null;
        let currentTitle = "";
        textArr.sort((a,b)=>a.position-b.position).forEach(txtpara =>{
            if (txtpara.tag === 'h') {
                if (currentTag === "p") {
                    tempOptTextParaArr.push({...tempOptTextParaObj, pTitle: currentTitle})
                    currentTitle = txtpara.text;
                    tempOptTextParaObj = {};
                    currentTag = txtpara.tag;
                }else{
                    currentTag = txtpara.tag;
                    // check if last character is === ! || . || ? || ,  // if not, add a full stop, use regex here to match
                    const lastChar = txtpara.text.trim().charAt(txtpara.text.length - 1);
                    console.log(lastChar);
                    currentTitle = (lastChar === "." || "?" || "," || "!") ? currentTitle.concat(" ",txtpara.text) : currentTitle.concat(". ",txtpara.text);
                }
            }else{
                currentTag = txtpara.tag;
                const lastChar = txtpara.text.trim().charAt(txtpara.text.length - 1);
                const needFullStop = (lastChar === "." || "?" || "," || "!") ? false : true;
                if (needFullStop) {
                    tempOptTextParaObj.text  = tempOptTextParaObj.text ? (  tempOptTextParaObj.text?.concat(". ",txtpara.text) ): txtpara.text;
                }else{
                    tempOptTextParaObj.text  = tempOptTextParaObj.text ? (  tempOptTextParaObj.text?.concat(" ",txtpara.text) ): txtpara.text;
                }
                tempOptTextParaObj.position  = txtpara.position;
            }
        })
        // push the last para title object
        tempOptTextParaArr.push({...tempOptTextParaObj, pTitle: currentTitle});
        setOptimizedTextPara(tempOptTextParaArr);
    }
    const removeElement = (idx) =>{
        console.log(idx,"index nu");
        const tempScrapData = [...scrappedData];
        tempScrapData.splice(idx, 1);
        setScrappedData(tempScrapData);
        optimizedTitlePara(tempScrapData)
    }
    const changeTag = (idx,tagName) =>{
        console.log(idx,tagName);
        // const tempScrapData = scrappedData.map((el, index) => index === idx ? (el.tag = tagName && el) : el);
        const tempScrapData = scrappedData.map((el, index) =>{
            if (index === idx) {
                el.tag = tagName;
                return el;
            }else{
                return el;
            }
        });
        setScrappedData(tempScrapData);
        optimizedTitlePara(scrappedData)
    }
    console.log(optimizedTextPara,"optimizedTextPara");
    return (
        <div>
            <div style={{marginTop:"20px"}}>
                <input onBlur={e=>setInsertLink(e.target.value)} type="url" placeholder="enter your article url" /> <br />
                {
                    !isLoading ? <button onClick={()=>{setScrapLinkOpen(true); getScrapText() }}  style={{border:"transparent",borderBottom:"1px solid blue", color:"blue", backgroundColor:"transparent", cursor:"pointer", fontSize:"15px",}}>insert link</button> 
                    : <p>Scrapping....</p>
                }
                
                
            </div>
            <div>
            <div  style={{ whiteSpace: "pre-line",margin:"2% 4%",textAlign:"left"}}>
                    <div style={{display:"grid", gridTemplateColumns:"auto 300px"}}>
                        <div>
                            {
                                scrappedData.map((dt,idx) => {
                                    if (dt.tag === "p") {
                                        return <p>{dt.text} 
                                            <span onClick={()=>changeTag(idx,"h")} style={{fontWeight:"700", backgroundColor:"lightGreen", color:"blue", padding:"0 5px", borderRadius:"4px", margin:"0 10px 0 10px", cursor:"pointer"}}>T</span>
                                            <span onClick={()=>removeElement(idx)} style={{fontWeight:"700", backgroundColor:"pink", color:"red", padding:"0 5px", borderRadius:"4px",cursor:"pointer"}}>X</span>
                                        </p>
                                    }else{
                                        return <h4>{dt.text}
                                            <span onClick={()=>changeTag(idx,"p")} style={{fontWeight:"700", backgroundColor:"lightGreen", color:"blue", padding:"0 5px", borderRadius:"4px", margin:"0 10px 0 10px", cursor:"pointer"}}>P</span>
                                                <span onClick={()=>removeElement(idx)} style={{fontWeight:"700", backgroundColor:"pink", color:"red", padding:"0 5px", borderRadius:"4px",cursor:"pointer"}}>X</span>
                                        </h4>
                                    }
                                })
                            }
                        </div>
                        <div style={{border:"1px dotted rgba(125,85,190,0.9)", padding:"5px 8px", borderRadius:"6px", maxHeight:"80vh", overflowY:"scroll"}}>
                            <h3 style={{textAlign:"center",fontSize:"15px",}}>Preview</h3>
                            <div style={{fontSize:"9px"}}>
                            {
                                   optimizedTextPara.map(fParaTitle => {
                                       return <>
                                            {
                                               fParaTitle.pTitle && <h3>{fParaTitle.pTitle}</h3>
                                            }
                                            {
                                                fParaTitle.text && <p>{fParaTitle.text}</p>
                                            }
                                       </>
                                   }) 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrapTxt;