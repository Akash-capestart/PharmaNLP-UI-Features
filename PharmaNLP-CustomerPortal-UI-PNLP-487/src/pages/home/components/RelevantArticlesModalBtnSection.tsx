import React, { useState } from 'react'
import { PublishNewsLetterModal } from './PublishNewsLetterModal'
import { QuickAlertModal } from './QuickAlertModal'
import { SaveSearchModal } from './SaveSearchModal'

export function RelevantArticlesModalBtnSection() {

    const [quickAlertModalShow, setquickAlertModalShow] = useState<boolean>(false)
    const [saveSearchModalShow, setsaveSearchModalShow] = useState<boolean>(false)
    const [publishNewsLetterModalShow, setpublishNewsLetterModalShow] = useState<boolean>(false)

    const showModalHandler = (key: string) => {
        switch (key) {
            case "quickAlertModalShow":
                // setquickAlertModalShow(prevVal => !prevVal)
                setsaveSearchModalShow(false)
                setpublishNewsLetterModalShow(false)
                alert("Not available now!")
                break;
            case "saveSearchModalShow":
                setquickAlertModalShow(false)
                setsaveSearchModalShow(prevVal => !prevVal)
                setpublishNewsLetterModalShow(false)
                break;
            case "publishNewsLetterModalShow":
                setquickAlertModalShow(false)
                setsaveSearchModalShow(false)
                // setpublishNewsLetterModalShow(prevVal => !prevVal)
                alert("Not available now!")
                break;
            default:
                break;
        }
    };
    return (
        <div className="d-flex align-items-center justify-content-evenly position-relative">
            <img
                src="/images/save-search-image.png"
                className="icon-std position-relative mar-l-15"
                alt="Save Search..."
                onClick={() => showModalHandler("saveSearchModalShow")}
            />
            {saveSearchModalShow && (
                <SaveSearchModal closeModalHandler={() => showModalHandler("saveSearchModalShow")} />
            )}
            <img
                src="/images/quick-alert-image.png"
                className="icon-std position-relative has-gray-scale mar-l-15"
                alt="Alert..."
                onClick={() => showModalHandler("quickAlertModalShow")}
            />
            {quickAlertModalShow && (
                <QuickAlertModal closeModalHandler={() => showModalHandler("quickAlertModalShow")} />
            )}            
            <img
                src="/images/publish-news-letter-image.png"
                className="icon-std position-relative has-gray-scale mar-l-15 mar-r-15"
                alt="Publish..."
                onClick={() => showModalHandler("publishNewsLetterModalShow")}
            />
            {publishNewsLetterModalShow && (
                <PublishNewsLetterModal closeModalHandler={() => showModalHandler("publishNewsLetterModalShow")} />
            )}
        </div>
    )
}
