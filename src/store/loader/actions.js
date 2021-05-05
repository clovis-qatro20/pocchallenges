export const ACTIONS_TYPES = {
    start: '@LOADING/START',
    finish: '@LOADING/FINISH',
}

export const startLoading = () => ({
    type: ACTIONS_TYPES.start
})

export const finishLoading = () => ({
    type: ACTIONS_TYPES.finish
})