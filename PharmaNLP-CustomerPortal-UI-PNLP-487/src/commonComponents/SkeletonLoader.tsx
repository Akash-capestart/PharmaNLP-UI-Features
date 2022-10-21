import React from 'react'
import "../css/SkeletonLoader.css"

export function SkeletonLoader({ width, height, circleView, hasMarginLeft }: { width: number | string, height: number | string, circleView: boolean, hasMarginLeft: boolean }) {
    return (
        <div style={{ width: circleView ? height : width, height: height, marginLeft: hasMarginLeft ? 15 : 0 }} className={`${circleView ? "rounded-circle" : ""} skeleton-loader-gradient has-border-radius-5`}></div>
    )
}
