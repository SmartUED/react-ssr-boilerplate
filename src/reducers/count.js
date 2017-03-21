const INITIAL_STATE = 0

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'count/add':
      return state + action.payload
    case 'count/sub':
      return state - action.payload
    default:
      return state
  }
}
