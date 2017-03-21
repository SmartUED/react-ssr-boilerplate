export function add (num) {
  return {
    type: 'count/add',
    payload: num
  }
}

export function sub (num) {
  return {
    type: 'count/sub',
    payload: num
  }
}

export function asyncAdd (num) {
  return function (dispatch) {
    return delay(1000)
            .then(() => {
              dispatch(add(num))
            })
  }
}

function delay (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
