import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../../src/components/Header'

describe('Header component', () => {
    it('should render the Header component', () => {
        const component = render(<Header />)

        expect(component).toBeTruthy()
        expect(screen.getByText('Header')).toBeTruthy()
    })
})