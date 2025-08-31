import '@css/style.css'
import $ from 'jquery'
import Post from '@model/post'
import jsonData from '@assets/data.json'
import logo from '@assets/logo.svg'
import csvData from '@assets/data.csv'

const post = new Post('Webpack Post Title', logo)

$('pre').html(post.toString())
console.log('JSON data:', jsonData)
console.log('CSV data:', csvData)