import 'antd/dist/antd.css'
import '../styles/var.less'
import '../styles/common.less'
import '../styles/globals.less'
import './detail/index.less' /* 需要分离 */
import { AppProps} from 'next/app'
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
