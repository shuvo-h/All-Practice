import React, { useEffect, useState } from 'react';

const textDemoData = [
    {tag:"h",pos: 0,subT:"This is text 1" },
    {tag:"p",pos: 0,subT:"This is text 2" },
    {tag:"h",pos: 0,subT:"This is text 3" },
    {tag:"h",pos: 0,subT:"This is text 4" },
]

const ArText = () => {
    const [textData,setTextData] = useState(textDemoData);

    const [fieldTextData,setFieldTextData] = useState("");
    const [isTextInsert,setIsTextInsert] = useState(true);

    const [editMod,setEditMod] = useState(false);
    const [selectedText,setSelectedText] = useState("");
    const [selectedTag,setSelectedTag] = useState(null);
    const [fOptimizedParaTitle,setFOptimizedParaTitle] = useState([]);

    const handleTextSelection = () =>{
        const selector = window.getSelection();  // create the selector
        // get index number fo start and end index
        let startIndex = selector.anchorOffset;  
        let endIndex = selector.focusOffset;
        if (startIndex > endIndex) {
            startIndex = selector.focusOffset;
            endIndex = selector.anchorOffset;
        }
        // capture the text
        const text = selector.anchorNode?.data?.substring(startIndex,endIndex);
        if (text.length) {
            setEditMod(false)
            return setSelectedText(text);
        }
    }
    useEffect(()=>{
        if (!isTextInsert) {
            const splitedData = fieldTextData.split("\n").filter(tx => tx.length)
            console.log(splitedData, "splitedData");
            const initialArrangeData = splitedData.map((text, idx) =>{
                return {tag:"p",pos: idx, subT: text }
            })
            // setTextData([{tag:"p",pos: 0,subT: fieldTextData }])
            setTextData(initialArrangeData)
        }
    },[isTextInsert])
    const textRearrange = (selectTx,TagName) =>{
        console.log({texxt: selectTx, tag: TagName});
        // re-arrange the array object

    }
    const txtArrayTagRearrange = (index,tagName) =>{
        console.log({index,tagName});
        const tempArr = [...textData];
        tempArr[index].tag = tagName;
        setTextData(tempArr)
        optimizedTitlePara(textData);  // call this function during storing to DB, not for every changes
        makeTitleBasedPara(textData);
    }
console.log(selectedText," -> selectedText");
// const demo optimized data = [{pTitle:"",pTitleImgKey:[''],pImgKeys:[""],pText:""}]
    const [optimizedTextPara, setOptimizedTextPara] = useState([])  // send this data to database
    const optimizedTitlePara = (textArr) =>{
        const tempOptTextParaArr = []
        let tempOptTextParaObj = {}
        let currentTag = null;
        // combine the text into a single object with next serialized similar tag
        textArr.sort((a,b)=>a.pos-b.pos).forEach(txtpara =>{ // apply foreacf after sorting position of array elements
            if(currentTag === null){
                currentTag = txtpara.tag;
                tempOptTextParaObj = {...txtpara};
            }else if(currentTag === txtpara.tag){
                tempOptTextParaObj.subT = `${tempOptTextParaObj.subT} ${txtpara.subT}`;
            }else{
                currentTag = txtpara.tag;  // if new tag, change the current tag status
                tempOptTextParaArr.push(tempOptTextParaObj) // insert the previous optimized object to array
                tempOptTextParaObj = {...txtpara}; // assign the new object with changing values of each properties
            }
        })
        // after finishing the loop, insert the last temporary object to to temporary array and then set the data to state to store DB
        tempOptTextParaArr.push(tempOptTextParaObj) // last object
        setOptimizedTextPara(tempOptTextParaArr);
    }
    console.log(textData, optimizedTextPara);
   
    const makeTitleBasedPara = (textArr) =>{
        const tempOptTextParaArr = []
        let tempOptTextParaObj = {}
        let currentTag = null;
        let currentTitle = "";
        textArr.sort((a,b)=>a.pos-b.pos).forEach(txtpara =>{
            if (txtpara.tag === 'h') {
                if (currentTag === "p") {
                    tempOptTextParaArr.push({...tempOptTextParaObj, pTitle: currentTitle})
                    currentTitle = txtpara.subT;
                    tempOptTextParaObj = {};
                    currentTag = txtpara.tag;
                }else{
                    currentTag = txtpara.tag;
                    // check if last character is === ! || . || ? || ,  // if not, add a full stop, use regex here to match
                    const lastChar = txtpara.subT.trim().charAt(txtpara.subT.length - 1);
                    console.log(lastChar);
                    currentTitle = (lastChar === "." || "?" || "," || "!") ? currentTitle.concat(" ",txtpara.subT) : currentTitle.concat(". ",txtpara.subT);
                }
            }else{
                currentTag = txtpara.tag;
                const lastChar = txtpara.subT.trim().charAt(txtpara.subT.length - 1);
                const needFullStop = (lastChar === "." || "?" || "," || "!") ? false : true;
                if (needFullStop) {
                    tempOptTextParaObj.subT  = tempOptTextParaObj.subT ? (  tempOptTextParaObj.subT?.concat(". ",txtpara.subT) ): txtpara.subT;
                }else{
                    tempOptTextParaObj.subT  = tempOptTextParaObj.subT ? (  tempOptTextParaObj.subT?.concat(" ",txtpara.subT) ): txtpara.subT;
                }
                tempOptTextParaObj.pos  = txtpara.pos;
            }
        })
        // push the last para title object
        tempOptTextParaArr.push({...tempOptTextParaObj, pTitle: currentTitle});
        setFOptimizedParaTitle(tempOptTextParaArr);
    }
    console.log(textData, fOptimizedParaTitle," - - ->>  final");
    return (
        <div>
            {
                isTextInsert && <div style={{margin:"2% 4%", }}>
                    <div >
                        <div>
                            <textarea style={{width:"80%", minHeight:"500px"}} value={fieldTextData} onChange={e=>setFieldTextData(e.target.value)}></textarea>
                            <div><button onClick={()=>{setIsTextInsert(false);  setFOptimizedParaTitle([]);}}>Next</button></div>
                        </div>
                    </div>
                </div>
            }

            {
                !isTextInsert && <div onMouseDown={()=>setEditMod(true)} onMouseUp={handleTextSelection} style={{ whiteSpace: "pre-line",margin:"2% 4%",textAlign:"left"}}>
                    <div style={{display:"grid", gridTemplateColumns:"auto 300px"}}>
                        <div>
                            {
                                textData.map((dt,idx) => {
                                    if (dt.tag === "p") {
                                        return <p onClick={()=>txtArrayTagRearrange(idx, "h")} style={{cursor:"pointer"}} >{dt.subT}</p>
                                    }else{
                                        return <h4 onClick={()=>txtArrayTagRearrange(idx, "p")} style={{cursor:"pointer"}} >{dt.subT}</h4>
                                    }
                                })
                            }
                            <button onClick={()=>setIsTextInsert(true)}>Insert again</button>
                        </div>
                        <div style={{border:"1px dotted rgba(125,85,190,0.9)", padding:"5px 8px", borderRadius:"6px"}}>
                            <h3 style={{textAlign:"center",fontSize:"15px",}}>Preview</h3>
                            <div style={{fontSize:"9px"}}>
                                {
                                   fOptimizedParaTitle.map(fParaTitle => {
                                       return <>
                                            {
                                               fParaTitle.pTitle && <h3>{fParaTitle.pTitle}</h3>
                                            }
                                            {
                                                fParaTitle.subT && <p>{fParaTitle.subT}</p>
                                            }
                                       </>
                                   }) 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            
        </div>
    );
};

export default ArText;