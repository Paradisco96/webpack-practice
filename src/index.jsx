import '@css/style.css'
import '@less/style.less'
import '@sass/style.sass'
import '@sass/style.scss'
import $ from 'jquery'
import Post from '@model/post'
import jsonData from '@assets/data.json'
import logo from '@assets/logo.svg'
import csvData from '@assets/data.csv'
import '@model/lodash'

import React  from 'react' 
import ReactDOM from 'react-dom/client'

const post = new Post('Webpack Post Title', logo)


console.log('JSON data:', jsonData)
console.log('JSON data:', jsonData)
console.log('CSV data:', csvData)

async function start() {
return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}

start().then((res) => console.log(res))

class Util {
  static id = Date.now()
}
console.log('Util ID:', Util.id)

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
const App = () => { return (<div className="container">
    <h1>Webpack training</h1>
    <div className="logo" />
    <pre />

    <div className="less">
      <h2>Less</h2>
    </div>

    <div className="scss">
      <h2>Scss</h2>
    </div>

    <div className="sass">
      <h2>Sass</h2>
    </div>
  </div>
  )
}
root.render(<App />)