const cluster = require('cluster')
const os = require('os')
const numberCPUs = os.cpus().length


if (cluster.isMaster) {
  console.log(`I have ${numberCPUs} CPUs availables`)

  const processesMap = {}

  for (let i = 0; i < numberCPUs; i++) {
    const myId = (i + 1).toString().padStart(2, '0')
    const kitchen = cluster.fork({ kitchenId: myId })

    processesMap[kitchen.id] = myId

    kitchen.on('message', (payload) => {
      console.log(`Message from kitchen -->> ${processesMap[kitchen.id]}`)
      console.log(`I receive payload: ${JSON.stringify(payload)}`)

      if (payload.status === 'OVERLOAD') {
        // factory.createKitchen()
      }
    })

  }
} else {
  console.log(`[${process.env.kitchenId}] I am the kitchen ${process.pid}`)
  if (process.env.kitchenId === '01') {
    setInterval(() => {
      process.send({ status: 'OVERLOAD' })
    }, 2000)
  }
}