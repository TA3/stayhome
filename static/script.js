const delayRange = [1000, 2000]
let depth, interaction, infectionPercentage, deathPercentage
let svg = null
let event

function visualize(data) {
  $('.node.unwell').off()
  d3.select('.result>svg').remove()
  svg = d3
    .select('.result')
    .append('svg')
    .attr('id', 'svg')
    .attr('width', 900)
    .attr('height', 650)
    .append('g')
    .attr('transform', 'translate(50,-100)')
  const dataStructure = d3
    .stratify()
    .id((d) => {
      return d.c
    })
    .parentId((d) => {
      return d.p
    })(data)

  const treeStructure = d3.tree().size([800, 700])

  const information = treeStructure(dataStructure)
  const connections = svg
    .append('g')
    .selectAll('path')
    .data(information.links())
  connections
    .enter()
    .append('path')
    .attr('d', (d) => {
      const path =
        'M' +
        d.source.x +
        ',' +
        d.source.y + // source
        ' C ' +
        d.source.x +
        ',' +
        (d.source.y + d.target.y) / 2 + // control point  1
        ' ' +
        d.target.x +
        ',' +
        (d.source.y + d.target.y) / 2 + // control point 2
        ' ' +
        d.target.x +
        ',' +
        d.target.y // target
      return d.source.data.p !== '' ? path : ''
    })
    .attr('class', (d) => {
      return d.source.data.p !== ''
        ? 'path path' + d.target.data.c.split('.').join('-')
        : 'rootPath'
    })
  const child = svg
    .append('g')
    .selectAll('circle')
    .data(information.descendants())
  child
    .enter()
    .append('circle')
    .attr('cx', (d) => {
      return d.data.p !== '' ? d.x : 0
    })
    .attr('cy', (d) => {
      return d.data.p !== '' ? d.y : 0
    })
    .attr('r', (d) => {
      return d.data.p !== '' ? 7 - depth : '0'
    })
    .attr('class', (d) => {
      const i = d.data.i ? 'unwell clickable' : 'well'
      return d.data.p !== ''
        ? 'node p' +
            d.data.p.split('.').join('-') +
            ' c' +
            d.data.c.split('.').join('-') +
            ' ' +
            i
        : ''
    })
  document.querySelector('.result svg').setAttribute('viewBox', '0 0 900 600')
  const chart = $('#svg')
  const aspect = chart.width() / chart.height()
  const container = chart.parent()
  $(window)
    .on('resize', function() {
      const targetWidth = container.width()
      chart.attr('width', targetWidth)
      chart.attr('height', Math.round(targetWidth / aspect))
    })
    .trigger('resize')
  // $('.node.unwell').click((n) => {
  //   infect(n.target.className.baseVal.split(' ')[2], infectionPercentage)
  // })
  document.querySelector(
    '#infectionCause'
  ).textContent = document.querySelectorAll('.node.clickable').length
  document.querySelector(
    '.story #population'
  ).textContent = document.querySelectorAll('.node').length
}

function probability(percentage) {
  return Math.round(Math.random() * 100) + 1 <= percentage
}

function death(percentage) {
  document.querySelectorAll('.node.unwell').forEach((e, i) => {
    setTimeout(() => {
      if (probability(percentage)) {
        e.classList.add('death')
        document.querySelector(
          '.story #death'
        ).textContent = document.querySelectorAll('.node.death').length
      }
    }, 5 * i)
  })

  setTimeout(() => {
    document.querySelector('.status').textContent = 'Finished'
    document.querySelectorAll('.controls>.buttons>button').forEach((e) => {
      e.removeAttribute('disabled')
    })
  }, 2500)
}

function infect(node, percentage) {
  const delay = Math.floor(Math.random() * delayRange[1]) + delayRange[0]
  const path = document.querySelector('.path.path' + node.substr(1))
  const n = document.querySelector('.node.' + node)
  if (n !== null && probability(percentage)) {
    path !== null && path.classList.add('linked')
    n.classList.remove('well')
    n.classList.add('unwell')
    document
      .querySelectorAll('.node.p' + n.classList[2].substr(1))
      .forEach((c) => {
        setTimeout(() => {
          infect(c.classList[2], percentage)
        }, delay)
      })
    document.querySelector(
      '#infections'
    ).textContent = document.querySelectorAll('.node.unwell').length
  }
}

let p, toCreate

function depthTree(child, depth) {
  $('.node.unwell').off()
  d3.select('.result>svg').remove()
  p = [
    {
      c: 0,
      p: ''
    }
  ]
  toCreate = []
  genChild(child, 0, true)
  for (let i = depth; i > 0; i--) {
    toCreate.forEach((e, i) => {
      genChild(child, e)
      delete toCreate[i]
    })
  }
  visualize(p)
}

function genChild(child, parent, forceInfect) {
  for (let i = 1; i <= child; i++) {
    p.push({
      c: parent.toString() + '.' + i.toString(),
      p: parent.toString(),
      i:
        (Math.round(Math.random() * 99) + 1 < infectionPercentage ||
          forceInfect) &&
        parent === 0
    })
    toCreate.push(parent.toString() + '.' + i.toString())
  }
}

function updateValues() {
  depth = window.$('.ui.slider#depth').slider('get value')
  interaction = window.$('.ui.slider#interaction').slider('get value')
  infectionPercentage =
    window.$('.ui.slider#percentage').slider('get value') * 10
  deathPercentage = window.$('.ui.slider#death').slider('get value')
  document.querySelector('.story #infectionCause').textContent = 0
  document.querySelector('.story #infections').textContent = 0
  document.querySelector('.story #death').textContent = 0
  // depthTree(interaction, depth)
  depthTree(interaction, depth)
}
