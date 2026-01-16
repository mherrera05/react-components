import React, { useState } from 'react'

interface CopyableProps {
    text: string
    copyIcon?: string | null
    checkIcon?: string | null
    copiedText?: string | null
    fadeOutTime?: number
}

const textStyle: React.CSSProperties = {
    marginLeft: '2px',
    color: 'green',
    fontSize: '0.7em',
    lineHeight: '1em',
    backgroundColor: 'whitesmoke',
    padding: '2px 4px',
    borderRadius: '4px',
    opacity: 0.8,
}

const copyIconStyle: React.CSSProperties = {
    marginLeft: '2px',
    marginRight: '2px',
}

export function Copyable({ text, copyIcon, checkIcon, copiedText = 'Copied!', fadeOutTime = 2000 }: CopyableProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => { setIsCopied(false) }, fadeOutTime)
        }).catch((error: unknown) => {
            console.error('Failed to copy text: ', error)
        })
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const isValid = (className: string | null | undefined): boolean => {
        return className !== null && className !== undefined
    }

    const copy = (copyIcon && isValid(copyIcon)) ? <i className={copyIcon} role='img' aria-label='Copy Icon' style={copyIconStyle} onClick={() => { handleCopy() }} /> : <span style={textStyle} onClick={() => { handleCopy() }}>Copy</span>
    const check = (checkIcon && isValid(checkIcon)) ? <span style={textStyle}><i className={checkIcon} role='img' aria-label='Check Icon' style={copyIconStyle} /> {copiedText}</span> : <span style={textStyle}>{copiedText}</span>

    return (
        <span style={{ cursor: 'pointer' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {text} {isCopied ? check : isHovered && copy}
        </span>
    )
}
