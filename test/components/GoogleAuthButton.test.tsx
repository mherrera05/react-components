import React from 'react'
import { render } from '@testing-library/react'
import GoogleLoginButton from '../../src/components/GoogleAuthButton'

describe('Google Login Button', () => {
    it('should render button', () => {
        const component = render(<GoogleLoginButton
            googleLoginHost={"www.demo.com"}
            googleLoginClientId={"client.id"}
            googleLoginUrl={"www.localhost.com"}
        />)

        const result = component.getByTestId('g_id_onload')

        expect(result).toBeDefined()
    })
})