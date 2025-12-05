import React, { useEffect, useState } from 'react'

interface GoogleAuthButtonProps {
    googleLoginHost: string
    googleLoginClientId: string
    googleLoginUrl: string
}

export default function GoogleAuthButton({
    googleLoginHost,
    googleLoginClientId,
    googleLoginUrl,
}: GoogleAuthButtonProps) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    useEffect(() => {
        setIsScriptLoaded(true)
    }, [])

    return (
        <>{
            isScriptLoaded ? <div className="btn-group mb-3 d-flex flex-row justify-content-center" role="group" aria-label="Google login">
                <script src={googleLoginHost} async></script>
                <div id="g_id_onload"
                    data-testid="g_id_onload"
                    data-client_id={googleLoginClientId}
                    data-login_uri={googleLoginUrl}
                    data-auto_prompt="false">
                </div>
                <div className="g_id_signin justify-content-center text-center"
                    data-type="standard"
                    data-size="large"
                    data-theme="outline"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div>
            </div> : <></>
        }
        </>
    )
}
