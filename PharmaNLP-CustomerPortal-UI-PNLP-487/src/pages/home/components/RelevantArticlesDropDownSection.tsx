import React, { useState } from 'react'
import { DropDown } from '../../../commonComponents/DropDown'
import { useAppSelector } from '../../../redux/Hooks';
import {  useAppDispatch } from "../../../redux/Hooks";
import { addSortedArticle } from "../../../redux/reducers/RelevantArticlesSlice";


type ArticleViewButtonSectionState = {
    activeDropDownVal: string,
    moveToFolderModalShow: boolean
}

type ArticleDropdownProps={
    isrecentlyadded:boolean,
    setisrecentlyadded:any
}

export default function RelevantArticlesDropDownSection({isrecentlyadded,setisrecentlyadded}:ArticleDropdownProps) {
    const dispatch = useAppDispatch()

    const { lowFont } = useAppSelector((state) => state.globalFontResizer)
    const {articles} =useAppSelector((state)=>state.relevantArticlesDetails)

    const dropDownValues = ["Published Date", "Recently Added"];

    const [articleViewButtonSectionState, setarticleViewButtonSectionState] = useState<ArticleViewButtonSectionState>({
        activeDropDownVal: dropDownValues[0],
        moveToFolderModalShow: false,
    });

    const dropDownValueHandler = (val: string) =>{
        let data=articles["data"]

        
        // console.log("value of dropdown",val)
        if(val=="Recently Added")
        {
            // console.log("in if condition")
            // let data=articles["data"]
            let newdata:any=[]
            data.forEach((d:any)=>{
                newdata.push(d)
            })
            // console.log("newdata from ",newdata)
            let sorteddata=newdata.sort((a:any,b:any)=>{
                return b.publicationYear -a.publicationYear
            })

            console.log("sorted data",sorteddata)
            dispatch(addSortedArticle({data:sorteddata})) 
            setarticleViewButtonSectionState({
                ...articleViewButtonSectionState,
                activeDropDownVal: val,
            });
        }
        else{
            setarticleViewButtonSectionState({
                ...articleViewButtonSectionState,
                activeDropDownVal: val,
            });
        }
    } 

    return (
        <>
            <span
                className="font-change-animation"
                style={{ fontSize: lowFont }}
            >
                Sort By : &nbsp;
            </span>
            <DropDown
                activeDropDownVal={articleViewButtonSectionState["activeDropDownVal"]}
                changeValHandler={dropDownValueHandler}
                dropdownValues={dropDownValues}
                width={175}
                dropDownHeight={"auto"}
                boxHeight={"auto"}
                hasBorder={true}
                backGroundColor={""}
                datePicker={false}
                isrecentlyadded={isrecentlyadded}
                setisrecentlyadded={setisrecentlyadded}

            />

        </>
    )
}
