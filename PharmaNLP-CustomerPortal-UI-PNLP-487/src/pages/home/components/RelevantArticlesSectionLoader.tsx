import React from 'react'
import { SkeletonLoader } from '../../../commonComponents/SkeletonLoader'

export function RelevantArticlesSectionLoader() {

    const noOfLoaderItems: number[] = Array.from(Array(10).keys())

    return (
        <>
            <div className="row no-margin align-items-center article-count-displayer-height">
                <SkeletonLoader height={85} width={"100%"} circleView={false} hasMarginLeft={false} />
            </div>
            <div className="d-flex align-items-center justify-content-start mar-t-15 pad-b-5 article-view-head-height has-green-border-bottom">
                <SkeletonLoader height={22} width={"2%"} circleView={true} hasMarginLeft={false} />                
                    <SkeletonLoader height={30} width={"15%"} circleView={false} hasMarginLeft={true} />
                    <SkeletonLoader height={30} width={"15%"} circleView={false} hasMarginLeft={true} />
                    <SkeletonLoader height={30} width={"10%"} circleView={false} hasMarginLeft={true} />                
            </div>
            {noOfLoaderItems.map((each: number, idx: number) => {
                return (
                    <div
                        key={idx}
                        className="row no-margin has-green-border-bottom pad-15"
                    >
                        <div className="col-md-10 no-padding">
                            <div className="d-flex align-items-center justify-content-start">
                                <SkeletonLoader height={22} width={"2%"} circleView={true} hasMarginLeft={false} />
                                <SkeletonLoader height={22} width={"98%"} circleView={false} hasMarginLeft={true} />
                            </div>
                            <div className="article-content-box mar-t-15">
                                <SkeletonLoader height={60} width={"100%"} circleView={false} hasMarginLeft={false} />
                            </div>
                            <div className="d-flex article-content-box align-items-center justify-content-between mar-t-15">
                                <SkeletonLoader height={22} width={100} circleView={false} hasMarginLeft={false} />
                                <SkeletonLoader height={22} width={100} circleView={false} hasMarginLeft={false} />
                            </div>
                        </div>
                        <div className="col-md-2 no-padding d-flex flex-column align-items-center justify-content-between">
                            <SkeletonLoader height={22} width={"50%"} circleView={false} hasMarginLeft={false} />
                            <SkeletonLoader height={22} width={"75%"} circleView={false} hasMarginLeft={false} />
                            <SkeletonLoader height={22} width={"75%"} circleView={false} hasMarginLeft={false} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}
