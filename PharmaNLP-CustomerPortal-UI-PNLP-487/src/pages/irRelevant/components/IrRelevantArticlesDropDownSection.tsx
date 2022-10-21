import React, { useState } from 'react'
import { DropDown } from '../../../commonComponents/DropDown'
import { useAppSelector } from '../../../redux/Hooks'

type irRelevantArticlesDropDownSectionState = {
    activeDropDownVal: string,
    moveToFolderModalShow: boolean
}


type ArticleDropdownProps={
    isrecentlyadded:boolean,
    setisrecentlyadded:any
}

export default function IrRelevantArticlesDropDownSection() {

    const { lowFont } = useAppSelector((state) => state.globalFontResizer)

    //drop down logics  

    const dropDownValues = ["Published Date", "Recently Added"];
    const [isrecentlyadded,setisrecentlyadded]=useState<boolean>(false)

    const [irRelevantArticlesDropDownSectionState, setirRelevantArticlesDropDownSectionState] = useState<irRelevantArticlesDropDownSectionState>({
        activeDropDownVal: dropDownValues[0],
        moveToFolderModalShow: false,
    });

    const dropDownValueHandler = (val: string) => setirRelevantArticlesDropDownSectionState({
        ...irRelevantArticlesDropDownSectionState,
        activeDropDownVal: val,
    });

    return (
        <>
            <span
                className="font-change-animation"
                style={{ fontSize: lowFont }}
            >
                Sort By : &nbsp;
            </span>
            <DropDown
                activeDropDownVal={irRelevantArticlesDropDownSectionState["activeDropDownVal"]}
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
