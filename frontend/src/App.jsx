import { useState, useEffect, useRef } from 'react'
import './App.css'
import './styles/locomotive-scroll.css'
import LocomotiveScroll from 'locomotive-scroll'
import React from 'react'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css' // Dark theme

const App = () => {
  const [code, setCode] = useState('')
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
    })

    // Cleanup
    return () => {
      if (scroll) scroll.destroy()
    }
  }, [])

  const handleReviewRequest = async () => {
    if (!code.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3000/ai/get-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.text()
      setReview(result)
    } catch (error) {
      console.error('Error:', error)
      setReview('Error getting review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearCode = () => {
    setCode('')
  }

  const handleClearReview = () => {
    setReview('')
  }

  const formatReview = (review) => {
    if (!review) return 'Review will appear here...'
    
    const handleCopyCode = (code) => {
      navigator.clipboard.writeText(code)
        .then(() => {
          // Optional: You can add a toast notification here
          console.log('Code copied!')
        })
        .catch(err => {
          console.error('Failed to copy code:', err)
        })
    }
    
    return review.split('```').map((section, index) => {
      if (index % 2 === 1) { // This is a code block
        const codeContent = section.replace(/^(js|javascript|jsx)\n/, '')
        return (
          <div key={index} className="code-block-container">
            <div className="code-block-header">
              <span className="code-block-title">Corrected Code</span>
              <button 
                className="copy-button"
                onClick={() => handleCopyCode(codeContent)}
                title="Copy code"
              >
                📋 Copy
              </button>
            </div>
            <div className="code-block">
              <Editor
                value={codeContent}
                onValueChange={() => {}}
                highlight={code => Prism.highlight(
                  code,
                  Prism.languages.javascript,
                  'javascript'
                )}
                padding={10}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  backgroundColor: '#282c34',
                  borderRadius: '0 0 4px 4px', // Rounded corners only at bottom
                  marginBottom: '10px',
                }}
                readOnly={true}
              />
            </div>
          </div>
        )
      }
      return <div key={index} className="review-text">{section}</div>
    })
  }

  return (
    <div 
      className="container" 
      data-scroll-container 
      ref={scrollRef}
    >
      <div className="editor-section" data-scroll-section>
        <h2 className="section-title animated-title">
          <span className="sage-icon">🧙‍♂️</span>
          <span className="title-text">
            <span className="magic">C</span>
            <span className="magic">o</span>
            <span className="magic">d</span>
            <span className="magic">e</span>
            <span className="magic">&nbsp;</span>
            <span className="magic">S</span>
            <span className="magic">a</span>
            <span className="magic">g</span>
            <span className="magic">e</span>
          </span>
          <span className="sparkles">✨</span>
        </h2>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
          padding={15}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            backgroundColor: '#1e1e1e',
            minHeight: '80vh',
          }}
          className="editor"
          placeholder="Paste your code here..."
        />
        <div className="button-wrapper">
          <button 
            className="action-button clear-button"
            onClick={handleClearCode}
          >
            Clear Code
          </button>
          <button 
            className="action-button review-button"
            onClick={handleReviewRequest}
            disabled={isLoading}
          >
            {isLoading ? 'Reviewing...' : 'Get Review'}
          </button>
        </div>
      </div>

      <div className="review-section" data-scroll-section>
        <h2 className="section-title">
          <span>✨</span> AI Review
        </h2>
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <div className="review-content">
            {formatReview(review)}
          </div>
        )}
        <div className="button-wrapper">
          {review && (
            <button 
              className="action-button reset-button"
              onClick={handleClearReview}
            >
              Clear Review
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App