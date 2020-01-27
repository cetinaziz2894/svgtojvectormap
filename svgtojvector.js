const { parse, stringify } = require('svgson')
 
// ----------------------------
// Convert SVG to JSON AST
// ----------------------------
parse(`
  <svg>
    <line
      stroke= "#bada55"
      stroke-width= "2"
      stroke-linecap= "round"
      x1= "70"
      y1= "80"
      x2= "250"
      y2= "150">
    </line>
  </svg>`).then(json => {
  console.log(JSON.stringify(json, null, 2))
  /*
    {
      name: 'svg',
      type: 'element',
      value: '',
      attributes: {},
      children: [
        {
          name: 'line',
          type: 'element',
          value: '',
          attributes: {
            stroke: '#bada55',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            x1: '70',
            y1: '80',
            x2: '250',
            y2: '150'
          },
          children: []
        }
      ]
    }
  */
 
  // -------------------------------
  // Convert JSON AST back to SVG
  // -------------------------------
  const mysvg = stringify(json)
  /* returns the SVG as string */
})