const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello killer')
})

app.get('/freq', (req, res) => {
  const { str } = req.query

  const strArr = str.split('');
  const dict = {};
  strArr.forEach(char => {
   let lcChar = char.toLowerCase();
    lcChar in dict ? dict[lcChar] += 1 : dict[lcChar] = 1;
  });

  const results = {};
  const keyArr = Object.keys(dict)
  results.count = keyArr.length
  results.average = (keyArr.reduce((accr,curr) => {
    return accr += dict[curr]
  }, 0)) / results.count
  results.highest = keyArr.sort((a, b) => dict[a] > dict[b] ? -1 : dict[a] < dict[b] ? 1 : 0)[0]
  //results[results.highest] = dict[results.highest]
  keyArr.forEach(char => {
    results[char] = dict[char]
  })

  res.json(results)
})

app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) {
    return res.status(400).send('missing a or b params')
  }

  if (Number.isNaN(parseFloat(a)) || Number.isNaN(parseFloat(b))) {
    return res.status(400).send('must be numbers')
  }

  const sum = parseFloat(a) + parseFloat(b);
  res.send(`${a} + ${b} Total: ${sum}`)
})

app.get('/generate', (req, res) => {
  const { n } = req.query;
  const num = parseInt(n);

  if(!n) {
    return res.status(400).send('add a number')
  }

  if (Number.isNaN(num)) {
    return res.status(400).send('must be a number')
  }

  const countArr = Array(num).fill(1)
  const numArr = countArr.map((_, i) => i + 1)
  const final = []
  numArr.forEach((num, i) => {
    let ranI = Math.floor(Math.random() * num)
    let initNum = numArr[i];
    numArr[i] = numArr[ranI]
    numArr[ranI] = initNum
  })
  res.json(numArr)
})




function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function toDegrees(rad) {
  return rad * (180 / Math.PI);
}

app.get('/midpoint', (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;

  // for brevity the validation is skipped

  // convert to radians
  const rlat1 = toRadians(lat1);
  const rlon1 = toRadians(lon1);
  const rlat2 = toRadians(lat2);
  const rlon2 = toRadians(lon2);

  const bx = Math.cos(rlat2) * Math.cos(rlon2 - rlon1);
  const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);

  const midLat = Math.atan2(
    Math.sin(rlat1) + Math.sin(rlat2),
    Math.sqrt(
      (Math.cos(rlat1) + bx)
      * (Math.cos(rlat1) + bx)
      + by * by
    )
  );
  const midLon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);

  res.json({
    lat: toDegrees(midLat),
    lon: toDegrees(midLon)
  })
});

module.exports = app;
