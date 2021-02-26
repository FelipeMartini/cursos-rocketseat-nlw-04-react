import '../styles/global.css'

import { ChallengedProvider } from './../contexts/ChallengeContexts'
import { CountdownProvider } from './../contexts/CountdownContext'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengedProvider>
      <CountdownProvider>
        <Component {...pageProps} />;
      </CountdownProvider>
    </ChallengedProvider>
  )
}

export default MyApp;
