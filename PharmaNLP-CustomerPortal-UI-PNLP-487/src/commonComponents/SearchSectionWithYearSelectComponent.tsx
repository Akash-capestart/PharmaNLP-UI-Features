import React, { useState } from 'react'
import { DropDown } from './DropDown'
import { SimpleSearchInput } from './SimpleSearchInput'

type SearchSectionStateProps = {
    activeDropDownVal: string,
}
type ArticleDropdownProps={
    isrecentlyadded:boolean,
    setisrecentlyadded:any
}

export function SearchSectionWithYearSelectComponent({
    simpleSearchHandler,
    fullArticleFetchHandler,
    searchKeyWordChangeHandler,
    searchKeyWord
}: {
    simpleSearchHandler: Function,
    fullArticleFetchHandler: Function,
    searchKeyWordChangeHandler: Function,
    searchKeyWord: string
}) {

    // dropdown logics

    const dropDownValues: string[] = ["Last 1 Year", "Last 2 Year", "Last 3 Year", "Custom"];
    const [searchSectionState, setsearchSectionState] = useState<SearchSectionStateProps>({
        activeDropDownVal: dropDownValues[0]
    });

    const dropDownValueHandler = (val: string) => setsearchSectionState({
        ...searchSectionState,
        activeDropDownVal: val,
    });
    const [isrecentlyadded,setisrecentlyadded]=useState<boolean>(false)


    return (
        <>
            <SimpleSearchInput
                simpleSearchHandler={simpleSearchHandler}
                fullArticleFetchHandler={fullArticleFetchHandler}
                searchKeyWordChangeHandler={searchKeyWordChangeHandler}
                searchKeyWord={searchKeyWord}
            />
            <DropDown
                activeDropDownVal={searchSectionState["activeDropDownVal"]}
                hasBorder={true}
                changeValHandler={dropDownValueHandler}
                dropdownValues={dropDownValues}
                width={200}
                boxHeight={44}
                dropDownHeight={"auto"}
                backGroundColor={""}
                datePicker={true}
                isrecentlyadded={isrecentlyadded}
                setisrecentlyadded={setisrecentlyadded}

                
            />
        </>
    )
}
