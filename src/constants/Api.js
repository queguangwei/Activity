const API_ROOT = "/api"
const API_ACTIVITY = API_ROOT + '/activity'
const TYPES = {
    POST: 'post',
    GET: 'get'
}

export default {
    activity: {
        prizeUserList: {
            url: API_ACTIVITY  + "/v1/lucky/winnerList",
            type: TYPES.POST
        },
        myPrizeRecond: {
            url: API_ACTIVITY  + "/v1/lucky/getUserPrize",
            type: TYPES.POST
        },
        surplusCount: {
            url: API_ACTIVITY  + "/v1/lucky/getLotteryTimes",
            type: TYPES.POST
        },
        playLottery: {
          url: API_ACTIVITY + "/v1/lucky/lotteryDraw",
          type: TYPES.POST
        },
        switchOn: {
            url: API_ACTIVITY + "/v1/lucky/switch",
            type: TYPES.POST
        }
    }
}