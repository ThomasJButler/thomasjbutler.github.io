import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../Header'

describe('Header', () => {
  it('renders the site title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Thomas J Butler')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact']
    
    navLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders the mobile menu button', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')
    expect(mobileMenuButton).toBeInTheDocument()
  })
})